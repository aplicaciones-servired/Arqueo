import React from 'react'
import { useAuth } from '../auth/AuthProvider'
import { CambiarCompany } from '../components/DefineCompany'
import DashBoard from '../components/DashBoard'

function EmpresaPage (): JSX.Element {
  const { username } = useAuth() // Obtén el objeto user desde useAuth
  const company = username.empresa // Accede a empresa desde user

  console.log('Empresa seleccionada:', company.nombre_empresa)

  return (
    <>
      {company.nombre_empresa === 'Multired Y Servired'
        ? (
        <CambiarCompany />
          )
        : (
        <DashBoard company={company} />
          )}
    </>
  )
}

export default EmpresaPage
