# TEEN_TITANS_FRONT

Sistema de Gestión Académica - Frontend

## 👥 Integrantes

- Sebastian Albarracin Silva
- Raquel Iveth Selma Ayala
- Juan Pablo Nieto Cortes
- Deisy Lorena Guzmán

## 🏗️ Infraestructura

Este proyecto es una aplicación web moderna desarrollada con Next.js 16 que implementa un sistema de gestión académica universitaria. La aplicación está estructurada siguiendo los principios de arquitectura de componentes y diseño modular.

### Arquitectura del Proyecto

```
TEEN_TITANS_FRONT/
├── app/                      # Rutas de la aplicación (App Router de Next.js)
│   ├── admin/               # Módulo de Administración
│   ├── dean/                # Módulo de Decanatura
│   ├── professor/           # Módulo de Profesores
│   └── student/             # Módulo de Estudiantes
├── components/              # Componentes reutilizables
│   ├── ui/                  # Componentes de interfaz base
│   ├── dashboard-layout.tsx # Layout principal del dashboard
│   ├── login-form.tsx       # Formulario de autenticación
│   ├── stat-card.tsx        # Tarjetas de estadísticas
│   └── weekly-schedule.tsx  # Componente de horario semanal
├── lib/                     # Utilidades y servicios
│   ├── api-service.ts       # Cliente HTTP para comunicación con backend
│   └── utils.ts             # Funciones auxiliares
└── public/                  # Archivos estáticos
```

## 🚀 Tecnologías Utilizadas

### Core
- **Next.js 16.0.0** - Framework de React con App Router y Turbopack para desarrollo optimizado
- **React 19** - Biblioteca de UI para construir interfaces interactivas
- **TypeScript** - Tipado estático para mayor seguridad y mantenibilidad del código

### UI/UX
- **Tailwind CSS** - Framework de CSS utility-first para diseño responsivo
- **Radix UI** - Componentes de UI accesibles y personalizables
- **Lucide React** - Biblioteca de iconos moderna y ligera
- **clsx & tailwind-merge** - Utilidades para manejo de clases CSS condicionales

### Comunicación con Backend
- **Axios** - Cliente HTTP para peticiones a la API REST

### Despliegue
- **Vercel** - Plataforma de despliegue y hosting optimizada para Next.js
  - Integración continua con GitHub
  - Despliegue automático en cada push a la rama principal
  - CDN global para máxima velocidad
  - HTTPS automático
  - Preview deployments para cada pull request

### Herramientas de Desarrollo
- **ESLint** - Linter para mantener código consistente
- **PostCSS** - Procesador de CSS

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/deisyguzman/TEEN_TITANS_FRONT.git
cd TEEN_TITANS_FRONT
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env.local` en la raíz del proyecto:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🎯 Uso de la Aplicación

### Inicio de Sesión

1. Accede a la página principal
2. Ingresa tus credenciales según tu rol (Estudiante, Profesor, Decano o Administrador)
3. Serás redirigido al dashboard correspondiente a tu perfil

### Módulos por Perfil

#### 👨‍🎓 Estudiante
- **Dashboard**: Visualiza resumen de cursos inscritos y horario
- **Horario**: Consulta tu horario semanal
- **Plan de Estudios**: Revisa tu malla curricular
- **Solicitudes**: 
  - Ver historial de solicitudes
  - Crear nueva solicitud (Agregar, Retirar o Cambiar materias)
- **Gestión de Materias**: Administra tus inscripciones

#### 👨‍🏫 Profesor
- **Dashboard**: Resumen de grupos y horarios
- **Horario**: Visualiza tu carga académica semanal
- **Grupos**: Gestiona los grupos asignados
- **Estudiantes**: Consulta listas de estudiantes por grupo
- **Solicitudes**: Crea y gestiona solicitudes académicas

#### 🎓 Decano
- **Dashboard**: Estadísticas de la facultad
- **Solicitudes**: Aprobar o rechazar solicitudes de estudiantes
- **Horarios**: Visualizar horarios de la facultad
- **Cursos**: Gestionar oferta académica
- **Reportes**: Generar estadísticas y reportes de capacidad

#### ⚙️ Administrador
- **Dashboard**: Resumen general del sistema
- **Gestión de Usuarios**: CRUD de usuarios del sistema
- **Estudiantes**: Administrar información de estudiantes
- **Profesores**: Gestionar profesores y sus asignaciones
- **Decanos**: Administrar decanos por facultad
- **Materias/Cursos**: Gestionar catálogo de cursos
- **Aulas**: Administrar salones y capacidades
- **Períodos Académicos**: Configurar semestres y períodos
- **Horarios**: Crear y gestionar horarios académicos
- **Solicitudes**: Supervisar todas las solicitudes
- **Reportes**: Generar reportes globales del sistema

## 🔗 Integración con Backend

La aplicación se comunica con una API REST mediante el servicio `api-service.ts` que proporciona:

- Interceptores para manejo automático de tokens JWT
- Gestión centralizada de errores
- Métodos HTTP: GET, POST, PUT, PATCH, DELETE
- Manejo de respuestas 404 con valores por defecto

**Configuración de la URL del backend**: Se configura mediante la variable de entorno `NEXT_PUBLIC_API_URL`

## 🌐 Despliegue en Vercel

### Configuración Automática

1. Conecta tu repositorio de GitHub con Vercel
2. Vercel detecta automáticamente que es un proyecto Next.js
3. Configura las variables de entorno en el dashboard de Vercel:
   - `NEXT_PUBLIC_API_URL`: URL de tu API en producción

### Comandos de Build

```bash
# Build de producción
npm run build

# Iniciar servidor de producción
npm start
```

### URL de Producción
La aplicación se despliega automáticamente en cada push a la rama `main` y está disponible en la URL proporcionada por Vercel.

## 📝 Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Genera build de producción
npm start            # Inicia servidor de producción
npm run lint         # Ejecuta ESLint
```

## 🎨 Guía de Estilos

El proyecto utiliza Tailwind CSS con un sistema de diseño consistente:
- **Colores**: Paleta personalizable mediante CSS variables
- **Tipografía**: Sistema de tamaños responsive
- **Componentes**: Basados en Radix UI con estilos personalizados
- **Modo Oscuro**: Soporte nativo para tema claro/oscuro

## 📄 Licencia

Este proyecto es parte de un trabajo académico universitario.

---

# Prototipo

## Perfil Estudiante 

- Inicio de Sesión y pantalla inicial "Resumen"

<img width="1344" height="601" alt="image" src="https://github.com/user-attachments/assets/d1e64817-2377-479c-992e-f5a3923f57fc" />

- Horario y Solicitudes

<img width="1142" height="668" alt="image" src="https://github.com/user-attachments/assets/a8a660f1-3497-427f-88a4-ae3634abe4d0" />

- Selección del Botón "Nueva solicitud"
  
Opciones de "Agregar" y "Retirar"

<img width="3413" height="3810" alt="SHIRA - Ejemplo de estructura de bloques de sitio web" src="https://github.com/user-attachments/assets/381f5924-bf21-4e6b-b396-efd79fcb8200" />

Opcion de "Cambiar"

<img width="1725" height="4538" alt="SHIRA - 2" src="https://github.com/user-attachments/assets/a01884d6-c59b-48e8-a470-410485ad222c" />

## Perfil Decanatura

- Inicio de Sesión y pantalla inicial "Resumen"

<img width="1146" height="760" alt="image" src="https://github.com/user-attachments/assets/4be65ffc-2973-4e1a-9f7b-c89f34528d6e" />

- Selección de "Solicitudes" y Botón de "Aprobar" o "Rechazar"
  
<img width="1262" height="601" alt="image" src="https://github.com/user-attachments/assets/eb1dc90d-c09f-4e11-b955-848bc77f89dc" />

- Selección de "Capacidad" y "Estadística"
  
<img width="956" height="627" alt="image" src="https://github.com/user-attachments/assets/da76194f-fe7f-44a3-9ac7-8c365a01be57" />

## Perfil de Administrativos

- Inicio de Sesión y pantalla inicial "Resumen"

<img width="1278" height="689" alt="image" src="https://github.com/user-attachments/assets/5f2f2ce7-0dc1-4b7a-820b-77d01e325cad" />

- Selección de "Materias" y Botón de "Nueva Materia"

<img width="1473" height="583" alt="image" src="https://github.com/user-attachments/assets/57002ef5-5656-4b49-a784-5d5c848359d1" />

- Selección de "Materias" y Botón de "Nueva Materia"

<img width="921" height="635" alt="image" src="https://github.com/user-attachments/assets/3d930ecc-1dbb-48b4-bf5b-54d61f43d39f" />

- Selección de "Profesores" y Botón de "Nueva Profesor"

<img width="1210" height="727" alt="image" src="https://github.com/user-attachments/assets/65ba606e-9dd9-45e5-96a9-c497c2eafb56" />

- Selección de "Configuración"

<img width="436" height="605" alt="image" src="https://github.com/user-attachments/assets/ac4f2b09-2209-4dbc-8b11-92994bf6637a" />






