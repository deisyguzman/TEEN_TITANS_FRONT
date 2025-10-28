import { DashboardLayout } from "@/components/dashboard-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfessorRequestsPage() {
  const requests = [
    {
      id: 1,
      student: "Juan Pérez",
      course: "Cálculo I - Sección A",
      requestedCourse: "Cálculo I - Sección B",
      reason: "Conflicto de horario",
      date: "2024-01-10",
      status: "Pendiente",
    },
    {
      id: 2,
      student: "María González",
      course: "Cálculo I - Sección B",
      requestedCourse: "Cálculo I - Sección A",
      reason: "Preferencia de horario",
      date: "2024-01-08",
      status: "Enviado a Decanatura",
    },
  ]

  return (
    <DashboardLayout role="professor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Solicitudes</h1>
          <p className="text-muted-foreground mt-1">Historial de solicitudes de tus estudiantes</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Solicitudes Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Materia Actual</TableHead>
                    <TableHead>Materia Solicitada</TableHead>
                    <TableHead>Razón</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.student}</TableCell>
                      <TableCell>{request.course}</TableCell>
                      <TableCell>{request.requestedCourse}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>
                        <Badge variant={request.status === "Pendiente" ? "secondary" : "default"}>
                          {request.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
