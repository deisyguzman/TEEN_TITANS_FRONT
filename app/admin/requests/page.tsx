"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, CheckCircle, XCircle, Eye } from "lucide-react"
import { useState } from "react"

export default function AdminRequestsPage() {
  const [normalRequests] = useState([
    {
      id: "REQ-052",
      student: "Juan Pérez",
      studentCode: "2021-0001",
      from: "Programación - Grupo C",
      to: "Programación - Grupo D",
      reason: "Conflicto de horario con otra materia obligatoria",
      status: "Pendiente",
      date: "2024-01-15",
      type: "normal",
    },
    {
      id: "REQ-051",
      student: "María González",
      studentCode: "2021-0002",
      from: "Cálculo I - Grupo A",
      to: "Cálculo I - Grupo B",
      reason: "Preferencia de horario",
      status: "Pendiente",
      date: "2024-01-14",
      type: "normal",
    },
  ])

  const [extraordinaryRequests] = useState([
    {
      id: "REQ-EXT-010",
      student: "Carlos Ramírez",
      studentCode: "2020-0045",
      from: "Física II - Grupo C",
      to: "Física II - Grupo A",
      reason: "Situación médica que requiere horario específico. Adjunto certificado médico.",
      status: "Pendiente",
      date: "2024-01-13",
      type: "extraordinary",
    },
  ])

  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const handleApprove = (id: string) => {
    alert(`Solicitud ${id} aprobada`)
    setIsDetailOpen(false)
  }

  const handleReject = (id: string) => {
    alert(`Solicitud ${id} rechazada`)
    setIsDetailOpen(false)
  }

  return (
    <DashboardLayout role="administrator" userName="Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Solicitudes</h1>
            <p className="text-muted-foreground mt-1">Administra todas las solicitudes del sistema</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Crear Solicitud
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear Nueva Solicitud</DialogTitle>
                <DialogDescription>Crea una solicitud para un estudiante</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="student">Estudiante</Label>
                  <Select>
                    <SelectTrigger id="student">
                      <SelectValue placeholder="Seleccionar estudiante" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student1">Juan Pérez - 2021-0001</SelectItem>
                      <SelectItem value="student2">María González - 2021-0002</SelectItem>
                      <SelectItem value="student3">Carlos Ramírez - 2020-0045</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Tipo de Solicitud</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="extraordinary">Extraordinaria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="from">Grupo Actual</Label>
                  <Select>
                    <SelectTrigger id="from">
                      <SelectValue placeholder="Seleccionar grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="group1">Programación - Grupo A</SelectItem>
                      <SelectItem value="group2">Programación - Grupo B</SelectItem>
                      <SelectItem value="group3">Cálculo I - Grupo A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="to">Grupo Destino</Label>
                  <Select>
                    <SelectTrigger id="to">
                      <SelectValue placeholder="Seleccionar grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="group1">Programación - Grupo C</SelectItem>
                      <SelectItem value="group2">Programación - Grupo D</SelectItem>
                      <SelectItem value="group3">Cálculo I - Grupo B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reason">Motivo</Label>
                  <Textarea id="reason" placeholder="Describe el motivo de la solicitud..." rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Crear Solicitud
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por ID o estudiante..." className="pl-9" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="approved">Aprobada</SelectItem>
                  <SelectItem value="rejected">Rechazada</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Facultad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="engineering">Ingeniería</SelectItem>
                  <SelectItem value="sciences">Ciencias</SelectItem>
                  <SelectItem value="humanities">Humanidades</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="normal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="normal">Solicitudes Normales ({normalRequests.length})</TabsTrigger>
            <TabsTrigger value="extraordinary">
              Solicitudes Extraordinarias ({extraordinaryRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="normal" className="space-y-4">
            {normalRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{request.id}</span>
                        <Badge variant="secondary">{request.status}</Badge>
                        <span className="text-xs text-muted-foreground">{request.date}</span>
                      </div>
                      <p className="text-sm text-foreground font-medium">
                        {request.student} ({request.studentCode})
                      </p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>
                          <span className="font-medium">De:</span> {request.from}
                        </p>
                        <p>
                          <span className="font-medium">A:</span> {request.to}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={isDetailOpen && selectedRequest?.id === request.id} onOpenChange={setIsDetailOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Detalles de Solicitud</DialogTitle>
                            <DialogDescription>{selectedRequest?.id}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Estudiante</Label>
                              <p className="text-sm">
                                {selectedRequest?.student} ({selectedRequest?.studentCode})
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label>Grupo Actual</Label>
                              <p className="text-sm">{selectedRequest?.from}</p>
                            </div>
                            <div className="space-y-2">
                              <Label>Grupo Destino</Label>
                              <p className="text-sm">{selectedRequest?.to}</p>
                            </div>
                            <div className="space-y-2">
                              <Label>Motivo</Label>
                              <p className="text-sm text-muted-foreground">{selectedRequest?.reason}</p>
                            </div>
                            <div className="space-y-2">
                              <Label>Fecha de Solicitud</Label>
                              <p className="text-sm">{selectedRequest?.date}</p>
                            </div>
                          </div>
                          <DialogFooter className="gap-2">
                            <Button
                              variant="outline"
                              className="bg-transparent"
                              onClick={() => handleReject(selectedRequest?.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Rechazar
                            </Button>
                            <Button
                              className="bg-success hover:bg-success/90"
                              onClick={() => handleApprove(selectedRequest?.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Aprobar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="extraordinary" className="space-y-4">
            {extraordinaryRequests.map((request) => (
              <Card key={request.id} className="border-warning">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{request.id}</span>
                        <Badge variant="destructive">Extraordinaria</Badge>
                        <Badge variant="secondary">{request.status}</Badge>
                        <span className="text-xs text-muted-foreground">{request.date}</span>
                      </div>
                      <p className="text-sm text-foreground font-medium">
                        {request.student} ({request.studentCode})
                      </p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>
                          <span className="font-medium">De:</span> {request.from}
                        </p>
                        <p>
                          <span className="font-medium">A:</span> {request.to}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={isDetailOpen && selectedRequest?.id === request.id} onOpenChange={setIsDetailOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Detalles de Solicitud Extraordinaria</DialogTitle>
                            <DialogDescription>{selectedRequest?.id}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Estudiante</Label>
                              <p className="text-sm">
                                {selectedRequest?.student} ({selectedRequest?.studentCode})
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label>Grupo Actual</Label>
                              <p className="text-sm">{selectedRequest?.from}</p>
                            </div>
                            <div className="space-y-2">
                              <Label>Grupo Destino</Label>
                              <p className="text-sm">{selectedRequest?.to}</p>
                            </div>
                            <div className="space-y-2">
                              <Label>Motivo</Label>
                              <p className="text-sm text-muted-foreground">{selectedRequest?.reason}</p>
                            </div>
                            <div className="space-y-2">
                              <Label>Fecha de Solicitud</Label>
                              <p className="text-sm">{selectedRequest?.date}</p>
                            </div>
                          </div>
                          <DialogFooter className="gap-2">
                            <Button
                              variant="outline"
                              className="bg-transparent"
                              onClick={() => handleReject(selectedRequest?.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Rechazar
                            </Button>
                            <Button
                              className="bg-success hover:bg-success/90"
                              onClick={() => handleApprove(selectedRequest?.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Aprobar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
