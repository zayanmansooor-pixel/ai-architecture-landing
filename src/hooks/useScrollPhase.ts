import { useState, useEffect, useCallback, useRef } from 'react';

export type Phase = 0 | 1 | 2 | 3;

interface ScrollState {
  scrollY: number;
  scrollProgress: number;
  phase: Phase;
  phaseProgress: number;
}

const PHASE_HEIGHTS = [0.25, 0.5, 0.75, 1.0];

export function useScrollPhase(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    phase: 0,
    phaseProgress: 0,
  });
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  const updateScroll = useCallback(() => {
    const now = performance.now();
    if (now - lastUpdateRef.current < 16) {
      rafRef.current = requestAnimationFrame(updateScroll);
      return;
    }
    lastUpdateRef.current = now;

    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

    let phase: Phase = 0;
    if (scrollProgress < PHASE_HEIGHTS[0]) phase = 0;
    else if (scrollProgress < PHASE_HEIGHTS[1]) phase = 1;
    else if (scrollProgress < PHASE_HEIGHTS[2]) phase = 2;
    else phase = 3;

    const phaseStart = phase === 0 ? 0 : PHASE_HEIGHTS[phase - 1];
    const phaseEnd = PHASE_HEIGHTS[phase];
    const phaseRange = phaseEnd - phaseStart;
    const phaseProgress = phaseRange > 0
      ? Math.min(Math.max((scrollProgress - phaseStart) / phaseRange, 0), 1)
      : 0;

    setScrollState({
      scrollY,
      scrollProgress,
      phase,
      phaseProgress,
    });

    rafRef.current = null;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateScroll]);

  return scrollState;
}

export function useInView(threshold = 0.2): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}
