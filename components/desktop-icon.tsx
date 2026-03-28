/* eslint-disable @next/next/no-img-element */
"use client";

type DesktopIconProps = {
  active?: boolean;
  iconHeight: number;
  iconSrc: string;
  iconWidth: number;
  label: string;
  labelWidth: number;
  onClick?: () => void;
};

export function DesktopIcon({
  active = false,
  iconHeight,
  iconSrc,
  iconWidth,
  label,
  labelWidth,
  onClick,
}: DesktopIconProps) {
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center bg-transparent p-0"
      onClick={onClick}
    >
      <div className="flex size-[48px] items-center justify-center">
        <img alt="" src={iconSrc} style={{ height: iconHeight, width: iconWidth }} />
      </div>
      <div className="pt-[4px]">
        <span
          className={`block text-center text-[10px] font-thin uppercase tracking-[1px] leading-[15px] ${
            active ? "text-[#e5e2e1]" : "text-[rgba(192,199,212,0.6)]"
          }`}
          style={{ width: labelWidth }}
        >
          {label}
        </span>
      </div>
    </button>
  );
}


