import { useEffect, useRef } from "react";

export default function Backdrop({ onClose }) {
    const backdropRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    const handleCloseBackdrop = (e) => {
        if (e.target === backdropRef.current) {
            onClose();
        }
    };

    useEffect(() => {
        backdropRef.current?.focus();
    }, []);

    return (
        <div
            ref={backdropRef}
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
            onClick={handleCloseBackdrop}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        />
    );
}
