import { useAuth } from '../auth/AuthProvider'
import { CambiarCompany } from '../components/DefineCompany'
import DashBoard from '../components/DashBoard'

function EmpresaPage (): JSX.Element {
  const { username } = useAuth()
  const empresa = username?.company ?? ''

  console.log('Empresa seleccionada:', empresa)

  return (
    <>
      {(empresa === 'Servired' || empresa === 'Multired')
        ? (
          <DashBoard zona={username} />
          )
        : (
          <CambiarCompany />
          )}
    </>
  )
}

export default EmpresaPage
