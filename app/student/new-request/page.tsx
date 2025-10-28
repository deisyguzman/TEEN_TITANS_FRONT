"use client"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewRequestPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    currentSubject: "",
    currentGroup: "",
    targetSubject: "",
    targetGroup: "",
    reason: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    // Here you would typically send the data to an API
    router.push("/student/requests")
  }

  return (
    <DashboardLayout role="student" userName="Estudiante">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nueva Solicitud de Cambio</h1>
          <p className="text-muted-foreground mt-1">
            Complete el formulario para solicitar un cambio de materia o grupo
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información de la Solicitud</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currentSubject">Materia Actual</Label>
                    <Select
                      value={formData.currentSubject}
                      onValueChange={(value) => setFormData({ ...formData, currentSubject: value })}
                    >
                      <SelectTrigger id="currentSubject">
                        <SelectValue placeholder="Seleccione una materia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calculo1">Cálculo I</SelectItem>
                        <SelectItem value="fisica2">Física II</SelectItem>
                        <SelectItem value="programacion">Programación</SelectItem>
                        <SelectItem value="algebra">Álgebra Lineal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentGroup">Grupo Actual</Label>
                    <Select
                      value={formData.currentGroup}
                      onValueChange={(value) => setFormData({ ...formData, currentGroup: value })}
                    >
                      <SelectTrigger id="currentGroup">
                        <SelectValue placeholder="Seleccione un grupo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">Grupo A</SelectItem>
                        <SelectItem value="b">Grupo B</SelectItem>
                        <SelectItem value="c">Grupo C</SelectItem>
                        <SelectItem value="d">Grupo D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="targetSubject">Materia Destino</Label>
                    <Select
                      value={formData.targetSubject}
                      onValueChange={(value) => setFormData({ ...formData, targetSubject: value })}
                    >
                      <SelectTrigger id="targetSubject">
                        <SelectValue placeholder="Seleccione una materia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calculo1">Cálculo I</SelectItem>
                        <SelectItem value="fisica2">Física II</SelectItem>
                        <SelectItem value="programacion">Programación</SelectItem>
                        <SelectItem value="algebra">Álgebra Lineal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetGroup">Grupo Destino</Label>
                    <Select
                      value={formData.targetGroup}
                      onValueChange={(value) => setFormData({ ...formData, targetGroup: value })}
                    >
                      <SelectTrigger id="targetGroup">
                        <SelectValue placeholder="Seleccione un grupo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">Grupo A</SelectItem>
                        <SelectItem value="b">Grupo B</SelectItem>
                        <SelectItem value="c">Grupo C</SelectItem>
                        <SelectItem value="d">Grupo D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo / Observaciones</Label>
                  <Textarea
                    id="reason"
                    placeholder="Explique el motivo de su solicitud..."
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={5}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Proporcione una explicación clara y detallada de por qué necesita este cambio.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  Enviar Solicitud
                </Button>
                <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-info/5 border-info/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-sm mb-2">Información Importante</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Las solicitudes serán revisadas por la decanatura de su facultad</li>
              <li>El tiempo de respuesta promedio es de 2-3 días hábiles</li>
              <li>Los cambios están sujetos a disponibilidad de cupos</li>
              <li>El periodo de cambios cierra en 5 días</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
