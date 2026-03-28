/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { loginAssets } from "./design-assets";

type LoginScreenProps = {
  onAuthenticate: () => void;
};

export function LoginScreen({ onAuthenticate }: LoginScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [invalidPulse, setInvalidPulse] = useState(false);
  const [now, setNow] = useState(() => new Date());

  const timeText = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const dateText = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const ticker = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(ticker);
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.trim() === "password") {
      onAuthenticate();
      return;
    }

    setInvalidPulse(true);
    window.setTimeout(() => setInvalidPulse(false), 280);
    inputRef.current?.focus();
  }

  return (
    <motion.section
      className="absolute inset-0 overflow-hidden bg-[#131313]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          src="/windows background.jpeg"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.34)]" />
      </div>

      <div className="pointer-events-none absolute left-[52px] top-[38px] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
        <p className="text-[88px] font-thin leading-[1] tracking-[-1.2px]">{timeText}</p>
        <p className="pt-[6px] text-[28px] font-thin leading-[1.1]">{dateText}</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-[32px] pb-[82px] pt-[110px]">
        <div className="flex w-full max-w-[448px] flex-col items-center">
          <div className="pb-[24px]">
            <div className="flex flex-col items-center">
              <div className="h-[138px] w-[120px] pb-[18px]">
                <div className="size-[118px] overflow-hidden rounded-full border border-[rgba(255,255,255,0.22)] bg-[#202020] p-[2px] shadow-[0_14px_28px_rgba(0,0,0,0.35)]">
                  <img
                    alt="Andrew Dang profile"
                    className="size-full scale-110 object-cover object-center"
                    src="/me and gf.PNG"
                  />
                </div>
              </div>
              <div className="pb-[4px]">
                <p className="h-[40px] w-[230px] text-center text-[34px] font-thin tracking-[-0.8px] text-white leading-[40px]">
                  Andrew Dang
                </p>
              </div>
            </div>
          </div>

          <form className="w-full pt-[10px]" onSubmit={handleSubmit}>
            <div
              className={`flex h-[46px] w-full items-center gap-[10px] overflow-hidden border bg-[rgba(0,0,0,0.42)] px-[12px] ${
                invalidPulse ? "border-[#9ec8f2]" : "border-[rgba(255,255,255,0.25)]"
              }`}
            >
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent text-[15px] font-thin text-white outline-none placeholder:text-[rgba(255,255,255,0.5)]"
              />
              <button
                type="submit"
                className="relative flex size-[30px] shrink-0 items-center justify-center border border-[rgba(255,255,255,0.2)] bg-[#0078d7]"
                aria-label="Submit password"
              >
                <img alt="" className="size-[11px]" src={loginAssets.submitArrow} />
              </button>
            </div>

            <div className="flex flex-col items-center pt-[12px]">
              <button
                type="button"
                className="pt-[4px] text-[13px] font-thin text-white/85 hover:underline"
              >
                Sign-in options
              </button>
              <div className="pt-[8px] text-center">
                <p className="text-[12px] font-thin tracking-[0.2px] text-[rgba(255,255,255,0.68)] leading-[18px]">
                  Hint: the password is password
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="absolute bottom-[22px] right-[24px] flex items-center gap-[14px] text-[rgba(255,255,255,0.85)]">
        <img alt="" className="h-[14px] w-[18px]" src={loginAssets.trayWifi} />
        <img alt="" className="h-[14px] w-[14px]" src={loginAssets.trayVolume} />
        <img alt="" className="h-[14px] w-[14px]" src={loginAssets.trayGlobe} />
      </div>
    </motion.section>
  );
}
