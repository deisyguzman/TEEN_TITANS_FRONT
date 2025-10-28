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
import { useEffect, useState } from "react"
import apiService from "@/lib/api-service"

export default function UsersPage() {
  const ROLES = ['STUDENT', 'PROFESSOR', 'ADMINISTRATOR', 'DEAN'];
  
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    active: true
  });
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    active: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiService.get('/api/users');
        setUsers(data.users || []);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  // Filtrar usuarios por rol y búsqueda
  const filteredUsers = users.filter((user: any) => {
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
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

  // Abrir diálogo de edición con datos del usuario
  const handleEditClick = (user: any) => {
    setEditFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "", // No mostrar la contraseña actual
      role: user.role,
      active: user.active
    });
    setIsEditDialogOpen(true);
  };

  // Crear usuario
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      setIsSubmitting(true);
      const newUser = await apiService.post('/api/users', formData);
      
      // Actualizar la lista de usuarios
      const data = await apiService.get('/api/users');
      setUsers(data.users || []);
      
      // Limpiar el formulario
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        active: true
      });
      
      // Cerrar el diálogo
      setIsDialogOpen(false);
      
      alert("Usuario creado exitosamente");
    } catch (error: any) {
      console.error('Error al crear usuario:', error);
      alert(error.response?.data?.error || "Error al crear el usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Actualizar usuario
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editFormData.name || !editFormData.email || !editFormData.role) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Preparar datos para actualizar (sin password si está vacío)
      const updateData: any = {
        name: editFormData.name,
        email: editFormData.email,
        role: editFormData.role,
        active: editFormData.active
      };
      
      // Solo incluir password si se proporcionó uno nuevo
      if (editFormData.password && editFormData.password.trim() !== "") {
        updateData.password = editFormData.password;
      }
      
      await apiService.put(`/api/users/${editFormData.id}`, updateData);
      
      // Actualizar la lista de usuarios
      const data = await apiService.get('/api/users');
      setUsers(data.users || []);
      
      // Cerrar el diálogo
      setIsEditDialogOpen(false);
      
      alert("Usuario actualizado exitosamente");
    } catch (error: any) {
      console.error('Error al actualizar usuario:', error);
      alert(error.response?.data?.error || "Error al actualizar el usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Abrir diálogo de confirmación de eliminación
  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  // Eliminar usuario
  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      setIsSubmitting(true);
      await apiService.delete(`/api/users/${userToDelete.id}`);
      
      // Actualizar la lista de usuarios
      const data = await apiService.get('/api/users');
      setUsers(data.users || []);
      
      // Cerrar el diálogo
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
      
      alert("Usuario eliminado exitosamente");
    } catch (error: any) {
      console.error('Error al eliminar usuario:', error);
      alert(error.response?.data?.error || "Error al eliminar el usuario");
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios</h1>
            <p className="text-muted-foreground mt-1">Administra usuarios del sistema</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleCreateUser}>
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                  <DialogDescription>Ingresa los datos del nuevo usuario del sistema</DialogDescription>
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
                      placeholder="usuario@universidad.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Ingresa una contraseña"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Rol</Label>
                    <Select 
                      value={formData.role} 
                      onValueChange={(value) => handleInputChange("role", value)}
                      required
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Seleccionar rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creando..." : "Crear Usuario"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Dialog de Edición */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleUpdateUser}>
              <DialogHeader>
                <DialogTitle>Editar Usuario</DialogTitle>
                <DialogDescription>Modifica los datos del usuario</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nombre Completo</Label>
                  <Input 
                    id="edit-name" 
                    placeholder="Ej: Juan Pérez"
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
                    placeholder="usuario@universidad.edu"
                    value={editFormData.email}
                    onChange={(e) => handleEditInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-password">Nueva Contraseña (opcional)</Label>
                  <Input 
                    id="edit-password" 
                    type="password" 
                    placeholder="Dejar vacío para mantener la actual"
                    value={editFormData.password}
                    onChange={(e) => handleEditInputChange("password", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-role">Rol</Label>
                  <Select 
                    value={editFormData.role} 
                    onValueChange={(value) => handleEditInputChange("role", value)}
                    required
                  >
                    <SelectTrigger id="edit-role">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="edit-active"
                    checked={editFormData.active}
                    onChange={(e) => handleEditInputChange("active", e.target.checked)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="edit-active" className="cursor-pointer">Usuario activo</Label>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Actualizando..." : "Actualizar Usuario"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dialog de Confirmación de Eliminación */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            {userToDelete && (
              <div className="py-4">
                <div className="rounded-lg bg-muted p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold">Nombre:</span> {userToDelete.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Email:</span> {userToDelete.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Rol:</span> {userToDelete.role}
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
                onClick={handleDeleteUser}
                disabled={isSubmitting}
                className="text-white"
              >
                {isSubmitting ? "Eliminando..." : "Eliminar Usuario"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los roles</SelectItem>
              {ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Rol</TableHead>
                {/* <TableHead>Facultad</TableHead> */}
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  {/* <TableCell>{user.faculty}</TableCell> */}
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.active ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditClick(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteClick(user)}
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
