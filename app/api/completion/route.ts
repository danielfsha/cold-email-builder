import { streamText } from "ai";
import { google } from "@ai-sdk/google";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash-001"),
    prompt,
  });

  return result.toDataStreamResponse();
}
