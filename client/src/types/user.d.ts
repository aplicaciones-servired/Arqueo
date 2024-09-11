export type Empresa = 'Multired' | 'Servired' | 'Multired Y Servired'

export interface User {
  [x: string]: string
  cc_persona: string
  nombre_persona: string
  apellido_persona: string
  id_empresa: string
  username: string
  password: string
  nombre_cargo: string
  nombre_empresa?: Empresa
  nombre_persona: string
  nombre_proceso: string
  nombre_rol: string
}
