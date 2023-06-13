import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({ email, password }: AuthRequest){
        // verificar se o e-mail já existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("User or password incorrect!")
        }
        // verificar se a senha enviada via post está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("User or password incorrect!")
        }
        
        // gerar um token JWT e devolver os dados do usuário como ID, name e email
        // se o "usuário" chegou até aqui, vamos gerar um token de autenticação
        const token = sign(
            {
                name: user.name,
                email: user.email, 
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
            };    
    }
}

export { AuthUserService };