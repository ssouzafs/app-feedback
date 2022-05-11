import { IMailAdapter, ISendMailDataType } from "../MailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5401e50d1cd116",
    pass: "48f7a30cb7fa2c"
  }
});

export class NodeMailerMailAdapter implements IMailAdapter {

  /**
   * Send mail with library extern nodemailer
   * @param param 
   */
  async sendMail({ subject, body }: ISendMailDataType) {
    await transport.sendMail({
      from: 'Equipe de Teste <support@contato.com>',
      to: 'Sérgio Souza <ssouzafs.contato@gmail.com>',
      subject,
      html: body
    });
  }
}