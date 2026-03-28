/* eslint-disable @next/next/no-img-element */
"use client";

import { desktopAssets } from "./design-assets";

type TaskbarProps = {
  onOpenPortfolio: () => void;
  windowOpen: boolean;
};

export function Taskbar({ onOpenPortfolio, windowOpen }: TaskbarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[48px] border-t border-[rgba(65,71,82,0.2)] bg-[rgba(53,53,53,0.78)] backdrop-blur-[20px]">
      <div className="absolute left-0 top-[1px] flex h-[47px] w-[304px] items-center">
        <button
          type="button"
          className="flex h-full w-[48px] items-center justify-center bg-[#0078d7]"
          aria-label="Start"
        >
          <img alt="" className="size-[15px]" src={desktopAssets.taskbarStart} />
        </button>
        <div className="flex h-full w-[256px] items-center gap-[12px] bg-[rgba(255,255,255,0.1)] px-[16px]">
          <img alt="" className="size-[10.029px]" src={desktopAssets.taskbarSearch} />
          <span className="text-[12px] font-thin text-[rgba(192,199,212,0.5)] leading-[15px]">
            Type here to search
          </span>
        </div>
      </div>

      <div className="absolute left-[624.616px] top-[1px] flex h-[47px] w-[152px] items-center gap-[4px]">
        <button
          type="button"
          className={`flex h-full w-[48px] items-center justify-center ${
            windowOpen
              ? "border-b-2 border-[#0078d7] bg-[rgba(255,255,255,0.05)] pb-[2px]"
              : ""
          }`}
          aria-label="Open portfolio window"
          onClick={onOpenPortfolio}
        >
          <img alt="" className="h-[12.5px] w-[15.833px]" src={desktopAssets.taskbarPinnedFolder} />
        </button>
        <button type="button" className="flex h-full w-[48px] items-center justify-center" aria-label="Chrome">
          <img alt="" className="size-[15.833px]" src={desktopAssets.taskbarPinnedChrome} />
        </button>
        <button type="button" className="flex h-full w-[48px] items-center justify-center" aria-label="Mail">
          <img alt="" className="h-[12.5px] w-[15.833px]" src={desktopAssets.taskbarPinnedMail} />
        </button>
      </div>

      <div className="absolute left-[1097.231px] top-[1px] h-[47px] w-[182.749px]">
        <div className="absolute left-[16px] top-0 flex h-full w-[51.109px] items-center gap-[12px] px-[8px]">
          <img alt="" className="h-[9.3px] w-[13.372px]" src={desktopAssets.taskbarWifi} />
          <img alt="" className="h-[9.49px] w-[9.737px]" src={desktopAssets.taskbarVolume} />
        </div>
        <div className="absolute left-[83.109px] top-[8.5px] flex h-[30px] w-[57.64px] flex-col items-end justify-center text-[10px] font-thin text-[#c0c7d4] leading-[15px]">
          <span>12:00 PM</span>
          <span>24/05/2024</span>
        </div>
        <div className="absolute left-[164.749px] top-0 h-[47px] w-[2px] bg-[rgba(255,255,255,0.08)]" />
      </div>
    </div>
  );
}
