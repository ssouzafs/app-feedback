export interface ISendMailDataType {
  subject: string;
  body: string;
}

export interface IMailAdapter {
  sendMail: (data: ISendMailDataType) => Promise<void>;
}