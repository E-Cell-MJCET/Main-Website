// import { Resend } from "resend";
// import { NextRequest, NextResponse } from "next/server";

// interface EmailRequestBody {
//   to: string;
//   subject: string;
//   html: string;
// }

// export const runtime = "edge";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: NextRequest) {
//   try {
//     const { to, subject, html }: EmailRequestBody = await req.json();

//     const response = await resend.emails.send({
//       from: "noreply@ecellmjcet.com",
//       to,
//       subject,
//       html,
//     });
//     console.log("Email sent successfully:", response);

//     return NextResponse.json(
//       { message: "Email sent", response },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       { error: "Failed to send email" },
//       { status: 500 }
//     );
//   }
// }

// export function GET() {
//   return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
// }
