// app/api/sms-status/route.js

export async function POST(req) {
    const body = await req.formData(); // Twilio sends data as x-www-form-urlencoded

    const messageSid = body.get("MessageSid");
    const messageStatus = body.get("MessageStatus");
    const to = body.get("To");
    const from = body.get("From");
    const errorCode = body.get("ErrorCode");
    const errorMessage = body.get("ErrorMessage");

    console.log("🔔 Twilio SMS Status Update:");
    console.log({ messageSid, messageStatus, to, from, errorCode, errorMessage });

    // Optionally: save to DB or alert admin if status is 'failed'
    if (messageStatus === "failed" || messageStatus === "undelivered") {
        // send alert or log critical issue
    }

    return new Response("Status received", { status: 200 });
}
