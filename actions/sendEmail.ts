'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const receiverEmail = 'nanyangcn@gmail.com';

export interface Email {
  senderEmail: string;
  subject: string;
  text: string;
}

const emailContent = (from: string, text: string) => {
  const htmlText = text.replace(/\n/g, '<br>');
  return `
  <h1>From: <a href="mailto:${from}">${from}</a></h1>
  <p>${htmlText}</p>
  `;
};

const sendEmail = async (values: Email) => {
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: receiverEmail,
      subject: values.subject,
      html: emailContent(values.senderEmail, values.text),
    });
    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export default sendEmail;
