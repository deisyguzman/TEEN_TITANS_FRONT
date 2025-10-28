import { DashboardLayout } from "@/components/dashboard-layout"
import { WeeklySchedule } from "@/components/weekly-schedule"
import { StatCard } from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import { Download, Calendar, Clock } from "lucide-react"

export default function ProfessorSchedulePage() {
  const scheduleBlocks = [
    {
      id: "1",
      day: 0, // Lunes
      startHour: 8,
      endHour: 10,
      subject: "Cálculo I",
      group: "A",
      room: "Aula 201",
    },
    {
      id: "2",
      day: 0, // Lunes
      startHour: 14,
      endHour: 16,
      subject: "Cálculo I",
      group: "B",
      room: "Aula 305",
    },
    {
      id: "3",
      day: 2, // Miércoles
      startHour: 8,
      endHour: 10,
      subject: "Cálculo I",
      group: "A",
      room: "Aula 201",
    },
    {
      id: "4",
      day: 2, // Miércoles
      startHour: 14,
      endHour: 16,
      subject: "Cálculo I",
      group: "B",
      room: "Aula 305",
    },
    {
      id: "5",
      day: 4, // Viernes
      startHour: 10,
      endHour: 12,
      subject: "Álgebra Lineal",
      group: "C",
      room: "Aula 102",
    },
  ]

  return (
    <DashboardLayout role="professor" userName="Profesor">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mi Horario</h1>
            <p className="text-muted-foreground mt-1">Visualiza tu horario de clases semanal</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Ver Calendario
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Clases Semanales"
            value="5"
            icon={<Calendar className="h-4 w-4" />}
            description="Sesiones programadas"
          />
          <StatCard
            title="Horas Totales"
            value="12"
            icon={<Clock className="h-4 w-4" />}
            description="Horas de clase"
          />
          <StatCard
            title="Estudiantes"
            value="94"
            icon={<Calendar className="h-4 w-4" />}
            description="En todos los grupos"
          />
        </div>

        <WeeklySchedule scheduleBlocks={scheduleBlocks} title="Mi Horario Semanal" />
      </div>
    </DashboardLayout>
  )
}
