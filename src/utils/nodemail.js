import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "jefftechhub@gmail.com",
    pass: "jxdl vvqh tyrl hmox",
  },
});

export async function main(names) {
  const info = await transporter.sendMail({
    from: '"Message From Makodede Contact Form" <jefftechhub@gmail.com>',
    to: "jefftechhub@gmail.com",
    subject: "Contacts",
    html: `<b>You have a new message from ${names}</b>`,
  });
}
