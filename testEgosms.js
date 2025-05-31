import axios from "axios";

async function sendTestSms() {
    const url = new URL("https://www.egosms.co/api/v1/plain/");
    url.searchParams.set("username", "Iventics");
    url.searchParams.set("password", "756824563@Mm");
    url.searchParams.set("to", "256782330038");
    url.searchParams.set("message", "Test SMS");

    try {
        const res = await axios.get(url.toString());
        console.log("Response data:", res.data);
    } catch (err) {
        console.error("Error sending SMS:", err.message);
    }
}

sendTestSms();
