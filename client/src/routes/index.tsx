import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Root from './Root'

const ArqueoForm = lazy(async () => await import('../pages/ArqueoForm'))
const EmpresaPage = lazy(async () => await import('../pages/HomePage'))
const ProgramacionPage = lazy(async () => await import('../pages/Programacion'))
const ProgramacionMesPage = lazy(async () => await import('../pages/ProgramacionMes'))
const InformePage = lazy(async () => await import('../components/Informe'))

export const BrowserRouters = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/home',
        element: <Suspense fallback={<div>Loading...</div>}><EmpresaPage /></Suspense>
      },
      {
        path: '/home/arqueo/:zona/:id',
        element: <Suspense fallback={<div>Loading...</div>}><ArqueoForm /></Suspense>
      },
      {
        path: '/Programacion',
        element: <Suspense fallback={<div>Loading...</div>}><ProgramacionPage /></Suspense>
      },
      {
        path: '/ProgramacionMes',
        element: <Suspense fallback={<div>Loading...</div>}><ProgramacionMesPage /></Suspense>
      },
      {
        path: '/informe',
        element: <Suspense fallback={<div>Loading...</div>}><InformePage /></Suspense>
      }
    ]
  }
])
