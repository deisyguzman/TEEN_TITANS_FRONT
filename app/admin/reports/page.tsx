"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

export default function AdminReportsPage() {
  const subjectCapacityStats = [
    { name: "Cálculo I", groups: 3, totalCapacity: 90, enrolled: 88, available: 2, requests: 45 },
    { name: "Física II", groups: 2, totalCapacity: 50, enrolled: 50, available: 0, requests: 32 },
    { name: "Programación", groups: 4, totalCapacity: 120, enrolled: 95, available: 25, requests: 28 },
    { name: "Álgebra Lineal", groups: 2, totalCapacity: 60, enrolled: 35, available: 25, requests: 22 },
    { name: "Bases de Datos", groups: 2, totalCapacity: 50, enrolled: 48, available: 2, requests: 18 },
  ]

  const subjectApprovalStats = [
    { name: "Cálculo I", approved: 38, rejected: 7, total: 45, rate: 84 },
    { name: "Física II", approved: 28, rejected: 4, total: 32, rate: 88 },
    { name: "Programación", approved: 24, rejected: 4, total: 28, rate: 86 },
    { name: "Álgebra Lineal", approved: 18, rejected: 4, total: 22, rate: 82 },
    { name: "Bases de Datos", approved: 15, rejected: 3, total: 18, rate: 83 },
  ]

  const mostPopular = [...subjectCapacityStats].sort((a, b) => {
    const aOccupancy = (a.enrolled / a.totalCapacity) * 100
    const bOccupancy = (b.enrolled / b.totalCapacity) * 100
    return bOccupancy - aOccupancy
  })

  const emptiest = [...subjectCapacityStats].sort((a, b) => {
    const aOccupancy = (a.enrolled / a.totalCapacity) * 100
    const bOccupancy = (b.enrolled / b.totalCapacity) * 100
    return aOccupancy - bOccupancy
  })

  return (
    <DashboardLayout role="administrator" userName="Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reportes y Estadísticas</h1>
            <p className="text-muted-foreground mt-1">Análisis global del sistema</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar Reporte
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Filtros de Reporte</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Select defaultValue="current">
                <SelectTrigger>
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Periodo Actual</SelectItem>
                  <SelectItem value="2024-1">2024-1</SelectItem>
                  <SelectItem value="2023-2">2023-2</SelectItem>
                  <SelectItem value="2023-1">2023-1</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Facultad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las Facultades</SelectItem>
                  <SelectItem value="engineering">Ingeniería</SelectItem>
                  <SelectItem value="sciences">Ciencias</SelectItem>
                  <SelectItem value="humanities">Humanidades</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Reporte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="approvals">Aprobaciones</SelectItem>
                  <SelectItem value="capacity">Capacidad</SelectItem>
                  <SelectItem value="popularity">Popularidad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumen de Aprobaciones Globales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total de Solicitudes</p>
                <p className="text-3xl font-bold">295</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-success">+12%</span>
                  <span className="text-muted-foreground">vs periodo anterior</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Solicitudes Aprobadas</p>
                <p className="text-3xl font-bold">240</p>
                <div className="w-full bg-secondary rounded-full h-2 mt-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: "81%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Solicitudes Rechazadas</p>
                <p className="text-3xl font-bold">31</p>
                <div className="w-full bg-secondary rounded-full h-2 mt-2">
                  <div className="bg-destructive h-2 rounded-full" style={{ width: "11%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tasa de Aprobación</p>
                <p className="text-3xl font-bold">81%</p>
                <p className="text-sm text-success">Excelente desempeño</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aprobaciones por Materia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectApprovalStats.map((subject) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{subject.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {subject.approved}/{subject.total}
                      </span>
                      <span className="text-sm font-bold">{subject.rate}%</span>
                      {subject.rate >= 85 ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-warning" />
                      )}
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
              <CardTitle>Materias Más Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mostPopular.slice(0, 5).map((subject, index) => {
                  const occupancy = Math.round((subject.enrolled / subject.totalCapacity) * 100)
                  return (
                    <div key={subject.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                            {index + 1}
                          </span>
                          <span className="font-medium text-sm">{subject.name}</span>
                        </div>
                        <span className="text-sm font-bold">{occupancy}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${occupancy >= 90 ? "bg-destructive" : "bg-primary"}`}
                          style={{ width: `${occupancy}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {subject.enrolled}/{subject.totalCapacity} inscritos
                        </span>
                        <span>{subject.requests} solicitudes</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Materias con Menor Ocupación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emptiest.slice(0, 5).map((subject, index) => {
                  const occupancy = Math.round((subject.enrolled / subject.totalCapacity) * 100)
                  return (
                    <div key={subject.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-warning/10 text-warning text-xs font-bold">
                            {index + 1}
                          </span>
                          <span className="font-medium text-sm">{subject.name}</span>
                        </div>
                        <span className="text-sm font-bold">{occupancy}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full" style={{ width: `${occupancy}%` }}></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {subject.enrolled}/{subject.totalCapacity} inscritos
                        </span>
                        <span className="text-success">{subject.available} cupos disponibles</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Materias Sin Cupos Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subjectCapacityStats
                .filter((subject) => subject.available === 0)
                .map((subject) => (
                  <div
                    key={subject.name}
                    className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{subject.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {subject.groups} grupos • {subject.enrolled}/{subject.totalCapacity} inscritos
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-destructive">100% Ocupado</p>
                      <p className="text-xs text-muted-foreground">{subject.requests} solicitudes pendientes</p>
                    </div>
                  </div>
                ))}
              {subjectCapacityStats.filter((subject) => subject.available === 0).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No hay materias sin cupos disponibles</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
