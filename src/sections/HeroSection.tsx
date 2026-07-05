import { useInView } from '@/hooks/useScrollPhase';
import { Brain, Network, Bot, Cpu } from 'lucide-react';

const bentoCards = [
  {
    title: 'Cognitive Capacity',
    description: 'From basic deterministic logic arrays to self-assembling deep neural pathways.',
    icon: Brain,
    className: 'md:col-span-2',
    gradient: 'from-cyan-500/10 to-blue-500/10',
  },
  {
    title: 'Operational Scale',
    description: 'Shifting from highly specialized narrow computations to vast multi-modal clusters.',
    icon: Network,
    className: '',
    gradient: 'from-violet-500/10 to-purple-500/10',
  },
  {
    title: 'Autonomy Matrix',
    description: 'The structural leap from human-dependent tools to sovereign agent ecosystems.',
    icon: Bot,
    className: 'md:col-span-2 lg:col-span-1',
    gradient: 'from-fuchsia-500/10 to-pink-500/10',
  },
];

export function HeroSection() {
  const [ref, isInView] = useInView(0.1);

  return (
    <section
      ref={ref}
      id="hero"
      className="section-container relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300/80 tracking-wide">
              Interactive AI Exploration
            </span>
          </div>

          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="gradient-text neon-text-cyan">
              The Architecture of
            </span>
            <br />
            <span className="gradient-text">Machine Mind</span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            An interactive exploration into the cognition, capacity, and evolution
            of Artificial Intelligence.
          </p>
        </div>

        <div className="bento-grid">
          {bentoCards.map((card, index) => (
            <div
              key={card.title}
              className={`${card.className}`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s ease-out',
              }}
            >
              <div
                className={`glass-card-strong p-6 h-full bg-gradient-to-br ${card.gradient} hover:bg-white/[0.08] transition-all duration-300 group cursor-pointer`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-400/40 transition-colors">
                    <card.icon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`flex justify-center mt-16 transition-all duration-700`}
          style={{ transitionDelay: '700ms', opacity: isInView ? 1 : 0 }}
        >
          <div className="flex flex-col items-center gap-2 animate-float">
            <span className="text-xs text-slate-500 tracking-widest uppercase">
              Scroll to Explore
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-cyan-500/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
