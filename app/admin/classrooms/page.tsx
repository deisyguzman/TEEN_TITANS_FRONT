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
import { DoorOpen, Pencil, Trash2, Search } from "lucide-react"

export default function ClassroomsPage() {
  const classrooms = [
    {
      id: 1,
      code: "A-101",
      building: "Edificio A",
      capacity: 30,
      type: "Aula",
      equipment: "Proyector, Pizarra",
      status: "Disponible",
    },
    {
      id: 2,
      code: "B-205",
      building: "Edificio B",
      capacity: 40,
      type: "Aula",
      equipment: "Proyector, Pizarra, Audio",
      status: "Disponible",
    },
    {
      id: 3,
      code: "LAB-301",
      building: "Edificio C",
      capacity: 25,
      type: "Laboratorio",
      equipment: "Computadoras, Proyector",
      status: "Ocupado",
    },
    {
      id: 4,
      code: "AUD-001",
      building: "Edificio Principal",
      capacity: 150,
      type: "Auditorio",
      equipment: "Proyector, Audio, Micrófonos",
      status: "Disponible",
    },
    {
      id: 5,
      code: "A-203",
      building: "Edificio A",
      capacity: 35,
      type: "Aula",
      equipment: "Proyector, Pizarra",
      status: "Mantenimiento",
    },
  ]

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Aulas</h1>
            <p className="text-muted-foreground mt-1">Administra las aulas y espacios físicos</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <DoorOpen className="mr-2 h-4 w-4" />
                Nueva Aula
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Registrar Nueva Aula</DialogTitle>
                <DialogDescription>Ingresa los datos del nuevo espacio físico</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="classroomCode">Código del Aula</Label>
                  <Input id="classroomCode" placeholder="Ej: A-101" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="building">Edificio</Label>
                  <Input id="building" placeholder="Ej: Edificio A" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="classroomCapacity">Capacidad</Label>
                    <Input id="classroomCapacity" type="number" placeholder="30" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classroom">Aula</SelectItem>
                        <SelectItem value="lab">Laboratorio</SelectItem>
                        <SelectItem value="auditorium">Auditorio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="equipment">Equipamiento</Label>
                  <Input id="equipment" placeholder="Ej: Proyector, Pizarra, Audio" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Registrar Aula
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar por código o edificio..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="classroom">Aulas</SelectItem>
              <SelectItem value="lab">Laboratorios</SelectItem>
              <SelectItem value="auditorium">Auditorios</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Edificio</TableHead>
                <TableHead>Capacidad</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Equipamiento</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classrooms.map((classroom) => (
                <TableRow key={classroom.id}>
                  <TableCell className="font-medium">{classroom.code}</TableCell>
                  <TableCell>{classroom.building}</TableCell>
                  <TableCell>{classroom.capacity}</TableCell>
                  <TableCell>{classroom.type}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{classroom.equipment}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        classroom.status === "Disponible"
                          ? "bg-green-100 text-green-800"
                          : classroom.status === "Ocupado"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {classroom.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
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
