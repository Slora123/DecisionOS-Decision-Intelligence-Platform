import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Brain, BarChart3, Users, Layers } from 'lucide-react';
import logoSrc from '../logo_transparent.png';

/* ─── Splash: DecisionOS logo intro (image 2 style) ─────────────── */
function SplashLoader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  // step 0: black screen
  // step 1: logo icon scales in + glow
  // step 2: "DecisionOS" text slides in
  // step 3: light sweep across text
  // step 4: fade out entire splash

  useEffect(() => {
    const timings = [300, 900, 1500, 2100, 2700];
    const timers = timings.map((t, i) =>
      setTimeout(() => setStep(i + 1), t)
    );
    const done = setTimeout(() => onDone(), 3200);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {step < 5 && (
        <motion.div
          key="splash"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #0f0c29, #08080f)',
          }}
        >
          {/* Ambient glow behind logo */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute"
                style={{
                  width: 500, height: 500,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Main content */}
          <div className="relative flex items-center gap-4 md:gap-8">
            {/* Logo icon */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  {/* Outer ring pulse */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(99,102,241,0.3)', filter: 'blur(12px)' }}
                  />
                  <img
                    src={logoSrc}
                    alt="DecisionOS"
                    className="w-24 h-24 md:w-[180px] md:h-[180px]"
                    style={{
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 0 24px rgba(99,102,241,0.8))',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Text: DecisionOS */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden"
                >
                  <div
                    className="text-white select-none text-5xl md:text-[72px]"
                    style={{
                      fontWeight: 900,
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                    }}
                  >
                    <span style={{ color: '#fff' }}>Decision</span>
                    <span style={{
                      background: 'linear-gradient(90deg,#818cf8,#a78bfa,#c4b5fd)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>OS</span>
                  </div>

                  {/* Light sweep shimmer */}
                  {step >= 3 && (
                    <motion.div
                      initial={{ x: '-110%' }}
                      animate={{ x: '210%' }}
                      transition={{ duration: 0.75, ease: 'easeInOut' }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)',
                        width: '60%',
                      }}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Subtitle + loading dots */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="absolute bottom-[28%] flex flex-col items-center gap-4"
              >
                <div className="text-white/40 text-sm tracking-[0.3em] uppercase font-medium">
                  Decision Intelligence Platform
                </div>
                <div className="flex items-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner decorative lines */}
          {step >= 1 && (
            <>
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute top-12 left-12 w-16 h-px bg-gradient-to-r from-transparent to-indigo-500/50 origin-left"
              />
              <motion.div
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute top-12 left-12 w-px h-16 bg-gradient-to-b from-transparent to-indigo-500/50 origin-top"
              />
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-12 right-12 w-16 h-px bg-gradient-to-l from-transparent to-indigo-500/50 origin-right"
              />
              <motion.div
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-12 right-12 w-px h-16 bg-gradient-to-t from-transparent to-indigo-500/50 origin-bottom"
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Landing Page ──────────────────────────────────────────────── */
export default function LandingPage() {
  const { setCurrentPage } = useAppStore();
  const blobRef = useRef<HTMLDivElement>(null);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {!splashDone && <SplashLoader onDone={() => setSplashDone(true)} />}

      <AnimatePresence>
        {splashDone && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            /* Full viewport, no scrolling */
            className="h-screen w-full animated-bg relative overflow-hidden flex flex-col"
          >
            {/* Animated background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="animate-blob absolute top-[-15%] left-[-8%] w-[480px] h-[480px] rounded-full bg-indigo-500/20 blur-3xl" />
              <div className="animate-blob-delay-2 absolute top-[10%] right-[-8%] w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-3xl" />
              <div className="animate-blob-delay-4 absolute bottom-[-15%] left-[25%] w-[480px] h-[480px] rounded-full bg-indigo-700/15 blur-3xl" />
              <div
                ref={blobRef}
                className="absolute w-72 h-72 rounded-full bg-purple-600/10 blur-3xl transition-transform duration-700 ease-out"
              />
            </div>
            <div className="absolute inset-0 dot-grid opacity-25" />

            {/* Nav */}
            <nav className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 shrink-0">
              <div className="flex items-center gap-3">
                <img src={logoSrc} alt="DecisionOS" className="w-10 h-10 object-contain" style={{ filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.6))' }} />
                <span className="text-white font-bold text-xl tracking-tight font-['Plus_Jakarta_Sans']">DecisionOS</span>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <span className="hidden sm:inline text-white/50 text-sm">v2.0 · Beta</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage('dashboard')}
                  className="px-5 py-2 rounded-xl bg-white/10 text-white text-sm font-medium border border-white/20 hover:bg-white/20 transition-all"
                >
                  Sign In
                </motion.button>
              </div>
            </nav>

            {/* Hero — fills remaining height */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>AI-Powered Decision Intelligence</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="font-extrabold text-white mb-4 leading-[1.05] tracking-tight font-['Plus_Jakarta_Sans']"
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
              >
                Decision
                <span className="gradient-text">Intelligence</span>
                <span className="block text-white/80">Reimagined.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="text-base md:text-lg text-white/55 max-w-xl mx-auto mb-7 leading-relaxed"
              >
                Organize complex decisions through interactive visual workflows, AI recommendations,
                and real-time collaboration — all in one premium workspace.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-3 mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(99,102,241,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentPage('workspace')}
                  className="group px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-base shadow-2xl shadow-indigo-500/40 flex items-center gap-3 transition-all"
                >
                  Open Workspace
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentPage('dashboard')}
                  className="px-7 py-3.5 rounded-2xl bg-white/8 text-white font-semibold text-base border border-white/15 hover:bg-white/15 transition-all backdrop-blur-sm"
                >
                  View Dashboard →
                </motion.button>
              </motion.div>

              {/* Feature cards — compact, always visible */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl w-full"
              >
                {[
                  { icon: Layers, label: 'Infinite Canvas', desc: 'Zoom & pan' },
                  { icon: Brain, label: 'AI Insights', desc: 'Smart recs' },
                  { icon: BarChart3, label: 'Analytics', desc: 'Live data' },
                  { icon: Users, label: 'Team Collab', desc: 'Sync live' },
                ].map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.48 + i * 0.07 }}
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="glass rounded-xl p-3.5 text-center cursor-pointer border border-white/10"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-600/30 flex items-center justify-center mx-auto mb-2">
                      <f.icon className="w-4 h-4 text-indigo-300" />
                    </div>
                    <div className="text-white font-semibold text-xs mb-0.5">{f.label}</div>
                    <div className="text-white/40 text-[10px]">{f.desc}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Footer pinned at bottom */}
            <div className="relative z-10 text-center py-3 text-white/25 text-xs shrink-0">
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
