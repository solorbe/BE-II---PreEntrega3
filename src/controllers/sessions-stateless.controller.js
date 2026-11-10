import { config } from '../config/config.js';
import { SessionsService } from '../services/sessions.services.js';

export class SessionsStatelessController {
  static login = async (req, res) => {
    try {
      const token = await SessionsService.loginStateLess(req.body ?? {});
      res.cookie('currentUser', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: config.nodeEnv === 'production',
        maxAge:  60 * 60 * 1000,
      });
      res.status(200).json({ status: 'success', message: 'Login Correcto' });
    } catch (error) {
      //Errores esperados del servicio
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
      }

      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor',
      });
    }
  };

  static current = async (req, res) => {
    res.status(200).json({ status: 'success', payload: req.user });
  };

  static logout = async (req, res) => {
  try {
    res.clearCookie('currentUser', {
      httpOnly: true,
      sameSite: 'lax',
      secure: config.nodeEnv === 'production',
    });

    return res.status(200).json({
      status: 'success',
      message: 'Sesión cerrada correctamente',
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error al cerrar sesión',
    });
  }
};
}
