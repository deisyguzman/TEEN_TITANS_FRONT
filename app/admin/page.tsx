import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, BookOpen, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <DashboardLayout role="administrator" userName="Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>
          <p className="text-muted-foreground mt-1">Vista general del sistema SIRHA</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Solicitudes Pendientes"
            value="24"
            icon={<Clock className="h-4 w-4" />}
            trend={{ value: 12, isPositive: false }}
            description="Requieren atención"
          />
          <StatCard
            title="Solicitudes Aprobadas"
            value="156"
            icon={<CheckCircle className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
            description="Este periodo"
          />
          <StatCard
            title="Solicitudes Rechazadas"
            value="32"
            icon={<XCircle className="h-4 w-4" />}
            trend={{ value: 3, isPositive: false }}
            description="Este periodo"
          />
          <StatCard
            title="Grupos en Alerta"
            value="8"
            icon={<AlertTriangle className="h-4 w-4" />}
            trend={{ value: 2, isPositive: false }}
            description="90% de cupo"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Alertas del Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Grupos con sobrecupo</p>
                  <p className="text-sm text-muted-foreground">8 grupos han alcanzado el 90% de capacidad</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                <Clock className="h-5 w-5 text-warning mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Cierre de periodo</p>
                  <p className="text-sm text-muted-foreground">El periodo de cambios cierra en 5 días</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-info/10 rounded-lg border border-info/20">
                <Users className="h-5 w-5 text-info mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Casos excepcionales</p>
                  <p className="text-sm text-muted-foreground">3 solicitudes requieren revisión especial</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accesos Rápidos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/students">
                <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
                  <Users className="h-4 w-4 mr-2" />
                  Gestionar Estudiantes
                </Button>
              </Link>
              <Link href="/admin/professors">
                <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Gestionar Profesores
                </Button>
              </Link>
              <Link href="/admin/courses">
                <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Materias y Grupos
                </Button>
              </Link>
              <Link href="/admin/requests">
                <Button className="w-full justify-start" size="lg">
                  Ver Todas las Solicitudes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas Globales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tasa de Aprobación</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">83%</p>
                  <span className="text-sm text-success">+5%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: "83%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tasa de Rechazo</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">17%</p>
                  <span className="text-sm text-destructive">-2%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-destructive h-2 rounded-full" style={{ width: "17%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">2.3</p>
                  <span className="text-sm text-muted-foreground">días</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
