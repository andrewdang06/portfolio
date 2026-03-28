/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { desktopAssets } from "./design-assets";

type WindowProps = {
  children: ReactNode;
  onClose: () => void;
};

export function Window({ children, onClose }: WindowProps) {
  return (
    <motion.div
      className="relative h-[576px] w-[1024px] overflow-hidden border border-[rgba(65,71,82,0.3)] bg-[rgba(53,53,53,0.6)] p-px shadow-[0px_0px_64px_0px_rgba(0,0,0,0.3)] backdrop-blur-[20px]"
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.985 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex h-[40px] items-center justify-between border-b border-[rgba(255,255,255,0.05)] bg-[rgba(14,14,14,0.4)] pl-[16px]">
        <img alt="" className="h-[8.526px] w-[8.75px]" src={desktopAssets.windowTitleIcon} />

        <div className="flex h-[39px] items-center">
          <button
            type="button"
            className="flex h-full w-[39.583px] items-center justify-center"
            aria-label="Minimize"
          >
            <img alt="" className="h-[0.875px] w-[7.583px]" src={desktopAssets.windowMinimize} />
          </button>
          <button
            type="button"
            className="flex h-full w-[41.917px] items-center justify-center"
            aria-label="Maximize"
          >
            <img alt="" className="size-[9.917px]" src={desktopAssets.windowMaximize} />
          </button>
          <button
            type="button"
            className="flex h-full w-[39.763px] items-center justify-center"
            aria-label="Close"
            onClick={onClose}
          >
            <img alt="" className="size-[7.763px]" src={desktopAssets.windowClose} />
          </button>
        </div>
      </div>

      <div className="relative h-[534px]">{children}</div>
    </motion.div>
  );
}
