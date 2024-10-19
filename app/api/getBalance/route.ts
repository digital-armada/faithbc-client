import twilio from "twilio";
import { NextResponse } from "next/server";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid!, authToken!);

export async function GET() {
  try {
    const balanceData = await client.api.v2010.accounts(accountSid!).fetch();
    return NextResponse.json({ balance: balanceData.balance }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 },
    );
  }
}
