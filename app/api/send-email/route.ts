import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type MailPayload = {
  fromEmail: string;
  subject: string;
  message: string;
};

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "andrewdangbusiness@gmail.com";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<MailPayload>;
    const fromEmail = (body.fromEmail || "").trim();
    const subject = (body.subject || "").trim();
    const message = (body.message || "").trim();

    if (!isValidEmail(fromEmail)) {
      return NextResponse.json({ ok: false, error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!subject) {
      return NextResponse.json({ ok: false, error: "Subject is required." }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ ok: false, error: "Message is required." }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      return NextResponse.json(
        {
          ok: false,
          error: "Mail server is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || user,
      to: CONTACT_EMAIL,
      replyTo: fromEmail,
      subject: `[Portfolio Contact] ${subject}`,
      text: `From: ${fromEmail}\n\n${message}`,
      html: `<p><strong>From:</strong> ${fromEmail}</p><p>${message.replace(/\n/g, "<br />")}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to send email." }, { status: 500 });
  }
}
