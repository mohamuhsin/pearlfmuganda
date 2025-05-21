// lib/twilio.js
import twilio from 'twilio';

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export async function sendOtpSms(to, otp) {
    try {
        const message = await client.messages.create({
            body: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to,
        });
        return message.sid;
    } catch (error) {
        console.error('Twilio send error:', error.message);
        throw new Error('Failed to send OTP');
    }
}
