"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

export default function SendSMS({
  sms,
  failedNumbers,
}: {
  sms: string;
  failedNumbers: string[];
}) {
  const [number] = useState(sms.split(","));
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null); // Reset response state

    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number, message }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse({ success: true, message: "SMS sent successfully" });
      } else {
        setResponse({ success: false, message: data.error });
      }
    } catch (error) {
      setResponse({ success: false, message: "An error occurred" });
    }

    setLoading(false);
  };

  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle>Send SMS</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="min-h-[100px]"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send SMS"}
          </Button>
        </form>
        {response && (
          <Alert
            variant={response.success ? "default" : "destructive"}
            className="mt-4"
          >
            {response.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertDescription>{response.message}</AlertDescription>
          </Alert>
        )}
        {failedNumbers.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium">
              These users will not receive an text due to missing or invalid
              phone numbers:
            </h4>
            <ul className="list-inside list-disc">
              {failedNumbers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
