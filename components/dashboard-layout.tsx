"use client"

import { type ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  BarChart3,
  Menu,
  X,
  LogOut,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: ReactNode
}

interface DashboardLayoutProps {
  children: ReactNode
  role: "administrator" | "dean" | "professor" | "student"
  userName?: string
}

const navigationByRole: Record<string, NavItem[]> = {
  administrator: [
    { title: "Inicio", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { title: "Usuarios", href: "/admin/users", icon: <Users className="w-5 h-5" /> },
    { title: "Estudiantes", href: "/admin/students", icon: <Users className="w-5 h-5" /> },
    { title: "Decanos", href: "/admin/deans", icon: <GraduationCap className="w-5 h-5" /> },
    { title: "Profesores", href: "/admin/professors", icon: <Users className="w-5 h-5" /> },
    { title: "Materias y Grupos", href: "/admin/courses", icon: <BookOpen className="w-5 h-5" /> },
    { title: "Periodos", href: "/admin/periods", icon: <Calendar className="w-5 h-5" /> },
    { title: "Solicitudes", href: "/admin/requests", icon: <FileText className="w-5 h-5" /> },
    { title: "Reportes", href: "/admin/reports", icon: <BarChart3 className="w-5 h-5" /> },
  ],
  dean: [
    { title: "Inicio", href: "/dean", icon: <LayoutDashboard className="w-5 h-5" /> },
    { title: "Solicitudes", href: "/dean/requests", icon: <FileText className="w-5 h-5" /> },
    { title: "Materias y Grupos", href: "/dean/courses", icon: <BookOpen className="w-5 h-5" /> },
    { title: "Reportes", href: "/dean/reports", icon: <BarChart3 className="w-5 h-5" /> },
  ],
  professor: [
    { title: "Inicio", href: "/professor", icon: <LayoutDashboard className="w-5 h-5" /> },
    { title: "Mis Grupos", href: "/professor/groups", icon: <BookOpen className="w-5 h-5" /> },
    { title: "Estudiantes", href: "/professor/students", icon: <Users className="w-5 h-5" /> },
    { title: "Mi Horario", href: "/professor/schedule", icon: <Calendar className="w-5 h-5" /> },
  ],
  student: [
    { title: "Inicio", href: "/student", icon: <LayoutDashboard className="w-5 h-5" /> },
    { title: "Mi Horario", href: "/student/schedule", icon: <Calendar className="w-5 h-5" /> },
    { title: "Crear Solicitud", href: "/student/new-request", icon: <FileText className="w-5 h-5" /> },
    { title: "Mis Solicitudes", href: "/student/requests", icon: <FileText className="w-5 h-5" /> },
    { title: "Semáforo Académico", href: "/student/curriculum", icon: <GraduationCap className="w-5 h-5" /> },
  ],
}

export function DashboardLayout({ children, role, userName = "Usuario" }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const navigation = navigationByRole[role] || []

  return (
    <div className="min-h-screen bg-muted">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#990000] rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">SIRHA</span>
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#990000] text-white hover:bg-[#770000]"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  {item.title}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-foreground">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{role}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
              <Link href="/">
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border">
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex-1" />
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
