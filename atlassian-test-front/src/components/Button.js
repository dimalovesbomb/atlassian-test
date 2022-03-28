import React from "react";

export const Button = ({label, onClickHandler, disabled}) => {
    return <button onClick={onClickHandler} disabled={disabled} className="button">{label}</button>;
}