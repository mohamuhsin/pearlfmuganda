import axios from "axios";
import qs from "querystring";

function sanitizePhoneNumber(number) {
    return number.replace(/^\+/, ""); // Remove leading '+' from +2567XXXXXXXX
}

export async function sendOtpSms(to, otp) {
    try {
        const sanitizedNumber = sanitizePhoneNumber(to);
        const encodedNumber = `%2B${sanitizedNumber}`; // Encode +2567... as %2B2567...
        const message = `Your OTP for the Ekkula Awards Vote Verification is ${otp}. It expires in 5 minutes. Pearl FM: +256752111012`;

        const queryParams = qs.stringify({
            username: process.env.EGOSMS_USERNAME,
            password: process.env.EGOSMS_PASSWORD,
            number: encodedNumber,
            message: encodeURIComponent(message),
            sender: "Iventics",
            priority: 1,
        });

        const url = `https://www.egosms.co/api/v1/plain/?${queryParams}`;

        const response = await axios.get(url);

        if (
            typeof response.data !== "string" ||
            !response.data.toLowerCase().includes("ok")
        ) {
            throw new Error(`EgoSMS failed: ${response.data}`);
        }

        return response.data;
    } catch (error) {
        console.error("Failed to send OTP via EgoSMS:", error.message);
        throw new Error("Failed to send OTP");
    }
}
