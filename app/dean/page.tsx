import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, AlertTriangle, TrendingUp, Bell } from "lucide-react"

export default function DeanDashboard() {
  const normalNotifications = [
    {
      id: 1,
      student: "María González",
      message: "Solicitud de cambio de Cálculo I - Grupo A a Grupo B",
      time: "Hace 2 horas",
    },
    {
      id: 2,
      student: "Pedro Sánchez",
      message: "Solicitud de cambio de Física II - Grupo C a Grupo A",
      time: "Hace 4 horas",
    },
  ]

  const extraordinaryNotifications = [
    {
      id: 3,
      student: "Carlos Ramírez",
      message: "Solicitud extraordinaria por motivos médicos",
      time: "Hace 1 hora",
    },
    {
      id: 4,
      student: "Ana Martínez",
      message: "Solicitud extraordinaria por emergencia familiar",
      time: "Hace 3 horas",
    },
  ]

  const requests = [
    {
      id: "REQ-001",
      student: "María González",
      from: "Cálculo I - Grupo A",
      to: "Cálculo I - Grupo B",
      priority: "Alta",
      status: "Pendiente",
      date: "2024-01-15",
    },
    {
      id: "REQ-002",
      student: "Carlos Ramírez",
      from: "Física II - Grupo C",
      to: "Física II - Grupo A",
      priority: "Media",
      status: "Pendiente",
      date: "2024-01-14",
    },
    {
      id: "REQ-003",
      student: "Ana Martínez",
      from: "Programación - Grupo B",
      to: "Programación - Grupo D",
      priority: "Baja",
      status: "Pendiente",
      date: "2024-01-13",
    },
  ]

  return (
    <DashboardLayout role="dean" userName="Decano">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel de Decanatura</h1>
          <p className="text-muted-foreground mt-1">Gestión de solicitudes de la facultad</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Solicitudes Pendientes"
            value="18"
            icon={<Clock className="h-4 w-4" />}
            description="Requieren revisión"
            variant="warning"
          />
          <StatCard
            title="Aprobadas"
            value="94"
            icon={<CheckCircle className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
            description="Este periodo"
            variant="success"
          />
          <StatCard
            title="Rechazadas"
            value="15"
            icon={<XCircle className="h-4 w-4" />}
            description="Este periodo"
            variant="destructive"
          />
          <StatCard
            title="Grupos en Alerta"
            value="5"
            icon={<AlertTriangle className="h-4 w-4" />}
            description="90% de cupo"
            variant="destructive"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Solicitudes Normales
                </CardTitle>
                <Badge variant="secondary">{normalNotifications.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {normalNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium text-sm text-foreground">{notification.student}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Solicitudes Extraordinarias
                </CardTitle>
                <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                  {extraordinaryNotifications.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {extraordinaryNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 rounded-lg border border-warning/20 bg-warning/5 hover:bg-warning/10 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium text-sm text-foreground">{notification.student}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Solicitudes Pendientes por Prioridad</CardTitle>
              <Button variant="outline" size="sm">
                Ver Todas
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{request.id}</span>
                        <Badge
                          variant={
                            request.priority === "Alta"
                              ? "destructive"
                              : request.priority === "Media"
                                ? "default"
                                : "secondary"
                          }
                          className={request.priority === "Alta" ? "bg-[#990000] text-white hover:bg-[#770000]" : ""}
                        >
                          {request.priority}
                        </Badge>
                        <Badge variant="outline">{request.status}</Badge>
                      </div>
                      <p className="text-sm text-foreground font-medium">{request.student}</p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>
                          <span className="font-medium">De:</span> {request.from}
                        </p>
                        <p>
                          <span className="font-medium">A:</span> {request.to}
                        </p>
                        <p>
                          <span className="font-medium">Fecha:</span> {request.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="w-full">
                        Aprobar
                      </Button>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Rechazar
                      </Button>
                      <Button size="sm" variant="ghost" className="w-full">
                        Más Info
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Aprobación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tasa de Aprobación</span>
                    <span className="font-bold text-success">86%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: "86%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tasa de Rechazo</span>
                    <span className="font-bold text-destructive">14%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-destructive h-2 rounded-full" style={{ width: "14%" }}></div>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-muted-foreground">+8% vs mes anterior</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grupos con Mayor Demanda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Cálculo I - Grupo B</span>
                    <span className="text-destructive font-bold">95%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div className="bg-destructive h-1.5 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Física II - Grupo A</span>
                    <span className="text-warning font-bold">88%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div className="bg-warning h-1.5 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Programación - Grupo D</span>
                    <span className="text-success font-bold">72%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div className="bg-success h-1.5 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
