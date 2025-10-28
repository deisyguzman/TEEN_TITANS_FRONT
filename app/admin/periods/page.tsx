"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar, Pencil, Plus, AlertCircle, Trash2, Power } from "lucide-react"
import { useState, useEffect } from "react"
import apiService from "@/lib/api-service"

interface AcademicPeriod {
  periodId?: string
  name: string
  startDate: string
  endDate: string
  enrollmentStart?: string
  enrollmentEnd?: string
  adjustmentPeriodStart?: string
  adjustmentPeriodEnd?: string
  isActive?: boolean
}

export default function PeriodsPage() {
  const [periods, setPeriods] = useState<AcademicPeriod[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<AcademicPeriod | null>(null)
  
  // Estado del formulario de creación
  const [newPeriod, setNewPeriod] = useState<AcademicPeriod>({
    periodId: "",
    name: "",
    startDate: "",
    endDate: "",
    enrollmentStart: "",
    enrollmentEnd: "",
    adjustmentPeriodStart: "",
    adjustmentPeriodEnd: "",
    isActive: true
  })

  // Estado del formulario de edición
  const [editPeriod, setEditPeriod] = useState<AcademicPeriod>({
    periodId: "",
    name: "",
    startDate: "",
    endDate: "",
    enrollmentStart: "",
    enrollmentEnd: "",
    adjustmentPeriodStart: "",
    adjustmentPeriodEnd: "",
    isActive: true
  })

  // Cargar períodos
  useEffect(() => {
    fetchPeriods()
  }, [])

  const fetchPeriods = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await apiService.get("/api/general-management/academic-periods")
      setPeriods(response || [])
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log("ℹ️ No hay períodos académicos registrados")
        setPeriods([])
        setError("No hay períodos académicos registrados. Crea el primer período.")
      } else {
        console.error("❌ Error al cargar períodos académicos:", error)
        setError("Error al cargar los períodos académicos. Por favor, intenta nuevamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Crear período
  const handleCreatePeriod = async () => {
    try {
      // Validar que TODOS los campos estén completos (todos son obligatorios)
      if (!newPeriod.periodId || !newPeriod.name || !newPeriod.startDate || !newPeriod.endDate || 
          !newPeriod.enrollmentStart || !newPeriod.enrollmentEnd ||
          !newPeriod.adjustmentPeriodStart || !newPeriod.adjustmentPeriodEnd) {
        alert("Por favor, completa todos los campos requeridos.")
        return
      }

      // Preparar el objeto con el formato correcto para el backend
      // NO usar formatDateForBackend - enviar fechas como están (YYYY-MM-DD)
      const formatDateForBackend = (dateStr: string) => {
        // Opción 2: Solo fecha (LocalDate) - PROBANDO ESTA OPCIÓN
        return dateStr
        
        // Opción 1: Con hora (LocalDateTime) - Si necesita hora, descomentar:
        // return `${dateStr}T00:00:00`
        
        // Opción 3: Formato ISO completo con zona horaria:
        // return `${dateStr}T00:00:00.000Z`
      }

      // Incluir periodId en la creación - es obligatorio
      const periodData = {
        periodId: newPeriod.periodId?.trim(),
        name: newPeriod.name.trim(),
        startDate: newPeriod.startDate,  // Formato: YYYY-MM-DD
        endDate: newPeriod.endDate,
        enrollmentStart: newPeriod.enrollmentStart,
        enrollmentEnd: newPeriod.enrollmentEnd,
        adjustmentPeriodStart: newPeriod.adjustmentPeriodStart,
        adjustmentPeriodEnd: newPeriod.adjustmentPeriodEnd,
        isActive: true
      }
      
      console.log("📅 Enviando período académico:", periodData)
      console.log("📅 JSON stringificado:", JSON.stringify(periodData, null, 2))
      console.log("📅 Tipo de datos:", {
        name: typeof periodData.name,
        startDate: typeof periodData.startDate,
        endDate: typeof periodData.endDate,
        enrollmentStart: typeof periodData.enrollmentStart,
        enrollmentEnd: typeof periodData.enrollmentEnd,
        adjustmentPeriodStart: typeof periodData.adjustmentPeriodStart,
        adjustmentPeriodEnd: typeof periodData.adjustmentPeriodEnd,
        isActive: typeof periodData.isActive
      })
      
      const response = await apiService.post("/api/general-management/academic-periods", periodData)
      
      console.log("✅ Período creado exitosamente:", response)
      
      // Cerrar diálogo y resetear formulario
      setIsCreateDialogOpen(false)
      setNewPeriod({
        periodId: "",
        name: "",
        startDate: "",
        endDate: "",
        enrollmentStart: "",
        enrollmentEnd: "",
        adjustmentPeriodStart: "",
        adjustmentPeriodEnd: "",
        isActive: true
      })
      
      // Recargar la lista
      fetchPeriods()
    } catch (error: any) {
      console.error("❌ Error al crear período académico:", error)
      
      // Si no hay response, es un error de red o CORS
      if (!error.response) {
        console.error("📋 Error de red o CORS:", {
          message: error.message,
          code: error.code,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            baseURL: error.config?.baseURL
          }
        })
        
        alert(
          `Error de conexión al crear el período académico.\n\n` +
          `Detalles: ${error.message}\n\n` +
          `Verifica que:\n` +
          `1. El backend esté ejecutándose en http://localhost:8080\n` +
          `2. No haya problemas de CORS\n` +
          `3. La URL del endpoint sea correcta`
        )
        return
      }
      
      console.error("📋 Detalles del error:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      })
      
      // Intentar extraer el mensaje de error de diferentes formatos posibles
      let errorMessage = "Por favor, verifica los datos e intenta nuevamente."
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error
        } else if (error.response.data.errors) {
          // Si hay múltiples errores de validación
          errorMessage = JSON.stringify(error.response.data.errors, null, 2)
        } else {
          errorMessage = JSON.stringify(error.response.data, null, 2)
        }
      }
      
      alert(`Error al crear el período académico:\n\n${errorMessage}`)
    }
  }

  // Abrir diálogo de edición
  const openEditDialog = (period: AcademicPeriod) => {
    // Convertir fechas del backend (ISO) a formato del input date (YYYY-MM-DD)
    const formatDateForInput = (dateStr: string) => {
      if (!dateStr) return ""
      // Si tiene formato ISO (con T), extraer solo la fecha
      if (dateStr.includes('T')) {
        return dateStr.split('T')[0]
      }
      return dateStr
    }

    setEditPeriod({
      name: period.name,
      startDate: formatDateForInput(period.startDate),
      endDate: formatDateForInput(period.endDate),
      enrollmentStart: formatDateForInput(period.enrollmentStart),
      enrollmentEnd: formatDateForInput(period.enrollmentEnd),
      isActive: period.isActive ?? true
    })
    setSelectedPeriod(period)
    setIsEditDialogOpen(true)
  }

  // Actualizar período
  const handleUpdatePeriod = async () => {
    if (!selectedPeriod?.periodId) return

    try {
      // Validar que TODOS los campos estén completos (todos son obligatorios)
      if (!editPeriod.name || !editPeriod.startDate || !editPeriod.endDate || 
          !editPeriod.enrollmentStart || !editPeriod.enrollmentEnd ||
          !editPeriod.adjustmentPeriodStart || !editPeriod.adjustmentPeriodEnd) {
        alert("Por favor, completa todos los campos requeridos.")
        return
      }

      // Convertir fechas a formato ISO con hora
      const formatDateForBackend = (dateStr: string) => {
        // Si ya tiene formato ISO, no modificar
        if (dateStr.includes('T')) return dateStr
        return `${dateStr}T00:00:00`
      }

      const periodData = {
        name: editPeriod.name.trim(),
        startDate: formatDateForBackend(editPeriod.startDate),
        endDate: formatDateForBackend(editPeriod.endDate),
        enrollmentStart: formatDateForBackend(editPeriod.enrollmentStart),
        enrollmentEnd: formatDateForBackend(editPeriod.enrollmentEnd),
        isActive: editPeriod.isActive ?? true
      }
      
      console.log("📝 Actualizando período académico:", periodData)
      
  const response = await apiService.put(`/api/general-management/academic-periods/${selectedPeriod.periodId}`, periodData)
      
      console.log("✅ Período actualizado exitosamente:", response)
      
      // Cerrar diálogo
      setIsEditDialogOpen(false)
      setSelectedPeriod(null)
      
      // Recargar la lista
      fetchPeriods()
    } catch (error: any) {
      console.error("❌ Error al actualizar período académico:", error)
      console.error("📋 Detalles del error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      })
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          JSON.stringify(error.response?.data) ||
                          "Por favor, verifica los datos e intenta nuevamente."
      
      alert(`Error al actualizar el período académico:\n\n${errorMessage}`)
    }
  }

  // Abrir diálogo de confirmación de eliminación
  const openDeleteDialog = (period: AcademicPeriod) => {
    setSelectedPeriod(period)
    setIsDeleteDialogOpen(true)
  }

  // Eliminar período
  const handleDeletePeriod = async () => {
    if (!selectedPeriod?.periodId) return

    try {
  console.log("🗑️ Eliminando período académico ID:", selectedPeriod.periodId)
      
  await apiService.delete(`/api/general-management/academic-periods/${selectedPeriod.periodId}`)
      
      // Cerrar diálogo
      setIsDeleteDialogOpen(false)
      setSelectedPeriod(null)
      
      // Recargar la lista
      fetchPeriods()
    } catch (error: any) {
      console.error("❌ Error al eliminar período académico:", error)
      console.error("Detalles del error:", error.response?.data)
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data || 
                          "Es posible que tenga dependencias."
      
      alert(`Error al eliminar el período académico:\n${errorMessage}`)
    }
  }

  // Activar período
  const handleActivatePeriod = async (period: AcademicPeriod) => {
    if (!period.periodId) return

    try {
      console.log("⚡ Activando período académico ID:", period.periodId)
      
      await apiService.put(`/api/general-management/academic-periods/${period.periodId}/activate`, {})
      
      // Recargar la lista
      fetchPeriods()
    } catch (error: any) {
      console.error("❌ Error al activar período académico:", error)
      console.error("Detalles del error:", error.response?.data)
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data || 
                          "Intenta nuevamente."
      
      alert(`Error al activar el período académico:\n${errorMessage}`)
    }
  }

  // Determinar el estado de un período
  const getPeriodStatus = (period: AcademicPeriod): string => {
  if (period.isActive === false) return "Inactivo"
    
    const now = new Date()
    const startDate = new Date(period.startDate)
    const endDate = new Date(period.endDate)
    
    if (now < startDate) return "Próximo"
    if (now > endDate) return "Finalizado"
    return "Activo"
  }

  // Formatear fecha para mostrar (de ISO a formato legible)
  const formatDateForDisplay = (dateStr: string): string => {
    if (!dateStr) return ""
    // Si tiene formato ISO (con T), extraer solo la fecha
    if (dateStr.includes('T')) {
      return dateStr.split('T')[0]
    }
    return dateStr
  }

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Periodos</h1>
            <p className="text-muted-foreground mt-1">Administra los periodos académicos</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Periodo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Periodo</DialogTitle>
                <DialogDescription>Ingresa los datos del nuevo periodo académico</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="periodId">ID del Periodo *</Label>
                  <Input 
                    id="periodId" 
                    placeholder="Ej: 2025-2"
                    value={newPeriod.periodId ?? ""}
                    onChange={(e) => setNewPeriod({ ...newPeriod, periodId: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre del Periodo *</Label>
                  <Input 
                    id="name" 
                    placeholder="Ej: Periodo 2025-2"
                    value={newPeriod.name ?? ""}
                    onChange={(e) => setNewPeriod({ ...newPeriod, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Fecha de Inicio *</Label>
                    <Input 
                      id="startDate" 
                      type="date"
                      value={newPeriod.startDate ?? ""}
                      onChange={(e) => setNewPeriod({ ...newPeriod, startDate: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">Fecha de Fin *</Label>
                    <Input 
                      id="endDate" 
                      type="date"
                      value={newPeriod.endDate ?? ""}
                      onChange={(e) => setNewPeriod({ ...newPeriod, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="enrollmentStart">Inicio Solicitudes *</Label>
                    <Input 
                      id="enrollmentStart" 
                      type="date"
                      value={newPeriod.enrollmentStart ?? ""}
                      onChange={(e) => setNewPeriod({ ...newPeriod, enrollmentStart: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="enrollmentEnd">Fin Solicitudes *</Label>
                    <Input 
                      id="enrollmentEnd" 
                      type="date"
                      value={newPeriod.enrollmentEnd ?? ""}
                      onChange={(e) => setNewPeriod({ ...newPeriod, enrollmentEnd: e.target.value })}
                    />
                  </div>
                </div>

                {/* Período de Ajuste */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">Período de Ajuste</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="adjustmentPeriodStart">Inicio Ajuste *</Label>
                      <Input 
                        id="adjustmentPeriodStart" 
                        type="date"
                        value={newPeriod.adjustmentPeriodStart ?? ""}
                        onChange={(e) => setNewPeriod({ ...newPeriod, adjustmentPeriodStart: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="adjustmentPeriodEnd">Fin Ajuste *</Label>
                      <Input 
                        id="adjustmentPeriodEnd" 
                        type="date"
                        value={newPeriod.adjustmentPeriodEnd ?? ""}
                        onChange={(e) => setNewPeriod({ ...newPeriod, adjustmentPeriodEnd: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleCreatePeriod}
                  disabled={!newPeriod.periodId || !newPeriod.name || !newPeriod.startDate || !newPeriod.endDate || 
                           !newPeriod.enrollmentStart || !newPeriod.enrollmentEnd ||
                           !newPeriod.adjustmentPeriodStart || !newPeriod.adjustmentPeriodEnd}
                >
                  Crear Periodo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Banner de error */}
        {error && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="flex items-start gap-3 pt-6">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900">Servicio no disponible</h3>
                <p className="text-sm text-orange-700 mt-1">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Estado de carga */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando períodos académicos...</p>
          </div>
        )}

        {/* Lista de períodos */}
        {!isLoading && !error && periods.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No hay períodos académicos registrados</p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {!isLoading && periods.map((period) => {
            const status = getPeriodStatus(period)
            return (
              <Card key={period.periodId}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold">{period.name}</CardTitle>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        status === "Activo" 
                          ? "bg-green-100 text-green-800" 
                          : status === "Próximo"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {/* Botón de Activar (solo si está inactivo) */}
                    {period.isActive === false && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleActivatePeriod(period)}
                        title="Activar período"
                      >
                        <Power className="h-4 w-4 text-green-600" />
                      </Button>
                    )}
                    {/* Botón de Editar */}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => openEditDialog(period)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {/* Botón de Eliminar */}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => openDeleteDialog(period)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Periodo Académico</span>
                      </div>
                      <p className="text-sm font-medium">
                        {formatDateForDisplay(period.startDate)} - {formatDateForDisplay(period.endDate)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Ventana de Solicitudes</span>
                      </div>
                      <p className="text-sm font-medium">
                        {formatDateForDisplay(period.enrollmentStart)} - {formatDateForDisplay(period.enrollmentEnd)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Diálogo de Editar */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Periodo</DialogTitle>
              <DialogDescription>Actualiza los datos del periodo académico</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                <Label htmlFor="edit-name">Nombre del Periodo *</Label>
                <Input 
                  id="edit-name" 
                  value={editPeriod.name ?? ""}
                  onChange={(e) => setEditPeriod({ ...editPeriod, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-startDate">Fecha de Inicio *</Label>
                  <Input 
                    id="edit-startDate" 
                    type="date" 
                    value={editPeriod.startDate ?? ""}
                    onChange={(e) => setEditPeriod({ ...editPeriod, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-endDate">Fecha de Fin *</Label>
                  <Input 
                    id="edit-endDate" 
                    type="date" 
                    value={editPeriod.endDate ?? ""}
                    onChange={(e) => setEditPeriod({ ...editPeriod, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-enrollmentStart">Inicio Solicitudes *</Label>
                  <Input 
                    id="edit-enrollmentStart" 
                    type="date" 
                    value={editPeriod.enrollmentStart ?? ""}
                    onChange={(e) => setEditPeriod({ ...editPeriod, enrollmentStart: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-enrollmentEnd">Fin Solicitudes *</Label>
                  <Input 
                    id="edit-enrollmentEnd" 
                    type="date" 
                    value={editPeriod.enrollmentEnd ?? ""}
                    onChange={(e) => setEditPeriod({ ...editPeriod, enrollmentEnd: e.target.value })}
                  />
                </div>
              </div>
              
              {/* Período de Ajuste */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">Período de Ajuste</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-adjustmentPeriodStart">Inicio Ajuste *</Label>
                    <Input 
                      id="edit-adjustmentPeriodStart" 
                      type="date" 
                      value={editPeriod.adjustmentPeriodStart ?? ""}
                      onChange={(e) => setEditPeriod({ ...editPeriod, adjustmentPeriodStart: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-adjustmentPeriodEnd">Fin Ajuste *</Label>
                    <Input 
                      id="edit-adjustmentPeriodEnd" 
                      type="date" 
                      value={editPeriod.adjustmentPeriodEnd ?? ""}
                      onChange={(e) => setEditPeriod({ ...editPeriod, adjustmentPeriodEnd: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="edit-active"
                  checked={!!editPeriod.isActive}
                  onChange={(e) => setEditPeriod({ ...editPeriod, isActive: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="edit-active" className="cursor-pointer">Activo</Label>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90"
                onClick={handleUpdatePeriod}
                disabled={!editPeriod.name || !editPeriod.startDate || !editPeriod.endDate || 
                         !editPeriod.enrollmentStart || !editPeriod.enrollmentEnd ||
                         !editPeriod.adjustmentPeriodStart || !editPeriod.adjustmentPeriodEnd}
              >
                Guardar Cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo de Confirmación de Eliminación */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar este período académico? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            {selectedPeriod && (
              <div className="py-4">
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="pt-6 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="font-semibold text-red-900">Nombre:</span>
                      <span className="text-red-800">{selectedPeriod.name}</span>
                      
                      <span className="font-semibold text-red-900">Período:</span>
                      <span className="text-red-800">
                        {formatDateForDisplay(selectedPeriod.startDate)} - {formatDateForDisplay(selectedPeriod.endDate)}
                      </span>
                      
                      <span className="font-semibold text-red-900">Solicitudes:</span>
                      <span className="text-red-800">
                        {formatDateForDisplay(selectedPeriod.enrollmentStart)} - {formatDateForDisplay(selectedPeriod.enrollmentEnd)}
                      </span>
                      
                      <span className="font-semibold text-red-900">Estado:</span>
                      <span className="text-red-800">{getPeriodStatus(selectedPeriod)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeletePeriod}
                className="text-white"
              >
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
