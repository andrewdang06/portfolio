"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BootScreen } from "./boot-screen";
import { Desktop } from "./desktop";
import { LoginScreen } from "./login-screen";

type Stage = "boot" | "login" | "desktop";

export function AndrewDangOS() {
  const [stage, setStage] = useState<Stage>("boot");

  return (
    <main className="relative h-screen overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        {stage === "boot" ? (
          <BootScreen key="boot" onComplete={() => setStage("login")} />
        ) : null}
        {stage === "login" ? (
          <LoginScreen key="login" onAuthenticate={() => setStage("desktop")} />
        ) : null}
        {stage === "desktop" ? <Desktop key="desktop" /> : null}
      </AnimatePresence>
    </main>
  );
}

