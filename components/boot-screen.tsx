"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

type BootScreenProps = {
  onComplete: () => void;
};

export function BootScreen({ onComplete }: BootScreenProps) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      window.clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.section
      className="absolute inset-0 overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0)_58%)]" />

      <div className="relative z-[1] h-full w-full">
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2">
          <BootLogo />
        </div>

        <div className="absolute bottom-[82px] left-1/2 -translate-x-1/2">
          <BootSpinner />
        </div>
      </div>

    </motion.section>
  );
}

function BootLogo() {
  return (
    <div className="relative h-[96px] w-[116px]" style={{ perspective: "420px" }}>
      <div className="absolute inset-0" style={{ transform: "rotateX(10deg) rotateY(-16deg) skewY(-1deg)" }}>
        <div className="absolute left-0 top-0 h-[47%] w-[46%] bg-[#0b82de]" />
        <div className="absolute right-0 top-[1%] h-[46%] w-[46%] bg-[#0b82de]" />
        <div className="absolute bottom-0 left-[1%] h-[46%] w-[45%] bg-[#0b82de]" />
        <div className="absolute bottom-[1%] right-0 h-[45%] w-[45%] bg-[#0b82de]" />
      </div>
    </div>
  );
}

function BootSpinner() {
  return (
    <div className="relative size-[38px]">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className="boot-spinner-dot absolute left-1/2 top-1/2 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{
            transform: `translate(-50%, -50%) rotate(${index * 72}deg) translateY(-12px)`,
            animationDelay: `${index * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}
