import { DashboardLayout } from "@/components/dashboard-layout"
import { WeeklySchedule } from "@/components/weekly-schedule"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function DeanSchedulesPage() {
  const scheduleData = [
    { day: "Lunes", time: "08:00 - 10:00", course: "Cálculo I", room: "A-101", professor: "Dr. Juan Pérez" },
    { day: "Lunes", time: "10:00 - 12:00", course: "Física I", room: "B-205", professor: "Dra. María García" },
    {
      day: "Martes",
      time: "08:00 - 10:00",
      course: "Estructuras de Datos",
      room: "LAB-301",
      professor: "Dr. Carlos López",
    },
    { day: "Miércoles", time: "08:00 - 10:00", course: "Cálculo I", room: "A-101", professor: "Dr. Juan Pérez" },
    { day: "Jueves", time: "08:00 - 10:00", course: "Física I", room: "B-205", professor: "Dra. María García" },
    {
      day: "Viernes",
      time: "08:00 - 10:00",
      course: "Estructuras de Datos",
      room: "LAB-301",
      professor: "Dr. Carlos López",
    },
  ]

  return (
    <DashboardLayout role="dean">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Horarios de Facultad</h1>
            <p className="text-muted-foreground mt-1">Visualiza los horarios de tu facultad</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por profesor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los profesores</SelectItem>
              <SelectItem value="prof1">Dr. Juan Pérez</SelectItem>
              <SelectItem value="prof2">Dra. María García</SelectItem>
              <SelectItem value="prof3">Dr. Carlos López</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por semestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los semestres</SelectItem>
              <SelectItem value="1">Primer Semestre</SelectItem>
              <SelectItem value="2">Segundo Semestre</SelectItem>
              <SelectItem value="3">Tercer Semestre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <WeeklySchedule scheduleData={scheduleData} />
      </div>
    </DashboardLayout>
  )
}
