
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const S=0, I=1, R=2;
function rngFactory(seed){ let x=(seed>>>0)||123456789; return ()=>{ x^=x<<13; x^=x>>>17; x^=x<<5; return ((x>>>0)/4294967296); }; }

function initWorld(N, seed = 42, pInitial = 0.01){
  const rnd = rngFactory(seed);
  const grid = new Uint8Array(N*N);
  for(let i=0;i<N*N;i++) grid[i] = (rnd() < pInitial) ? I : S;
  return { grid, rnd };
}
function countStates(grid){ let s=0,i=0,r=0; for(let k=0;k<grid.length;k++){ const v=grid[k]; if(v===S)s++; else if(v===I)i++; else r++; } return {S:s, I:i, R:r}; }

function stepSequential(grid, N, pInfect, pRecover, rnd){
  const out = new Uint8Array(grid.length);
  for(let x=0;x<N;x++){
    for(let y=0;y<N;y++){
      const idx = x*N+y; const state = grid[idx];
      if (state===S){
        const xs0=(x-1+N)%N,xs1=x,xs2=(x+1)%N;
        const ys0=(y-1+N)%N,ys1=y,ys2=(y+1)%N;
        const inf = (grid[xs0*N+ys0]===I)||(grid[xs0*N+ys1]===I)||(grid[xs0*N+ys2]===I)||
                    (grid[xs1*N+ys0]===I)||(grid[xs1*N+ys2]===I)||
                    (grid[xs2*N+ys0]===I)||(grid[xs2*N+ys1]===I)||(grid[xs2*N+ys2]===I);
        out[idx] = (inf && rnd()<pInfect) ? I : S;
      } else if (state===I){
        out[idx] = (rnd()<pRecover) ? R : I;
      } else { out[idx]=R; }
    }
  }
  return out;
}

const workerCode = `
  const S=0,I=1,R=2;
  function rngFactory(seed){let x=(seed>>>0)||123456789;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return((x>>>0)/4294967296)}};
  self.onmessage = (e)=>{
    const { grid, N, pInfect, pRecover, seed, tiles } = e.data;
    const rndBase = seed>>>0;
    const g = new Uint8Array(grid);
    const out = new Uint8Array(g.length);
    function stepTile(x0,x1,seed){
      const rnd = rngFactory(seed);
      for (let x=x0; x<x1; x++){
        for (let y=0; y<N; y++){
          const idx=x*N+y; const s=g[idx];
          if (s===S){
            const xs0=(x-1+N)%N,xs1=x,xs2=(x+1)%N;
            const ys0=(y-1+N)%N,ys1=y,ys2=(y+1)%N;
            const inf = (g[xs0*N+ys0]===I)||(g[xs0*N+ys1]===I)||(g[xs0*N+ys2]===I)||
                        (g[xs1*N+ys0]===I)||(g[xs1*N+ys2]===I)||
                        (g[xs2*N+ys0]===I)||(g[xs2*N+ys1]===I)||(g[xs2*N+ys2]===I);
            out[idx] = (inf && rnd()<pInfect) ? I : S;
          } else if (s===I){
            out[idx] = (rnd()<pRecover) ? R : I;
          } else { out[idx]=R; }
        }
      }
    }
    for (let t=0; t<tiles.length; t++){
      const {x0,x1} = tiles[t];
      const tileSeed = (rndBase*73856093 + t*19349663 + x0) >>> 0;
      stepTile(x0,x1,tileSeed);
    }
    self.postMessage(out, [out.buffer]);
  }
`;
function createWorker(){ const blob = new Blob([workerCode], { type: 'application/javascript' }); const url = URL.createObjectURL(blob); return new Worker(url); }

function useSimulation(){
  const [N,setN] = useState(80);
  const [steps,setSteps] = useState(200);
  const [pInfect,setPInfect] = useState(0.15);
  const [pRecover,setPRecover] = useState(0.02);
  const [seed,setSeed] = useState(42);
  const [mode,setMode] = useState('seq');
  const [workers,setWorkers] = useState(8);
  const [running,setRunning] = useState(false);
  const [progress,setProgress] = useState(0);
  const [metrics,setMetrics] = useState([]);
  const [grid,setGrid] = useState(null);
  const workerRef = useRef(null);

  const reset = () => {
    const { grid } = initWorld(N, seed);
    setGrid(grid);
    setMetrics([{ step: 0, ...countStates(grid) }]);
    setProgress(0);
  };
  useEffect(()=>{ reset(); /* eslint-disable-next-line */ }, [N, seed]);

  const run = async () => {
    if (!grid) return;
    setRunning(true);
    let g = grid;
    const rnd = rngFactory(seed);
    const tiles = [];
    const stepSize = Math.max(1, Math.floor(N / Math.max(1, workers)));
    for (let x0 = 0; x0 < N; x0 += stepSize) tiles.push({ x0, x1: Math.min(N, x0+stepSize) });
    const w = mode === 'par' ? (workerRef.current = createWorker()) : null;

    const newMetrics = [{ step: 0, ...countStates(g) }];
    for (let t=1; t<=steps; t++){
      if (mode==='seq'){
        g = stepSequential(g, N, pInfect, pRecover, rnd);
      } else {
        const promise = new Promise((resolve)=>{
          w.onmessage = (e)=> resolve(new Uint8Array(e.data));
          w.postMessage({ grid: g, N, pInfect, pRecover, seed: (seed + t)>>>0, tiles });
        });
        g = await promise;
      }
      newMetrics.push({ step: t, ...countStates(g) });
      if (t % 5 === 0 || t === steps) setProgress(Math.round((t/steps)*100));
      if (t % 10 === 0) await new Promise(r=>setTimeout(r,0));
    }
    if (w){ w.terminate(); workerRef.current = null; }
    setGrid(g); setMetrics(newMetrics); setRunning(false);
  };

  return { state:{N,steps,pInfect,pRecover,seed,mode,workers,running,progress,metrics,grid},
           actions:{setN,setSteps,setPInfect,setPRecover,setSeed,setMode,setWorkers,reset,run} };
}

function GridCanvas({ grid, N }){
  const canvasRef = useRef(null);
  useEffect(()=>{
    if (!grid) return;
    const cvs = canvasRef.current;
    const ctx = cvs.getContext('2d');
    const size = Math.min(cvs.clientWidth, 560);
    const px = Math.max(1, Math.floor(size / N));
    cvs.width = px*N; cvs.height = px*N;
    for (let x=0;x<N;x++){
      for (let y=0;y<N;y++){
        const v = grid[x*N+y];
        ctx.fillStyle = v===S ? '#e5e7eb' : (v===I ? '#fb923c' : '#10b981');
        ctx.fillRect(y*px, x*px, px, px);
      }
    }
  }, [grid, N]);
  return <canvas ref={canvasRef} className="w-full aspect-square rounded-2xl shadow-inner" />;
}

export default function App(){
  const { state, actions } = useSimulation();
  const { N, steps, pInfect, pRecover, seed, mode, workers, running, progress, metrics, grid } = state;
  const chartData = useMemo(()=> metrics.map(m=>({ step:m.step, S:m.S, I:m.I, R:m.R })), [metrics]);

  return (
    <div className="min-h-screen">
      <header className="max-w-6xl mx-auto px-4 py-8">
        <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
          className="text-3xl md:text-4xl font-bold tracking-tight">
          Simulação de Epidemia (SIR) — Sequencial vs Paralelo
        </motion.h1>
        <p className="mt-2 text-slate-600 max-w-3xl">
          Agentes em grade 2D com vizinhança toroidal. Compare o modo sequencial e o paralelo (Web Worker).
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16 grid gap-6 md:grid-cols-5">
        <section className="md:col-span-3 bg-white rounded-2xl shadow p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Mundo (N×N)</h2>
            <div className="text-sm text-slate-500">Progresso: {progress}%</div>
          </div>
          <GridCanvas grid={grid} N={N} />
        </section>

        <aside className="md:col-span-2 bg-white rounded-2xl shadow p-4 md:p-6 space-y-4">
          <h2 className="text-xl font-semibold">Parâmetros</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">N
              <input type="number" min={20} max={160} value={N} onChange={e=>actions.setN(+e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2"/>
            </label>
            <label className="text-sm">Passos
              <input type="number" min={10} max={2000} value={steps} onChange={e=>actions.setSteps(+e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2"/>
            </label>
            <label className="text-sm">p_infect
              <input type="number" step="0.01" min={0} max={1} value={pInfect} onChange={e=>actions.setPInfect(+e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2"/>
            </label>
            <label className="text-sm">p_recover
              <input type="number" step="0.01" min={0} max={1} value={pRecover} onChange={e=>actions.setPRecover(+e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2"/>
            </label>
            <label className="text-sm">seed
              <input type="number" value={seed} onChange={e=>actions.setSeed(+e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2"/>
            </label>
            <label className="text-sm">workers
              <input type="number" min={1} max={32} value={workers} onChange={e=>actions.setWorkers(+e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2"/>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={()=>actions.setMode('seq')} className={`px-3 py-2 rounded-xl border ${mode==='seq'?'bg-slate-900 text-white':'bg-white'}`}>Sequencial</button>
            <button onClick={()=>actions.setMode('par')} className={`px-3 py-2 rounded-xl border ${mode==='par'?'bg-slate-900 text-white':'bg-white'}`}>Paralelo (Worker)</button>
          </div>

          <div className="flex items-center gap-3">
            <button disabled={running} onClick={actions.run} className="px-4 py-2 rounded-xl bg-slate-900 text-white">{running?'Rodando…':'Rodar simulação'}</button>
            <button onClick={actions.reset} className="px-4 py-2 rounded-xl border">Resetar</button>
          </div>

          <p className="text-xs text-slate-500">Dica: use N≤100 para manter a UI fluida. O modo paralelo usa Web Worker dividindo a grade em blocos.</p>
        </aside>

        <section className="md:col-span-5 bg-white rounded-2xl shadow p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-3">Curvas S/I/R</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <XAxis dataKey="step" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="S" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="I" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="R" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>

      <footer className="text-center text-sm text-slate-500 pb-8">
        © {new Date().getFullYear()} Simulação SIR — Trabalho acadêmico
      </footer>
    </div>
  );
}
