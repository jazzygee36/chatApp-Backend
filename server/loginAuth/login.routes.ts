import express from 'express'
import { UserResgister } from './login.controller'
const route = express.Router()

route.post('/register', UserResgister)

export default route