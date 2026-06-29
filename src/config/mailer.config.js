import { ENVIRONMENT } from "./environment.config.js";
import nodemailer from 'nodemailer'

/* ============================================================================
   Configuracion del transporte de mails con nodemailer.

   Usamos Gmail como servicio de envio. Las credenciales salen del .env:
     - GMAIL_USERNAME: la direccion de Gmail desde la que se envia.
     - GMAIL_PASSWORD: NO es la contrasena normal de la cuenta, sino una
       "App Password" (contrasena de aplicacion) de 16 caracteres que se genera
       en la configuracion de seguridad de Google (requiere verificacion en 2
       pasos activada). Gmail no deja usar la pass comun por seguridad.

   Este "mailer_transport" se importa donde haga falta enviar mails
   (ej: el mail de verificacion en register, o el aviso de entrevista al director)
   y se usa con: mailer_transport.sendMail({ to, from, subject, html }).
   ============================================================================ */
const mailer_transport = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: ENVIRONMENT.GMAIL_USERNAME,
            pass: ENVIRONMENT.GMAIL_PASSWORD
        }
    }
)

export default mailer_transport
