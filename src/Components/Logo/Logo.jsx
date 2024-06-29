import React, { useEffect, useState, useMemo } from "react";
import "./Logo.css";

let Logo_ = require("../../Assets/Logo.svg").default;
let Logomark = require("../../Assets/Logomark.svg").default;
let LogoA = require("../../Assets/Logo action.svg").default;
let LogomarkA = require("../../Assets/Logomark action.svg").default;

export default function Logo({ isFull }) {
  return (
    <div className={`${isFull ? "FullLogoContainer" : "logoContainer"}`}>
      <img
        className="logo"
        alt="focushive logo"
        src={isFull ? Logomark : Logo_}
      />
      <img
        className="logoA"
        alt="focushive logo"
        src={isFull ? LogomarkA : LogoA}
      />
    </div>
  );
}