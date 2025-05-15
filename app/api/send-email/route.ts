import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY isn't set");
}

const resend = new Resend(RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "daniel <onboarding@resend.dev>",
      to: ["developedbydanielfisseha@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate() as React.ReactNode,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
