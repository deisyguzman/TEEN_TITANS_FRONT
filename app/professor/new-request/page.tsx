import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProfessorNewRequestPage() {
  return (
    <DashboardLayout role="professor">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/professor/requests">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Nueva Solicitud</h1>
            <p className="text-muted-foreground mt-1">Solicita un cambio de horario</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información de la Solicitud</CardTitle>
            <CardDescription>Completa el formulario para solicitar un cambio de horario</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="currentCourse">Materia Actual</Label>
                  <Select>
                    <SelectTrigger id="currentCourse">
                      <SelectValue placeholder="Selecciona tu materia actual" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calc1a">Cálculo I - Sección A (Lun/Mié 08:00-10:00)</SelectItem>
                      <SelectItem value="calc1b">Cálculo I - Sección B (Lun/Mié 14:00-16:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="requestedCourse">Materia Solicitada</Label>
                  <Select>
                    <SelectTrigger id="requestedCourse">
                      <SelectValue placeholder="Selecciona la materia deseada" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calc1b">Cálculo I - Sección B (Lun/Mié 14:00-16:00)</SelectItem>
                      <SelectItem value="calc1c">Cálculo I - Sección C (Mar/Jue 10:00-12:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Selecciona la prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Alta - Conflicto de horario</SelectItem>
                      <SelectItem value="medium">Media - Preferencia personal</SelectItem>
                      <SelectItem value="low">Baja - Optimización de horario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="reason">Razón de la Solicitud</Label>
                  <Textarea id="reason" placeholder="Explica detalladamente la razón de tu solicitud..." rows={4} />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Link href="/professor/requests">
                  <Button variant="outline">Cancelar</Button>
                </Link>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Enviar Solicitud
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
