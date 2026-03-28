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

const candyAppIcon = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
    <rect x='8' y='8' width='48' height='48' rx='12' fill='url(#bg)'/>
    <circle cx='25' cy='27' r='10' fill='url(#c1)'/>
    <circle cx='39' cy='37' r='9' fill='url(#c2)'/>
    <circle cx='38' cy='22' r='6' fill='url(#c3)'/>
    <defs>
      <linearGradient id='bg' x1='8' y1='8' x2='56' y2='56' gradientUnits='userSpaceOnUse'>
        <stop stop-color='#24344d'/>
        <stop offset='1' stop-color='#182433'/>
      </linearGradient>
      <linearGradient id='c1' x1='15' y1='17' x2='35' y2='37' gradientUnits='userSpaceOnUse'>
        <stop stop-color='#ff7ab7'/>
        <stop offset='1' stop-color='#d84489'/>
      </linearGradient>
      <linearGradient id='c2' x1='30' y1='28' x2='48' y2='46' gradientUnits='userSpaceOnUse'>
        <stop stop-color='#6ce2ff'/>
        <stop offset='1' stop-color='#2a9dcc'/>
      </linearGradient>
      <linearGradient id='c3' x1='32' y1='16' x2='44' y2='28' gradientUnits='userSpaceOnUse'>
        <stop stop-color='#ffd06f'/>
        <stop offset='1' stop-color='#cf9636'/>
      </linearGradient>
    </defs>
  </svg>`
)}`;

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

type WindowId = "portfolio" | "resume" | "music" | "projects" | "mail" | "candy";

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
  candy: { width: 980, height: 720 },
};

const INITIAL_WINDOWS: WindowMap = {
  portfolio: { open: false, minimized: false, maximized: false, restoreX: 80, restoreY: 28, x: 80, y: 28, z: 3 },
  resume: { open: false, minimized: false, maximized: false, restoreX: 140, restoreY: 44, x: 140, y: 44, z: 2 },
  music: { open: false, minimized: false, maximized: false, restoreX: 200, restoreY: 58, x: 200, y: 58, z: 1 },
  projects: { open: false, minimized: false, maximized: false, restoreX: 240, restoreY: 76, x: 240, y: 76, z: 0 },
  mail: { open: false, minimized: false, maximized: false, restoreX: 260, restoreY: 90, x: 260, y: 90, z: 0 },
  candy: { open: false, minimized: false, maximized: false, restoreX: 220, restoreY: 84, x: 220, y: 84, z: 0 },
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
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,26,0.15)_0%,rgba(10,16,28,0.35)_100%)]" />

        <div className="absolute bottom-[64px] left-0 top-[18px] z-[3] flex w-[86px] flex-col items-center gap-[24px]">
          <RailIcon
            active={windows.portfolio.open && !windows.portfolio.minimized}
            label="ABOUT ME"
            src={aboutAppIcon}
            onClick={() => openWindow("portfolio")}
          />
          <RailIcon
            active={windows.resume.open && !windows.resume.minimized}
            label="RESUME.PDF"
            src={resumeFileIcon}
            onClick={() => openWindow("resume")}
          />
          <RailIcon
            active={windows.music.open && !windows.music.minimized}
            label="MUSIC"
            src={musicAppIcon}
            onClick={() => openWindow("music")}
          />
          <RailIcon
            active={windows.projects.open && !windows.projects.minimized}
            label="PROJECTS"
            src={projectsAppIcon}
            onClick={() => openWindow("projects")}
          />
          <RailIcon
            active={windows.mail.open && !windows.mail.minimized}
            label="MAIL"
            src={mailAppIcon}
            onClick={() => openWindow("mail")}
          />
          <RailIcon
            active={windows.candy.open && !windows.candy.minimized}
            label="CANDY"
            src={candyAppIcon}
            onClick={() => openWindow("candy")}
          />
          <RailIcon label="CHROME" src={desktopAssets.iconChrome} />
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

          {windows.candy.open && !windows.candy.minimized ? (
            <div
              className={`pointer-events-auto absolute ${windows.candy.maximized ? "[&>*]:!h-full [&>*]:!w-full" : ""}`}
              style={{
                left: windows.candy.maximized ? 0 : windows.candy.x,
                top: windows.candy.maximized ? 0 : windows.candy.y,
                width: windows.candy.maximized ? "100%" : undefined,
                height: windows.candy.maximized ? "100%" : undefined,
                zIndex: windows.candy.z,
              }}
              onMouseDown={() => bringToFront("candy")}
            >
              <CandyMatchWindow
                onClose={() => closeWindow("candy")}
                onMinimize={() => minimizeWindow("candy")}
                onMaximize={() => toggleMaximizeWindow("candy")}
                isMaximized={windows.candy.maximized}
                onTitleMouseDown={(event) => startDrag("candy", event)}
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
          onOpenCandy={() => openWindow("candy")}
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

type CandyId = "ruby" | "amber" | "mint" | "amethyst" | "sky" | "strawberry";

type CandyCell = {
  id: string;
  kind: CandyId;
};

type GridPosition = {
  row: number;
  col: number;
};

const candyKinds: CandyId[] = ["ruby", "amber", "mint", "amethyst", "sky", "strawberry"];
const candyGridSize = 8;

const candyStyles: Record<CandyId, { gradient: string; rim: string; shine: string }> = {
  ruby: { gradient: "from-[#ff8aaa] to-[#e65182]", rim: "#ffb4cb", shine: "#ffd8e6" },
  amber: { gradient: "from-[#ffd37a] to-[#d6932d]", rim: "#ffe0a6", shine: "#fff1cb" },
  mint: { gradient: "from-[#93f2ba] to-[#34b16f]", rim: "#bbffd2", shine: "#e3ffee" },
  amethyst: { gradient: "from-[#c8a3ff] to-[#7a5cc7]", rim: "#e0cbff", shine: "#f1e8ff" },
  sky: { gradient: "from-[#89ddff] to-[#3f8fc7]", rim: "#baeaff", shine: "#e8f8ff" },
  strawberry: { gradient: "from-[#ff89d0] to-[#cd4da0]", rim: "#ffb6e3", shine: "#ffe0f3" },
};

const candyLevels = [
  { label: "Level 1", target: 260, moves: 14 },
  { label: "Level 2", target: 320, moves: 14 },
  { label: "Level 3", target: 390, moves: 15 },
  { label: "Level 4", target: 460, moves: 15 },
  { label: "Level 5", target: 530, moves: 16 },
  { label: "Level 6", target: 620, moves: 16 },
  { label: "Level 7", target: 720, moves: 17 },
  { label: "Level 8", target: 840, moves: 18 },
] as const;

let candyCellSequence = 0;

const randomCandyKind = (): CandyId => {
  const index = Math.floor(Math.random() * candyKinds.length);
  return candyKinds[index] ?? "ruby";
};

const createCandyCell = (kind: CandyId = randomCandyKind()): CandyCell => {
  candyCellSequence += 1;
  return {
    id: `candy-${candyCellSequence}`,
    kind,
  };
};

const cloneCandyBoard = (board: CandyCell[][]): CandyCell[][] => board.map((row) => row.map((cell) => ({ ...cell })));

const keyForPosition = (row: number, col: number) => `${row}:${col}`;

const findCandyMatches = (board: CandyCell[][]): Set<string> => {
  const matches = new Set<string>();

  for (let row = 0; row < candyGridSize; row += 1) {
    let runStart = 0;
    for (let col = 1; col <= candyGridSize; col += 1) {
      const currentKind = col < candyGridSize ? board[row]?.[col]?.kind : null;
      const startKind = board[row]?.[runStart]?.kind;
      if (currentKind !== startKind) {
        const runLength = col - runStart;
        if (startKind && runLength >= 3) {
          for (let mark = runStart; mark < col; mark += 1) {
            matches.add(keyForPosition(row, mark));
          }
        }
        runStart = col;
      }
    }
  }

  for (let col = 0; col < candyGridSize; col += 1) {
    let runStart = 0;
    for (let row = 1; row <= candyGridSize; row += 1) {
      const currentKind = row < candyGridSize ? board[row]?.[col]?.kind : null;
      const startKind = board[runStart]?.[col]?.kind;
      if (currentKind !== startKind) {
        const runLength = row - runStart;
        if (startKind && runLength >= 3) {
          for (let mark = runStart; mark < row; mark += 1) {
            matches.add(keyForPosition(mark, col));
          }
        }
        runStart = row;
      }
    }
  }

  return matches;
};

const swapCandyCells = (board: CandyCell[][], first: GridPosition, second: GridPosition): CandyCell[][] => {
  const next = cloneCandyBoard(board);
  const firstCell = next[first.row]?.[first.col];
  const secondCell = next[second.row]?.[second.col];
  if (!firstCell || !secondCell) {
    return next;
  }
  next[first.row][first.col] = secondCell;
  next[second.row][second.col] = firstCell;
  return next;
};

const resolveCandyBoard = (board: CandyCell[][]): { board: CandyCell[][]; points: number } => {
  const working = cloneCandyBoard(board);
  let points = 0;

  while (true) {
    const matches = findCandyMatches(working);
    if (!matches.size) {
      break;
    }

    points += matches.size * 10;

    for (const matchKey of matches) {
      const [rowString, colString] = matchKey.split(":");
      const row = Number(rowString);
      const col = Number(colString);
      if (!Number.isNaN(row) && !Number.isNaN(col) && working[row]?.[col]) {
        (working[row] as Array<CandyCell | null>)[col] = null;
      }
    }

    for (let col = 0; col < candyGridSize; col += 1) {
      const survivors: CandyCell[] = [];
      for (let row = candyGridSize - 1; row >= 0; row -= 1) {
        const cell = working[row]?.[col] as CandyCell | null | undefined;
        if (cell) {
          survivors.push(cell);
        }
      }

      for (let row = candyGridSize - 1; row >= 0; row -= 1) {
        const survivor = survivors.shift();
        if (survivor) {
          working[row][col] = survivor;
        } else {
          working[row][col] = createCandyCell();
        }
      }
    }
  }

  return { board: working, points };
};

const hasCandyMove = (board: CandyCell[][]): boolean => {
  for (let row = 0; row < candyGridSize; row += 1) {
    for (let col = 0; col < candyGridSize; col += 1) {
      const right = { row, col: col + 1 };
      const down = { row: row + 1, col };

      if (right.col < candyGridSize) {
        if (findCandyMatches(swapCandyCells(board, { row, col }, right)).size > 0) {
          return true;
        }
      }

      if (down.row < candyGridSize) {
        if (findCandyMatches(swapCandyCells(board, { row, col }, down)).size > 0) {
          return true;
        }
      }
    }
  }
  return false;
};

const createCandyBoard = (): CandyCell[][] => {
  const board: CandyCell[][] = [];

  for (let row = 0; row < candyGridSize; row += 1) {
    const rowCells: CandyCell[] = [];
    for (let col = 0; col < candyGridSize; col += 1) {
      let kind = randomCandyKind();
      while (
        (col >= 2 && rowCells[col - 1]?.kind === kind && rowCells[col - 2]?.kind === kind) ||
        (row >= 2 && board[row - 1]?.[col]?.kind === kind && board[row - 2]?.[col]?.kind === kind)
      ) {
        kind = randomCandyKind();
      }
      rowCells.push(createCandyCell(kind));
    }
    board.push(rowCells);
  }

  return board;
};

const createPlayableCandyBoard = (): CandyCell[][] => {
  for (let attempt = 0; attempt < 14; attempt += 1) {
    const candidate = createCandyBoard();
    if (hasCandyMove(candidate)) {
      return candidate;
    }
  }
  return createCandyBoard();
};

const areAdjacentCandyCells = (first: GridPosition, second: GridPosition): boolean => {
  const rowDistance = Math.abs(first.row - second.row);
  const colDistance = Math.abs(first.col - second.col);
  return rowDistance + colDistance === 1;
};

type CandyMatchWindowProps = {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  onTitleMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
};

function CandyMatchWindow({ onClose, onMinimize, onMaximize, isMaximized, onTitleMouseDown }: CandyMatchWindowProps) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [board, setBoard] = useState<CandyCell[][]>(() => createPlayableCandyBoard());
  const [movesLeft, setMovesLeft] = useState<number>(candyLevels[0].moves);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<GridPosition | null>(null);
  const [status, setStatus] = useState<"playing" | "won-level" | "lost-level" | "won-game">("playing");
  const [lastGain, setLastGain] = useState(0);
  const [invalidSwap, setInvalidSwap] = useState(false);

  const currentLevel = candyLevels[levelIndex] ?? candyLevels[0];

  const startLevel = (nextLevelIndex: number) => {
    const safeIndex = Math.min(Math.max(nextLevelIndex, 0), candyLevels.length - 1);
    setLevelIndex(safeIndex);
    setBoard(createPlayableCandyBoard());
    setMovesLeft(candyLevels[safeIndex]?.moves ?? candyLevels[0].moves);
    setScore(0);
    setSelected(null);
    setStatus("playing");
    setLastGain(0);
    setInvalidSwap(false);
  };

  const handleCandyClick = (row: number, col: number) => {
    if (status !== "playing") {
      return;
    }

    const target = { row, col };
    if (!selected) {
      setSelected(target);
      return;
    }

    if (selected.row === row && selected.col === col) {
      setSelected(null);
      return;
    }

    if (!areAdjacentCandyCells(selected, target)) {
      setSelected(target);
      return;
    }

    const swapped = swapCandyCells(board, selected, target);
    const instantMatches = findCandyMatches(swapped);

    if (!instantMatches.size) {
      setSelected(null);
      setInvalidSwap(true);
      window.setTimeout(() => setInvalidSwap(false), 220);
      return;
    }

    const resolved = resolveCandyBoard(swapped);
    const gained = resolved.points;
    const nextScore = score + gained;
    const nextMoves = Math.max(0, movesLeft - 1);

    setBoard(hasCandyMove(resolved.board) ? resolved.board : createPlayableCandyBoard());
    setScore(nextScore);
    setMovesLeft(nextMoves);
    setLastGain(gained);
    setSelected(null);
    setInvalidSwap(false);

    if (nextScore >= currentLevel.target) {
      setStatus(levelIndex === candyLevels.length - 1 ? "won-game" : "won-level");
      return;
    }

    if (nextMoves === 0) {
      setStatus("lost-level");
    }
  };

  return (
    <div className="relative h-[min(74vh,720px)] w-[min(980px,calc(100vw-220px))] overflow-hidden border border-[#434a56] bg-[#1f232a] shadow-[0_30px_74px_rgba(0,0,0,0.48)]">
      <div
        className="relative z-[2] flex h-[34px] cursor-grab select-none items-center justify-between border-b border-[#3b414c] bg-[#2a2f36] px-[10px] active:cursor-grabbing"
        onMouseDown={onTitleMouseDown}
      >
        <div className="flex items-center gap-[8px] text-[11px] uppercase tracking-[0.5px] text-[#e8edf5]">
          <img alt="" className="size-[13px] object-contain" src={candyAppIcon} />
          Candy Match - Puzzle Arcade
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

      <div className="relative z-[1] grid h-[calc(100%-34px)] grid-cols-[290px_1fr] bg-[linear-gradient(140deg,#161d2a_0%,#1e2a3e_100%)]">
        <aside className="border-r border-[#364158] bg-[linear-gradient(180deg,rgba(26,34,50,0.96)_0%,rgba(22,28,43,0.98)_100%)] p-[18px]">
          <p className="text-[11px] uppercase tracking-[1.8px] text-[#78d4ff]">Sweet Challenge</p>
          <h2 className="pt-[8px] text-[30px] leading-[1.1] tracking-[-0.4px] text-[#eef4ff]">{currentLevel.label}</h2>
          <p className="pt-[8px] text-[12px] leading-[1.55] text-[#b9c5d8]">
            Swap adjacent candies to make rows or columns of 3+. Hit your target score before you run out of moves.
          </p>

          <div className="mt-[18px] space-y-[8px] rounded-[8px] border border-[#3c4861] bg-[#1c2637] p-[12px] text-[12px]">
            <div className="flex items-center justify-between text-[#dce7f8]">
              <span>Target</span>
              <span className="font-medium text-[#ffffff]">{currentLevel.target}</span>
            </div>
            <div className="flex items-center justify-between text-[#dce7f8]">
              <span>Score</span>
              <span className="font-medium text-[#ffffff]">{score}</span>
            </div>
            <div className="flex items-center justify-between text-[#dce7f8]">
              <span>Moves Left</span>
              <span className="font-medium text-[#ffffff]">{movesLeft}</span>
            </div>
            <div className="flex items-center justify-between text-[#9cb3d1]">
              <span>Last Chain</span>
              <span>{lastGain ? `+${lastGain}` : "--"}</span>
            </div>
          </div>

          <div className="mt-[14px] rounded-[8px] border border-[#3a455d] bg-[#161f2e] p-[10px]">
            <p className="text-[10px] uppercase tracking-[1.2px] text-[#8fb0d6]">Progress</p>
            <div className="mt-[8px] h-[7px] w-full overflow-hidden rounded-full bg-[#27334a]">
              <div
                className="h-full bg-[linear-gradient(90deg,#68d4ff_0%,#8df7b4_100%)] transition-all"
                style={{ width: `${Math.min(100, Math.round((score / currentLevel.target) * 100))}%` }}
              />
            </div>
            <p className="pt-[8px] text-[11px] text-[#b7c8de]">
              Level {levelIndex + 1} / {candyLevels.length}
            </p>
          </div>

          {status !== "playing" ? (
            <div className="mt-[14px] rounded-[8px] border border-[#4a5a75] bg-[#233149] p-[12px] text-[12px] text-[#dce9fb]">
              <p className="text-[13px] text-white">
                {status === "won-level"
                  ? "Level cleared"
                  : status === "won-game"
                    ? "All levels complete"
                    : "Out of moves"}
              </p>
              <p className="pt-[6px] text-[#b8c8dc]">
                {status === "lost-level"
                  ? "Try this level again and look for longer combos."
                  : "Keep the streak going with the next board."}
              </p>
              <div className="mt-[10px] flex gap-[8px]">
                {status === "won-level" ? (
                  <button
                    type="button"
                    className="border border-[#63b6f2] bg-[#1d6fb1] px-[10px] py-[6px] text-[11px] uppercase tracking-[1px] text-white hover:bg-[#2680c8]"
                    onClick={() => startLevel(levelIndex + 1)}
                  >
                    Next level
                  </button>
                ) : null}

                {status === "won-game" ? (
                  <button
                    type="button"
                    className="border border-[#63b6f2] bg-[#1d6fb1] px-[10px] py-[6px] text-[11px] uppercase tracking-[1px] text-white hover:bg-[#2680c8]"
                    onClick={() => startLevel(0)}
                  >
                    Play again
                  </button>
                ) : null}

                {status === "lost-level" ? (
                  <button
                    type="button"
                    className="border border-[#63b6f2] bg-[#1d6fb1] px-[10px] py-[6px] text-[11px] uppercase tracking-[1px] text-white hover:bg-[#2680c8]"
                    onClick={() => startLevel(levelIndex)}
                  >
                    Retry
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </aside>

        <div className="flex h-full items-center justify-center p-[18px]">
          <div
            className={`grid grid-cols-8 gap-[8px] rounded-[12px] border p-[12px] shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-colors ${
              invalidSwap ? "border-[#f08a8a] bg-[#3a2531]" : "border-[#3d4a63] bg-[#1f2b40]"
            }`}
          >
            {board.map((rowCells, row) =>
              rowCells.map((cell, col) => {
                const isSelected = selected?.row === row && selected?.col === col;
                const style = candyStyles[cell.kind];

                return (
                  <button
                    key={cell.id}
                    type="button"
                    className={`relative flex size-[54px] items-center justify-center rounded-[14px] border transition-all ${
                      isSelected
                        ? "border-[#bde6ff] bg-[rgba(152,218,255,0.16)] shadow-[0_0_0_2px_rgba(130,210,255,0.42)]"
                        : "border-[#4b5874] bg-[rgba(12,17,27,0.42)] hover:border-[#8fb9e2]"
                    }`}
                    onClick={() => handleCandyClick(row, col)}
                    aria-label={`Candy ${row + 1}-${col + 1}`}
                  >
                    <span className={`size-[36px] rounded-full bg-gradient-to-br ${style.gradient} shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]`}>
                      <span
                        className="absolute left-[17px] top-[14px] h-[8px] w-[12px] rounded-full opacity-80"
                        style={{ backgroundColor: style.shine }}
                      />
                      <span
                        className="absolute bottom-[12px] right-[14px] h-[9px] w-[9px] rounded-full opacity-45"
                        style={{ backgroundColor: style.rim }}
                      />
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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

function ProjectsWindow({ onClose, onMinimize, onMaximize, isMaximized, onTitleMouseDown }: ProjectsWindowProps) {
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
      name: "ExploitCorp",
      short: "EX",
      desc: "ACM hackathon project featuring progression systems, upgrades, and polished gameplay loops.",
      accent: "#5cc7ff",
      repo: "https://github.com/andrewdang06/exploitcorp.git",
      stack: ["TypeScript", "React", "Vite", "Tailwind CSS"],
    },
    {
      name: "GrubFinder",
      short: "GF",
      desc: "Full-stack food discovery platform with location-aware recommendations and smart filtering.",
      accent: "#2bcf63",
      repo: "https://github.com/andrewdang06/grubfinder.git",
      stack: ["TypeScript", "Next.js", "React", "Gemini API"],
    },
    {
      name: "Klip",
      short: "KP",
      desc: "Lightweight game clipping app optimized for low-resource systems and instant replay workflows.",
      accent: "#b97cff",
      repo: "https://github.com/andrewdang06/klip.git",
      stack: ["C++", "CMake", "FFmpeg", "ImGui", "DirectX 11"],
    },
  ];

  return (
    <div className="relative h-[min(74vh,700px)] w-[min(1120px,calc(100vw-240px))] overflow-hidden border border-[#434a56] bg-[#1f232a] shadow-[0_28px_72px_rgba(0,0,0,0.46)]">

      <div
        className="relative z-[2] flex h-[34px] cursor-grab select-none items-center justify-between border-b border-[#3b414c] bg-[#2a2f36] px-[10px] active:cursor-grabbing"
        onMouseDown={onTitleMouseDown}
      >
        <div className="flex items-center gap-[8px] text-[11px] uppercase tracking-[0.5px] text-[#e8edf5]">
          <img alt="" className="size-[13px] object-contain" src={projectsAppIcon} />
          Projects.app - Portfolio Grid
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

      <div className="relative z-[1] h-[calc(100%-34px)] bg-[#1f232a] p-[16px]">
        <div className="grid h-full min-h-0 grid-cols-3 gap-[12px] overflow-y-auto pr-[4px]">
          {projects.map((project) => (
            <article
              key={project.name}
              className="flex min-h-[196px] flex-col overflow-hidden rounded-[8px] border border-[#414856] bg-[#262b34]"
            >
              <div className="relative h-[108px] border-b border-[#3a414d] bg-[linear-gradient(145deg,#1a1f27_0%,#232935_100%)]">
                <div
                  className="absolute inset-x-[14px] top-[12px] bottom-[12px] flex items-center justify-center rounded-[6px]"
                  style={{
                    background: `radial-gradient(circle at 40% 35%, ${project.accent}52 0%, rgba(0,0,0,0) 60%)`,
                  }}
                >
                  <span className="text-[34px] tracking-[1px]" style={{ color: project.accent }}>
                    {project.short}
                  </span>
                </div>
              </div>
              <div className="p-[14px]">
                <h3 className="text-[14px] text-[#e8edf5]">{project.name}</h3>
                <p className="pt-[8px] text-[12px] leading-[1.5] text-[#b6bfcc]">
                  {project.desc}
                </p>
                <div className="mt-[10px] flex flex-wrap gap-[6px]">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border px-[7px] py-[3px] text-[10px] font-thin uppercase tracking-[0.8px]"
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
                {"repo" in project ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-[10px] inline-flex border border-[#587da3] bg-[#263544] px-[10px] py-[5px] text-[10px] uppercase tracking-[1px] text-[#9fd5ff] hover:bg-[#2d4359]"
                  >
                    Open GitHub
                  </a>
                ) : null}
              </div>
            </article>
          ))}
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

type RailIconProps = {
  active?: boolean;
  label: string;
  src: string;
  onClick?: () => void;
};

function RailIcon({ active = false, label, src, onClick }: RailIconProps) {
  return (
    <button
      type="button"
      className="group flex w-full flex-col items-center gap-[9px] bg-transparent p-0"
      onClick={onClick}
    >
      <div className="flex size-[48px] items-center justify-center rounded-[4px] border border-transparent transition-colors group-hover:border-[rgba(255,255,255,0.1)] group-hover:bg-[rgba(255,255,255,0.03)]">
        <img alt="" className="size-[30px] object-contain" src={src} />
      </div>
      <span
        className={`text-center text-[11px] font-thin uppercase tracking-[1px] leading-[1.2] ${
          active ? "text-[#e5e2e1]" : "text-[rgba(192,199,212,0.72)]"
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
  onOpenCandy: () => void;
  onOpenChrome: () => void;
};

function DesktopTaskbar({
  windows,
  onOpenPortfolio,
  onOpenResume,
  onOpenMusic,
  onOpenProjects,
  onOpenMail,
  onOpenCandy,
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
    { id: "candy", label: "Candy Match", type: "Game", icon: candyAppIcon, action: onOpenCandy },
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
          <button
            type="button"
            className={taskbarAppButtonClass(windows.candy.open && !windows.candy.minimized)}
            aria-label="Candy match"
            onClick={onOpenCandy}
          >
            <img alt="" className="size-[17px] object-contain" src={candyAppIcon} />
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
