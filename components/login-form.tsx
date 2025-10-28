"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type UserRole = "administrator" | "dean" | "professor" | "student"

export function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("student")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect based on role
    const routes: Record<UserRole, string> = {
      administrator: "/admin",
      dean: "/dean",
      professor: "/professor",
      student: "/student",
    }

    router.push(routes[role])
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">SIRHA</h1>
        <p className="text-sm text-gray-600">Sistema de Reasignación de Horarios Académicos</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-gray-700 text-sm">
            Iniciar sesión
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Ingresar correo electrónico"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="bg-gray-100 border-0 h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 text-sm">
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Ingresar contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-100 border-0 h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-gray-700 text-sm">
            Rol
          </Label>
          <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
            <SelectTrigger id="role" className="bg-gray-100 border-0 h-11">
              <SelectValue placeholder="Seleccione su rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Estudiante</SelectItem>
              <SelectItem value="professor">Profesor</SelectItem>
              <SelectItem value="dean">Decanatura</SelectItem>
              <SelectItem value="administrator">Administrador</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white h-11 rounded-md font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Ingresando..." : "Iniciar sesión"}
        </Button>
      </form>
    </div>
  )
}
