import { useState } from 'react';
import { useInView } from '@/hooks/useScrollPhase';
import { Database, BrainCircuit, Bot, Orbit } from 'lucide-react';

const generations = [
  {
    id: '1.0',
    title: 'AI 1.0: Information AI',
    description:
      'Rules-based systems, expert databases, and static classifiers. The foundation era where hand-crafted logic dominated.',
    icon: Database,
    features: ['Expert Systems', 'Decision Trees', 'Rule Engines', 'Symbolic Logic'],
    color: 'cyan',
    gradient: 'from-cyan-500/10 to-teal-500/5',
  },
  {
    id: '2.0',
    title: 'AI 2.0: Agentic AI',
    description:
      'Context-aware neural nets, transformers, and adaptive autonomous agents that learn from data.',
    icon: BrainCircuit,
    features: ['Transformers', 'Deep Learning', 'LLMs', 'Multi-Modal'],
    color: 'violet',
    gradient: 'from-violet-500/10 to-purple-500/5',
  },
  {
    id: '3.0',
    title: 'AI 3.0: Physical AI',
    description:
      'Embodied intelligence, spatial awareness computing, and physical robotic actuation in the real world.',
    icon: Bot,
    features: ['Robotics', 'Spatial AI', 'Sensors', 'Actuation'],
    color: 'fuchsia',
    gradient: 'from-fuchsia-500/10 to-pink-500/5',
  },
  {
    id: '4.0',
    title: 'AI 4.0: The Horizon',
    description:
      'Speculative systems moving toward generalized reasoning matrices and artificial superintelligence.',
    icon: Orbit,
    features: ['AGI Pathways', 'Reasoning', 'Self-Improvement', 'Superintelligence'],
    color: 'emerald',
    gradient: 'from-emerald-500/10 to-green-500/5',
  },
];

const colorMap: Record<string, { text: string; glow: string; border: string }> = {
  cyan: { text: 'text-cyan-400', glow: 'neon-text-cyan', border: 'border-cyan-500/20' },
  violet: { text: 'text-violet-400', glow: 'neon-text-violet', border: 'border-violet-500/20' },
  fuchsia: { text: 'text-fuchsia-400', glow: '', border: 'border-fuchsia-500/20' },
  emerald: { text: 'text-emerald-400', glow: '', border: 'border-emerald-500/20' },
};

export function GenerationsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [ref, isInView] = useInView(0.1);

  const activeGen = generations[activeTab];
  const colors = colorMap[activeGen.color];

  return (
    <section
      ref={ref}
      id="generations"
      className="section-container relative z-10"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="gradient-text">Generations of AI</span>
          </h2>
          <p
            className={`text-slate-400 max-w-xl mx-auto transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            The evolutionary trajectory of artificial intelligence across four distinct eras.
          </p>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700`}
          style={{ transitionDelay: '200ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(16px)' }}
        >
          {generations.map((gen, index) => {
            const isActive = activeTab === index;
            const genColors = colorMap[gen.color];
            return (
              <button
                key={gen.id}
                onClick={() => setActiveTab(index)}
                className={`relative px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? `bg-white/10 ${genColors.border} border shadow-lg`
                    : 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05]'
                }`}
              >
                <span className={isActive ? genColors.text : 'text-slate-400'}>
                  {gen.title.split(':')[0]}
                </span>
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-cyan-500/10 animate-pulse-slow" />
                )}
              </button>
            );
          })}
        </div>

        <div
          className="transition-all duration-500"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(16px)', transitionDelay: '300ms' }}
        >
          <div
            className={`glass-card-strong p-8 sm:p-10 bg-gradient-to-br ${activeGen.gradient} ${colors.border} border transition-all duration-500`}
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] w-fit mb-6">
                  <activeGen.icon className={`w-12 h-12 ${colors.text}`} />
                </div>
                <h3 className={`text-2xl sm:text-3xl font-bold text-white mb-4 ${colors.glow}`}>
                  {activeGen.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {activeGen.description}
                </p>
              </div>

              <div className="lg:w-2/3">
                <div className="grid grid-cols-2 gap-4">
                  {activeGen.features.map((feature) => (
                    <div
                      key={feature}
                      className="glass-card p-4 flex items-center gap-3 hover:bg-white/[0.06] transition-all duration-300"
                    >
                      <div className={`w-2 h-2 rounded-full bg-${activeGen.color}-400 opacity-60`} />
                      <span className="text-white font-medium text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex-1 h-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r from-${activeGen.color}-500 to-${activeGen.color}-400 transition-all duration-700`}
                      style={{ width: `${((activeTab + 1) / generations.length) * 100}%` }}
                    />
                  </div>
                  <span className={`text-sm ${colors.text} font-medium`}>
                    {activeTab + 1} / {generations.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {generations.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeTab === index ? 'w-8 bg-cyan-400' : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GenerationsSection;
