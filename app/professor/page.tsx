import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { WeeklySchedule } from "@/components/weekly-schedule"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, AlertCircle, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ProfessorDashboard() {
  const scheduleBlocks = [
    {
      id: "1",
      day: 0,
      startHour: 8,
      endHour: 10,
      subject: "Cálculo I",
      group: "A",
      room: "Aula 201",
    },
    {
      id: "2",
      day: 0,
      startHour: 14,
      endHour: 16,
      subject: "Cálculo I",
      group: "B",
      room: "Aula 305",
    },
    {
      id: "3",
      day: 2,
      startHour: 8,
      endHour: 10,
      subject: "Cálculo I",
      group: "A",
      room: "Aula 201",
    },
    {
      id: "4",
      day: 2,
      startHour: 14,
      endHour: 16,
      subject: "Cálculo I",
      group: "B",
      room: "Aula 305",
    },
    {
      id: "5",
      day: 4,
      startHour: 10,
      endHour: 12,
      subject: "Álgebra Lineal",
      group: "C",
      room: "Aula 102",
    },
  ]

  const groups = [
    { name: "Cálculo I - Grupo A", students: 32, capacity: 35, room: "Aula 201" },
    { name: "Cálculo I - Grupo B", students: 34, capacity: 35, room: "Aula 305" },
    { name: "Álgebra Lineal - Grupo C", students: 28, capacity: 30, room: "Aula 102" },
  ]

  const normalNotifications = [
    {
      id: 1,
      student: "Juan Pérez",
      type: "normal",
      message: "Solicitud de cambio de Cálculo I Grupo A a Grupo B",
      time: "Hace 2 horas",
    },
    {
      id: 2,
      student: "María González",
      type: "normal",
      message: "Solicitud de cambio de horario por conflicto laboral",
      time: "Hace 5 horas",
    },
  ]

  const extraordinaryNotifications = [
    {
      id: 3,
      student: "Carlos Rodríguez",
      type: "extraordinary",
      message: "Solicitud extraordinaria por motivos médicos",
      time: "Hace 1 hora",
    },
  ]

  return (
    <DashboardLayout role="professor" userName="Profesor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel del Profesor</h1>
          <p className="text-muted-foreground mt-1">Gestión de grupos y horarios</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Grupos Activos"
            value="3"
            icon={<BookOpen className="h-4 w-4" />}
            description="Este semestre"
          />
          <StatCard
            title="Total Estudiantes"
            value="94"
            icon={<Users className="h-4 w-4" />}
            description="En todos los grupos"
          />
          <StatCard
            title="Grupos en Alerta"
            value="1"
            icon={<AlertCircle className="h-4 w-4" />}
            description="Cerca del cupo"
            variant="warning"
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
                  <AlertCircle className="h-5 w-5 text-warning" />
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

        <WeeklySchedule scheduleBlocks={scheduleBlocks} title="Mi Horario Semanal" />

        <Card>
          <CardHeader>
            <CardTitle>Mis Grupos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {groups.map((group, index) => {
                const percentage = (group.students / group.capacity) * 100
                const isNearCapacity = percentage >= 90

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{group.name}</h3>
                        {isNearCapacity && (
                          <span className="px-2 py-0.5 bg-warning/10 text-warning text-xs font-medium rounded-full border border-warning/20">
                            Cerca del cupo
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{group.room}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-xs">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Cupo</span>
                            <span className="font-medium">
                              {group.students}/{group.capacity}
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${isNearCapacity ? "bg-warning" : "bg-primary"}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
