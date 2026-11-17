import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { processSteps } from '../data/content';
import { RevealText } from './ui';
import { gsap, prefersReduced } from '../lib/motion';

/* Escritorio: la sección se fija y las etapas avanzan en horizontal con el scroll.
   Tablet/móvil: línea de tiempo vertical que se rellena al avanzar. */
export function ProcessSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const q = gsap.utils.selector(el);
    if (prefersReduced()) {
      q('.pstep').forEach((s) => s.classList.add('is-on'));
      return;
    }
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const track = q('.process__track')[0] as HTMLElement;
      const steps = q('.pstep') as HTMLElement[];
      const dist = () => track.scrollWidth - track.parentElement!.clientWidth;
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: q('.process__pin')[0],
          start: 'top top',
          end: () => `+=${dist() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(q('.process__bar-fill'), { scaleX: self.progress });
            const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999 + 0.25));
            steps.forEach((s, i) => s.classList.toggle('is-on', i <= idx));
            q('.process__tick').forEach((t, i) => t.classList.toggle('is-on', i <= idx));
          },
        },
      });
      steps.forEach((s) => {
        gsap.fromTo(
          s.querySelector('.pstep__card'),
          { opacity: 0.3 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: s,
              containerAnimation: tween,
              start: 'left 95%',
              end: 'left 55%',
              scrub: true,
            },
          },
        );
      });
    });

    mm.add('(max-width: 1023.98px)', () => {
      gsap.fromTo(
        q('.process__vline-fill'),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: q('.process__track')[0], start: 'top 70%', end: 'bottom 70%', scrub: true },
        },
      );
      q('.pstep').forEach((s) => {
        gsap.from(s, {
          y: 40,
          opacity: 0,
          duration: 1,
          scrollTrigger: { trigger: s, start: 'top 85%', once: true, onEnter: () => s.classList.add('is-on') },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="process on-dark" id="proceso" ref={ref} aria-labelledby="process-title">
      <div className="process__pin">
        <div className="container process__head">
          <RevealText
            as="h2"
            id="process-title"
            className="t-h2 process__title"
            parts={['Sabes qué recibes,', 'cuándo y', { t: 'cuánto cuesta.', cls: 'hl' }]}
          />
          <div className="process__bar" aria-hidden="true">
            <span className="process__bar-fill" />
            {processSteps.map((_, i) => (
              <span className="process__tick" key={i} style={{ left: `${(i / (processSteps.length - 1)) * 100}%` }} />
            ))}
          </div>
        </div>

        <div className="process__viewport">
          <span className="process__vline" aria-hidden="true">
            <span className="process__vline-fill" />
          </span>
          <ol className="process__track">
            {processSteps.map((s, i) => (
              <li className={`pstep pstep--${i % 2 ? 'low' : 'high'}`} key={s.name}>
                <span className="pstep__big" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pstep__card">
                  <div className="pstep__top">
                    <span className="pstep__num">Etapa {String(i + 1).padStart(2, '0')}</span>
                    <span className="pstep__time">{s.time}</span>
                  </div>
                  <h3 className="t-h3 pstep__name">{s.name}</h3>
                  <p className="pstep__text">{s.text}</p>
                  <div className="pstep__deliv">
                    <span className="t-label">Recibes</span>
                    <p>{s.deliverable}</p>
                  </div>
                </div>
              </li>
            ))}
            <li className="pstep pstep--end">
              <a href="/dev/proceso" className="pstep__endlink" data-cursor-label="VER">
                <span className="t-h3">Conoce el proceso completo</span>
                <span className="pstep__endicon" aria-hidden="true">
                  <ArrowRight strokeWidth={1.5} />
                </span>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
