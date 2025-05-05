import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EmailRequestBody {
  to: string;
  subject: string;
  html: string;
}

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html }: EmailRequestBody = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ecellmjcet@mjcollege.ac.in",
        pass: "xkehbygqtafwfvkp", // Prefer using environment variables
      },
    });

    const mailOptions = {
      from: "ecellmjcet@mjcollege.ac.in",
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
