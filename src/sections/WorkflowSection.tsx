import { useInView } from '@/hooks/useScrollPhase';
import { Download, GitBranch, RefreshCw } from 'lucide-react';

const workflowSteps = [
  {
    title: 'Continuous Ingestion',
    description:
      'Constant parsing of high-velocity multi-modal data signals from diverse sources.',
    icon: Download,
    gradient: 'from-cyan-500/20 to-teal-500/10',
    borderColor: 'border-cyan-500/20 hover:border-cyan-400/40',
  },
  {
    title: 'Pattern Extrapolations',
    description:
      'Computing complex high-dimensional vectors to establish logical relationships.',
    icon: GitBranch,
    gradient: 'from-violet-500/20 to-purple-500/10',
    borderColor: 'border-violet-500/20 hover:border-violet-400/40',
  },
  {
    title: 'Iterative Convergence',
    description:
      'Running automated optimization loops via backpropagation to continually drive down error rates.',
    icon: RefreshCw,
    gradient: 'from-fuchsia-500/20 to-pink-500/10',
    borderColor: 'border-fuchsia-500/20 hover:border-fuchsia-400/40',
  },
];

export function WorkflowSection() {
  const [ref, isInView] = useInView(0.1);

  return (
    <section
      ref={ref}
      id="workflow"
      className="section-container relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300/80 tracking-wide">
              Perpetual Workflow
            </span>
          </div>

          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="gradient-text">How AI Works</span>
          </h2>
          <p
            className={`text-slate-400 max-w-xl mx-auto transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            The core operational loops that drive artificial intelligence systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workflowSteps.map((step, index) => (
            <div
              key={step.title}
              style={{
                transitionDelay: `${300 + index * 150}ms`,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s ease-out',
              }}
            >
              <div
                className={`glass-card-strong p-8 h-full bg-gradient-to-br ${step.gradient} ${step.borderColor} border transition-all duration-300 group hover:scale-[1.02] cursor-pointer relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit mb-6 group-hover:bg-white/[0.06] transition-colors">
                    <step.icon className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="absolute bottom-4 right-4 text-6xl font-bold text-white/[0.03] group-hover:text-white/[0.06] transition-colors">
                  0{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:flex justify-center items-center mt-8 gap-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-cyan-500/30" />
          <div className="w-2 h-2 rounded-full bg-cyan-500/50 animate-pulse" />
          <div className="h-px w-24 bg-gradient-to-r from-cyan-500/30 to-violet-500/30" />
          <div className="w-2 h-2 rounded-full bg-violet-500/50 animate-pulse" />
          <div className="h-px w-24 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30" />
          <div className="w-2 h-2 rounded-full bg-fuchsia-500/50 animate-pulse" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-fuchsia-500/30" />
        </div>
      </div>
    </section>
  );
}

export default WorkflowSection;
