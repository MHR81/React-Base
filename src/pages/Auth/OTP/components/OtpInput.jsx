import { useState, useRef } from "react";

export default function OtpInput({
    length = 6,
    value = "",
    onChange = () => { }
}) {
    const [otp, setOtp] = useState(value ? value.split("") : Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        onChange(newOtp.join(""));

        if (value && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div dir="ltr" className="flex gap-2">
            {Array.from({ length }, (_, i) => (
                <input
                    key={i}
                    ref={(el) => inputRefs.current[i] = el}
                    type="text"
                    maxLength="1"
                    value={otp[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-8 h-8 sm:w-10 sm:h-10 text-center sm:text-xl font-semibold border border-gray-300 rounded"
                />
            ))}
        </div>
    );
}