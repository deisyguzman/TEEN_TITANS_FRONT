"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Eye, Check, X } from "lucide-react"

type RequestStatus = "Pendiente" | "Aprobado" | "Rechazado"

interface Request {
  id: number
  student: string
  course: string
  requestedCourse: string
  reason: string
  description: string
  date: string
  status: RequestStatus
  type: "normal" | "extraordinary"
}

export default function DeanRequestsPage() {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      student: "María García",
      course: "Cálculo I - Sección A",
      requestedCourse: "Cálculo I - Sección B",
      reason: "Conflicto de horario con trabajo",
      description:
        "Tengo un conflicto de horario con mi trabajo de medio tiempo. El horario de la Sección B se ajusta mejor a mi disponibilidad laboral, permitiéndome asistir a todas las clases sin problemas. Trabajo en una empresa local de 2pm a 6pm y la Sección A tiene clases a las 3pm.",
      date: "2024-01-15",
      status: "Pendiente",
      type: "normal",
    },
    {
      id: 2,
      student: "Pedro Sánchez",
      course: "Física I - Sección A",
      requestedCourse: "Física I - Sección C",
      reason: "Preferencia de horario",
      description:
        "Prefiero el horario de la Sección C porque me permite tener un mejor balance entre mis estudios y actividades extracurriculares. Participo en el equipo de debate universitario que entrena en las tardes.",
      date: "2024-01-14",
      status: "Pendiente",
      type: "normal",
    },
    {
      id: 3,
      student: "Ana Martínez",
      course: "Estructuras de Datos - Sección B",
      requestedCourse: "Estructuras de Datos - Sección A",
      reason: "Mejor horario para transporte",
      description:
        "Vivo en una zona alejada del campus y el transporte público es limitado. El horario de la Sección A coincide mejor con los horarios de autobús disponibles, lo que me permitiría llegar puntualmente a clases.",
      date: "2024-01-13",
      status: "Aprobado",
      type: "normal",
    },
    {
      id: 4,
      student: "Carlos Rodríguez",
      course: "Álgebra Lineal - Sección C",
      requestedCourse: "Álgebra Lineal - Sección A",
      reason: "Motivos médicos",
      description:
        "Por recomendación médica, necesito asistir a terapia física dos veces por semana en horario de tarde debido a una lesión deportiva. El cambio a la Sección A me permitiría cumplir con el tratamiento sin afectar mi rendimiento académico. Adjunto certificado médico del Dr. Ramírez del Hospital Central.",
      date: "2024-01-12",
      status: "Pendiente",
      type: "extraordinary",
    },
    {
      id: 5,
      student: "Laura Fernández",
      course: "Programación II - Sección B",
      requestedCourse: "Programación II - Sección D",
      reason: "Emergencia familiar",
      description:
        "Debido a una situación familiar urgente, mi madre fue diagnosticada con una condición médica que requiere acompañamiento a citas médicas dos veces por semana. El horario de la Sección D me permitiría cumplir con mis responsabilidades familiares sin descuidar mis estudios. Adjunto documentación médica.",
      date: "2024-01-11",
      status: "Pendiente",
      type: "extraordinary",
    },
  ])

  const handleViewDetails = (request: Request) => {
    setSelectedRequest(request)
    setDialogOpen(true)
  }

  const handleApprove = (requestId: number) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: "Aprobado" as RequestStatus } : req)),
    )
    setDialogOpen(false)
  }

  const handleReject = (requestId: number) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: "Rechazado" as RequestStatus } : req)),
    )
    setDialogOpen(false)
  }

  const normalRequests = requests.filter((req) => req.type === "normal")
  const extraordinaryRequests = requests.filter((req) => req.type === "extraordinary")

  const getStatusBadge = (status: RequestStatus) => {
    if (status === "Aprobado") {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
          Aprobado
        </Badge>
      )
    }
    if (status === "Rechazado") {
      return (
        <Badge variant="default" className="bg-red-100 text-red-800 hover:bg-red-100">
          Rechazado
        </Badge>
      )
    }
    return <Badge variant="secondary">Pendiente</Badge>
  }

  const RequestTable = ({ requests }: { requests: Request[] }) => (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Estudiante</TableHead>
            <TableHead>Materia Actual</TableHead>
            <TableHead>Materia Solicitada</TableHead>
            <TableHead>Razón</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.student}</TableCell>
              <TableCell>{request.course}</TableCell>
              <TableCell>{request.requestedCourse}</TableCell>
              <TableCell>{request.reason}</TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell>{getStatusBadge(request.status)}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleViewDetails(request)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <DashboardLayout role="dean">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Solicitudes de Cambio</h1>
          <p className="text-muted-foreground mt-1">Revisa y aprueba solicitudes de tu facultad</p>
        </div>

        <Tabs defaultValue="normal" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="normal">
              Solicitudes Normales
              <Badge variant="secondary" className="ml-2">
                {normalRequests.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="extraordinary">
              Solicitudes Extraordinarias
              <Badge variant="secondary" className="ml-2">
                {extraordinaryRequests.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="normal" className="mt-6">
            <RequestTable requests={normalRequests} />
          </TabsContent>

          <TabsContent value="extraordinary" className="mt-6">
            <RequestTable requests={extraordinaryRequests} />
          </TabsContent>
        </Tabs>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles de la Solicitud</DialogTitle>
              <DialogDescription>Revisa la información completa antes de aprobar o rechazar</DialogDescription>
            </DialogHeader>

            {selectedRequest && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Estudiante</p>
                    <p className="text-base font-semibold text-foreground">{selectedRequest.student}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Fecha</p>
                    <p className="text-base text-foreground">{selectedRequest.date}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Materia Actual</p>
                  <p className="text-base text-foreground">{selectedRequest.course}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Materia Solicitada</p>
                  <p className="text-base text-foreground">{selectedRequest.requestedCourse}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Razón</p>
                  <p className="text-base text-foreground">{selectedRequest.reason}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Descripción Detallada</p>
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                    <p className="text-base text-foreground leading-relaxed">{selectedRequest.description}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tipo de Solicitud</p>
                  <Badge
                    variant={selectedRequest.type === "extraordinary" ? "default" : "secondary"}
                    className={
                      selectedRequest.type === "extraordinary" ? "bg-warning/10 text-warning border-warning/20" : ""
                    }
                  >
                    {selectedRequest.type === "extraordinary" ? "Extraordinaria" : "Normal"}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado Actual</p>
                  {getStatusBadge(selectedRequest.status)}
                </div>
              </div>
            )}

            {selectedRequest && selectedRequest.status === "Pendiente" && (
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => handleReject(selectedRequest.id)} className="gap-2">
                  <X className="h-4 w-4" />
                  Rechazar
                </Button>
                <Button onClick={() => handleApprove(selectedRequest.id)} className="gap-2">
                  <Check className="h-4 w-4" />
                  Aprobar
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
