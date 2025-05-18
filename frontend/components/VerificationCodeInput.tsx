"use client";
import { useState } from "react";

export default function VerificationCodeInput({ onChange }: { onChange: (code: string) => void }) {
    const [code, setCode] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
        setCode(value);
        onChange(value);
    };

    return (
        <div>
            <label className="text-base font-medium text-gray-900">Verification Code</label>
            <input
                type="text"
                name="code"
                value={code}
                onChange={handleChange}
                maxLength={6}
                pattern="[0-9]{6}"
                required
                className="block w-full p-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white tracking-widest text-center"
                placeholder="Enter 6-digit code"
            />
        </div>
    );
}
