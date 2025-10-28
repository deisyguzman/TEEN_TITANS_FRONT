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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Pencil, Trash2, Search, Plus } from "lucide-react"
import { useState } from "react"

export default function CoursesPage() {
  const [courses] = useState([
    { id: 1, code: "ING-101", name: "Cálculo I", credits: 4, faculty: "Ingeniería", groups: 3 },
    { id: 2, code: "ING-102", name: "Física I", credits: 4, faculty: "Ingeniería", groups: 2 },
    { id: 3, code: "CS-201", name: "Estructuras de Datos", credits: 3, faculty: "Ingeniería", groups: 2 },
  ])

  const [groups] = useState([
    {
      id: 1,
      courseCode: "ING-101",
      courseName: "Cálculo I",
      group: "A",
      professor: "Dr. Juan Pérez",
      schedule: "Lun-Mie 8:00-10:00",
      capacity: 30,
      enrolled: 28,
    },
    {
      id: 2,
      courseCode: "ING-101",
      courseName: "Cálculo I",
      group: "B",
      professor: "Dra. María García",
      schedule: "Mar-Jue 10:00-12:00",
      capacity: 30,
      enrolled: 25,
    },
    {
      id: 3,
      courseCode: "ING-102",
      courseName: "Física I",
      group: "A",
      professor: "Dr. Carlos López",
      schedule: "Lun-Mie 14:00-16:00",
      capacity: 25,
      enrolled: 25,
    },
  ])

  const [editingCourse, setEditingCourse] = useState<any>(null)
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false)

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Materias y Grupos</h1>
          <p className="text-muted-foreground mt-1">Administra materias y sus grupos</p>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">Materias</TabsTrigger>
            <TabsTrigger value="groups">Grupos</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar materias..." className="pl-10" />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Nueva Materia
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Crear Nueva Materia</DialogTitle>
                    <DialogDescription>Ingresa los datos de la nueva materia</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="code">Código</Label>
                      <Input id="code" placeholder="Ej: ING-101" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="courseName">Nombre</Label>
                      <Input id="courseName" placeholder="Ej: Cálculo I" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="credits">Créditos</Label>
                        <Input id="credits" type="number" placeholder="3" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="faculty">Facultad</Label>
                        <Select>
                          <SelectTrigger id="faculty">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">Ingeniería</SelectItem>
                            <SelectItem value="sciences">Ciencias</SelectItem>
                            <SelectItem value="humanities">Humanidades</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      Crear Materia
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium">{course.code}</CardTitle>
                      <p className="text-lg font-bold">{course.name}</p>
                    </div>
                    <div className="flex gap-1">
                      <Dialog
                        open={isEditCourseOpen && editingCourse?.id === course.id}
                        onOpenChange={setIsEditCourseOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setEditingCourse(course)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Editar Materia</DialogTitle>
                            <DialogDescription>Actualiza los datos de la materia</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-code">Código</Label>
                              <Input id="edit-code" defaultValue={editingCourse?.code} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-courseName">Nombre</Label>
                              <Input id="edit-courseName" defaultValue={editingCourse?.name} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="edit-credits">Créditos</Label>
                                <Input id="edit-credits" type="number" defaultValue={editingCourse?.credits} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="edit-faculty">Facultad</Label>
                                <Select defaultValue="engineering">
                                  <SelectTrigger id="edit-faculty">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="engineering">Ingeniería</SelectItem>
                                    <SelectItem value="sciences">Ciencias</SelectItem>
                                    <SelectItem value="humanities">Humanidades</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="bg-primary hover:bg-primary/90">
                              Guardar Cambios
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Créditos:</span>
                        <span className="font-medium">{course.credits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Facultad:</span>
                        <span className="font-medium">{course.faculty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Grupos:</span>
                        <span className="font-medium">{course.groups}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar grupos..." className="pl-10" />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Grupo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Grupo</DialogTitle>
                    <DialogDescription>Ingresa los datos del nuevo grupo</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="course">Materia</Label>
                      <Select>
                        <SelectTrigger id="course">
                          <SelectValue placeholder="Seleccionar materia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ing101">ING-101 - Cálculo I</SelectItem>
                          <SelectItem value="ing102">ING-102 - Física I</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="group">Grupo</Label>
                        <Input id="group" placeholder="A" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="capacity">Capacidad</Label>
                        <Input id="capacity" type="number" placeholder="30" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="professor">Profesor</Label>
                      <Select>
                        <SelectTrigger id="professor">
                          <SelectValue placeholder="Seleccionar profesor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prof1">Dr. Juan Pérez</SelectItem>
                          <SelectItem value="prof2">Dra. María García</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="schedule">Horario</Label>
                      <Input id="schedule" placeholder="Lun-Mie 8:00-10:00" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      Crear Grupo
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {groups.map((group) => (
                <Card key={group.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {group.courseCode} - Grupo {group.group}
                            </h3>
                            <p className="text-sm text-muted-foreground">{group.courseName}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Profesor:</span>
                            <p className="font-medium">{group.professor}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Horario:</span>
                            <p className="font-medium">{group.schedule}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Inscritos:</span>
                            <p className="font-medium">
                              {group.enrolled}/{group.capacity}
                              <span
                                className={`ml-2 ${group.enrolled >= group.capacity ? "text-destructive" : "text-success"}`}
                              >
                                ({Math.round((group.enrolled / group.capacity) * 100)}%)
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Editar Grupo</DialogTitle>
                              <DialogDescription>Actualiza los datos del grupo</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-group">Grupo</Label>
                                  <Input id="edit-group" defaultValue={group.group} />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-capacity">Capacidad</Label>
                                  <Input id="edit-capacity" type="number" defaultValue={group.capacity} />
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="edit-professor">Profesor</Label>
                                <Select defaultValue="prof1">
                                  <SelectTrigger id="edit-professor">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="prof1">Dr. Juan Pérez</SelectItem>
                                    <SelectItem value="prof2">Dra. María García</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="edit-schedule">Horario</Label>
                                <Input id="edit-schedule" defaultValue={group.schedule} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" className="bg-primary hover:bg-primary/90">
                                Guardar Cambios
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
