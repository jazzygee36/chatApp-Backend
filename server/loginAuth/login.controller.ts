import { Request, Response } from "express"
import UserSchema from './login.schema'

export const UserResgister = async(req: Request, res: Response) => {
try{
    const body = req.body
    const user = await UserSchema.create(body)
    return res.status(200).json(user)

}catch(error){
    return res.status(500).send(error)
}
}