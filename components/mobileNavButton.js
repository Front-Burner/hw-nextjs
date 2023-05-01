import React, { useState } from "react";

export default function MobileNavButton({}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className="w-10 h-5 flex flex-col justify-between items-center "
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-row">
        <span
          className={` h-0.5 bg-white transition-all transform  w-[18px] rotate-[14deg] translate-y-[-2px] translate-x-[2px] ${
            isOpen
              ? "rotate-[23deg] translate-y-[-4px] w-[18px] translate-x-[2px]"
              : "rotate-[14deg]"
          }`}
        ></span>
        <span
          className={`w-[22px] h-0.5 bg-white transition-all transform ${
            isOpen ? "rotate-[5deg] translate-x-[-1px]" : "rotate-0"
          }`}
        ></span>
      </div>
      <span className={`w-full h-0.5 bg-white `}></span>
      <span className={`w-full h-0.5 bg-white `}></span>
    </button>
  );
}
