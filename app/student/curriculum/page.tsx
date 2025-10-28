import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle, XCircle } from "lucide-react"

export default function StudentCurriculumPage() {
  const semesters = [
    {
      number: 1,
      subjects: [
        { name: "Cálculo I", credits: 4, status: "completed", code: "MAT101" },
        { name: "Física I", credits: 4, status: "completed", code: "FIS101" },
        { name: "Programación I", credits: 3, status: "completed", code: "PRG101" },
        { name: "Álgebra Lineal", credits: 3, status: "completed", code: "MAT102" },
      ],
    },
    {
      number: 2,
      subjects: [
        { name: "Cálculo II", credits: 4, status: "completed", code: "MAT201" },
        { name: "Física II", credits: 4, status: "current", code: "FIS201" },
        { name: "Programación II", credits: 3, status: "failing", code: "PRG201" },
        { name: "Estructuras de Datos", credits: 3, status: "current", code: "PRG202" },
      ],
    },
    {
      number: 3,
      subjects: [
        { name: "Cálculo III", credits: 4, status: "available", code: "MAT301" },
        { name: "Física III", credits: 4, status: "available", code: "FIS301" },
        { name: "Bases de Datos", credits: 3, status: "available", code: "PRG301" },
        { name: "Algoritmos", credits: 3, status: "available", code: "PRG302" },
      ],
    },
    {
      number: 4,
      subjects: [
        { name: "Ecuaciones Diferenciales", credits: 4, status: "available", code: "MAT401" },
        { name: "Electromagnetismo", credits: 4, status: "available", code: "FIS401" },
        { name: "Ingeniería de Software", credits: 3, status: "available", code: "PRG401" },
        { name: "Redes de Computadores", credits: 3, status: "available", code: "PRG402" },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 border-green-600" // Verde - aprobada
      case "current":
        return "bg-blue-500 border-blue-600" // Azul - cursando
      case "failing":
        return "bg-red-500 border-red-600" // Rojo - perdiendo
      case "available":
        return "bg-white border-gray-300" // Blanco - no vista
      default:
        return "bg-white border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-white" />
      case "current":
        return <Circle className="h-5 w-5 text-white fill-white" />
      case "failing":
        return <XCircle className="h-5 w-5 text-white" />
      case "available":
        return <Circle className="h-5 w-5 text-gray-400" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Aprobada"
      case "current":
        return "Cursando"
      case "failing":
        return "Perdiendo"
      case "available":
        return "No vista"
      default:
        return ""
    }
  }

  const totalCredits = 56
  const completedCredits = 38
  const progressPercentage = Math.round((completedCredits / totalCredits) * 100)

  return (
    <DashboardLayout role="student" userName="Estudiante">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Semáforo Académico</h1>
          <p className="text-muted-foreground mt-1">Visualiza tu avance académico por colores</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Progreso General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{progressPercentage}%</p>
                  <p className="text-sm text-muted-foreground">
                    {completedCredits} de {totalCredits} créditos completados
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Créditos restantes</p>
                  <p className="text-2xl font-bold">{totalCredits - completedCredits}</p>
                </div>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div className="bg-primary h-3 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {semesters.map((semester) => (
            <Card key={semester.number}>
              <CardHeader>
                <CardTitle>Semestre {semester.number}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  {semester.subjects.map((subject) => (
                    <div
                      key={subject.code}
                      className={`flex flex-col gap-2 p-4 border-2 rounded-lg transition-all hover:shadow-md ${getStatusColor(subject.status)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p
                            className={`font-semibold text-sm ${subject.status === "available" ? "text-gray-700" : "text-white"}`}
                          >
                            {subject.code}
                          </p>
                          <p
                            className={`text-xs mt-1 ${subject.status === "available" ? "text-gray-600" : "text-white/90"}`}
                          >
                            {subject.name}
                          </p>
                        </div>
                        {getStatusIcon(subject.status)}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span
                          className={`text-xs ${subject.status === "available" ? "text-gray-600" : "text-white/80"}`}
                        >
                          {subject.credits} créditos
                        </span>
                        <span
                          className={`text-xs font-medium ${subject.status === "available" ? "text-gray-700" : "text-white"}`}
                        >
                          {getStatusLabel(subject.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Leyenda del Semáforo</h3>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                  <span>Blanco - No vista</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 border-2 border-green-600 rounded"></div>
                  <span>Verde - Aprobada</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 border-2 border-blue-600 rounded"></div>
                  <span>Azul - Cursando</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 border-2 border-red-600 rounded"></div>
                  <span>Rojo - Perdiendo</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
