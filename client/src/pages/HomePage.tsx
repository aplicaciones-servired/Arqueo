import { useAuth } from '../auth/AuthProvider'
import { CambiarCompany } from '../components/DefineCompany'
import DahsBoard from '../components/DashBoard'
import { type Empresa } from '../types/user'

function EmpresaPage (): JSX.Element {
  const { username } = useAuth()
  const company = username.nombre_empresa!

  return (
    <>
    {
         company === 'Multired Y Servired'
           ? (<CambiarCompany />)
           : (<DahsBoard company={company}/>)
    }
    </>
  )
}

export default EmpresaPage
