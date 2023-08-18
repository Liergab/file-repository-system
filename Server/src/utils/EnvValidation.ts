import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv( process.env, {
    PORT :port(),
    MONGODB_CONNECTION_STRING :str(),
    JWT_SECRET :str(),
})