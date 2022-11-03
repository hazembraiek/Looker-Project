import React from "react";

function Button({ icon, label, onClick = () => {}, className }) {
  return (
    <div className={`button-container ${className}`} onClick={onClick}>
      <div className="button-container-content">
        <img src={icon} alt="error" />
        <p>{label}</p>
      </div>
    </div>
  );
}

export default Button;
