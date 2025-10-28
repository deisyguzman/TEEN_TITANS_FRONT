import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - University branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#8B0000] items-center justify-center p-12">
        <div className="text-center text-white max-w-md">
          <div className="mb-8">
            <Image
              src="/logo-escuela.png"
              alt="Logo Escuela Colombiana de Ingeniería"
              width={300}
              height={300}
              className="w-full h-auto"
              priority
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-wide">ESCUELA</h2>
            <h2 className="text-2xl font-bold tracking-wide">COLOMBIANA</h2>
            <h2 className="text-2xl font-bold tracking-wide">DE INGENIERÍA</h2>
            <h2 className="text-2xl font-bold tracking-wide">JULIO GARAVITO</h2>
            <div className="border-t border-white my-6 mx-8"></div>
            <h3 className="text-xl font-semibold tracking-wide">UNIVERSIDAD</h3>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
