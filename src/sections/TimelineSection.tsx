import { useInView } from '@/hooks/useScrollPhase';

const timelineEvents = [
  {
    year: '1950',
    title: 'The Turing Horizon',
    description:
      'Alan Turing defines the conceptual boundaries of machine intelligence with the Imitation Game.',
    highlight: 'turing',
  },
  {
    year: '1956',
    title: 'The Dartmouth Genesis',
    description:
      "John McCarthy officially coins 'Artificial Intelligence', launching the field.",
    highlight: 'dartmouth',
  },
  {
    year: '1997',
    title: 'Deep Blue Defiance',
    description:
      "IBM's supercomputer defeats world chess champion Garry Kasparov.",
    highlight: 'deepblue',
  },
  {
    year: '2012',
    title: 'The AlexNet Revolution',
    description:
      'GPU acceleration unlocks the true scaling potential of neural networks.',
    highlight: 'alexnet',
  },
];

export function TimelineSection() {
  const [ref, isInView] = useInView(0.1);

  return (
    <section
      ref={ref}
      id="timeline"
      className="section-container relative z-10"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="gradient-text">Historical Timeline</span>
          </h2>
          <p
            className={`text-slate-400 max-w-xl mx-auto transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Key milestones that shaped the trajectory of artificial intelligence.
          </p>
        </div>

        <div className="relative">
          <div className="timeline-line" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className="relative"
                style={{
                  transitionDelay: `${200 + index * 150}ms`,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateX(0)' : `translateX(${index % 2 === 0 ? '-20px' : '20px'})`,
                  transition: 'all 0.7s ease-out',
                }}
              >
                <div className="timeline-dot top-6" />

                <div
                  className={`ml-12 md:ml-0 md:w-[45%] ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div className="glass-card-strong p-6 hover:bg-white/[0.08] transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl font-bold text-cyan-400 neon-text-cyan">
                        {event.year}
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
