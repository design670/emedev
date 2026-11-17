import { useEffect, useRef } from 'react';
import { prefersReduced } from '../lib/motion';

/* Núcleo de nodos en 3D (canvas 2D, sin librerías): una esfera de puntos
   conectados con anillos orbitales. Representa sistemas e IA conectados sin
   recurrir a robots ni circuitos. Se pausa fuera de pantalla. */
export function HeroVisual() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduced = prefersReduced();
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0,
      running = true;

    // Esfera de Fibonacci
    const N = window.innerWidth < 768 ? 220 : 380;
    const pts: { x: number; y: number; z: number; lime: boolean; ph: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r, lime: i % 23 === 0, ph: Math.random() * 6.28 });
    }
    // Vecinos cercanos precalculados
    const links: [number, number][] = [];
    const maxD = N > 300 ? 0.2 : 0.26;
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++) {
        const a = pts[i],
          b = pts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
        if (d < maxD) links.push([i, j]);
      }

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 0.6;
      ty = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const proj = new Float32Array(N * 3);
    const draw = (time: number) => {
      const t = time * 0.00012;
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;
      const rotY = t * 1.6 + mx;
      const rotX = -0.35 + my;
      const cy = Math.cos(rotY),
        sy = Math.sin(rotY),
        cx = Math.cos(rotX),
        sx = Math.sin(rotX);
      const R = Math.min(w, h) * 0.36;
      const ox = w / 2,
        oy = h / 2;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < N; i++) {
        const p = pts[i];
        const x1 = p.x * cy - p.z * sy;
        const z1 = p.x * sy + p.z * cy;
        const y1 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const s = 2.6 / (2.6 + z2);
        proj[i * 3] = ox + x1 * R * s;
        proj[i * 3 + 1] = oy + y1 * R * s;
        proj[i * 3 + 2] = z2;
      }

      // Conexiones
      ctx.lineWidth = 1;
      for (const [a, b] of links) {
        const za = proj[a * 3 + 2],
          zb = proj[b * 3 + 2];
        const depth = 1 - (za + zb + 2) / 4; // 1 = al frente
        const alpha = 0.04 + depth * 0.22;
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(proj[a * 3], proj[a * 3 + 1]);
        ctx.lineTo(proj[b * 3], proj[b * 3 + 1]);
        ctx.stroke();
      }

      // Nodos
      for (let i = 0; i < N; i++) {
        const z = proj[i * 3 + 2];
        const depth = 1 - (z + 1) / 2;
        const p = pts[i];
        if (p.lime) {
          const pulse = 0.5 + 0.5 * Math.sin(time * 0.003 + p.ph);
          ctx.fillStyle = `rgba(235,255,0,${0.35 + depth * 0.65})`;
          ctx.beginPath();
          ctx.arc(proj[i * 3], proj[i * 3 + 1], 2.2 + depth * 2.2, 0, 6.283);
          ctx.fill();
          ctx.strokeStyle = `rgba(235,255,0,${(1 - pulse) * 0.5 * depth})`;
          ctx.beginPath();
          ctx.arc(proj[i * 3], proj[i * 3 + 1], 4 + pulse * 10, 0, 6.283);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(255,255,255,${0.12 + depth * 0.75})`;
          ctx.beginPath();
          ctx.arc(proj[i * 3], proj[i * 3 + 1], 0.6 + depth * 1.3, 0, 6.283);
          ctx.fill();
        }
      }

      // Anillos orbitales
      const rings = [
        { r: 1.32, tilt: 0.42, speed: 1, lime: true },
        { r: 1.55, tilt: -0.28, speed: -0.6, lime: false },
      ];
      for (const ring of rings) {
        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(ring.tilt + mx * 0.3);
        ctx.strokeStyle = ring.lime ? 'rgba(235,255,0,0.5)' : 'rgba(255,255,255,0.14)';
        ctx.setLineDash(ring.lime ? [] : [2, 6]);
        ctx.beginPath();
        ctx.ellipse(0, 0, R * ring.r, R * ring.r * 0.26, 0, 0, 6.283);
        ctx.stroke();
        ctx.setLineDash([]);
        // satélite
        const a = time * 0.0006 * ring.speed;
        const sxp = Math.cos(a) * R * ring.r,
          syp = Math.sin(a) * R * ring.r * 0.26;
        ctx.fillStyle = ring.lime ? '#EBFF00' : '#FFFFFF';
        ctx.beginPath();
        ctx.arc(sxp, syp, ring.lime ? 4 : 2.5, 0, 6.283);
        ctx.fill();
        ctx.restore();
      }

      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      const was = running;
      running = e.isIntersecting;
      if (running && !was && !reduced) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} className="hero-visual__canvas" aria-hidden="true" />;
}
