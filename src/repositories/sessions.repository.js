import { UsersDAO } from "../dao/users.dao.js";
export class UsersRepository{
    static findeByEmail = async(email)=>{
        return await UsersDAO.findByEmail(email)
    }

    static create = async (userData) =>{
        return await UsersDAO.create(userData)
    }
}