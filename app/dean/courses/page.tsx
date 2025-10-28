import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Calendar, Search, AlertTriangle } from "lucide-react"

export default function DeanCoursesPage() {
  const subjects = [
    {
      id: 1,
      name: "Cálculo I",
      code: "MAT-101",
      department: "Matemáticas",
      groups: 4,
      totalStudents: 180,
      capacity: 200,
    },
    {
      id: 2,
      name: "Física II",
      code: "FIS-202",
      department: "Física",
      groups: 3,
      totalStudents: 165,
      capacity: 180,
    },
    {
      id: 3,
      name: "Programación",
      code: "CSC-101",
      department: "Ciencias de la Computación",
      groups: 4,
      totalStudents: 195,
      capacity: 200,
    },
    {
      id: 4,
      name: "Álgebra Lineal",
      code: "MAT-201",
      department: "Matemáticas",
      groups: 3,
      totalStudents: 145,
      capacity: 180,
    },
    {
      id: 5,
      name: "Base de Datos",
      code: "CSC-301",
      department: "Ciencias de la Computación",
      groups: 3,
      totalStudents: 120,
      capacity: 150,
    },
    {
      id: 6,
      name: "Redes de Computadoras",
      code: "CSC-401",
      department: "Ciencias de la Computación",
      groups: 2,
      totalStudents: 85,
      capacity: 120,
    },
  ]

  const groups = [
    {
      id: 1,
      subject: "Cálculo I",
      code: "MAT-101",
      group: "A",
      professor: "Dr. Juan Pérez",
      schedule: "Lun-Mié 8:00-10:00",
      enrolled: 48,
      capacity: 50,
      classroom: "A-301",
    },
    {
      id: 2,
      subject: "Cálculo I",
      code: "MAT-101",
      group: "B",
      professor: "Dra. María García",
      schedule: "Mar-Jue 10:00-12:00",
      enrolled: 47,
      capacity: 50,
      classroom: "A-302",
    },
    {
      id: 3,
      subject: "Física II",
      code: "FIS-202",
      group: "A",
      professor: "Dr. Carlos Rodríguez",
      schedule: "Lun-Mié 14:00-16:00",
      enrolled: 44,
      capacity: 50,
      classroom: "B-201",
    },
    {
      id: 4,
      subject: "Programación",
      code: "CSC-101",
      group: "A",
      professor: "Ing. Ana Martínez",
      schedule: "Mar-Jue 8:00-10:00",
      enrolled: 50,
      capacity: 50,
      classroom: "C-101",
    },
    {
      id: 5,
      subject: "Programación",
      code: "CSC-101",
      group: "B",
      professor: "Ing. Pedro Sánchez",
      schedule: "Lun-Mié 10:00-12:00",
      enrolled: 49,
      capacity: 50,
      classroom: "C-102",
    },
    {
      id: 6,
      subject: "Álgebra Lineal",
      code: "MAT-201",
      group: "A",
      professor: "Dr. Laura Fernández",
      schedule: "Mar-Jue 14:00-16:00",
      enrolled: 48,
      capacity: 60,
      classroom: "A-401",
    },
    {
      id: 7,
      subject: "Base de Datos",
      code: "CSC-301",
      group: "A",
      professor: "Ing. Roberto López",
      schedule: "Lun-Mié 16:00-18:00",
      enrolled: 40,
      capacity: 50,
      classroom: "C-201",
    },
    {
      id: 8,
      subject: "Redes de Computadoras",
      code: "CSC-401",
      group: "A",
      professor: "Ing. Sofia Torres",
      schedule: "Mar-Jue 16:00-18:00",
      enrolled: 42,
      capacity: 60,
      classroom: "C-301",
    },
  ]

  const getOccupancyColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100
    if (percentage >= 90) return "text-destructive"
    if (percentage >= 75) return "text-warning"
    return "text-success"
  }

  const getOccupancyBadge = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100
    if (percentage >= 90)
      return (
        <Badge variant="default" className="bg-destructive/10 text-destructive border-destructive/20">
          Alta
        </Badge>
      )
    if (percentage >= 75)
      return (
        <Badge variant="default" className="bg-warning/10 text-warning border-warning/20">
          Media
        </Badge>
      )
    return (
      <Badge variant="default" className="bg-success/10 text-success border-success/20">
        Baja
      </Badge>
    )
  }

  return (
    <DashboardLayout role="dean" userName="Decano">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Materias y Grupos</h1>
          <p className="text-muted-foreground mt-1">Gestión de materias y grupos de la facultad</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar materias o grupos..." className="pl-10" />
          </div>
          <Button>Agregar Materia</Button>
        </div>

        <Tabs defaultValue="subjects" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="subjects">
              Materias
              <Badge variant="secondary" className="ml-2">
                {subjects.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="groups">
              Grupos
              <Badge variant="secondary" className="ml-2">
                {groups.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subjects" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => {
                const occupancyPercentage = (subject.totalStudents / subject.capacity) * 100
                return (
                  <Card key={subject.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{subject.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{subject.code}</p>
                        </div>
                        {getOccupancyBadge(subject.totalStudents, subject.capacity)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Departamento</span>
                          <span className="font-medium">{subject.department}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Grupos</span>
                          <span className="font-medium">{subject.groups}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Estudiantes</span>
                          <span className={`font-bold ${getOccupancyColor(subject.totalStudents, subject.capacity)}`}>
                            {subject.totalStudents}/{subject.capacity}
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${occupancyPercentage >= 90 ? "bg-destructive" : occupancyPercentage >= 75 ? "bg-warning" : "bg-success"}`}
                            style={{ width: `${occupancyPercentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground text-right">
                          {occupancyPercentage.toFixed(1)}% ocupado
                        </p>
                      </div>

                      {occupancyPercentage >= 90 && (
                        <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded-lg border border-destructive/20">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          <span className="text-xs text-destructive font-medium">Cupo casi lleno</span>
                        </div>
                      )}

                      <Button variant="outline" className="w-full bg-transparent" size="sm">
                        Ver Detalles
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="mt-6">
            <div className="space-y-4">
              {groups.map((group) => {
                const occupancyPercentage = (group.enrolled / group.capacity) * 100
                return (
                  <Card key={group.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">
                                {group.subject} - Grupo {group.group}
                              </h3>
                              <p className="text-sm text-muted-foreground">{group.code}</p>
                            </div>
                            {getOccupancyBadge(group.enrolled, group.capacity)}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Profesor:</span>
                              <span className="font-medium">{group.professor}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Horario:</span>
                              <span className="font-medium">{group.schedule}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Aula:</span>
                              <span className="font-medium">{group.classroom}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Inscritos:</span>
                              <span className={`font-bold ${getOccupancyColor(group.enrolled, group.capacity)}`}>
                                {group.enrolled}/{group.capacity}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${occupancyPercentage >= 90 ? "bg-destructive" : occupancyPercentage >= 75 ? "bg-warning" : "bg-success"}`}
                                style={{ width: `${occupancyPercentage}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {occupancyPercentage.toFixed(1)}% de ocupación
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            Ver Estudiantes
                          </Button>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
