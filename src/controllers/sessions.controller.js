import { SessionsService } from "../services/sessions.services.js";

export class SessionsController {
  static register = async (req, res) => {
    try {
      const userData = req.body;
      const newUser = await SessionsService.register(userData);

      //Respondemos 201 porque se creo un recurso
      res.status(201).json({
        status: "succes",
        payload: newUser,
      });
    } catch (error) {
      //MongoDB utiliza el codigo 11000 para indicar una violacion de un indice unico
      if (error.code === 11000) {
        return res.status(409).json({
          status: "error",
          message: "El email ya esta registrado",
        });
      }
      //Errores esperados del servicio
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }
    }

    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
    });
  };
}
