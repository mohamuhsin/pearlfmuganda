export default function PaymentSolutionNote() {
    return (
        <div className="mt-8 flex justify-center items-center text-base md:text-lg text-gray-600 font-semibold bg-white p-4 rounded-lg shadow-lg max-w-3xl mx-auto">
            <div className="w-full text-center space-y-3">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 border-b pb-2">
                    How to Contribute
                </h3>
                <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                    <p className="text-lg font-medium text-gray-700">
                        <strong>Note:</strong> Dial <strong>*165*3#</strong> (MTN) or{" "}
                        <strong>*185*9#</strong> (Airtel), enter the merchant code, amount
                        and confirm with your PIN.
                    </p>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                    <strong>Barakallahu fikum!</strong> Thank you for your contribution!
                </p>
            </div>
        </div>
    );
}
