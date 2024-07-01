import React from "react";
import "./Logo.css";

// Default Logo
let Logo_ = require("../../Assets/Logo.svg").default;
let Logomark = require("../../Assets/Logomark.svg").default;

// Wing is open
let LogoA = require("../../Assets/Logo action.svg").default;
let LogomarkA = require("../../Assets/Logomark action.svg").default;

// White Logo
let Logo_wh = require("../../Assets/Logo white.svg").default;
let Logomark_wh = require("../../Assets/Logomark white.svg").default;

// White Logo + Wing is open
let LogoA_wh = require("../../Assets/Logo white action.svg").default;
let LogomarkA_wh = require("../../Assets/Logomark white action.svg").default;

export default function Logo({ isFull, isWhite }) {
  const getLogoSrc = () => {
    if (isFull && isWhite) return Logomark_wh;
    if (isFull && !isWhite) return Logomark;
    if (!isFull && isWhite) return Logo_wh;
    return Logo_;
  };

  const getActionLogoSrc = () => {
    if (isFull && isWhite) return LogomarkA_wh;
    if (isFull && !isWhite) return LogomarkA;
    if (!isFull && isWhite) return LogoA_wh;
    return LogoA;
  };

  return (
    <div className={`${isFull ? "FullLogoContainer" : "logoContainer"}`}>
      <img className="logo" alt="focushive logo" src={getLogoSrc()} />
      <img className="logoA" alt="focushive logo" src={getActionLogoSrc()} />
    </div>
  );
}
