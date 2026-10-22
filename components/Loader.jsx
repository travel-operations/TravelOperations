"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ANIM_MS = 2200;
const STAY_MS = 3000;

const destinations = [
  { country: "Uzbekistan", cx: 370, cy: 18 },
  { country: "Turkey",     cx: 370, cy: 63 },
  { country: "UAE",        cx: 370, cy: 108 },
  { country: "Saudi Arabia", cx: 370, cy: 153 },
  { country: "Malaysia",   cx: 370, cy: 195 },
];

const paths = [
  "M 48 120 Q 210 -20 370 18",
  "M 48 120 Q 210 10 370 63",
  "M 48 120 Q 210 45 370 108",
  "M 48 120 Q 210 75 370 153",
  "M 48 120 Q 210 98 370 195",
];

const planePath =
  "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z";

const Loader = () => {
  const [show, setShow]       = useState(true);
  const [progress, setProgress] = useState(0);
  const [landed, setLanded]   = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';

    let raf;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / ANIM_MS) * 100));
      setProgress(pct);
      if (elapsed < ANIM_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        setLanded(true);
        setTimeout(() => setShow(false), STAY_MS);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!show) document.body.style.overflow = '';
  }, [show]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0e1a2b]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-[#F3592D]/25 blur-[120px]" />
          <div className="absolute -bottom-48 -left-40 w-[600px] h-[600px] rounded-full bg-[#143656]/50 blur-[120px]" />

          {[...Array(28)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width:  i % 5 === 0 ? 3 : 1.5,
                height: i % 5 === 0 ? 3 : 1.5,
                top:  `${(i * 37) % 100}%`,
                left: `${(i * 53) % 100}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.2] }}
              transition={{ duration: 2.2, delay: (i % 7) * 0.2, repeat: Infinity, repeatType: "reverse" }}
            />
          ))}

          <div className="relative flex flex-col items-center px-4 w-full max-w-2xl">
            <div className="relative w-full" style={{ height: '230px' }}>
              <svg viewBox="0 0 580 220" className="w-full h-full overflow-visible">

                {paths.map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    fill="none"
                    stroke={i % 2 === 0 ? "#e7a892" : "#F3592D"}
                    strokeWidth="1.5"
                    strokeDasharray="5 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.65 }}
                    transition={{ duration: ANIM_MS / 1000, ease: "easeInOut", delay: i * 0.07 }}
                  />
                ))}

                <motion.circle cx="48" cy="120" r="6" fill="#fbf9f6"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15 }} />
                <motion.circle cx="48" cy="120" r="6" fill="none" stroke="#fbf9f6" strokeWidth="1.5"
                  animate={{ r: [6, 16], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }} />

                <text x="12" y="138" fill="#fbf9f6" fontSize="11" fontWeight="700"
                  fontStyle="italic" fontFamily="serif">LH</text>
                <text x="12" y="150" fill="rgba(255,255,255,0.4)" fontSize="7" letterSpacing="2">LAHORE</text>

                {destinations.map((dest, i) => (
                  <g key={i}>
                    <motion.circle
                      cx={dest.cx} cy={dest.cy} r="5"
                      fill={i % 2 === 0 ? "#e7a892" : "#F3592D"}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: ANIM_MS / 1000 - 0.1 + i * 0.06 }}
                    />
                    <motion.circle
                      cx={dest.cx} cy={dest.cy} r="5" fill="none"
                      stroke={i % 2 === 0 ? "#e7a892" : "#F3592D"} strokeWidth="1.2"
                      initial={{ opacity: 0 }}
                      animate={{ r: [5, 14], opacity: [0.7, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, delay: ANIM_MS / 1000 + i * 0.06 }}
                    />
                    <motion.text
                      x={dest.cx + 11} y={dest.cy + 4}
                      fill={landed ? "#e7a892" : "rgba(231,168,146,0.75)"}
                      fontSize="8.5" fontWeight="700" letterSpacing="0.8"
                      fontFamily="serif" fontStyle="italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: ANIM_MS / 1000 + 0.1 + i * 0.07 }}
                    >
                      {dest.country}
                    </motion.text>
                  </g>
                ))}

                {paths.map((d, i) => (
                  <motion.g
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.18 + i * 0.07 }}
                  >
                    <motion.g
                      animate={{ offsetDistance: ["0%", "100%"] }}
                      transition={{ duration: ANIM_MS / 1000, ease: "easeInOut", delay: i * 0.09 }}
                      style={{ offsetPath: `path('${d}')`, offsetRotate: "auto" }}
                    >
                      <g transform="translate(-8,-8) rotate(45 8 8)">
                        <path
                          d={planePath}
                          fill="#fbf9f6" stroke="#fbf9f6"
                          strokeWidth="0.4" strokeLinejoin="round"
                          transform="scale(0.72)"
                        />
                      </g>
                    </motion.g>
                  </motion.g>
                ))}
              </svg>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="font-serif text-white text-4xl md:text-6xl tracking-tight text-center leading-none"
            >
              Travel <span className="italic text-[#e7a892]">Operations</span>
            </motion.h1>

            <AnimatePresence mode="wait">
              {landed ? (
                <motion.p
                  key="landed"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-[#e7a892] text-[11px] uppercase tracking-[0.45em] mt-4 mb-8 text-center font-semibold"
                >
                  ✈ All destinations reached
                </motion.p>
              ) : (
                <motion.p
                  key="crafting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85, duration: 0.8 }}
                  className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.5em] mt-4 mb-8 text-center"
                >
                  Crafting your journey
                </motion.p>
              )}
            </AnimatePresence>

            <div className="w-56 md:w-72">
              <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#e7a892] to-[#F3592D] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">
                  {landed ? 'Landed' : 'Boarding'}
                </span>
                <span className="text-[#e7a892] text-[10px] font-semibold tabular-nums">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
