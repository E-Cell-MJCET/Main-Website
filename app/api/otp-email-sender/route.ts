import { NextResponse } from "next/server";
import { Resend } from "resend";

import { OTP_EMAIL_TEMPLATE } from "@/helpers/EmailTemplates";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Replace placeholder in template
    const htmlContent = OTP_EMAIL_TEMPLATE.replace("{otp}", otp);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject:
        "🔐 Your OTP for eCell MJCET Account Verification (Valid for 5 Minutes)",
      html: htmlContent,
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
