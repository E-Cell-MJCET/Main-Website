import { NextResponse } from "next/server";
import { Resend } from "resend";

import { WELCOME_EMAIL_TEMPLATE } from "@/helpers/EmailTemplates";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject:
        "🚀 Unlock Your Personal Portfolio Dashboard at eCell MJCET - Let`s Get Started!",
      html: WELCOME_EMAIL_TEMPLATE,
    });

    if (error) {
      console.error("Resend API error:", error);

      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
