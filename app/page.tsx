import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#990000] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl mb-6">
            <span className="text-4xl font-bold text-[#990000]">SIRHA</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sistema de Reasignación de Horarios Académicos</h1>
          <p className="text-white/90">Ingrese sus credenciales para continuar</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
