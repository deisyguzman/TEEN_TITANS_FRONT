import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MapPin, Clock, BookOpen } from "lucide-react"

export default function ProfessorGroupsPage() {
  const groups = [
    {
      id: 1,
      name: "Cálculo I",
      section: "Grupo A",
      students: 32,
      capacity: 35,
      room: "Aula 201",
      schedule: "Lun/Mié 08:00-10:00",
      semester: "2024-1",
    },
    {
      id: 2,
      name: "Cálculo I",
      section: "Grupo B",
      students: 34,
      capacity: 35,
      room: "Aula 305",
      schedule: "Lun/Mié 14:00-16:00",
      semester: "2024-1",
    },
    {
      id: 3,
      name: "Álgebra Lineal",
      section: "Grupo C",
      students: 28,
      capacity: 30,
      room: "Aula 102",
      schedule: "Vie 10:00-12:00",
      semester: "2024-1",
    },
  ]

  return (
    <DashboardLayout role="professor" userName="Profesor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mis Grupos</h1>
          <p className="text-muted-foreground mt-1">Gestiona tus grupos y estudiantes</p>
        </div>

        <div className="grid gap-6">
          {groups.map((group) => {
            const percentage = (group.students / group.capacity) * 100
            const isNearCapacity = percentage >= 90

            return (
              <Card key={group.id} className="border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">
                        {group.name} - {group.section}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Semestre {group.semester}</p>
                    </div>
                    {isNearCapacity && (
                      <span className="px-3 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full border border-warning/20">
                        Cerca del cupo
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Estudiantes</p>
                        <p className="text-lg font-semibold text-foreground">
                          {group.students}/{group.capacity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Aula</p>
                        <p className="text-lg font-semibold text-foreground">{group.room}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Horario</p>
                        <p className="text-sm font-semibold text-foreground">{group.schedule}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Ocupación</p>
                        <p className="text-lg font-semibold text-foreground">{percentage.toFixed(0)}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-muted-foreground font-medium">Capacidad del grupo</span>
                        <span className="font-semibold text-foreground">
                          {group.students}/{group.capacity} estudiantes
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all ${isNearCapacity ? "bg-warning" : "bg-primary"}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Ver Estudiantes
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Ver Horario
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
