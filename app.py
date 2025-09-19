
import argparse, time
from io.config import Config
from sim.sequential import run_sim as run_seq
from sim.parallel import run_sim as run_par
from io.results import save_metrics, plot_sir, save_timing

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--mode", choices=["seq","par"], default="seq")
    p.add_argument("--N", type=int, default=200)
    p.add_argument("--steps", type=int, default=200)
    p.add_argument("--p_infect", type=float, default=0.15)
    p.add_argument("--p_recover", type=float, default=0.02)
    p.add_argument("--seed", type=int, default=42)
    p.add_argument("--workers", type=int, default=8)
    args = p.parse_args()

    cfg = Config(**vars(args))
    t0 = time.perf_counter()
    if args.mode == "seq":
        metrics = run_seq(cfg)
    else:
        metrics = run_par(cfg)
    elapsed = time.perf_counter() - t0

    save_metrics(metrics, cfg)
    plot_sir(metrics, cfg)
    save_timing({"mode": args.mode, "N": cfg.N, "steps": cfg.steps,
                 "workers": cfg.workers, "seconds": elapsed}, cfg)
    print(f"OK: {args.mode} em {elapsed:.3f}s")

if __name__ == "__main__":
    main()
