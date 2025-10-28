"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Pencil, Trash2, Search } from "lucide-react"
import { useState, useEffect } from "react"
import apiService from "@/lib/api-service"

export default function ProfessorsPage() {
  const [professors, setProfessors] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [editingProfessor, setEditingProfessor] = useState<any>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [professorToDelete, setProfessorToDelete] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    isTenured: false,
    areasOfExpertise: "",
    active: true
  })
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    isTenured: false,
    areasOfExpertise: "",
    active: true
  })

  // Obtener profesores del backend
  useEffect(() => {
    fetchProfessors()
  }, [])

  const fetchProfessors = async () => {
    try {
      const response = await apiService.get('/api/professors')
      console.log('Response completa:', response)
      setProfessors(response.professors || [])
    } catch (error) {
      console.error('Error al obtener profesores:', error)
      alert('Error al cargar los profesores')
    }
  }

  // Filtrar profesores por búsqueda
  const filteredProfessors = professors.filter((professor) => {
    const query = searchQuery.toLowerCase()
    return (
      professor.name?.toLowerCase().includes(query) ||
      professor.email?.toLowerCase().includes(query)
    )
  })

  // Manejar cambios en el formulario
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Crear profesor
  const handleCreateProfessor = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.department) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    try {
      setIsSubmitting(true)
      
      // Convertir áreas de experticia de string a array
      const areasArray = formData.areasOfExpertise
        ? formData.areasOfExpertise.split(',').map(area => area.trim())
        : []
      
      await apiService.post('/api/professors', {
        name: formData.name,
        email: formData.email,
        department: formData.department,
        isTenured: formData.isTenured,
        areasOfExpertise: areasArray,
        active: formData.active
      })
      
      // Actualizar la lista de profesores
      await fetchProfessors()
      
      // Limpiar el formulario
      setFormData({
        name: "",
        email: "",
        department: "",
        isTenured: false,
        areasOfExpertise: "",
        active: true
      })
      
      // Cerrar el diálogo
      setIsCreateOpen(false)
      
      alert("Profesor creado exitosamente")
    } catch (error: any) {
      console.error('Error al crear profesor:', error)
      alert(error.response?.data?.error || "Error al crear el profesor")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Manejar cambios en el formulario de edición
  const handleEditInputChange = (field: string, value: string | boolean) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Abrir diálogo de edición
  const handleEditClick = (professor: any) => {
    setEditFormData({
      id: professor.id,
      name: professor.name,
      email: professor.email,
      department: professor.department || "",
      isTenured: professor.isTenured || false,
      areasOfExpertise: professor.areasOfExpertise?.join(', ') || "",
      active: professor.active
    })
    setEditingProfessor(professor)
    setIsEditOpen(true)
  }

  // Actualizar profesor
  const handleUpdateProfessor = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editFormData.name || !editFormData.email || !editFormData.department) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    try {
      setIsSubmitting(true)
      
      // Convertir áreas de experticia de string a array
      const areasArray = editFormData.areasOfExpertise
        ? editFormData.areasOfExpertise.split(',').map(area => area.trim())
        : []
      
      await apiService.put(`/api/professors/${editFormData.id}`, {
        name: editFormData.name,
        email: editFormData.email,
        department: editFormData.department,
        isTenured: editFormData.isTenured,
        areasOfExpertise: areasArray,
        active: editFormData.active
      })
      
      // Actualizar la lista
      await fetchProfessors()
      
      // Cerrar el diálogo
      setIsEditOpen(false)
      setEditingProfessor(null)
      
      alert("Profesor actualizado exitosamente")
    } catch (error: any) {
      console.error('Error al actualizar profesor:', error)
      alert(error.response?.data?.error || "Error al actualizar el profesor")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteClick = (professor: any) => {
    setProfessorToDelete(professor)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteProfessor = async () => {
    if (!professorToDelete) return

    try {
      setIsSubmitting(true)
      await apiService.delete(`/api/professors/${professorToDelete.id}`)
      alert("Profesor eliminado exitosamente")
      fetchProfessors()
      setIsDeleteDialogOpen(false)
      setProfessorToDelete(null)
    } catch (error: any) {
      console.error("Error al eliminar profesor:", error)
      alert(error.response?.data?.error || "Error al eliminar el profesor")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Profesores</h1>
            <p className="text-muted-foreground mt-1">Administra los profesores del sistema</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Profesor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleCreateProfessor}>
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Profesor</DialogTitle>
                  <DialogDescription>Ingresa los datos del nuevo profesor</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input 
                      id="name" 
                      placeholder="Ej: Dr. Juan Pérez"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="profesor@universidad.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Input 
                      id="department" 
                      placeholder="Ej: Sistemas"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="areasOfExpertise">Áreas de Experticia</Label>
                    <Input 
                      id="areasOfExpertise" 
                      placeholder="Ej: Programación, Base de Datos, Redes (separadas por comas)"
                      value={formData.areasOfExpertise}
                      onChange={(e) => handleInputChange("areasOfExpertise", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="isTenured"
                      checked={formData.isTenured}
                      onChange={(e) => handleInputChange("isTenured", e.target.checked)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="isTenured" className="cursor-pointer">Profesor con Titularidad</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creando..." : "Crear Profesor"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nombre o correo..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Áreas de Experticia</TableHead>
                <TableHead>Titularidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfessors.map((professor) => (
                <TableRow key={professor.id}>
                  <TableCell className="font-medium">{professor.name}</TableCell>
                  <TableCell>{professor.email}</TableCell>
                  <TableCell>{professor.department || 'N/A'}</TableCell>
                  <TableCell>
                    {professor.areasOfExpertise && professor.areasOfExpertise.length > 0 
                      ? professor.areasOfExpertise.join(', ') 
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        professor.isTenured ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {professor.isTenured ? "Con Titularidad" : "Sin Titularidad"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        professor.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {professor.active ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={isEditOpen && editingProfessor?.id === professor.id} onOpenChange={setIsEditOpen}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => handleEditClick(professor)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <form onSubmit={handleUpdateProfessor}>
                            <DialogHeader>
                              <DialogTitle>Editar Profesor</DialogTitle>
                              <DialogDescription>Actualiza los datos del profesor</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="edit-name">Nombre Completo</Label>
                                <Input 
                                  id="edit-name" 
                                  value={editFormData.name}
                                  onChange={(e) => handleEditInputChange("name", e.target.value)}
                                  required
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="edit-email">Correo Electrónico</Label>
                                <Input 
                                  id="edit-email" 
                                  type="email" 
                                  value={editFormData.email}
                                  onChange={(e) => handleEditInputChange("email", e.target.value)}
                                  required
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="edit-department">Departamento</Label>
                                <Input 
                                  id="edit-department" 
                                  value={editFormData.department}
                                  onChange={(e) => handleEditInputChange("department", e.target.value)}
                                  required
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="edit-areasOfExpertise">Áreas de Experticia</Label>
                                <Input 
                                  id="edit-areasOfExpertise" 
                                  placeholder="Separadas por comas"
                                  value={editFormData.areasOfExpertise}
                                  onChange={(e) => handleEditInputChange("areasOfExpertise", e.target.value)}
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  id="edit-isTenured"
                                  checked={editFormData.isTenured}
                                  onChange={(e) => handleEditInputChange("isTenured", e.target.checked)}
                                  className="h-4 w-4"
                                />
                                <Label htmlFor="edit-isTenured" className="cursor-pointer">Profesor con Titularidad</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  id="edit-active"
                                  checked={editFormData.active}
                                  onChange={(e) => handleEditInputChange("active", e.target.checked)}
                                  className="h-4 w-4"
                                />
                                <Label htmlFor="edit-active" className="cursor-pointer">Profesor activo</Label>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                type="submit" 
                                className="bg-primary hover:bg-primary/90"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Actualizando..." : "Guardar Cambios"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(professor)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Diálogo de confirmación de eliminación */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar este profesor?
              </DialogDescription>
            </DialogHeader>
            {professorToDelete && (
              <div className="py-4">
                <div className="space-y-2 text-sm">
                  <p><strong>Nombre:</strong> {professorToDelete.name}</p>
                  <p><strong>Correo:</strong> {professorToDelete.email}</p>
                  <p><strong>Departamento:</strong> {professorToDelete.department || 'N/A'}</p>
                  <p><strong>Áreas de Experticia:</strong> {professorToDelete.areasOfExpertise?.join(', ') || 'N/A'}</p>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Esta acción no se puede deshacer.
                </p>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteProfessor}
                disabled={isSubmitting}
                className="text-white"
              >
                {isSubmitting ? "Eliminando..." : "Eliminar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
