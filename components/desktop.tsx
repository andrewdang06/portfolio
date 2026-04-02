/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { desktopAssets } from "./design-assets";

const aboutAppIcon = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
    <rect x='8' y='11' width='48' height='34' rx='4' fill='#5d6a74'/>
    <rect x='11' y='14' width='42' height='28' rx='3' fill='url(#s)'/>
    <rect x='26' y='47' width='12' height='6' rx='1.5' fill='#aab5be'/>
    <rect x='20' y='53' width='24' height='3' rx='1.5' fill='#7f8a95'/>
    <defs>
      <linearGradient id='s' x1='11' y1='14' x2='53' y2='42' gradientUnits='userSpaceOnUse'>
        <stop stop-color='#45d3e4'/>
        <stop offset='1' stop-color='#237edb'/>
      </linearGradient>
    </defs>
  </svg>`
)}`;

const resumeFileIcon = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
    <path d='M6 20a6 6 0 0 1 6-6h14l4 4h28v32a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z' fill='url(#f)'/>
    <rect x='9' y='23' width='46' height='29' rx='4' fill='url(#b)'/>
    <rect x='16' y='31' width='18' height='3' rx='1.5' fill='#f2f7ff'/>
    <rect x='16' y='37' width='30' height='3' rx='1.5' fill='#f2f7ff'/>
    <rect x='16' y='43' width='26' height='3' rx='1.5' fill='#f2f7ff'/>
    <rect x='40' y='31' width='8' height='10' rx='2' fill='#e7eef8'/>
    <defs>
      <linearGradient id='f' x1='6' y1='14' x2='58' y2='56' gradientUnits='userSpaceOnUse'>
        <stop stop-color='#6d8ea4'/>
        <stop offset='1' stop-color='#415d7a'/>
      </linearGradient>
      <linearGradient id='b' x1='9' y1='23' x2='55' y2='52' gradientUnits='userSpaceOnUse'>
        <stop stop-color='#aebfd1'/>
        <stop offset='1' stop-color='#7e98b5'/>
      </linearGradient>
    </defs>
  </svg>`
)}`;

const musicAppIcon = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
    <path d='M6 20a6 6 0 0 1 6-6h14l4 4h28v32a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z' fill='url(#f)'/>
    <rect x='9' y='23' width='46' height='29' rx='4' fill='url(#b)'/>
    <path d='M29 42.5a4.5 4.5 0 1 1-3.8-4.45V29l14-2.5v12.8a4.5 4.5 0 1 1-3.8-4.45v-6.5l-6.4 1.2z' fill='#f5f5f5'/>
    <defs>
      <linearGradient id='f' x1='6' y1='14' x2='58' y2='56' gradientUnits='userSpaceOnUse'>
        <stop stop-color='#cf6f11'/>
        <stop offset='1' stop-color='#a64f14'/>
      </linearGradient>
      <linearGradient id='b' x1='9' y1='23' x2='55' y2='52' gradientUnits='userSpaceOnUse'>
        <stop stop-color='#f3946b'/>
        <stop offset='1' stop-color='#b06ea9'/>
      </linearGradient>
    </defs>
  </svg>`
)}`;

const projectsAppIcon = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
    <path d='M6 20a6 6 0 0 1 6-6h14l4 4h28v32a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z' fill='url(#f)'/>
    <rect x='9' y='23' width='46' height='29' rx='4' fill='url(#b)'/>
    <circle cx='41.5' cy='31' r='3.2' fill='#d7e2f2'/>
    <path d='M11 48l12-12 8 8 8-9 14 13z' fill='#d7e2f2'/>
    <defs>
      <linearGradient id='f' x1='6' y1='14' x2='58' y2='56' gradientUnits='userSpaceOnUse'>
        <stop stop-color='#0f71cf'/>
        <stop offset='1' stop-color='#0a4f97'/>
      </linearGradient>
      <linearGradient id='b' x1='9' y1='23' x2='55' y2='52' gradientUnits='userSpaceOnUse'>
        <stop stop-color='#2fa1e6'/>
        <stop offset='1' stop-color='#1d78c6'/>
      </linearGradient>
    </defs>
  </svg>`
)}`;

const mailAppIcon = desktopAssets.taskbarPinnedMail;

const aboutPhotoCandidates = [
  "/mewing.JPG",
  "/mewing.jpg",
  "/dev site.png",
  "/about-me-photo.jpg",
  "/about-me-photo.jpeg",
  "/about-me-photo.png",
  "/about-me-photo.webp",
] as const;

const DESKTOP_SCALE = 0.8;

type WindowId = "portfolio" | "resume" | "music" | "projects" | "mail";

type WindowMeta = {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  restoreX: number;
  restoreY: number;
  x: number;
  y: number;
  z: number;
};

type WindowMap = Record<WindowId, WindowMeta>;

type DragState = {
  id: WindowId;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

const WINDOW_SIZE: Record<WindowId, { width: number; height: number }> = {
  portfolio: { width: 1240, height: 760 },
  resume: { width: 1020, height: 720 },
  music: { width: 960, height: 650 },
  projects: { width: 1120, height: 700 },
  mail: { width: 920, height: 560 },
};

const INITIAL_WINDOWS: WindowMap = {
  portfolio: { open: false, minimized: false, maximized: false, restoreX: 80, restoreY: 28, x: 80, y: 28, z: 3 },
  resume: { open: false, minimized: false, maximized: false, restoreX: 140, restoreY: 44, x: 140, y: 44, z: 2 },
  music: { open: false, minimized: false, maximized: false, restoreX: 200, restoreY: 58, x: 200, y: 58, z: 1 },
  projects: { open: false, minimized: false, maximized: false, restoreX: 240, restoreY: 76, x: 240, y: 76, z: 0 },
  mail: { open: false, minimized: false, maximized: false, restoreX: 260, restoreY: 90, x: 260, y: 90, z: 0 },
};

export function Desktop() {
  const [windows, setWindows] = useState<WindowMap>(INITIAL_WINDOWS);
  const dragRef = useRef<DragState | null>(null);
  const zRef = useRef(3);

  const openChrome = () => {
    window.open("https://www.google.com", "_blank", "noopener,noreferrer");
  };

  const nextZ = () => {
    zRef.current += 1;
    return zRef.current;
  };

  const bringToFront = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], z: nextZ() },
    }));
  };

  const openWindow = (id: WindowId) => {
    const viewportWidth = window.innerWidth / DESKTOP_SCALE;
    const viewportHeight = (window.innerHeight - 48) / DESKTOP_SCALE;
    const { width, height } = WINDOW_SIZE[id];

    const centeredX = Math.max(0, (viewportWidth - width) / 2);
    const centeredY = Math.max(0, (viewportHeight - height) / 2);

    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        open: true,
        minimized: false,
        x: prev[id].open ? prev[id].x : centeredX,
        y: prev[id].open ? prev[id].y : centeredY,
        maximized: prev[id].open ? prev[id].maximized : false,
        restoreX: prev[id].open ? prev[id].restoreX : centeredX,
        restoreY: prev[id].open ? prev[id].restoreY : centeredY,
        z: nextZ(),
      },
    }));
  };

  const toggleMaximizeWindow = (id: WindowId) => {
    setWindows((prev) => {
      const current = prev[id];
      const nowMaximized = !current.maximized;

      return {
        ...prev,
        [id]: {
          ...current,
          maximized: nowMaximized,
          x: nowMaximized ? 0 : current.restoreX,
          y: nowMaximized ? 0 : current.restoreY,
          restoreX: nowMaximized ? current.x : current.restoreX,
          restoreY: nowMaximized ? current.y : current.restoreY,
          z: nextZ(),
        },
      };
    });
  };

  const minimizeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], minimized: true },
    }));
  };

  const closeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: false, minimized: false, maximized: false },
    }));
  };

  const startDrag = (id: WindowId, event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    const current = windows[id];
    if (current.maximized) {
      return;
    }

    dragRef.current = {
      id,
      startX: event.clientX,
      startY: event.clientY,
      originX: current.x,
      originY: current.y,
    };

    bringToFront(id);
    event.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      const drag = dragRef.current;
      if (!drag) {
        return;
      }

      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;

      setWindows((prev) => ({
        ...prev,
        [drag.id]: {
          ...prev[drag.id],
          x: Math.max(-220, drag.originX + deltaX / DESKTOP_SCALE),
          y: Math.max(0, drag.originY + deltaY / DESKTOP_SCALE),
          restoreX: Math.max(-220, drag.originX + deltaX / DESKTOP_SCALE),
          restoreY: Math.max(0, drag.originY + deltaY / DESKTOP_SCALE),
        },
      }));
    };

    const handleMouseUp = () => {
      dragRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <motion.section
      className="absolute inset-0 overflow-hidden bg-[#05070c]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: `${100 / DESKTOP_SCALE}%`,
          height: `${100 / DESKTOP_SCALE}%`,
          transform: `scale(${DESKTOP_SCALE})`,
          transformOrigin: "top left",
        }}
      >
        <img alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover" src="/windows background.jpeg" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,26,0.1)_0%,rgba(10,16,28,0.18)_100%)]" />

        <div className="absolute left-[12px] top-[12px] bottom-[64px] z-[3] grid w-[74px] grid-cols-1 justify-items-center gap-[14px]">
          <DesktopIcon
            active={windows.portfolio.open && !windows.portfolio.minimized}
            label="About Me"
            src={aboutAppIcon}
            onClick={() => openWindow("portfolio")}
          />
          <DesktopIcon
            active={windows.resume.open && !windows.resume.minimized}
            label="Resume"
            src={resumeFileIcon}
            onClick={() => openWindow("resume")}
          />
          <DesktopIcon
            active={windows.music.open && !windows.music.minimized}
            label="Music"
            src={musicAppIcon}
            onClick={() => openWindow("music")}
          />
          <DesktopIcon
            active={windows.projects.open && !windows.projects.minimized}
            label="Projects"
            src={projectsAppIcon}
            onClick={() => openWindow("projects")}
          />
          <DesktopIcon
            active={windows.mail.open && !windows.mail.minimized}
            label="Mail"
            src={mailAppIcon}
            onClick={() => openWindow("mail")}
          />
          <DesktopIcon
            label="Chrome"
            src={desktopAssets.iconChrome}
            onClick={openChrome}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bottom-[48px] z-[8]">
          {windows.portfolio.open && !windows.portfolio.minimized ? (
            <div
              className={`pointer-events-auto absolute ${windows.portfolio.maximized ? "[&>*]:!h-full [&>*]:!w-full" : ""}`}
              style={{
                left: windows.portfolio.maximized ? 0 : windows.portfolio.x,
                top: windows.portfolio.maximized ? 0 : windows.portfolio.y,
                width: windows.portfolio.maximized ? "100%" : undefined,
                height: windows.portfolio.maximized ? "100%" : undefined,
                zIndex: windows.portfolio.z,
              }}
              onMouseDown={() => bringToFront("portfolio")}
            >
              <PortfolioWindow
                onClose={() => closeWindow("portfolio")}
                onMinimize={() => minimizeWindow("portfolio")}
                onMaximize={() => toggleMaximizeWindow("portfolio")}
                isMaximized={windows.portfolio.maximized}
                onTitleMouseDown={(event) => startDrag("portfolio", event)}
              />
            </div>
          ) : null}

          {windows.resume.open && !windows.resume.minimized ? (
            <div
              className={`pointer-events-auto absolute ${windows.resume.maximized ? "[&>*]:!h-full [&>*]:!w-full" : ""}`}
              style={{
                left: windows.resume.maximized ? 0 : windows.resume.x,
                top: windows.resume.maximized ? 0 : windows.resume.y,
                width: windows.resume.maximized ? "100%" : undefined,
                height: windows.resume.maximized ? "100%" : undefined,
                zIndex: windows.resume.z,
              }}
              onMouseDown={() => bringToFront("resume")}
            >
              <ResumeWindow
                onClose={() => closeWindow("resume")}
                onMinimize={() => minimizeWindow("resume")}
                onMaximize={() => toggleMaximizeWindow("resume")}
                isMaximized={windows.resume.maximized}
                onTitleMouseDown={(event) => startDrag("resume", event)}
              />
            </div>
          ) : null}

          {windows.music.open && !windows.music.minimized ? (
            <div
              className={`pointer-events-auto absolute ${windows.music.maximized ? "[&>*]:!h-full [&>*]:!w-full" : ""}`}
              style={{
                left: windows.music.maximized ? 0 : windows.music.x,
                top: windows.music.maximized ? 0 : windows.music.y,
                width: windows.music.maximized ? "100%" : undefined,
                height: windows.music.maximized ? "100%" : undefined,
                zIndex: windows.music.z,
              }}
              onMouseDown={() => bringToFront("music")}
            >
              <MusicWindow
                onClose={() => closeWindow("music")}
                onMinimize={() => minimizeWindow("music")}
                onMaximize={() => toggleMaximizeWindow("music")}
                isMaximized={windows.music.maximized}
                onTitleMouseDown={(event) => startDrag("music", event)}
              />
            </div>
          ) : null}

          {windows.projects.open && !windows.projects.minimized ? (
            <div
              className={`pointer-events-auto absolute ${windows.projects.maximized ? "[&>*]:!h-full [&>*]:!w-full" : ""}`}
              style={{
                left: windows.projects.maximized ? 0 : windows.projects.x,
                top: windows.projects.maximized ? 0 : windows.projects.y,
                width: windows.projects.maximized ? "100%" : undefined,
                height: windows.projects.maximized ? "100%" : undefined,
                zIndex: windows.projects.z,
              }}
              onMouseDown={() => bringToFront("projects")}
            >
              <ProjectsWindow
                onClose={() => closeWindow("projects")}
                onMinimize={() => minimizeWindow("projects")}
                onMaximize={() => toggleMaximizeWindow("projects")}
                isMaximized={windows.projects.maximized}
                onTitleMouseDown={(event) => startDrag("projects", event)}
              />
            </div>
          ) : null}

          {windows.mail.open && !windows.mail.minimized ? (
            <div
              className={`pointer-events-auto absolute ${windows.mail.maximized ? "[&>*]:!h-full [&>*]:!w-full" : ""}`}
              style={{
                left: windows.mail.maximized ? 0 : windows.mail.x,
                top: windows.mail.maximized ? 0 : windows.mail.y,
                width: windows.mail.maximized ? "100%" : undefined,
                height: windows.mail.maximized ? "100%" : undefined,
                zIndex: windows.mail.z,
              }}
              onMouseDown={() => bringToFront("mail")}
            >
              <MailWindow
                onClose={() => closeWindow("mail")}
                onMinimize={() => minimizeWindow("mail")}
                onMaximize={() => toggleMaximizeWindow("mail")}
                isMaximized={windows.mail.maximized}
                onTitleMouseDown={(event) => startDrag("mail", event)}
              />
            </div>
          ) : null}
        </div>

        <DesktopTaskbar
          windows={windows}
          onOpenPortfolio={() => openWindow("portfolio")}
          onOpenResume={() => openWindow("resume")}
          onOpenMusic={() => openWindow("music")}
          onOpenProjects={() => openWindow("projects")}
          onOpenMail={() => openWindow("mail")}
          onOpenChrome={openChrome}
        />
      </div>
    </motion.section>
  );
}

type MailWindowProps = {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  onTitleMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
};

function MailWindow({ onClose, onMinimize, onMaximize, isMaximized, onTitleMouseDown }: MailWindowProps) {
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSending(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromEmail, subject, message }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setStatus({ type: "error", message: data.error || "Failed to send email." });
        return;
      }

      setStatus({ type: "success", message: "Email sent successfully." });
      setSubject("");
      setMessage("");
    } catch {
      setStatus({ type: "error", message: "Unable to send. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative h-[min(64vh,560px)] w-[min(920px,calc(100vw-260px))] overflow-hidden border border-[#434a56] bg-[#1f232a] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <div
        className="relative z-[2] flex h-[30px] cursor-grab select-none items-center justify-between border-b border-[#3b414c] bg-[#2a2f36] px-[8px] active:cursor-grabbing"
        onMouseDown={onTitleMouseDown}
      >
        <div className="flex items-center gap-[6px] text-[11px] text-[#e8edf5]">
          <img alt="" className="size-[13px] object-contain" src={desktopAssets.taskbarPinnedMail} />
          <span>New mail</span>
        </div>

        <div className="flex items-center gap-[2px]">
          <button
            type="button"
            className="flex h-[17px] w-[25px] items-center justify-center hover:bg-[#3a404a]"
            aria-label="Minimize"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMinimize}
          >
            <span className="mb-[2px] text-[12px] leading-none text-[#dbe3ef]">-</span>
          </button>
          <button
            type="button"
            className="flex h-[17px] w-[25px] items-center justify-center hover:bg-[#3a404a]"
            aria-label={isMaximized ? "Restore" : "Maximize"}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMaximize}
          >
            <img alt="" className="size-[9px]" src={desktopAssets.windowMaximize} />
          </button>
          <button
            type="button"
            className="flex h-[17px] w-[25px] items-center justify-center hover:bg-[#e81123] hover:text-white"
            aria-label="Close"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onClose}
          >
            <span className="text-[10px] leading-none">x</span>
          </button>
        </div>
      </div>

      <form className="h-[calc(100%-30px)]" onSubmit={handleSend}>
        <div className="border-b border-[#343a45] bg-[#252a33] px-[10px] py-[6px]">
          <div className="flex items-center gap-[8px]">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-[6px] bg-[#106ebe] px-[12px] py-[4px] text-[12px] text-white disabled:opacity-60"
            >
              <span className="text-[12px]">▶</span>
              {sending ? "Sending..." : "Send"}
            </button>
            <span className="text-[12px] text-[#aeb7c5]">From:</span>
            <input
              type="email"
              value={fromEmail}
              onChange={(event) => setFromEmail(event.target.value)}
              placeholder="your@email.com"
              className="h-[24px] w-[280px] border border-[#4a5260] bg-[#1d2128] px-[8px] text-[12px] text-[#e8edf5] outline-none"
              required
            />
          </div>
        </div>

        <div className="border-b border-[#343a45] bg-[#1f232a] text-[#e8edf5]">
          <div className="flex items-center border-b border-[#343a45] px-[10px] py-[6px]">
            <span className="w-[48px] text-[12px] text-[#aeb7c5]">To</span>
            <span className="text-[12px] text-[#dbe3ef]">andrewdangbusiness@gmail.com</span>
            <div className="ml-auto flex gap-[10px] text-[11px] text-[#8f9aac]">
              <span>Cc</span>
              <span>Bcc</span>
            </div>
          </div>
          <div className="flex items-center border-b border-[#343a45] px-[10px] py-[6px]">
            <label htmlFor="mail-subject" className="w-[78px] text-[12px] text-[#aeb7c5]">
              Add a subject
            </label>
            <input
              id="mail-subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="w-full bg-transparent px-[4px] py-[2px] text-[12px] text-[#e8edf5] outline-none"
              required
            />
          </div>
        </div>

        <div className="h-[calc(100%-140px)] bg-[#1f232a] p-[10px]">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write your message"
            className="h-full w-full resize-none border border-[#4a5260] bg-[#1d2128] p-[8px] text-[13px] text-[#e8edf5] outline-none"
            required
          />
        </div>

        {status.type !== "idle" ? (
          <div
            className={`border-t px-[10px] py-[6px] text-[12px] ${
              status.type === "success"
                ? "border-[#cfead7] bg-[#edf9f1] text-[#136f2f]"
                : "border-[#f3d2d2] bg-[#fdf0f0] text-[#a61d24]"
            }`}
          >
            {status.message}
          </div>
        ) : null}
      </form>
    </div>
  );
}

type ProjectsWindowProps = {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  onTitleMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
};

const projectArtGrubFinder = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 420 380'>
    <defs>
      <linearGradient id='gf-bg' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stop-color='#0e2a1a'/>
        <stop offset='100%' stop-color='#1a3a28'/>
      </linearGradient>
      <radialGradient id='gf-glow' cx='50%' cy='50%' r='50%'>
        <stop offset='0%' stop-color='rgba(43,207,99,0.25)'/>
        <stop offset='100%' stop-color='rgba(43,207,99,0)'/>
      </radialGradient>
    </defs>
    <rect width='420' height='380' fill='url(#gf-bg)'/>
    <circle cx='210' cy='190' r='150' fill='url(#gf-glow)'/>
    <g transform='translate(210, 190)'>
      <circle cx='0' cy='0' r='120' fill='none' stroke='#2bcf63' stroke-width='2' opacity='0.6'/>
      <circle cx='0' cy='0' r='90' fill='none' stroke='#2bcf63' stroke-width='1' opacity='0.3'/>
      <circle cx='-60' cy='-50' r='22' fill='#ff6b6b' opacity='0.9'/>
      <circle cx='60' cy='-40' r='20' fill='#ffa500' opacity='0.9'/>
      <circle cx='50' cy='50' r='24' fill='#4ecdc4' opacity='0.9'/>
      <circle cx='-50' cy='60' r='18' fill='#95e1d3' opacity='0.85'/>
      <circle cx='0' cy='-80' r='16' fill='#f0ad4e' opacity='0.9'/>
      <path d='M 0 -100 L 15 -70 L -15 -70 Z' fill='#2bcf63' opacity='0.7'/>
      <text x='0' y='110' font-size='28' font-weight='bold' text-anchor='middle' fill='#2bcf63' opacity='0.8'>DISCOVER</text>
    </g>
  </svg>`
)}`;

const projectArtKlip = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 420 380'>
    <defs>
      <linearGradient id='k-bg' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stop-color='#0a0e18'/>
        <stop offset='100%' stop-color='#15202f'/>
      </linearGradient>
      <radialGradient id='k-glow' cx='50%' cy='40%' r='60%'>
        <stop offset='0%' stop-color='rgba(30,150,255,0.15)'/>
        <stop offset='100%' stop-color='rgba(30,150,255,0)'/>
      </radialGradient>
    </defs>
    <rect width='420' height='380' fill='url(#k-bg)'/>
    <circle cx='210' cy='160' r='170' fill='url(#k-glow)'/>
    
    <g transform='translate(210, 160)'>
      <g opacity='0.4'>
        <circle cx='0' cy='0' r='75' fill='none' stroke='#505a6a' stroke-width='6'/>
        <circle cx='-45' cy='-45' r='8' fill='#505a6a'/>
        <circle cx='45' cy='-45' r='8' fill='#505a6a'/>
        <circle cx='50' cy='0' r='8' fill='#505a6a'/>
        <circle cx='45' cy='45' r='8' fill='#505a6a'/>
        <circle cx='-45' cy='45' r='8' fill='#505a6a'/>
        <circle cx='-50' cy='0' r='8' fill='#505a6a'/>
      </g>
      
      <path d='M -50 -15 A 55 55 0 0 1 50 0' fill='none' stroke='#1e96ff' stroke-width='20' stroke-linecap='round' opacity='0.95'/>
      <path d='M 50 0 A 55 55 0 0 1 -50 15' fill='none' stroke='#1e96ff' stroke-width='20' stroke-linecap='round' opacity='0.95'/>
      
      <circle cx='0' cy='0' r='12' fill='#1e96ff' opacity='0.6'/>
      <circle cx='0' cy='0' r='8' fill='#1e96ff' opacity='0.3'/>
      
      <path d='M 30 -18 L 70 0 L 30 18 Z' fill='#ff3e42'/>
      <path d='M 30 -18 L 70 0 L 30 18' fill='none' stroke='#ff3e42' stroke-width='2' stroke-linejoin='round'/>
      
      <circle cx='-70' cy='-50' r='6' fill='#ff3e42'/>
      
      <text x='0' y='120' font-size='44' font-weight='700' text-anchor='middle' fill='#1e96ff' letter-spacing='4'>KLIP</text>
    </g>
  </svg>`
)}`;

function ProjectsWindow({ onClose, onMinimize, onMaximize, isMaximized, onTitleMouseDown }: ProjectsWindowProps) {
  const [currentProject, setCurrentProject] = useState(0);

  const stackTagStyles: Record<string, { bg: string; border: string; text: string }> = {
    "TypeScript": { bg: "rgba(35,100,186,0.3)", border: "rgba(80,151,255,0.45)", text: "#a8ccff" },
    React: { bg: "rgba(18,126,162,0.3)", border: "rgba(86,212,255,0.42)", text: "#a5ebff" },
    Vite: { bg: "rgba(91,76,224,0.28)", border: "rgba(145,131,255,0.46)", text: "#d0c8ff" },
    "Tailwind CSS": { bg: "rgba(10,122,154,0.3)", border: "rgba(72,207,255,0.45)", text: "#aef0ff" },
    "Next.js": { bg: "rgba(70,70,70,0.35)", border: "rgba(170,170,170,0.4)", text: "#e2e2e2" },
    "Gemini API": { bg: "rgba(80,95,195,0.32)", border: "rgba(128,152,255,0.44)", text: "#c7d6ff" },
    "C++": { bg: "rgba(32,88,181,0.32)", border: "rgba(104,162,255,0.44)", text: "#b4d5ff" },
    CMake: { bg: "rgba(56,102,168,0.3)", border: "rgba(116,177,255,0.4)", text: "#bddbff" },
    FFmpeg: { bg: "rgba(33,130,67,0.3)", border: "rgba(102,217,145,0.42)", text: "#b9f6cd" },
    ImGui: { bg: "rgba(109,64,180,0.3)", border: "rgba(171,124,252,0.42)", text: "#ddc5ff" },
    "DirectX 11": { bg: "rgba(41,107,182,0.3)", border: "rgba(112,190,255,0.44)", text: "#bee2ff" },
  };

  const projects = [
    {
      name: "GrubFinder",
      desc: "A full-stack food discovery platform that leverages geolocation and AI to provide personalized restaurant recommendations. Integrated Gemini API for intelligent filtering across 100+ restaurant datasets with customizable search radius and rating thresholds. Built scalable backend with Node.js and REST APIs, implemented location services for proximity-based discovery, and developed comprehensive UI for filtering, sorting, and detailed restaurant information with ratings and reviews.",
      accent: "#2bcf63",
      repo: "https://github.com/andrewdang06/grubfinder.git",
      art: projectArtGrubFinder,
      stack: ["TypeScript", "Next.js", "React", "Gemini API"],
    },
    {
      name: "Klip",
      desc: "A lightweight, high-performance game recording and instant replay application optimized for low-resource environments. Developed in C++ with DirectX 11 integration for efficient GPU-accelerated video encoding using FFmpeg. Implemented circular buffer architecture for zero-latency instant replay storage, created ImGui-based interface for streamlined controls, and optimized memory management to run smoothly on entry-level hardware while maintaining 1080p recording quality.",
      accent: "#b97cff",
      repo: "https://github.com/andrewdang06/klip.git",
      art: projectArtKlip,
      stack: ["C++", "CMake", "FFmpeg", "ImGui", "DirectX 11"],
    },
  ];

  const project = projects[currentProject];

  return (
    <div className="relative h-[min(74vh,700px)] w-[min(1120px,calc(100vw-240px))] overflow-hidden border border-[#434a56] bg-[#1f232a] shadow-[0_28px_72px_rgba(0,0,0,0.46)]">

      <div
        className="relative z-[2] flex h-[34px] cursor-grab select-none items-center justify-between border-b border-[#3b414c] bg-[#2a2f36] px-[10px] active:cursor-grabbing"
        onMouseDown={onTitleMouseDown}
      >
        <div className="flex items-center gap-[8px] text-[11px] uppercase tracking-[0.5px] text-[#e8edf5]">
          <img alt="" className="size-[13px] object-contain" src={projectsAppIcon} />
          Projects.app - Portfolio Showcase
        </div>

        <div className="flex h-full items-stretch">
          <button
            type="button"
            className="flex w-[45px] items-center justify-center text-[#dbe3ef] transition-colors hover:bg-[#3a404a]"
            aria-label="Minimize"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMinimize}
          >
            <img alt="" className="h-[1px] w-[10px]" src={desktopAssets.windowMinimize} />
          </button>
          <button
            type="button"
            className="flex w-[45px] items-center justify-center text-[#dbe3ef] transition-colors hover:bg-[#3a404a]"
            aria-label={isMaximized ? "Restore" : "Maximize"}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMaximize}
          >
            <img alt="" className="size-[10px]" src={desktopAssets.windowMaximize} />
          </button>
          <button
            type="button"
            className="flex w-[45px] items-center justify-center transition-colors hover:bg-[#e81123]"
            aria-label="Close"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onClose}
          >
            <img alt="" className="size-[10px]" src={desktopAssets.windowClose} />
          </button>
        </div>
      </div>

      <div className="relative z-[1] grid h-[calc(100%-34px)] grid-cols-[1fr_1fr] gap-[24px] bg-[linear-gradient(132deg,rgba(30,35,50,0.5)_0%,rgba(20,24,35,0.3)_100%)] p-[32px]">
        <div className="flex items-center justify-center">
          <div className="h-[280px] w-[280px] rounded-[16px] border border-[#3a4861] bg-[#0f1620] p-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <img alt={project.name} className="h-full w-full rounded-[12px] object-cover" src={project.art} />
          </div>
        </div>

        <div className="flex flex-col justify-center pl-[20px]">
          <p className="text-[12px] uppercase tracking-[2px] text-[#78d4ff]">Featured Project</p>
          <h2 className="pt-[8px] text-[44px] font-thin tracking-[-1.2px] text-[#e8edf5]">{project.name}</h2>
          
          <p className="max-w-[380px] pt-[16px] text-[14px] leading-[1.6] text-[#b6bfcc]">
            {project.desc}
          </p>

          <div className="mt-[20px] flex flex-wrap gap-[8px]">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border px-[10px] py-[4px] text-[11px] font-thin uppercase tracking-[0.8px]"
                style={{
                  background: stackTagStyles[tech]?.bg ?? "rgba(15,34,54,0.68)",
                  borderColor: stackTagStyles[tech]?.border ?? "rgba(149,198,255,0.25)",
                  color: stackTagStyles[tech]?.text ?? "rgba(173,214,245,0.92)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="mt-[24px] inline-flex w-[220px] items-center justify-center border border-[#2bcf63] bg-transparent px-[20px] py-[10px] text-[12px] uppercase tracking-[1.2px] text-[#2bcf63] transition-all hover:bg-[rgba(43,207,99,0.1)]"
          >
            Explore
          </a>

          <div className="mt-[32px] flex items-center gap-[12px]">
            <button
              type="button"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#78d4ff] bg-transparent transition-all hover:bg-[rgba(120,212,255,0.15)]"
              onClick={() => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)}
              aria-label="Previous project"
            >
              <span className="text-[16px] text-[#78d4ff]">‹</span>
            </button>

            <div className="flex gap-[8px]">
              {projects.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`h-[6px] transition-all ${
                    index === currentProject
                      ? "w-[24px] bg-[#78d4ff]"
                      : "w-[6px] bg-[rgba(120,212,255,0.3)] hover:bg-[rgba(120,212,255,0.5)]"
                  }`}
                  onClick={() => setCurrentProject(index)}
                  aria-label={`Project ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#78d4ff] bg-transparent transition-all hover:bg-[rgba(120,212,255,0.15)]"
              onClick={() => setCurrentProject((prev) => (prev + 1) % projects.length)}
              aria-label="Next project"
            >
              <span className="text-[16px] text-[#78d4ff]">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type MusicWindowProps = {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  onTitleMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
};

function MusicWindow({ onClose, onMinimize, onMaximize, isMaximized, onTitleMouseDown }: MusicWindowProps) {
  const songs = [
    { title: "Intentions", artist: "starfall", length: "3:45" },
    { title: "Neon Skyline", artist: "Avery Lane", length: "2:57" },
    { title: "Satellite Heart", artist: "The Meridian", length: "4:06" },
    { title: "City Lights (Afterhours)", artist: "Kairo", length: "3:41" },
    { title: "Motion Blur", artist: "Blue Echo", length: "3:12" },
  ];

  return (
    <div className="relative h-[min(72vh,650px)] w-[min(960px,calc(100vw-240px))] overflow-hidden border border-[#434a56] bg-[#1f232a] shadow-[0_28px_72px_rgba(0,0,0,0.46)]">

      <div
        className="relative z-[2] flex h-[34px] cursor-grab select-none items-center justify-between border-b border-[#3b414c] bg-[#2a2f36] px-[10px] active:cursor-grabbing"
        onMouseDown={onTitleMouseDown}
      >
        <div className="flex items-center gap-[8px] text-[11px] uppercase tracking-[0.5px] text-[#e8edf5]">
          <img alt="" className="size-[13px] object-contain" src={musicAppIcon} />
          Music.app - Recommendations
        </div>

        <div className="flex h-full items-stretch">
          <button
            type="button"
            className="flex w-[45px] items-center justify-center text-[#dbe3ef] transition-colors hover:bg-[#3a404a]"
            aria-label="Minimize"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMinimize}
          >
            <img alt="" className="h-[1px] w-[10px]" src={desktopAssets.windowMinimize} />
          </button>
          <button
            type="button"
            className="flex w-[45px] items-center justify-center text-[#dbe3ef] transition-colors hover:bg-[#3a404a]"
            aria-label={isMaximized ? "Restore" : "Maximize"}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMaximize}
          >
            <img alt="" className="size-[10px]" src={desktopAssets.windowMaximize} />
          </button>
          <button
            type="button"
            className="flex w-[45px] items-center justify-center transition-colors hover:bg-[#e81123]"
            aria-label="Close"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onClose}
          >
            <img alt="" className="size-[10px]" src={desktopAssets.windowClose} />
          </button>
        </div>
      </div>

      <div className="relative z-[1] h-[calc(100%-34px)] p-[18px]">
        <div className="flex h-full min-h-0 flex-col rounded-[8px] border border-[#414856] bg-[#262b34] p-[20px]">
          <p className="text-[11px] uppercase tracking-[2px] text-[#8fc9ee]">Most Recommended Songs</p>
          <h2 className="pt-[8px] text-[30px] tracking-[-0.7px] text-[#e8edf5]">My Top Picks For You</h2>
          <p className="pt-[6px] text-[13px] text-[#b6bfcc]">
            Placeholder list for now. I&apos;ll replace these with your real recommendations when you send them.
          </p>

          <div className="mt-[20px] min-h-0 flex-1 space-y-[8px] overflow-y-auto pr-[6px]">
            {songs.map((song, index) => (
              <div
                key={song.title}
                className="flex items-center justify-between rounded-[6px] border border-[#3f4653] bg-[#1f232a] px-[14px] py-[11px]"
              >
                <div className="flex min-w-0 items-center gap-[12px]">
                  <span className="w-[16px] text-[12px] text-[#98a4b5]">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[14px] text-[#e8edf5]">{song.title}</p>
                    <p className="truncate text-[12px] text-[#aeb7c5]">{song.artist}</p>
                  </div>
                </div>
                <span className="text-[12px] text-[#aeb7c5]">{song.length}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type PortfolioWindowProps = {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  onTitleMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
};

function PortfolioWindow({ onClose, onMinimize, onMaximize, isMaximized, onTitleMouseDown }: PortfolioWindowProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const activePhotoSrc = aboutPhotoCandidates[photoIndex] ?? null;

  const handlePhotoError = () => {
    setPhotoIndex((prev) => prev + 1);
  };

  return (
    <div className="relative h-[min(78vh,760px)] w-[min(1240px,calc(100vw-140px))] overflow-hidden border border-[#434a56] bg-[#1f232a] shadow-[0_28px_72px_rgba(0,0,0,0.46)]">

      <div
        className="relative z-[2] flex h-[34px] cursor-grab select-none items-center justify-between border-b border-[#3b414c] bg-[#2a2f36] px-[10px] active:cursor-grabbing"
        onMouseDown={onTitleMouseDown}
      >
        <div className="flex items-center gap-[8px] text-[11px] uppercase tracking-[0.5px] text-[#e8edf5]">
          <img alt="" className="size-[12px]" src={desktopAssets.windowTitleIcon} />
          Portfolio.exe
        </div>

        <div className="flex h-full items-stretch">
          <button
            type="button"
            className="flex w-[45px] items-center justify-center text-[#dbe3ef] transition-colors hover:bg-[#3a404a]"
            aria-label="Minimize"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMinimize}
          >
            <img alt="" className="h-[1px] w-[10px]" src={desktopAssets.windowMinimize} />
          </button>
          <button
            type="button"
            className="flex w-[45px] items-center justify-center text-[#dbe3ef] transition-colors hover:bg-[#3a404a]"
            aria-label={isMaximized ? "Restore" : "Maximize"}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMaximize}
          >
            <img alt="" className="size-[10px]" src={desktopAssets.windowMaximize} />
          </button>
          <button
            type="button"
            className="flex w-[45px] items-center justify-center transition-colors hover:bg-[#e81123]"
            aria-label="Close"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onClose}
          >
            <img alt="" className="size-[10px]" src={desktopAssets.windowClose} />
          </button>
        </div>
      </div>

      <div className="relative z-[1] grid h-[calc(100%-34px)] grid-cols-[360px_1fr]">
        <div className="relative border-r border-[rgba(255,255,255,0.06)] bg-[rgba(15,19,29,0.7)] p-[30px]">
          <div className="pointer-events-none absolute -bottom-[78px] -left-[88px] size-[240px] rounded-full bg-[rgba(0,120,215,0.18)] blur-[64px]" />

          <div className="relative h-full rounded-[4px] border border-[rgba(255,255,255,0.1)] bg-[rgba(11,17,30,0.65)] p-[14px]">
            <div className="relative flex h-full items-center justify-center overflow-hidden border border-[rgba(164,201,255,0.16)] bg-[linear-gradient(160deg,#0a1324_0%,#0e1c34_100%)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_38%,rgba(77,173,255,0.12)_0%,transparent_56%)]" />
              {activePhotoSrc ? (
                <img
                  alt="Andrew Dang"
                  className="relative h-full w-full object-cover object-[52%_24%] grayscale"
                  src={activePhotoSrc}
                  onError={handlePhotoError}
                />
              ) : (
                <div className="relative flex h-[78%] w-[78%] items-center justify-center border border-dashed border-[rgba(192,199,212,0.28)] bg-[rgba(255,255,255,0.02)]">
                  <div className="text-center text-[11px] font-thin uppercase tracking-[1.2px] text-[rgba(192,199,212,0.72)]">
                    <p>PHOTO NOT FOUND</p>
                    <p className="pt-[6px] text-[10px] text-[rgba(192,199,212,0.48)]">
                      add /public/about-me-photo.jpg
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,14,0)_0%,rgba(5,8,14,0.24)_100%)]" />
            </div>
          </div>
        </div>

        <div className="relative flex flex-col justify-start bg-[linear-gradient(132deg,rgba(44,53,73,0.42)_0%,rgba(20,26,37,0.22)_100%)] p-[44px]">
          <div className="max-w-[780px]">
            <p className="text-[11px] font-thin uppercase tracking-[3px] text-[#43d8f1]">IDENT_PROFILE</p>
            <h1 className="pt-[12px] text-[64px] font-thin tracking-[-2.2px] text-[#e5e2e1] leading-[1]">
              Andrew Dang
            </h1>
            <p className="max-w-[700px] pt-[22px] text-[22px] font-thin text-[#c0c7d4] leading-[1.45]">
              Computer science at UTA, welcome to my portfolio.
            </p>
            <p className="max-w-[700px] pt-[14px] text-[17px] font-thin text-[rgba(192,199,212,0.86)] leading-[1.55]">
              Outside of coding, I spend a lot of time in the gym, play basketball,
              and enjoy competitive video games. I also used to play Fortnite at a
              pro level, and it allowed me to travel the world and fall in love with it.
            </p>

            <div className="max-w-[760px] pt-[34px]">
              <div className="flex flex-wrap gap-[8px]">
                <ColorTag bg="#f07b33" text="Swift" />
                <ColorTag bg="#146eb4" text="Python" />
                <ColorTag bg="#d1a618" text="JavaScript" textColor="#1f1600" />
                <ColorTag bg="#8b8b8b" text="SQL" />
                <ColorTag bg="#d76448" text="Git" />
                <ColorTag bg="#9ea113" text="HTML/CSS" textColor="#161800" />
                <ColorTag bg="#4c89c3" text="SwiftUI" />
                <ColorTag bg="#1278c8" text="React Native" />
                <ColorTag bg="#69a97f" text="VueJS" />
                <ColorTag bg="#3f6d96" text="Flask" />
                <ColorTag bg="#2f8a43" text="MongoDB" />
                <ColorTag bg="#4f8db7" text="SQLite" />
                <ColorTag bg="#7350d0" text="Figma" />
                <ColorTag bg="#2f8f5a" text="Gym" />
                <ColorTag bg="#3f79c4" text="Basketball" />
                <ColorTag bg="#6d53c7" text="Gaming" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ResumeWindowProps = {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  onTitleMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
};

function ResumeWindow({ onClose, onMinimize, onMaximize, isMaximized, onTitleMouseDown }: ResumeWindowProps) {
  return (
    <div className="relative h-[min(76vh,720px)] w-[min(1020px,calc(100vw-220px))] overflow-hidden border border-[#434a56] bg-[#1f232a] shadow-[0_28px_72px_rgba(0,0,0,0.46)]">

      <div
        className="relative z-[2] flex h-[34px] cursor-grab select-none items-center justify-between border-b border-[#3b414c] bg-[#2a2f36] px-[10px] active:cursor-grabbing"
        onMouseDown={onTitleMouseDown}
      >
        <div className="flex items-center gap-[8px] text-[11px] uppercase tracking-[0.5px] text-[#e8edf5]">
          <img alt="" className="size-[13px] object-contain" src={resumeFileIcon} />
          Resume.pdf - File Viewer
        </div>

        <div className="flex h-full items-stretch">
          <button
            type="button"
            className="flex w-[45px] items-center justify-center text-[#dbe3ef] transition-colors hover:bg-[#3a404a]"
            aria-label="Minimize"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMinimize}
          >
            <img alt="" className="h-[1px] w-[10px]" src={desktopAssets.windowMinimize} />
          </button>
          <button
            type="button"
            className="flex w-[45px] items-center justify-center text-[#dbe3ef] transition-colors hover:bg-[#3a404a]"
            aria-label={isMaximized ? "Restore" : "Maximize"}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMaximize}
          >
            <img alt="" className="size-[10px]" src={desktopAssets.windowMaximize} />
          </button>
          <button
            type="button"
            className="flex w-[45px] items-center justify-center transition-colors hover:bg-[#e81123]"
            aria-label="Close"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onClose}
          >
            <img alt="" className="size-[10px]" src={desktopAssets.windowClose} />
          </button>
        </div>
      </div>

      <div className="relative z-[1] h-[calc(100%-34px)] p-[26px]">
        <div className="h-full overflow-auto rounded-[6px] border border-[rgba(255,255,255,0.08)] bg-[rgba(9,12,19,0.68)] p-[28px]">
          <div className="mx-auto max-w-[760px] text-[#c0c7d4]">
            <p className="text-[11px] font-thin uppercase tracking-[2px] text-[#43d8f1]">Resume Preview</p>
            <h2 className="pt-[10px] text-[40px] font-thin tracking-[-1.2px] text-[#e5e2e1]">
              Andrew Dang
            </h2>
            <p className="pt-[6px] text-[14px] font-thin text-[rgba(192,199,212,0.8)]">
              (682) 300-1386 | andrewdangbusiness@gmail.com | github.com/andrewdang06
            </p>

            <div className="mt-[24px] space-y-[22px] text-[14px] font-thin leading-[1.65]">
              <section>
                <h3 className="text-[12px] uppercase tracking-[1.2px] text-[#a4c9ff]">Education</h3>
                <p className="pt-[6px] text-[#e5e2e1]">
                  University of Texas at Arlington - Arlington, TX
                </p>
                <p>
                  B.S. in Computer Science, Minor in Business (Expected Fall 2028)
                </p>
                <ul className="list-disc space-y-[4px] pl-[18px] pt-[6px] text-[rgba(192,199,212,0.92)]">
                  <li>
                    GPA: 3.75/4.0 | Relevant Coursework: Intro to C, Intro to Python,
                    Calculus, Business Data Processing
                  </li>
                  <li>Honors: Dean&apos;s List, Maverick Academic Scholarship</li>
                </ul>
              </section>

              <section>
                <h3 className="text-[12px] uppercase tracking-[1.2px] text-[#a4c9ff]">Technical Skills</h3>
                <ul className="list-disc space-y-[4px] pl-[18px] pt-[6px] text-[rgba(192,199,212,0.92)]">
                  <li>
                    Languages: Python, C++, C#, JavaScript, TypeScript
                  </li>
                  <li>
                    Frameworks &amp; Libraries: React, Node.js, Tailwind CSS, Unity,
                    Pandas, NumPy, scikit-learn
                  </li>
                  <li>
                    Tools &amp; Platforms: Git, GitHub, Firebase, Figma, Microsoft Excel,
                    REST APIs, Gemini API
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-[12px] uppercase tracking-[1.2px] text-[#a4c9ff]">Experience</h3>

                <div className="pt-[6px]">
                  <p className="text-[#e5e2e1]">Premier Soccer Services - Katy, TX</p>
                  <p className="text-[rgba(192,199,212,0.76)]">
                    Data Science Intern | Aug. 2025 - Present
                  </p>
                  <ul className="list-disc space-y-[4px] pl-[18px] pt-[4px] text-[rgba(192,199,212,0.92)]">
                    <li>
                      Designed and implemented data processing pipelines using Python
                      (Pandas, NumPy) to clean, transform, and analyze training and
                      attendance datasets for 600+ student athletes, enabling more
                      accurate performance tracking and reporting.
                    </li>
                    <li>
                      Applied statistical analysis and exploratory data techniques to
                      player performance metrics, identifying trends and delivering
                      actionable insights to coaching staff for data-driven decision
                      making.
                    </li>
                  </ul>
                </div>

                <div className="pt-[10px]">
                  <p className="text-[#e5e2e1]">Tomorrow&apos;s Leaders Today - Fort Worth, TX</p>
                  <p className="text-[rgba(192,199,212,0.76)]">
                    Data Analytics Intern | Sep. 2025 - Aug. 2025
                  </p>
                  <ul className="list-disc space-y-[4px] pl-[18px] pt-[4px] text-[rgba(192,199,212,0.92)]">
                    <li>
                      Analyzed financial datasets using Microsoft Excel (pivot tables,
                      advanced formulas, and data validation tools) to track expenses,
                      identify discrepancies, and improve reporting accuracy.
                    </li>
                    <li>
                      Structured and cleaned large-scale financial datasets by applying
                      filtering, normalization, and aggregation techniques, ensuring
                      consistency and reliability for reporting.
                    </li>
                  </ul>
                </div>

                <div className="pt-[10px]">
                  <p className="text-[#e5e2e1]">Edikt Studios - Fort Worth, TX</p>
                  <p className="text-[rgba(192,199,212,0.76)]">
                    Software Engineering Intern | Aug. 2023 - May 2024
                  </p>
                  <ul className="list-disc space-y-[4px] pl-[18px] pt-[4px] text-[rgba(192,199,212,0.92)]">
                    <li>
                      Developed gameplay systems and interactive mechanics using C# and
                      the Unity game engine, implementing features such as player
                      movement, event-driven systems, and object interaction logic.
                    </li>
                    <li>
                      Utilized object-oriented programming principles to design modular
                      and reusable scripts, improving maintainability and scalability of
                      game systems.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-[12px] uppercase tracking-[1.2px] text-[#a4c9ff]">Projects</h3>

                <div className="pt-[6px]">
                  <p className="text-[#e5e2e1]">GrubFinder | Personal Project (Mar. 2026)</p>
                  <ul className="list-disc space-y-[4px] pl-[18px] pt-[4px] text-[rgba(192,199,212,0.92)]">
                    <li>
                      Developed a full-stack food discovery platform using JavaScript,
                      Node.js, and REST APIs, integrating the Gemini API to provide
                      intelligent restaurant recommendations based on user location.
                    </li>
                    <li>
                      Implemented backend data processing logic to filter and serve
                      results from a dataset of 100+ restaurants, dynamically returning
                      only entries with ratings of 4.3 or higher within a configurable
                      radius.
                    </li>
                  </ul>
                </div>

                <div className="pt-[10px]">
                  <p className="text-[#e5e2e1]">Exploit Incorporated | ACM Hackathon Project (Feb. 2026)</p>
                  <ul className="list-disc space-y-[4px] pl-[18px] pt-[4px] text-[rgba(192,199,212,0.92)]">
                    <li>
                      Engineered core gameplay systems using TypeScript, including idle
                      income scaling algorithms, upgrade multipliers, and progression
                      mechanics for a dynamic game loop.
                    </li>
                    <li>
                      Designed and implemented responsive UI components based on Figma
                      prototypes, translating design assets into functional front-end
                      interfaces.
                    </li>
                  </ul>
                </div>

                <div className="pt-[10px]">
                  <p className="text-[#e5e2e1]">Klip | Open Source Project (Dec. 2025)</p>
                  <ul className="list-disc space-y-[4px] pl-[18px] pt-[4px] text-[rgba(192,199,212,0.92)]">
                    <li>
                      Developed a lightweight game clipping application in C++ focused
                      on low-resource environments, optimizing CPU and memory usage to
                      ensure stable real-time capture on low-end hardware.
                    </li>
                    <li>
                      Implemented efficient frame buffering and video handling systems to
                      support instant replay-style clipping with minimal latency.
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type DesktopIconProps = {
  active?: boolean;
  label: string;
  src: string;
  onClick?: () => void;
};

function DesktopIcon({ active = false, label, src, onClick }: DesktopIconProps) {
  return (
    <button
      type="button"
      className="group flex flex-col items-center gap-[6px] bg-transparent p-0 text-center"
      onClick={onClick}
    >
      <div className="flex size-[64px] items-center justify-center rounded-[8px] border border-transparent transition-all group-hover:border-[rgba(255,255,255,0.12)] group-hover:bg-[rgba(255,255,255,0.08)]">
        <img alt="" className="size-[48px] object-contain" src={src} />
      </div>
      <span
        className={`text-center text-[10px] font-thin leading-[1.2] transition-colors ${
          active ? "text-[#ffffff]" : "text-[rgba(192,199,212,0.88)]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

type ColorTagProps = {
  bg: string;
  text: string;
  textColor?: string;
};

function ColorTag({ bg, text, textColor = "#f7f8fc" }: ColorTagProps) {
  return (
    <span
      className="rounded-[4px] px-[10px] py-[4px] text-[12px] font-thin tracking-[0.2px]"
      style={{ backgroundColor: bg, color: textColor }}
    >
      {text}
    </span>
  );
}

type DesktopTaskbarProps = {
  windows: WindowMap;
  onOpenPortfolio: () => void;
  onOpenResume: () => void;
  onOpenMusic: () => void;
  onOpenProjects: () => void;
  onOpenMail: () => void;
  onOpenChrome: () => void;
};

function DesktopTaskbar({
  windows,
  onOpenPortfolio,
  onOpenResume,
  onOpenMusic,
  onOpenProjects,
  onOpenMail,
  onOpenChrome,
}: DesktopTaskbarProps) {
  const taskbarPalette = {
    shellBg: "rgba(24,33,47,0.94)",
    shellBorder: "rgba(255,255,255,0.08)",
    startBg: "#0078d7",
    startHover: "#1683d9",
    searchBg: "rgba(255,255,255,0.14)",
    searchBorder: "rgba(255,255,255,0.08)",
    searchFocusBg: "rgba(255,255,255,0.2)",
    searchFocusBorder: "rgba(0,120,215,0.7)",
  } as const;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const searchRef = useRef<HTMLDivElement | null>(null);

  const quickApps = [
    { id: "about", label: "About Me", type: "App", icon: aboutAppIcon, action: onOpenPortfolio },
    { id: "resume", label: "Resume.pdf", type: "Document", icon: resumeFileIcon, action: onOpenResume },
    { id: "music", label: "Music", type: "App", icon: musicAppIcon, action: onOpenMusic },
    { id: "projects", label: "Projects", type: "App", icon: projectsAppIcon, action: onOpenProjects },
    { id: "mail", label: "Mail", type: "App", icon: mailAppIcon, action: onOpenMail },
    { id: "chrome", label: "Chrome", type: "Web", icon: desktopAssets.taskbarPinnedChrome, action: onOpenChrome },
  ] as const;

  const taskbarAppButtonClass = (active: boolean) =>
    `flex h-full w-[46px] items-center justify-center ${
      active
        ? "border-b-2 border-[#76b9ed] bg-[rgba(255,255,255,0.13)]"
        : "hover:bg-[rgba(255,255,255,0.08)]"
    }`;

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const appResults = normalizedQuery
    ? quickApps.filter((item) => item.label.toLowerCase().includes(normalizedQuery))
    : quickApps.slice(0, 5);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!searchRef.current) {
        return;
      }
      if (!searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(tick);
  }, []);

  const timeText = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const dateText = now.toLocaleDateString([], { year: "numeric", month: "2-digit", day: "2-digit" });

  const runBestMatch = () => {
    if (appResults[0]) {
      appResults[0].action();
      setSearchOpen(false);
      return;
    }

    if (normalizedQuery) {
      const encoded = encodeURIComponent(searchQuery.trim());
      window.open(`https://www.google.com/search?q=${encoded}`, "_blank", "noopener,noreferrer");
      setSearchOpen(false);
    }
  };

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-[10] h-[48px] border-t"
      style={{
        borderTopColor: taskbarPalette.shellBorder,
        backgroundColor: taskbarPalette.shellBg,
      }}
    >
      <div className="relative h-full w-full">
        <div className="relative z-[2] flex h-full items-center" ref={searchRef}>
          <button
            type="button"
            className="flex h-full w-[48px] items-center justify-center"
            style={{ backgroundColor: taskbarPalette.startBg }}
            onMouseEnter={(event) => {
              event.currentTarget.style.backgroundColor = taskbarPalette.startHover;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.backgroundColor = taskbarPalette.startBg;
            }}
            aria-label="Start"
          >
            <img alt="" className="size-[14px] object-contain" src={desktopAssets.taskbarStart} />
          </button>
          <div
            className="ml-[1px] flex h-full w-[286px] items-center gap-[10px] border px-[12px]"
            style={{
              borderColor: searchOpen ? taskbarPalette.searchFocusBorder : taskbarPalette.searchBorder,
              backgroundColor: searchOpen ? taskbarPalette.searchFocusBg : taskbarPalette.searchBg,
            }}
          >
            <img alt="" className="size-[11px]" src={desktopAssets.taskbarSearch} />
            <input
              value={searchQuery}
              onFocus={() => setSearchOpen(true)}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSearchOpen(true);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  runBestMatch();
                }
                if (event.key === "Escape") {
                  setSearchOpen(false);
                }
              }}
              placeholder="Type here to search"
              className="w-full bg-transparent text-[12px] text-[#f3f6fb] outline-none placeholder:text-[rgba(229,235,242,0.78)]"
              style={{
                boxShadow: "none",
              }}
              aria-label="Search"
            />
          </div>

          {searchOpen ? (
            <div className="absolute bottom-[48px] left-[49px] z-[40] h-[420px] w-[600px] border border-[rgba(145,145,145,0.6)] bg-[#f4f4f4] shadow-[0_18px_56px_rgba(0,0,0,0.45)]">
              <div className="border-b border-[#d7d7d7] bg-white px-[16px] py-[12px]">
                <p className="text-[11px] uppercase tracking-[1.2px] text-[#6a6a6a]">Search</p>
                <p className="pt-[4px] text-[15px] text-[#1f1f1f]">
                  {searchQuery.trim() || "Start typing to search apps, files, and web"}
                </p>
              </div>

              <div className="grid h-[calc(100%-68px)] grid-cols-[1fr_200px]">
                <div className="overflow-auto border-r border-[#d8d8d8] bg-white p-[12px]">
                  <p className="px-[6px] pb-[8px] text-[10px] uppercase tracking-[1px] text-[#6f6f6f]">
                    Best match
                  </p>
                  {appResults.length > 0 ? (
                    appResults.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`flex w-full items-center gap-[10px] rounded-[4px] border px-[8px] py-[8px] text-left transition-colors ${
                          index === 0
                            ? "border-[#b3d7f5] bg-[#eaf4fd]"
                            : "border-transparent hover:border-[#d1e6f8] hover:bg-[#f3f8fd]"
                        }`}
                        onClick={() => {
                          item.action();
                          setSearchOpen(false);
                        }}
                      >
                        <img alt="" className="size-[16px] object-contain" src={item.icon} />
                        <div>
                          <p className="text-[12px] text-[#111111]">{item.label}</p>
                          <p className="text-[10px] uppercase tracking-[0.8px] text-[#6f6f6f]">
                            {item.type}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="px-[6px] pt-[10px] text-[12px] text-[#5d5d5d]">No matching apps found.</p>
                  )}
                </div>

                <div className="bg-[#f2f2f2] p-[12px]">
                  <p className="pb-[8px] text-[10px] uppercase tracking-[1px] text-[#6f6f6f]">Quick actions</p>
                  <button
                    type="button"
                    className="w-full border border-[#c8dceb] bg-white px-[10px] py-[8px] text-left text-[11px] uppercase tracking-[1px] text-[#1f5f8b] hover:bg-[#edf6fd]"
                    onClick={runBestMatch}
                  >
                    Open best match
                  </button>
                  <button
                    type="button"
                    className="mt-[8px] w-full border border-[#c8dceb] bg-white px-[10px] py-[8px] text-left text-[11px] uppercase tracking-[1px] text-[#1f5f8b] hover:bg-[#edf6fd]"
                    onClick={() => {
                      const q = encodeURIComponent((searchQuery.trim() || "Andrew Dang portfolio").trim());
                      window.open(`https://www.google.com/search?q=${q}`, "_blank", "noopener,noreferrer");
                      setSearchOpen(false);
                    }}
                  >
                    Search web
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="absolute left-1/2 top-0 z-[1] flex h-full -translate-x-1/2 items-center gap-[1px]">
          <button
            type="button"
            className={taskbarAppButtonClass(windows.portfolio.open && !windows.portfolio.minimized)}
            aria-label="Open about me"
            onClick={onOpenPortfolio}
          >
            <img alt="" className="size-[17px] object-contain" src={aboutAppIcon} />
          </button>
          <button
            type="button"
            className={taskbarAppButtonClass(windows.resume.open && !windows.resume.minimized)}
            aria-label="Open resume viewer"
            onClick={onOpenResume}
          >
            <img alt="" className="size-[17px] object-contain" src={resumeFileIcon} />
          </button>
          <button
            type="button"
            className={taskbarAppButtonClass(windows.music.open && !windows.music.minimized)}
            aria-label="Open music app"
            onClick={onOpenMusic}
          >
            <img alt="" className="size-[17px] object-contain" src={musicAppIcon} />
          </button>
          <button
            type="button"
            className={taskbarAppButtonClass(windows.projects.open && !windows.projects.minimized)}
            aria-label="Open projects app"
            onClick={onOpenProjects}
          >
            <img alt="" className="size-[17px] object-contain" src={projectsAppIcon} />
          </button>
          <button
            type="button"
            className={taskbarAppButtonClass(false)}
            aria-label="Chrome"
            onClick={onOpenChrome}
          >
            <img alt="" className="size-[17px] object-contain" src={desktopAssets.taskbarPinnedChrome} />
          </button>
          <button
            type="button"
            className={taskbarAppButtonClass(windows.mail.open && !windows.mail.minimized)}
            aria-label="Mail"
            onClick={onOpenMail}
          >
            <img alt="" className="size-[17px] object-contain" src={mailAppIcon} />
          </button>
        </div>

        <div className="absolute right-[8px] top-0 flex h-full items-center gap-[12px] text-[11px] text-[#d8dee7]">
          <img alt="" className="h-[10px] w-[14px]" src={desktopAssets.taskbarWifi} />
          <img alt="" className="h-[10px] w-[10px]" src={desktopAssets.taskbarVolume} />
          <div className="text-right leading-[14px]">
            <p>{timeText}</p>
            <p>{dateText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
