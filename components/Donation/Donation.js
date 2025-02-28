// components/Donation.js

"use client";

import { useState } from "react";
import Background from "./Background";
import Header from "./Header";
import Statement from "./Statement";
import QuranVerse from "./QuranVerse";
import AmountCollected from "./AmountCollected";
import Button from "./Button";

export default function Donation() {
    const [amount, setAmount] = useState(1200);

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-0">
            <Background />
            <div className="relative z-10 px-6 py-12 sm:px-16 flex flex-col items-center justify-center w-full h-full space-y-8 text-center">
                <Header />
                <Statement />
                <QuranVerse />
                <AmountCollected amount={amount} />
                <Button />
            </div>
        </section>
    );
}
