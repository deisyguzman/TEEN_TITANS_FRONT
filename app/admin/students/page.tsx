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

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados del formulario de creación
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    email: "",
    semester: "",
    active: true
  });

  // Estados del formulario de edición
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    email: "",
    semester: "",
    active: true
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await apiService.get('/api/students');
      setStudents(data.students || []);
    } catch (error) {
      console.error('Error al obtener estudiantes:', error);
    }
  };

  // Filtrar estudiantes por búsqueda
  const filteredStudents = students.filter((student: any) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name?.toLowerCase().includes(query) ||
      student.id?.toLowerCase().includes(query) ||
      student.email?.toLowerCase().includes(query)
    );
  });

  // Manejar cambios en el formulario
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Manejar cambios en el formulario de edición
  const handleEditInputChange = (field: string, value: string | boolean) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Abrir diálogo de edición
  const handleEditClick = (student: any) => {
    setEditFormData({
      id: student.id,
      name: student.name,
      email: student.email,
      semester: student.semester.toString(),
      active: student.active
    });
    setEditingStudent(student);
    setIsEditOpen(true);
  };

  // Crear estudiante
  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.semester) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      setIsSubmitting(true);
      await apiService.post('/api/students', {
        name: formData.name,
        email: formData.email,
        semester: parseInt(formData.semester),
        active: formData.active
      });
      
      // Actualizar la lista de estudiantes
      await fetchStudents();
      
      // Limpiar el formulario
      setFormData({
        code: "",
        name: "",
        email: "",
        semester: "",
        active: true
      });
      
      // Cerrar el diálogo
      setIsCreateOpen(false);
      
      alert("Estudiante creado exitosamente");
    } catch (error: any) {
      console.error('Error al crear estudiante:', error);
      alert(error.response?.data?.error || "Error al crear el estudiante");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Actualizar estudiante
  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editFormData.name || !editFormData.email || !editFormData.semester) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      setIsSubmitting(true);
      
      await apiService.put(`/api/students/${editFormData.id}`, {
        name: editFormData.name,
        email: editFormData.email,
        semester: parseInt(editFormData.semester),
        active: editFormData.active
      });
      
      // Actualizar la lista de estudiantes
      await fetchStudents();
      
      // Cerrar el diálogo
      setIsEditOpen(false);
      
      alert("Estudiante actualizado exitosamente");
    } catch (error: any) {
      console.error('Error al actualizar estudiante:', error);
      alert(error.response?.data?.error || "Error al actualizar el estudiante");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Abrir diálogo de confirmación de eliminación
  const handleDeleteClick = (student: any) => {
    setStudentToDelete(student);
    setIsDeleteDialogOpen(true);
  };

  // Eliminar estudiante
  const handleDeleteStudent = async () => {
    if (!studentToDelete) return;

    try {
      setIsSubmitting(true);
      await apiService.delete(`/api/students/${studentToDelete.id}`);
      
      // Actualizar la lista de estudiantes
      await fetchStudents();
      
      // Cerrar el diálogo
      setIsDeleteDialogOpen(false);
      setStudentToDelete(null);
      
      alert("Estudiante eliminado exitosamente");
    } catch (error: any) {
      console.error('Error al eliminar estudiante:', error);
      alert(error.response?.data?.error || "Error al eliminar el estudiante");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Estudiantes</h1>
            <p className="text-muted-foreground mt-1">Administra los estudiantes del sistema</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Estudiante
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleCreateStudent}>
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Estudiante</DialogTitle>
                  <DialogDescription>Ingresa los datos del nuevo estudiante</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input 
                      id="name" 
                      placeholder="Ej: Juan Pérez"
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
                      placeholder="estudiante@universidad.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="semester">Semestre</Label>
                    <Input 
                      id="semester" 
                      type="number" 
                      placeholder="1" 
                      min="1" 
                      max="10"
                      value={formData.semester}
                      onChange={(e) => handleInputChange("semester", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creando..." : "Crear Estudiante"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Dialog de Confirmación de Eliminación */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar este estudiante? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            {studentToDelete && (
              <div className="py-4">
                <div className="rounded-lg bg-muted p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold">ID:</span> {studentToDelete.id}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Nombre:</span> {studentToDelete.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Email:</span> {studentToDelete.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Semestre:</span> {studentToDelete.semester}
                  </p>
                </div>
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
                onClick={handleDeleteStudent}
                disabled={isSubmitting}
                className="text-white"
              >
                {isSubmitting ? "Eliminando..." : "Eliminar Estudiante"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nombre, ID o correo..." 
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
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Semestre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student: any) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        student.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {student.active ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={isEditOpen && editingStudent?.id === student.id} onOpenChange={setIsEditOpen}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => handleEditClick(student)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <form onSubmit={handleUpdateStudent}>
                            <DialogHeader>
                              <DialogTitle>Editar Estudiante</DialogTitle>
                              <DialogDescription>Actualiza los datos del estudiante</DialogDescription>
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
                                <Label htmlFor="edit-semester">Semestre</Label>
                                <Input
                                  id="edit-semester"
                                  type="number"
                                  value={editFormData.semester}
                                  onChange={(e) => handleEditInputChange("semester", e.target.value)}
                                  min="1"
                                  max="10"
                                  required
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  id="edit-active"
                                  checked={editFormData.active}
                                  onChange={(e) => handleEditInputChange("active", e.target.checked)}
                                  className="h-4 w-4"
                                />
                                <Label htmlFor="edit-active" className="cursor-pointer">Estudiante activo</Label>
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
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteClick(student)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  )
}
