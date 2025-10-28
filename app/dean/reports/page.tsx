import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown } from "lucide-react"

export default function DeanReportsPage() {
  const globalStats = {
    totalRequests: 109,
    approved: 94,
    rejected: 15,
    approvalRate: 86,
    avgProcessingTime: 2.1,
  }

  const subjectStats = [
    { name: "Cálculo I", approved: 28, rejected: 4, total: 32, rate: 88, enrolled: 180, capacity: 200 },
    { name: "Física II", approved: 24, rejected: 3, total: 27, rate: 89, enrolled: 165, capacity: 180 },
    { name: "Programación", approved: 22, rejected: 5, total: 27, rate: 81, enrolled: 195, capacity: 200 },
    { name: "Álgebra Lineal", approved: 20, rejected: 3, total: 23, rate: 87, enrolled: 145, capacity: 180 },
    { name: "Base de Datos", approved: 15, rejected: 2, total: 17, rate: 88, enrolled: 120, capacity: 150 },
    { name: "Redes", approved: 12, rejected: 1, total: 13, rate: 92, enrolled: 85, capacity: 120 },
  ]

  const mostPopularSubjects = subjectStats
    .map((s) => ({ ...s, occupancy: (s.enrolled / s.capacity) * 100 }))
    .sort((a, b) => b.occupancy - a.occupancy)
    .slice(0, 5)

  const leastPopularSubjects = subjectStats
    .map((s) => ({ ...s, occupancy: (s.enrolled / s.capacity) * 100 }))
    .sort((a, b) => a.occupancy - b.occupancy)
    .slice(0, 5)

  return (
    <DashboardLayout role="dean" userName="Decano">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reportes de Facultad</h1>
            <p className="text-muted-foreground mt-1">Estadísticas y análisis de solicitudes</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar Reporte
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Select defaultValue="current">
                <SelectTrigger>
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Periodo Actual</SelectItem>
                  <SelectItem value="2024-1">2024-1</SelectItem>
                  <SelectItem value="2023-2">2023-2</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Reporte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="subject">Por Materia</SelectItem>
                  <SelectItem value="group">Por Grupo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Estadísticas Globales</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Solicitudes</p>
                  <p className="text-3xl font-bold">{globalStats.totalRequests}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-success">+8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Solicitudes Aprobadas</p>
                  <p className="text-3xl font-bold text-success">{globalStats.approved}</p>
                  <p className="text-sm text-muted-foreground">de {globalStats.totalRequests} totales</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Tasa de Aprobación</p>
                  <p className="text-3xl font-bold">{globalStats.approvalRate}%</p>
                  <div className="w-full bg-secondary rounded-full h-2 mt-2">
                    <div
                      className="bg-success h-2 rounded-full"
                      style={{ width: `${globalStats.approvalRate}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
                  <p className="text-3xl font-bold">{globalStats.avgProcessingTime}</p>
                  <p className="text-sm text-muted-foreground">días hábiles</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Solicitudes Aprobadas por Materia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectStats.map((subject) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{subject.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {subject.approved}/{subject.total}
                      </span>
                      <span className="text-sm font-bold text-success">{subject.rate}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: `${subject.rate}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Aprobadas: {subject.approved}</span>
                    <span>Rechazadas: {subject.rejected}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-destructive" />
                Materias Más Populares
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mostPopularSubjects.map((subject, index) => (
                  <div key={subject.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                        <span className="font-medium">{subject.name}</span>
                      </div>
                      <span className="text-sm font-bold text-destructive">{subject.occupancy.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${subject.occupancy >= 90 ? "bg-destructive" : subject.occupancy >= 75 ? "bg-warning" : "bg-success"}`}
                        style={{ width: `${subject.occupancy}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Inscritos: {subject.enrolled}</span>
                      <span>Capacidad: {subject.capacity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-primary" />
                Materias con Menor Ocupación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leastPopularSubjects.map((subject, index) => (
                  <div key={subject.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                        <span className="font-medium">{subject.name}</span>
                      </div>
                      <span className="text-sm font-bold text-primary">{subject.occupancy.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${subject.occupancy}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Inscritos: {subject.enrolled}</span>
                      <span>Disponibles: {subject.capacity - subject.enrolled}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
