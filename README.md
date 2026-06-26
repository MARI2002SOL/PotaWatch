# PotaWatch

Plataforma web para la trazabilidad sanitaria de puestos ambulantes de ceviche de pota en Lima. Permite consultar el estado de los puestos, registrar vendedores, enviar reportes ciudadanos y gestionar inspecciones municipales.

Proyecto académico de Ingeniería de Software desarrollado con metodología Scrum.

## Problema

Los puestos ambulantes de ceviche de pota operan con frecuencia sin control sanitario, sin cadena de frío garantizada y a veces sin licencia. No existe un mecanismo público de trazabilidad sobre su estado sanitario o legal.

## Solución

PotaWatch centraliza el registro de puestos, habilita reportes ciudadanos sobre incidentes y publica el estado sanitario verificado por inspectores.

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | React 19, TypeScript, Vite 6 |
| Estilos | Tailwind CSS 4 |
| Backend | Supabase (PostgreSQL, Auth, RLS) |
| Routing | React Router 7 |
| CI/CD | GitHub Actions |
| Testing | Jest (configurado) |

## Requisitos previos

- Node.js 20+
- npm
- Proyecto Supabase con el esquema de base de datos configurado (tablas, RLS, triggers y funciones)

## Instalación

```bash
git clone https://github.com/MARI2002SOL/PotaWatch.git
cd PotaWatch
npm install
```

## Variables de entorno

Copia el archivo de ejemplo y completa con las credenciales de tu proyecto Supabase:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

> La anon key es pública por diseño; la seguridad está en las políticas RLS de Supabase. **Nunca** uses la service role key en el frontend.

## Ejecución local

```bash
# Servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa del build
npm run preview
```

La app estará disponible en `http://localhost:5173`.

## Datos de prueba

Usuarios precargados en Supabase para pruebas del MVP:

| Rol | Email | Contraseña | Nombre completo |
|-----|-------|------------|-----------------|
| Vendedor | `carlos.quispe@potawatch.com` | `Test1234!` | Carlos Quispe Mamani |
| Inspector | `lucia.flores@potawatch.com` | `Test1234!` | Lucía Flores Ramos |
| Ciudadano | `ana.torres@potawatch.com` | `Test1234!` | Ana Torres Vilca |

> Los roles `vendedor` e `inspector` se asignan manualmente en la tabla `profiles` de Supabase. El registro público siempre crea usuarios con rol `ciudadano`.

## Rutas de la aplicación

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Público | Página de inicio |
| `/buscar` | Público | Búsqueda de puestos por nombre o distrito |
| `/puesto/:id` | Público | Ficha pública con estado sanitario |
| `/login` | Público | Inicio de sesión |
| `/registro` | Público | Registro de ciudadano |
| `/reportes/nuevo` | Ciudadano, Vendedor | Enviar reporte sobre un puesto |
| `/vendedor` | Vendedor | Registrar y ver puestos propios |
| `/inspector` | Inspector, Admin | Panel de inspección |
| `/admin` | Admin | Panel de administración |

## Historias de usuario implementadas

| ID | Descripción |
|----|-------------|
| US-01 | Registro con email y contraseña |
| US-02 | Inicio de sesión con redirección por rol |
| US-07 | Registro de puesto ambulante (vendedor) |
| US-13 | Reporte ciudadano sobre un puesto |
| US-25 | Búsqueda pública de puestos |
| US-26 | Ficha pública de un puesto |

## Roles del sistema

| Rol | Permisos principales |
|-----|---------------------|
| **Visitante** | Consultar puestos sin sesión |
| **Ciudadano** | Enviar reportes sobre puestos |
| **Vendedor** | Registrar su puesto y enviar reportes |
| **Inspector** | Gestionar reportes y actualizar estado sanitario |
| **Admin** | Acceso al panel de administración |

## Estructura del proyecto

```
src/
├── components/
│   ├── auth/          # Formularios de login y registro
│   ├── layout/        # AppLayout, navbar, footer
│   ├── puestos/       # Búsqueda, ficha pública, registro
│   └── reportes/      # Formulario de reporte ciudadano
├── contexts/          # AuthContext (sesión y perfil)
├── hooks/             # useAuth
├── lib/               # Cliente Supabase
├── pages/             # Páginas por ruta
├── routes/            # Router y guards (ProtectedRoute, RoleRoute)
├── services/          # Llamadas a Supabase
├── types/             # Tipos TypeScript
└── constants/         # Constantes y validaciones
```

## Supabase — notas importantes

- El esquema de base de datos **no debe modificarse** desde el frontend.
- Las tablas principales son: `profiles`, `puestos`, `reportes`.
- La función RPC `count_reportes_activos` limita a 3 reportes activos por ciudadano y puesto.
- La función RPC `actualizar_estado_sanitario` es usada por inspectores para actualizar puestos.

### Configuración recomendada para desarrollo

En **Authentication → Providers → Email**, desactiva **Confirm email** para evitar bloqueos por rate limit durante las pruebas.

## Licencia

Proyecto académico — uso educativo.
