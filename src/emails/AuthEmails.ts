import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const sender = {
      address: "hello@example.com",
      name: "UpTask George",
    };

    const info = await transporter.sendMail({
      from: sender,
      to: user.email,
      subject: "Uptask - Confirma tu cuenta",
      text: "Uptask - Confirma tu cuenta",
      html: `<p>Hola ${user.name}, has creado tu cuenta en UpTask, ya casi esta todo listo, 
      solo debes confirmar tu cuenta</p>
        <p>Visita el siguiente enlace:</p>
        <a href=""> Confirmar cuenta</a>
        <p>E ingresa el codigo: <b>${user.token}</b></p>
        <p>Este token expira en 10 minutos</p> 
      `,
    });
    console.log("Mensaje enviado", info.messageId);
    
  };
}
