export type Empresas = 'Multired' | 'Servired' | 'Multired Y Servired'

export interface User {
  cc_persona: string
  nombre_persona: string
  apellido_persona: string
  id_empresa: string
  id_cargo: string
  id_proceso: string
  id_rol: string
  username: string
  password: string
  id_estado: string
  empresa: Empresa
  rol: Rol
  cargo: Cargo
  proceso: Proceso
}

export interface Cargo {
  id_cargo: string
  nombre_cargo: string
}

export interface Empresa {
  id_empresa: string
  nombre_empresa: Empresas
}

export interface Proceso {
  id_proceso: string
  nombre_proceso: string
}

export interface Rol {
  id_rol: string
  nombre_rol: string
}
