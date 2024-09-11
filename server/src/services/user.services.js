import { getPoolLogin } from '../connections/dbLogin.js';

export const LoginService = async (data) => {
  const { username, password } = data;

  if (!username || !password) {
    throw new Error('El Usuario / Contraseña Son Requeridos');
  }

  const pool = await getPoolLogin();
  const [result] = await pool.query(
    'SELECT * FROM Personas p ' +
    'inner join empresa e on p.id_empresa=e.id_empresa ' +
    'inner join Login_Rol r on p.id_rol=r.id_rol ' +
    'inner join Cargos c on p.id_cargo=c.id_cargo ' +
    'inner join Procesos proc on p.id_proceso=proc.id_proceso ' +
    'WHERE username = ? AND id_estado = 1',
    [username]
  );

  if (result.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  if (result[0].username !== username) {
    throw new Error('Usuario incorrecta');
  }

  if (result[0].password !== password) {
    throw new Error('Contraseña incorrecta');
  }

  return result[0];
};
