import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Camera,
  ExternalLink,
  Sparkles,
  Terminal,
  Activity,
  CheckCircle2,
  Cpu,
  Database,
  Eye,
  Server
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import confetti from 'canvas-confetti';

export const ProjectModal: React.FC = () => {
  const { activeProject, fpvProject, enterFpv, exitFpv, setIsRecruiterDrawerOpen } = useGame();
  const [tick, setTick] = useState(0);

  // Live telemetry pulse animation inside FPV monitor
  useEffect(() => {
    if (!fpvProject) return;
    const interval = setInterval(() => {
      setTick((t) => (t + 1) % 100);
    }, 450);
    return () => clearInterval(interval);
  }, [fpvProject]);

  const handleEnterFpv = () => {
    if (activeProject) {
      enterFpv(activeProject);
      try {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if ((e.key === 'KeyE' || e.key === 'e') && activeProject && !fpvProject) {
        handleEnterFpv();
      }
      if (e.key === 'Escape' && fpvProject) {
        exitFpv();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, fpvProject]);

  return (
    <>
      {/* 1. Floating Prompt when parked in front of any building bay (when NOT in FPV) */}
      {activeProject && !fpvProject && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <button
            onClick={handleEnterFpv}
            className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm shadow-2xl border-2 border-white/20 animate-bounce active:scale-95 transition-transform cursor-pointer"
          >
            <Camera className="w-5 h-5 text-white" />
            <span>★ PARKED AT {activeProject.title.split(':')[0].toUpperCase()} — CLICK FOR FPV SCREEN</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-black/25 text-xs font-mono font-semibold">
              PRESS E
            </span>
          </button>
        </div>
      )}

      {/* 2. Interactive In-World FPV Cockpit / Terminal Monitor (Active ONLY in FPV Mode) */}
      {fpvProject && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between items-center p-4 sm:p-6 pointer-events-none bg-black/40 backdrop-blur-xs animate-in fade-in duration-300">
          {/* Top Navigation Bar */}
          <div className="w-full max-w-4xl flex justify-between items-center pointer-events-auto">
            {/* Exit FPV Button */}
            <button
              onClick={exitFpv}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#1e293b]/90 hover:bg-[#0f172a] text-white text-xs font-bold shadow-xl border border-white/15 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#ea580c]" />
              <span>← Exit FPV / Return to Car</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-gray-300 font-mono">Esc</kbd>
            </button>

            {/* Center Status Pill */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0f172a]/90 backdrop-blur-md border border-white/15 text-white text-xs font-bold shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-400">IN-COCKPIT TERMINAL // {fpvProject.id.toUpperCase()}</span>
            </div>

            {/* Right Quick Links */}
            <div className="flex items-center gap-2">
              {fpvProject.githubUrl && (
                <a
                  href={fpvProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-[#0f172a]/90 hover:bg-black text-white text-xs font-bold border border-white/15 transition-colors shadow-lg cursor-pointer"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                </a>
              )}
              <button
                onClick={() => setIsRecruiterDrawerOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Recruiter Dossier</span>
              </button>
            </div>
          </div>

          {/* Main Hardware Terminal Monitor Container (Cleanly Bounded, Zero Overflow) */}
          <div className="w-full max-w-4xl my-auto pointer-events-auto bg-[#0a0f1d]/95 text-gray-100 rounded-3xl border-2 border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden flex flex-col max-h-[80vh]">
            {/* Monitor Header Bezel */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#0f172a] border-b border-white/10 select-none">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-px bg-white/20 mx-1" />
                <span className="font-mono text-xs text-gray-400 tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#ea580c]" />
                  {fpvProject.id === 'robosurge' && 'ROBOSURGE_CV_CORE_TELEMETRY'}
                  {fpvProject.id === 'trueforge' && 'TRUEFORGE_EVAL_BENCHMARK_SUITE'}
                  {fpvProject.id === 'distributed-backend' && 'DISTRIBUTED_API_OPS_CENTER'}
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE LINK
                </span>
                <span className="text-gray-500">|</span>
                <span>FPS: 60</span>
              </div>
            </div>

            {/* Monitor Screen Body (Scrollable if needed, cleanly contained) */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              {/* Project Title & Category */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#ea580c]/20 text-[#ea580c] border border-[#ea580c]/40 uppercase">
                      {fpvProject.category}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {fpvProject.shortDesc}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {fpvProject.title}
                  </h2>
                </div>
                {fpvProject.githubUrl && (
                  <a
                    href={fpvProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Specialized Project Cockpit Telemetry Feeds */}
              {fpvProject.id === 'robosurge' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Camera 01: Surgical Field Viewport */}
                  <div className="rounded-2xl bg-[#030712] border border-cyan-500/30 p-4 relative overflow-hidden">
                    <div className="flex justify-between items-center text-[11px] font-mono text-cyan-400 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> CAM_01 // SURGICAL_FIELD
                      </span>
                      <span className="text-emerald-400 font-bold">STEREOSCOPIC SYNC</span>
                    </div>
                    {/* Simulated Camera Crosshair Screen */}
                    <div className="h-36 rounded-xl bg-[#091524] border border-cyan-500/20 relative flex items-center justify-center overflow-hidden">
                      {/* Reticle grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:16px_16px]" />
                      <div className="w-16 h-16 rounded-full border border-cyan-400/40 border-dashed animate-spin flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      </div>
                      <div className="absolute top-2 left-2 font-mono text-[10px] text-cyan-300">
                        X: {(142.4 + (tick % 7) * 0.1).toFixed(2)}mm
                        <br />
                        Y: {(89.2 - (tick % 5) * 0.1).toFixed(2)}mm
                        <br />
                        Z: 12.08mm
                      </div>
                      <div className="absolute bottom-2 right-2 font-mono text-[10px] text-emerald-400 bg-black/60 px-2 py-0.5 rounded">
                        CONFIDENCE: 99.4%
                      </div>
                    </div>
                  </div>

                  {/* Camera 02: Real-time Telemetry & SQLite WAL */}
                  <div className="rounded-2xl bg-[#030712] border border-cyan-500/30 p-4 relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center text-[11px] font-mono text-cyan-400 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5" /> TELEMETRY & WAL LOG
                        </span>
                        <span className="text-cyan-400 font-bold">WAL ACTIVE</span>
                      </div>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Position Tracking Error:</span>
                          <span className="text-emerald-400 font-bold">&lt; 0.32 mm</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Pipeline Latency:</span>
                          <span className="text-cyan-300 font-bold">0.38 ms</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Optical Frame Rate:</span>
                          <span className="text-emerald-400 font-bold">60.0 FPS Lock</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-400">Database Engine:</span>
                          <span className="text-gray-200">SQLite Write-Ahead Log</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Zero frame-drop calibration active</span>
                    </div>
                  </div>
                </div>
              )}

              {fpvProject.id === 'trueforge' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Test Harness Execution Terminal */}
                  <div className="rounded-2xl bg-[#030712] border border-amber-500/30 p-4 font-mono text-xs text-gray-300">
                    <div className="flex justify-between items-center text-[11px] text-amber-400 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" /> DOCKER_SANDBOX_HARNESS
                      </span>
                      <span className="text-emerald-400 font-bold">RUNNING</span>
                    </div>
                    <div className="space-y-1.5 bg-[#090d16] p-3 rounded-xl border border-white/5 text-[11px]">
                      <div className="text-gray-400">[00:00.12] Provisioning sandbox container...</div>
                      <div className="text-emerald-400">✓ Container isolated (alpine-node:20)</div>
                      <div className="text-gray-400">[00:01.40] Injecting test prompts to agent...</div>
                      <div className="text-cyan-300">→ Benchmark #14: Context boundary recovery [PASS]</div>
                      <div className="text-cyan-300">→ Benchmark #15: Multi-repo git patch apply [PASS]</div>
                      <div className="text-emerald-400 font-bold">
                        ★ Suite completed: 94.2% Pass Rate across 128 tasks
                      </div>
                    </div>
                  </div>

                  {/* Benchmark Suite Metrics */}
                  <div className="rounded-2xl bg-[#030712] border border-amber-500/30 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center text-[11px] font-mono text-amber-400 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" /> BENCHMARK METRICS
                        </span>
                        <span className="text-amber-400 font-bold">EVAL AGENTS</span>
                      </div>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Evaluation Pass Rate:</span>
                          <span className="text-emerald-400 font-bold">94.2%</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Container Spin-Up:</span>
                          <span className="text-cyan-300 font-bold">&lt; 180 ms</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Sandboxing:</span>
                          <span className="text-gray-200">Ephemeral Docker</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-400">Repo Verification:</span>
                          <span className="text-emerald-400 font-bold">Automated CI Gates</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Standardized agent reproducibility verified</span>
                    </div>
                  </div>
                </div>
              )}

              {fpvProject.id === 'distributed-backend' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Live Grafana-style RPS & Latency Metrics */}
                  <div className="rounded-2xl bg-[#030712] border border-purple-500/30 p-4">
                    <div className="flex justify-between items-center text-[11px] font-mono text-purple-400 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5" /> CLOUD_METRICS_DASHBOARD
                      </span>
                      <span className="text-emerald-400 font-bold">HEALTHY</span>
                    </div>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-gray-400">Throughput:</span>
                        <span className="text-purple-300 font-bold">14,250 req/sec</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-gray-400">P99 Latency:</span>
                        <span className="text-emerald-400 font-bold">18.4 ms</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-gray-400">Cluster Uptime:</span>
                        <span className="text-emerald-400 font-bold">99.98%</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-400">Redis Cache Hit:</span>
                        <span className="text-cyan-300 font-bold">98.6%</span>
                      </div>
                    </div>
                  </div>

                  {/* Database Pool & Sharding Status */}
                  <div className="rounded-2xl bg-[#030712] border border-purple-500/30 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center text-[11px] font-mono text-purple-400 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5" /> POSTGRESQL_CONNECTION_POOL
                        </span>
                        <span className="text-purple-400 font-bold">POOLED</span>
                      </div>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Active Connections:</span>
                          <span className="text-emerald-400 font-bold">48 / 50 (Zero Leak)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Idempotency Layer:</span>
                          <span className="text-cyan-300 font-bold">Redis Distributed Locks</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Container Mesh:</span>
                          <span className="text-gray-200">Kubernetes Auto-Scaler</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-400">Observability:</span>
                          <span className="text-purple-300 font-bold">OpenTelemetry Traces</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Production-grade high concurrency verified</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Core Description & Highlights */}
              <div className="space-y-3">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {fpvProject.fullDesc}
                </p>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
                    Key Engineering Highlights
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {fpvProject.metrics.map((metric: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
                    Technologies & Tools
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {fpvProject.tags.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-xl bg-white/10 text-xs font-medium text-gray-200 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Monitor Footer Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#0a0f1d] border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <span>PRESS</span>
                <kbd className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Esc</kbd>
                <span>TO STEP OUT AND DRIVE</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={exitFpv}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Return to Car
                </button>
                {fpvProject.githubUrl && (
                  <a
                    href={fpvProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>Inspect Code</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bottom spacing helper */}
          <div className="h-4" />
        </div>
      )}
    </>
  );
};