import React from "react";

export const Input = ({value, setValue, placeholder}) => {
    return <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            className="input" />;
}