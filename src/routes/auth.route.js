import express from 'express'
import authController from '../controllers/auth.controllers.js'

/* ============================================================================
   Rutas de autenticacion. Se montan en main.js bajo el prefijo /api/auth,
   asi que las rutas finales quedan:
     POST /api/auth/register      -> crear cuenta
     GET  /api/auth/verify-email  -> verificar email (link del mail)
     POST /api/auth/login         -> iniciar sesion

   Ninguna de estas rutas lleva authMiddleware: son justamente las que se usan
   ANTES de tener un token (registrarse, verificar, loguearse).
   ============================================================================ */
const authRouter = express.Router()

/* Registro de un nuevo usuario (recibe nombre, email, password, role) */
authRouter.post(
    '/register',
    authController.register
)

/* Verificacion de email. Recibe el token por query (?verification_token=...)
   y al final redirige al frontend. */
authRouter.get(
    '/verify-email',
    authController.verifyEmail
)

/* Login. Recibe email y password, devuelve un JWT si todo es correcto. */
authRouter.post(
    '/login',
    authController.login
)

export default authRouter
