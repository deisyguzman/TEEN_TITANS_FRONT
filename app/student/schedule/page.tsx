"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { WeeklySchedule } from "@/components/weekly-schedule"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Calendar, Clock, BookOpen, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import apiService from "@/lib/api-service"

export default function StudentSchedulePage() {
  const [studentId, setStudentId] = useState<string>("")
  const [scheduleBlocks, setScheduleBlocks] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [totalCredits, setTotalCredits] = useState(0)
  const [totalHours, setTotalHours] = useState(0)

  useEffect(() => {
    const storedStudentId = localStorage.getItem('userId') || '1'
    setStudentId(storedStudentId)
    
    if (storedStudentId) {
      fetchScheduleData(storedStudentId)
    }
  }, [])

  const fetchScheduleData = async (id: string) => {
    try {
      setLoading(true)
      setHasError(false)

      // Obtener el horario actual del estudiante
      const scheduleRes = await apiService.get(`/api/student-portal/${id}/current-schedule`)
      
      // Guardar los cursos
      setCourses(scheduleRes || [])
      
      // Convertir a formato de bloques para el componente WeeklySchedule
      const formattedSchedule = formatScheduleBlocks(scheduleRes)
      setScheduleBlocks(formattedSchedule)
      
      // Calcular estadísticas
      calculateStatistics(scheduleRes)

    } catch (error) {
      console.warn('⚠️ Endpoint no disponible: /api/student-portal/${id}/current-schedule')
      setHasError(true)
      // Datos de fallback
      setScheduleBlocks([])
      setCourses([])
      setTotalCredits(0)
      setTotalHours(0)
    } finally {
      setLoading(false)
    }
  }

  const formatScheduleBlocks = (groups: any[]) => {
    const blocks: any[] = []
    
    groups.forEach((group) => {
      if (group.schedule && group.schedule.length > 0) {
        group.schedule.forEach((scheduleItem: any, index: number) => {
          blocks.push({
            id: `${group.groupId}-${index}`,
            day: getDayIndex(scheduleItem.dayOfWeek),
            startHour: parseInt(scheduleItem.startTime?.split(':')[0] || scheduleItem.startHour || '8'),
            endHour: parseInt(scheduleItem.endTime?.split(':')[0] || scheduleItem.endHour || '10'),
            subject: group.course?.name || group.courseName || 'Materia',
            group: group.section || group.groupCode || 'A',
            room: scheduleItem.classroom || scheduleItem.room || 'Por asignar',
          })
        })
      }
    })
    
    return blocks
  }

  const getDayIndex = (dayName: string): number => {
    const days: { [key: string]: number } = {
      'MONDAY': 0, 'LUNES': 0,
      'TUESDAY': 1, 'MARTES': 1,
      'WEDNESDAY': 2, 'MIERCOLES': 2, 'MIÉRCOLES': 2,
      'THURSDAY': 3, 'JUEVES': 3,
      'FRIDAY': 4, 'VIERNES': 4,
      'SATURDAY': 5, 'SABADO': 5, 'SÁBADO': 5,
      'SUNDAY': 6, 'DOMINGO': 6
    }
    return days[dayName?.toUpperCase()] || 0
  }

  const calculateStatistics = (groups: any[]) => {
    let credits = 0
    let hours = 0

    groups.forEach((group) => {
      // Sumar créditos del curso
      if (group.course?.credits) {
        credits += group.course.credits
      }

      // Calcular horas semanales
      if (group.schedule && group.schedule.length > 0) {
        group.schedule.forEach((scheduleItem: any) => {
          const start = parseInt(scheduleItem.startTime?.split(':')[0] || scheduleItem.startHour || '8')
          const end = parseInt(scheduleItem.endTime?.split(':')[0] || scheduleItem.endHour || '10')
          hours += (end - start)
        })
      }
    })

    setTotalCredits(credits)
    setTotalHours(hours)
  }

  const handleExport = () => {
    // Crear CSV del horario
    let csv = "Día,Hora Inicio,Hora Fin,Materia,Grupo,Salón\n"
    
    scheduleBlocks.forEach(block => {
      const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
      csv += `${days[block.day]},${block.startHour}:00,${block.endHour}:00,${block.subject},${block.group},${block.room}\n`
    })

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `horario_${studentId}.csv`
    a.click()
  }

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg">Cargando horario...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {hasError && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm text-yellow-900">Servicio no disponible</p>
              <p className="text-xs text-yellow-700 mt-1">
                No se pudo cargar el horario. El endpoint del backend no está respondiendo.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mi Horario</h1>
            <p className="text-muted-foreground mt-1">Visualiza tu horario de clases semanal</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} disabled={scheduleBlocks.length === 0}>
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Materias Inscritas</p>
                  <p className="text-2xl font-bold text-foreground">{courses.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Créditos Totales</p>
                  <p className="text-2xl font-bold text-foreground">{totalCredits}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Horas Semanales</p>
                  <p className="text-2xl font-bold text-foreground">{totalHours}</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <WeeklySchedule scheduleBlocks={scheduleBlocks} title="Mi Horario Semanal" />

        {scheduleBlocks.length === 0 && !loading && (
          <Card>
            <CardHeader>
              <CardTitle>No hay clases programadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Aún no tienes materias inscritas para este período académico.
              </p>
            </CardContent>
          </Card>
        )}

        {courses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Detalles de Materias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="flex items-start justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-semibold">{course.course?.name || course.courseName || 'Materia'}</p>
                      <p className="text-sm text-muted-foreground">
                        Grupo: {course.section || course.groupCode || 'N/A'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Profesor: {course.professor?.name || 'Por asignar'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Créditos: {course.course?.credits || 0}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Código</p>
                      <p className="font-medium">{course.course?.courseCode || course.courseCode || 'N/A'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
