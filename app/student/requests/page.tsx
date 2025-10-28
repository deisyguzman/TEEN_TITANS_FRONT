import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function StudentRequestsPage() {
  const requests = [
    {
      id: "REQ-052",
      from: "Programación - Grupo C",
      to: "Programación - Grupo D",
      status: "Pendiente",
      date: "2024-01-15",
      reason: "Conflicto de horario con otra materia",
      response: null,
    },
    {
      id: "REQ-045",
      from: "Física II - Grupo B",
      to: "Física II - Grupo A",
      status: "Aprobada",
      date: "2024-01-10",
      reason: "Mejor horario para mi trabajo",
      response: "Aprobado. Hay cupo disponible en el grupo solicitado.",
    },
    {
      id: "REQ-038",
      from: "Cálculo I - Grupo A",
      to: "Cálculo I - Grupo C",
      status: "Rechazada",
      date: "2024-01-05",
      reason: "Preferencia de horario",
      response: "Rechazado. El grupo destino está completo.",
    },
  ]

  return (
    <DashboardLayout role="student" userName="Estudiante">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mis Solicitudes</h1>
            <p className="text-muted-foreground mt-1">Historial de solicitudes de cambio</p>
          </div>
          <Link href="/student/new-request">
            <Button>Nueva Solicitud</Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pendientes</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aprobadas</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rechazadas</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Solicitudes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{request.id}</span>
                        <Badge
                          variant={
                            request.status === "Aprobada"
                              ? "default"
                              : request.status === "Pendiente"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Fecha: {request.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {request.status === "Aprobada" && <CheckCircle className="h-5 w-5 text-success" />}
                      {request.status === "Pendiente" && <Clock className="h-5 w-5 text-warning" />}
                      {request.status === "Rechazada" && <XCircle className="h-5 w-5 text-destructive" />}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="grid gap-2 md:grid-cols-2">
                      <div>
                        <span className="text-muted-foreground">De:</span>
                        <p className="font-medium">{request.from}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">A:</span>
                        <p className="font-medium">{request.to}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Motivo:</span>
                      <p className="text-foreground">{request.reason}</p>
                    </div>

                    {request.response && (
                      <div className="pt-2 border-t border-border">
                        <span className="text-muted-foreground">Respuesta de Decanatura:</span>
                        <p className="text-foreground">{request.response}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
