import { lazy, Suspense } from 'react'

import { useAuth } from '../auth/AuthProvider'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import NavBar from '../components/NavBar'

const LoginPage = lazy(async () => await import('../pages/LoginPage'))

function Root (): JSX.Element {
  const { username, isAuthenticated } = useAuth()

  if ((username?.username?.length === 0) || !isAuthenticated) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    )
  }

  return (
    <section >
      <NavBar />
      <main className='w-full'>
        <Outlet />
      </main>
      <Toaster position='top-right' duration={5000} visibleToasts={4} richColors />
    </section>
  )
}

export default Root
