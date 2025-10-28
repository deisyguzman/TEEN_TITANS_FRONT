import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - University branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#8B0000] items-center justify-center p-12">
        <div className="w-full max-w-md flex items-center justify-center">
          <Image
            src="/logo-escuela.png"
            alt="Logo Escuela Colombiana de Ingeniería Julio Garavito"
            width={350}
            height={400}
            className="object-contain"
            priority
          />
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
