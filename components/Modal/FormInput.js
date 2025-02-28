export default function FormInput({
    label,
    value,
    onChange,
    type = "text",
    placeholder,
}) {
    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={label}
                className="text-[#1a1a1a] font-medium text-left text-base"
            >
                {label}
            </label>
            <input
                id={label}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border p-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#fec76f]"
            />
        </div>
    );
}
