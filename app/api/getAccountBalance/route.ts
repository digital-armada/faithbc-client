import twilio from "twilio";
import { NextResponse } from "next/server";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid as string, authToken as string);

export async function GET() {
  try {
    const balance = await client.api.v2010
      .accounts(accountSid as string)
      .balance.fetch();
    return NextResponse.json(
      { balance: balance.balance, currency: balance.currency },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch account balance" },
      { status: 500 },
    );
  }
}
