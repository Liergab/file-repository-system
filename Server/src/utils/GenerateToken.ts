import jwt from 'jsonwebtoken'
import env from '../utils/EnvValidation'

type propsId = {
    id:string
}
const generateToken = (id:propsId) => {
   return jwt.sign({id},env.JWT_SECRET,{expiresIn:'5d'})

}

export default generateToken