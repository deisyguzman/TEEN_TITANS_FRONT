"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { WeeklySchedule } from "@/components/weekly-schedule"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, AlertTriangle, Calendar } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import apiService from "@/lib/api-service"

export default function StudentDashboard() {
  // Estados
  const [studentId, setStudentId] = useState<string>("")
  const [academicSummary, setAcademicSummary] = useState<any>(null)
  const [scheduleBlocks, setScheduleBlocks] = useState<any[]>([])
  const [academicAlerts, setAcademicAlerts] = useState<string[]>([])
  const [courseRecommendations, setCourseRecommendations] = useState<any[]>([])
  const [enrollmentDeadlines, setEnrollmentDeadlines] = useState<any>(null)
  const [recentRequests, setRecentRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hasErrors, setHasErrors] = useState(false)

  useEffect(() => {
    // Obtener el ID del estudiante del localStorage o del contexto de autenticación
    const storedStudentId = localStorage.getItem('userId') || '1' // ID por defecto para pruebas
    setStudentId(storedStudentId)
    
    if (storedStudentId) {
      fetchStudentData(storedStudentId)
    }
  }, [])

  const fetchStudentData = async (id: string) => {
    try {
      setLoading(true)
      setHasErrors(false)
      let errorCount = 0
      
      // Llamadas individuales con manejo de errores por endpoint
      try {
        const summaryRes = await apiService.get(`/api/student-portal/${id}/academic-summary`)
        setAcademicSummary(summaryRes)
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log('ℹ️ No hay datos de resumen académico disponibles')
        } else {
          errorCount++
          console.warn('⚠️ Error al cargar resumen académico:', error.message)
        }
        // Datos de fallback
        setAcademicSummary({
          studentId: id,
          studentName: "Estudiante",
          academicProgram: "Programa Académico",
          currentSemester: 1,
          cumulativeGPA: 0.0,
          completedCredits: 0,
          totalCreditsRequired: 180,
          progressPercentage: 0,
          coursesInProgress: 0,
          coursesCompleted: 0
        })
      }

      try {
        const scheduleRes = await apiService.get(`/api/student-portal/${id}/current-schedule`)
        const formattedSchedule = formatScheduleBlocks(scheduleRes || [])
        setScheduleBlocks(formattedSchedule)
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log('ℹ️ No hay horario disponible')
          setScheduleBlocks([])
        } else {
          errorCount++
          console.warn('⚠️ Error al cargar horario:', error.message)
          setScheduleBlocks([])
        }
      }

      try {
        const alertsRes = await apiService.get(`/api/student-portal/${id}/academic-alerts`)
        setAcademicAlerts(alertsRes?.alerts || [])
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log('ℹ️ No hay alertas académicas')
          setAcademicAlerts([])
        } else {
          errorCount++
          console.warn('⚠️ Error al cargar alertas:', error.message)
          setAcademicAlerts([])
        }
      }

      try {
        const recommendationsRes = await apiService.get(`/api/student-portal/${id}/course-recommendations`)
        setCourseRecommendations(recommendationsRes?.slice(0, 3) || [])
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log('ℹ️ No hay recomendaciones de cursos')
          setCourseRecommendations([])
        } else {
          errorCount++
          console.warn('⚠️ Error al cargar recomendaciones:', error.message)
          setCourseRecommendations([])
        }
      }

      try {
        const deadlinesRes = await apiService.get(`/api/student-portal/enrollment-deadlines`)
        setEnrollmentDeadlines(deadlinesRes)
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log('ℹ️ No hay fechas límite configuradas')
          setEnrollmentDeadlines(null)
        } else {
          errorCount++
          console.warn('⚠️ Error al cargar fechas límite:', error.message)
          setEnrollmentDeadlines(null)
        }
      }

      if (errorCount > 0) {
        setHasErrors(true)
        console.info(`ℹ️ ${errorCount} servicio(s) no disponible(s). Mostrando datos de prueba.`)
      }

    } catch (error) {
      console.error('Error general al cargar datos del estudiante:', error)
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
            startHour: parseInt(scheduleItem.startTime?.split(':')[0] || '8'),
            endHour: parseInt(scheduleItem.endTime?.split(':')[0] || '10'),
            subject: group.course?.name || 'Materia',
            group: group.section || 'A',
            room: scheduleItem.classroom || 'Por asignar',
          })
        })
      }
    })
    
    return blocks
  }

  const getDayIndex = (dayName: string): number => {
    const days: { [key: string]: number } = {
      'MONDAY': 0,
      'TUESDAY': 1,
      'WEDNESDAY': 2,
      'THURSDAY': 3,
      'FRIDAY': 4,
      'SATURDAY': 5,
      'SUNDAY': 6
    }
    return days[dayName?.toUpperCase()] || 0
  }

  if (loading) {
    return (
      <DashboardLayout role="student" userName="Cargando...">
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg">Cargando información...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="student" userName={academicSummary?.studentName || "Estudiante"}>
      <div className="space-y-6">
        {hasErrors && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm text-yellow-900">Algunos servicios no están disponibles</p>
              <p className="text-xs text-yellow-700 mt-1">
                Se están mostrando datos de ejemplo. Algunos endpoints del backend no están respondiendo.
              </p>
            </div>
          </div>
        )}
        
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mi Panel</h1>
          <p className="text-muted-foreground mt-1">Bienvenido a tu espacio académico</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Créditos Completados"
            value={academicSummary?.completedCredits?.toString() || "0"}
            icon={<CheckCircle className="h-4 w-4" />}
            description={`de ${academicSummary?.totalCreditsRequired || 0} totales`}
            variant="success"
          />
          <StatCard
            title="Promedio Acumulado"
            value={academicSummary?.cumulativeGPA?.toFixed(2) || "0.00"}
            icon={<AlertTriangle className="h-4 w-4" />}
            description="GPA actual"
            variant={academicSummary?.cumulativeGPA >= 3.5 ? "success" : "warning"}
          />
          <StatCard
            title="Semestre Actual"
            value={`${academicSummary?.currentSemester || 1}`}
            icon={<Calendar className="h-4 w-4" />}
            description={academicSummary?.academicProgram || "Programa"}
          />
          <StatCard
            title="Avance del Plan"
            value={`${academicSummary?.progressPercentage?.toFixed(0) || 0}%`}
            icon={<Clock className="h-4 w-4" />}
            description="Créditos completados"
            variant="default"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alertas Académicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {academicAlerts.length > 0 ? (
                    academicAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg border bg-warning/10 border-warning/20"
                      >
                        <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No tienes alertas académicas en este momento.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <WeeklySchedule scheduleBlocks={scheduleBlocks} title="Mi Horario Semanal" />

            <Card>
              <CardHeader>
                <CardTitle>Cursos Recomendados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courseRecommendations.length > 0 ? (
                    courseRecommendations.map((course) => (
                      <div
                        key={course.courseCode}
                        className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{course.courseCode}</span>
                            <Badge variant="secondary">{course.credits} créditos</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p><span className="font-medium">Nombre:</span> {course.name}</p>
                            {course.description && <p className="text-xs">{course.description}</p>}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No hay recomendaciones disponibles en este momento.</p>
                  )}
                </div>
                <Link href="/student/curriculum">
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Ver Plan de Estudios
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen Académico</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Materias en Curso</p>
                    <p className="text-2xl font-bold mt-1">{academicSummary?.coursesInProgress || 0}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Materias Aprobadas</p>
                    <p className="text-2xl font-bold mt-1">{academicSummary?.coursesCompleted || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fechas Importantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {enrollmentDeadlines ? (
                  <>
                    <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                      <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Periodo: {enrollmentDeadlines.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Inicio: {new Date(enrollmentDeadlines.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Fin: {new Date(enrollmentDeadlines.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">No hay fechas límite disponibles.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/student/new-request">
                  <Button className="w-full">Nueva Solicitud</Button>
                </Link>
                <Link href="/student/schedule">
                  <Button variant="outline" className="w-full bg-transparent">
                    Ver Horario Completo
                  </Button>
                </Link>
                <Link href="/student/curriculum">
                  <Button variant="outline" className="w-full bg-transparent">
                    Plan de Estudios
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
