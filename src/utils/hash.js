import bcrypt from "bcrypt"
const SALT_ROUNDS = 10

//Recibe una contraseña original y devuelve un hash
export const createHash = async (password)=>{
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export const isValidPassword = async(password, hashedPassword) =>{
    return await bcrypt.compare(password, hashedPassword)
}