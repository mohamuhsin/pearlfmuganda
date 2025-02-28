import clsx from "clsx"; // Install clsx if you haven't: npm install clsx

export default function TabButton({ activeTab, setActiveTab, tab }) {
    const tabLabels = {
        mobileMoney: "Mobile Money",
        sendWave: "Send Wave International",
        bankTransfer: "Bank Transfer",
    };

    return (
        <button
            className={clsx(
                "flex-1 p-2",
                activeTab === tab
                    ? "bg-[#fec76f] text-[#030269] border-b-2 border-[#fec76f] font-bold"
                    : "text-gray-500"
            )}
            onClick={() => setActiveTab(tab)}
        // Adds accessibility for screen readers
        >
            {tabLabels[tab]}
        </button>
    );
}
