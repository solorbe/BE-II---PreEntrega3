import { UserModel } from "../models/users.model.js";

export class UsersDAO {
  //Busca un usuario por su email
  static findByEmail = async (email) => {
    return await UserModel.findOne({ email });
  };
  //Guarda un nuevo documente de usuario en MongoDB
  static create = async (userData) => {
    return await UserModel.create(userData);
  };
}