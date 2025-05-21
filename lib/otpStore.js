const otpStore = new Map(); // phone -> { code, expiresAt }

export function storeOtp(phone, code) {
    otpStore.set(phone, {
        code,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 mins
    });
}

export function verifyOtp(phone, code) {
    const record = otpStore.get(phone);
    if (!record) return false;
    const isValid = record.code === code && Date.now() < record.expiresAt;
    if (isValid) otpStore.delete(phone); // one-time use
    return isValid;
}
