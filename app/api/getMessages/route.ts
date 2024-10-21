import twilio from "twilio";
import { NextResponse } from "next/server";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export async function GET() {
  try {
    const messages = await client.messages.list({ limit: 100 }); // Adjust the limit as necessary

    const totalCost = messages.reduce(
      (acc, message) => acc + parseFloat(message.price || "0"),
      0,
    );

    return NextResponse.json(
      { count: messages.length, totalCost },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}
