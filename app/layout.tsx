import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SIRHA - Sistema de Reasignación de Horarios Académicos",
  description: "Sistema de gestión de horarios académicos",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
