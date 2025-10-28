import { DashboardLayout } from "@/components/dashboard-layout"
import { WeeklySchedule } from "@/components/weekly-schedule"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download } from "lucide-react"

export default function SchedulesPage() {
  const dayMap: Record<string, number> = {
    "Lunes": 0,
    "Martes": 1,
    "Miércoles": 2,
    "Jueves": 3,
    "Viernes": 4,
    "Sábado": 5,
    "Domingo": 6
  }

  const parseTime = (timeStr: string) => {
    const [start] = timeStr.split(" - ")
    return parseInt(start.split(":")[0])
  }

  const parseEndTime = (timeStr: string) => {
    const [, end] = timeStr.split(" - ")
    return parseInt(end.split(":")[0])
  }

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
    { day: "Martes", time: "14:00 - 16:00", course: "Bases de Datos", room: "LAB-301", professor: "Dr. Pedro Sánchez" },
    { day: "Miércoles", time: "08:00 - 10:00", course: "Cálculo I", room: "A-101", professor: "Dr. Juan Pérez" },
    { day: "Miércoles", time: "10:00 - 12:00", course: "Filosofía", room: "A-203", professor: "Dra. Ana Martínez" },
    { day: "Jueves", time: "08:00 - 10:00", course: "Física I", room: "B-205", professor: "Dra. María García" },
    {
      day: "Viernes",
      time: "08:00 - 10:00",
      course: "Estructuras de Datos",
      room: "LAB-301",
      professor: "Dr. Carlos López",
    },
  ]

  const scheduleBlocks = scheduleData.map((item, index) => ({
    id: `schedule-${index}`,
    day: dayMap[item.day],
    startHour: parseTime(item.time),
    endHour: parseEndTime(item.time),
    subject: item.course,
    group: "A",
    room: item.room,
  }))

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Horarios</h1>
            <p className="text-muted-foreground mt-1">Visualiza y administra los horarios académicos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Crear Horario
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por facultad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las facultades</SelectItem>
              <SelectItem value="engineering">Ingeniería</SelectItem>
              <SelectItem value="sciences">Ciencias</SelectItem>
              <SelectItem value="humanities">Humanidades</SelectItem>
              <SelectItem value="business">Negocios</SelectItem>
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
              <SelectItem value="4">Cuarto Semestre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <WeeklySchedule scheduleBlocks={scheduleBlocks} />
      </div>
    </DashboardLayout>
  )
}
