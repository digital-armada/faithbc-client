import { NextResponse } from "next/server";
import twilio from "twilio";

// const recipients = ["+61402232848"];

export async function POST(request: Request) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  try {
    const requestData = await request.json();
    const { number, message } = requestData;
    console.log(number);
    const sendSMS = (recipient: string) =>
      client.messages.create({
        body: message,
        from: "+16592396677",
        to: recipient,
      });

    const promises = number.map(sendSMS);
    await Promise.all(promises);

    return NextResponse.json(
      { success: true, message: "SMS sent to all recipients" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
