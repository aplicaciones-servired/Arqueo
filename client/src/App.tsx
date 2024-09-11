import { ProtectedRoute } from './components/ProtectedRoutes'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from './auth/AuthProvider'
import Login from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ArqueoForm from './pages/ArqueoForm'

function App (): JSX.Element {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<ProtectedRoute isAllowed={!isAuthenticated} redirectTo='/' />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/arqueo/:id" element={<ArqueoForm />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
