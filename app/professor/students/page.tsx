import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone } from "lucide-react"

export default function ProfessorStudentsPage() {
  const studentsByGroup = [
    {
      groupName: "Cálculo I - Grupo A",
      students: [
        {
          id: 1,
          name: "Ana García Martínez",
          code: "2021001",
          email: "ana.garcia@universidad.edu",
          phone: "+57 300 123 4567",
          status: "Activo",
        },
        {
          id: 2,
          name: "Carlos Rodríguez López",
          code: "2021002",
          email: "carlos.rodriguez@universidad.edu",
          phone: "+57 301 234 5678",
          status: "Activo",
        },
        {
          id: 3,
          name: "María Fernández Silva",
          code: "2021003",
          email: "maria.fernandez@universidad.edu",
          phone: "+57 302 345 6789",
          status: "Activo",
        },
        {
          id: 4,
          name: "Juan Pérez Gómez",
          code: "2021004",
          email: "juan.perez@universidad.edu",
          phone: "+57 303 456 7890",
          status: "Activo",
        },
      ],
    },
    {
      groupName: "Cálculo I - Grupo B",
      students: [
        {
          id: 5,
          name: "Laura Sánchez Torres",
          code: "2021005",
          email: "laura.sanchez@universidad.edu",
          phone: "+57 304 567 8901",
          status: "Activo",
        },
        {
          id: 6,
          name: "Diego Martínez Ruiz",
          code: "2021006",
          email: "diego.martinez@universidad.edu",
          phone: "+57 305 678 9012",
          status: "Activo",
        },
        {
          id: 7,
          name: "Sofía López Herrera",
          code: "2021007",
          email: "sofia.lopez@universidad.edu",
          phone: "+57 306 789 0123",
          status: "Activo",
        },
      ],
    },
    {
      groupName: "Álgebra Lineal - Grupo C",
      students: [
        {
          id: 8,
          name: "Andrés Ramírez Castro",
          code: "2021008",
          email: "andres.ramirez@universidad.edu",
          phone: "+57 307 890 1234",
          status: "Activo",
        },
        {
          id: 9,
          name: "Valentina Morales Díaz",
          code: "2021009",
          email: "valentina.morales@universidad.edu",
          phone: "+57 308 901 2345",
          status: "Activo",
        },
        {
          id: 10,
          name: "Santiago Vargas Mejía",
          code: "2021010",
          email: "santiago.vargas@universidad.edu",
          phone: "+57 309 012 3456",
          status: "Activo",
        },
      ],
    },
  ]

  return (
    <DashboardLayout role="professor" userName="Profesor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Estudiantes</h1>
          <p className="text-muted-foreground mt-1">Lista de estudiantes por grupo</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar estudiante por nombre o código..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filtrar por grupo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los grupos</SelectItem>
              <SelectItem value="calc1a">Cálculo I - Grupo A</SelectItem>
              <SelectItem value="calc1b">Cálculo I - Grupo B</SelectItem>
              <SelectItem value="algebra">Álgebra Lineal - Grupo C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {studentsByGroup.map((group, groupIndex) => (
            <Card key={groupIndex} className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">{group.groupName}</CardTitle>
                <p className="text-sm text-muted-foreground">{group.students.length} estudiantes</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {group.students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{student.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {student.code}
                          </Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{student.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>{student.phone}</span>
                          </div>
                        </div>
                      </div>

                      <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10">
                        {student.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
