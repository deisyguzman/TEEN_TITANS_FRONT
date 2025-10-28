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

export default function DeansPage() {
  const [deans, setDeans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingDean, setEditingDean] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deanToDelete, setDeanToDelete] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados del formulario de creación
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    faculty: "",
    officeLocation: "",
    active: true
  });

  // Estados del formulario de edición
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    email: "",
    faculty: "",
    officeLocation: "",
    active: true
  });

  useEffect(() => {
    fetchDeans();
  }, []);

  const fetchDeans = async () => {
    try {
      const data = await apiService.get('/api/deans');
      setDeans(data.deans || []);
    } catch (error) {
      console.error('Error al obtener decanos:', error);
    }
  };

  // Filtrar decanos por búsqueda
    const handleDeleteClick = (dean: any) => {
    setDeanToDelete(dean);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDean = async () => {
    if (!deanToDelete) return;

    try {
      setIsSubmitting(true);
      await apiService.delete(`/api/deans/${deanToDelete.id}`);
      alert("Decano eliminado exitosamente");
      fetchDeans();
      setIsDeleteDialogOpen(false);
      setDeanToDelete(null);
    } catch (error: any) {
      console.error("Error al eliminar decano:", error);
      alert(error.response?.data?.error || "Error al eliminar el decano");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredDeans = deans.filter((dean) => {
    const query = searchQuery.toLowerCase();
    return (
      dean.name?.toLowerCase().includes(query) ||
      dean.email?.toLowerCase().includes(query)
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
  const handleEditClick = (dean: any) => {
    setEditFormData({
      id: dean.id,
      name: dean.name,
      email: dean.email,
      faculty: dean.faculty || "",
      officeLocation: dean.officeLocation || "",
      active: dean.active
    });
    setEditingDean(dean);
    setIsEditOpen(true);
  };

  // Crear decano
  const handleCreateDean = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.faculty || !formData.officeLocation) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      setIsSubmitting(true);
      await apiService.post('/api/deans', formData);
      
      // Actualizar la lista de decanos
      await fetchDeans();
      
      // Limpiar el formulario
      setFormData({
        name: "",
        email: "",
        faculty: "",
        officeLocation: "",
        active: true
      });
      
      // Cerrar el diálogo
      setIsCreateOpen(false);
      
      alert("Decano creado exitosamente");
    } catch (error: any) {
      console.error('Error al crear decano:', error);
      alert(error.response?.data?.error || "Error al crear el decano");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Actualizar decano
  const handleUpdateDean = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editFormData.name || !editFormData.email || !editFormData.faculty || !editFormData.officeLocation) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      setIsSubmitting(true);
      
      await apiService.put(`/api/deans/${editFormData.id}`, {
        name: editFormData.name,
        email: editFormData.email,
        faculty: editFormData.faculty,
        officeLocation: editFormData.officeLocation,
        active: editFormData.active
      });
      
      // Actualizar la lista de decanos
      await fetchDeans();
      
      // Cerrar el diálogo
      setIsEditOpen(false);
      
      alert("Decano actualizado exitosamente");
    } catch (error: any) {
      console.error('Error al actualizar decano:', error);
      alert(error.response?.data?.error || "Error al actualizar el decano");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este decano?")) {
      setDeans(deans.filter((d) => d.id !== id))
    }
  }

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Decanos</h1>
            <p className="text-muted-foreground mt-1">Administra los decanos del sistema</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Decano
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleCreateDean}>
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Decano</DialogTitle>
                  <DialogDescription>Ingresa los datos del nuevo decano</DialogDescription>
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
                      placeholder="decano@universidad.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="faculty">Facultad</Label>
                    <Input 
                      id="faculty" 
                      placeholder="Ej: Ingeniería"
                      value={formData.faculty}
                      onChange={(e) => handleInputChange("faculty", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="officeLocation">Ubicación de Oficina</Label>
                    <Input 
                      id="officeLocation" 
                      placeholder="Ej: Edificio A - Piso 3 - Oficina 301"
                      value={formData.officeLocation}
                      onChange={(e) => handleInputChange("officeLocation", e.target.value)}
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
                    {isSubmitting ? "Creando..." : "Crear Decano"}
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
                <TableHead>Facultad</TableHead>
                <TableHead>Oficina</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeans.map((dean: any) => (
                <TableRow key={dean.id}>
                  <TableCell className="font-medium">{dean.name}</TableCell>
                  <TableCell>{dean.email}</TableCell>
                  <TableCell>{dean.faculty || 'N/A'}</TableCell>
                  <TableCell>{dean.officeLocation || 'N/A'}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        dean.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {dean.active ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={isEditOpen && editingDean?.id === dean.id} onOpenChange={setIsEditOpen}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => handleEditClick(dean)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <form onSubmit={handleUpdateDean}>
                            <DialogHeader>
                              <DialogTitle>Editar Decano</DialogTitle>
                              <DialogDescription>Actualiza los datos del decano</DialogDescription>
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
                                <Label htmlFor="edit-faculty">Facultad</Label>
                                <Input 
                                  id="edit-faculty" 
                                  value={editFormData.faculty}
                                  onChange={(e) => handleEditInputChange("faculty", e.target.value)}
                                  placeholder="Ej: Ingeniería"
                                  required
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="edit-officeLocation">Ubicación de Oficina</Label>
                                <Input 
                                  id="edit-officeLocation" 
                                  value={editFormData.officeLocation}
                                  onChange={(e) => handleEditInputChange("officeLocation", e.target.value)}
                                  placeholder="Ej: Edificio A - Piso 3 - Oficina 301"
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
                                <Label htmlFor="edit-active" className="cursor-pointer">Decano activo</Label>
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
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(dean)}>
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
                ¿Estás seguro de que deseas eliminar este decano?
              </DialogDescription>
            </DialogHeader>
            {deanToDelete && (
              <div className="py-4">
                <div className="space-y-2 text-sm">
                  <p><strong>Nombre:</strong> {deanToDelete.name}</p>
                  <p><strong>Correo:</strong> {deanToDelete.email}</p>
                  <p><strong>Facultad:</strong> {deanToDelete.faculty || 'N/A'}</p>
                  <p><strong>Oficina:</strong> {deanToDelete.officeLocation || 'N/A'}</p>
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
                onClick={handleDeleteDean}
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
