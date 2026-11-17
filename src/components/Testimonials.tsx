import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Play, Quote } from 'lucide-react';
import { testimonials, type Testimonial } from '../data/content';
import { RevealText, WithPlaceholders, initials } from './ui';
import { gsap, prefersReduced } from '../lib/motion';

/* Convierte un enlace de YouTube en su dirección para incrustar; null si no es YouTube. */
const youTubeEmbed = (url: string) => {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0` : null;
};

/* Video del testimonio: muestra portada y botón; al reproducir carga el video ahí mismo. */
function TestimonialVideo({ t, active, onPlayChange }: { t: Testimonial; active: boolean; onPlayChange: (p: boolean) => void }) {
  const [playing, setPlaying] = useState(false);

  // Si la tarjeta deja de estar al frente, se detiene el video
  useEffect(() => {
    if (!active && playing) {
      setPlaying(false);
      onPlayChange(false);
    }
  }, [active, playing, onPlayChange]);

  const embed = t.video ? youTubeEmbed(t.video) : null;

  return (
    <div className="tcard__video" onPointerDown={(e) => e.stopPropagation()}>
      {playing ? (
        embed ? (
          <iframe
            src={embed}
            title={`Testimonio de ${t.company}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <video src={t.video} poster={t.poster} controls autoPlay playsInline onEnded={() => onPlayChange(false)} />
        )
      ) : (
        <button
          type="button"
          className="tcard__play"
          style={t.poster ? { backgroundImage: `url(${t.poster})` } : undefined}
          onClick={() => {
            setPlaying(true);
            onPlayChange(true);
          }}
          aria-label={`Ver el video testimonio de ${t.company}`}
          tabIndex={active ? 0 : -1}
        >
          <span className="tcard__play-icon" aria-hidden="true">
            <Play strokeWidth={1.5} />
          </span>
        </button>
      )}
    </div>
  );
}

export function TestimonialCard({
  t,
  active,
  onPlayChange = () => {},
}: {
  t: Testimonial;
  active: boolean;
  onPlayChange?: (p: boolean) => void;
}) {
  const pendingName = t.name.startsWith('[');
  return (
    <figure className={`tcard${active ? ' is-active' : ''}${t.video ? ' has-video' : ''}`}>
      <div className="tcard__top">
        <Quote className="tcard__q" strokeWidth={1.25} aria-hidden="true" />
        {t.logo ? (
          <img className="tcard__logo" src={t.logo} alt={t.company} />
        ) : (
          <span className="tcard__company">{t.company}</span>
        )}
      </div>
      {t.video && <TestimonialVideo t={t} active={active} onPlayChange={onPlayChange} />}
      <blockquote className="tcard__quote">
        <p>
          “<WithPlaceholders text={t.quote} />”
        </p>
      </blockquote>
      <figcaption className="tcard__who">
        <span className="tcard__photo" aria-hidden="true">
          {initials(pendingName ? t.company : t.name)}
        </span>
        <span>
          <strong>
            <WithPlaceholders text={t.name} />
          </strong>
          <span className="muted">
            <WithPlaceholders text={t.role} />, {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, down: false, moved: 0 });
  const n = testimonials.length;

  const go = (i: number) => setIdx(((i % n) + n) % n);

  // Avance automático: se pausa con el cursor encima, al enfocar, al arrastrar
  // o fuera de pantalla. Desactivado con prefers-reduced-motion.
  const AUTOPLAY_MS = 5000;
  const section = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const autoplay = !prefersReduced();
  const running = autoplay && visible && !paused && !videoPlaying;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(section.current!);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setIdx((i) => (i + 1) % n), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [running, idx, n]);

  useEffect(() => {
    const el = track.current!;
    const card = el.children[0] as HTMLElement;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0');
    const x = -(card.offsetWidth + gap) * idx;
    gsap.to(el, { x, duration: prefersReduced() ? 0 : 1, ease: 'expo.out' });
  }, [idx]);

  useEffect(() => {
    const onResize = () => {
      const el = track.current!;
      const card = el.children[0] as HTMLElement;
      const gap = parseFloat(getComputedStyle(el).columnGap || '0');
      gsap.set(el, { x: -(card.offsetWidth + gap) * idx });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [idx]);

  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, down: true, moved: 0 };
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    drag.current.moved = e.clientX - drag.current.x;
  };
  const onUp = () => {
    if (!drag.current.down) return;
    const m = drag.current.moved;
    drag.current.down = false;
    if (Math.abs(m) > 50) go(idx + (m < 0 ? 1 : -1));
  };

  return (
    <section
      className="testimonials section on-surface"
      aria-labelledby="testi-title"
      ref={section}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container">
        <div className="testimonials__head">
          <div>
            <RevealText
              as="h2"
              id="testi-title"
              className="t-h2"
              parts={['Lo que dicen quienes ya', 'trabajan con nosotros.']}
            />
          </div>
          <div className="testimonials__nav" data-reveal="up">
            <span className="testimonials__count" aria-live={running ? 'off' : 'polite'}>
              {String(idx + 1).padStart(2, '0')} <span className="muted">/ {String(n).padStart(2, '0')}</span>
            </span>
            {autoplay && (
              <span className={`testimonials__timer${running ? '' : ' is-paused'}`} aria-hidden="true">
                <span key={`${idx}-${running}`} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
              </span>
            )}
            <button className="circle-btn" onClick={() => go(idx - 1)} aria-label="Testimonio anterior">
              <ArrowLeft strokeWidth={1.5} />
            </button>
            <button className="circle-btn" onClick={() => go(idx + 1)} aria-label="Testimonio siguiente">
              <ArrowRight strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div
          className="testimonials__viewport"
          data-cursor-label="ARRASTRA"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          data-reveal="up"
        >
          <div className="testimonials__track" ref={track}>
            {testimonials.map((t, i) => (
              <TestimonialCard t={t} key={t.id} active={i === idx} onPlayChange={setVideoPlaying} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
