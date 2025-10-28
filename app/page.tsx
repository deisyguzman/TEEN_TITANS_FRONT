import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - University branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#8B0000] items-center justify-center p-12">
        <div className="text-center text-white max-w-md">
          <div className="mb-8">
            <svg viewBox="0 0 200 150" className="w-full h-auto mb-8">
              {/* Grid structure */}
              <path
                d="M 20 120 L 20 40 L 100 20 L 100 100 L 20 120 Z"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              {/* Horizontal grid lines */}
              <line x1="20" y1="120" x2="100" y2="100" stroke="white" strokeWidth="1" />
              <line x1="20" y1="105" x2="100" y2="85" stroke="white" strokeWidth="1" />
              <line x1="20" y1="90" x2="100" y2="70" stroke="white" strokeWidth="1" />
              <line x1="20" y1="75" x2="100" y2="55" stroke="white" strokeWidth="1" />
              <line x1="20" y1="60" x2="100" y2="40" stroke="white" strokeWidth="1" />
              {/* Vertical grid lines */}
              <line x1="35" y1="116" x2="35" y2="44" stroke="white" strokeWidth="1" />
              <line x1="50" y1="112" x2="50" y2="48" stroke="white" strokeWidth="1" />
              <line x1="65" y1="108" x2="65" y2="52" stroke="white" strokeWidth="1" />
              <line x1="80" y1="104" x2="80" y2="56" stroke="white" strokeWidth="1" />
            </svg>
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
