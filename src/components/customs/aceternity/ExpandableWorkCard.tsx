'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@hooks/use-outside-click';
import { X } from '@phosphor-icons/react';
import { Portal } from '@components/core';
import { cn } from '@utils/core/cn';

interface WorkHistoryEntry {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  domain?: string;
  teamSize?: string;
  tools?: string[];
  achievements?: string[];
}

export function ExpandableWorkCard({
  entry,
  index,
}: {
  entry: WorkHistoryEntry;
  index: number;
}) {
  const [active, setActive] = useState<WorkHistoryEntry | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false);
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <Portal>
        <AnimatePresence>
          {active && typeof active === 'object' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-50'
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {active && typeof active === 'object' ? (
            <div className='fixed inset-0 grid place-items-center z-[60] p-4'>
              <motion.button
                key={`button-${entry.company}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className='flex absolute top-6 right-6 lg:hidden items-center justify-center bg-ct-surface-container rounded-full h-8 w-8 border border-ct-outline/20'
                onClick={() => setActive(null)}
              >
                <X weight='bold' />
              </motion.button>
              <motion.div
                layoutId={`card-${entry.company}-${id}`}
                ref={ref}
                className='w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-ct-surface-container-lowest border border-primary-main/30 rounded-3xl overflow-hidden shadow-2xl shadow-primary-main/10'
              >
                <motion.div layoutId={`image-${entry.company}-${id}`}>
                  <div className='bg-primary-main/10 p-8 flex flex-col gap-2'>
                    <motion.div
                      layoutId={`period-${entry.company}-${id}`}
                      className='text-ct-secondary font-label-grotesk text-sm tracking-widest'
                    >
                      [ {entry.period.toUpperCase()} ]
                    </motion.div>
                    <motion.h3
                      layoutId={`role-${entry.company}-${id}`}
                      className='font-bold text-3xl text-ct-on-surface'
                    >
                      {entry.role}
                    </motion.h3>
                    <motion.p
                      layoutId={`company-${entry.company}-${id}`}
                      className='text-ct-outline uppercase tracking-widest text-xs font-bold'
                    >
                      {entry.company}
                    </motion.p>
                  </div>
                </motion.div>

                <div className='flex-1 overflow-auto p-8'>
                  <div className='flex flex-col gap-6'>
                    {/* Meta Info */}
                    <div className='grid grid-cols-2 gap-4'>
                      {entry.domain && (
                        <div className='glass-panel p-3 rounded-xl border border-ct-outline/10'>
                          <div className='text-[10px] text-ct-outline uppercase tracking-tighter mb-1'>
                            Project Domain
                          </div>
                          <div className='text-sm font-bold text-ct-on-surface'>
                            {entry.domain}
                          </div>
                        </div>
                      )}
                      {entry.teamSize && (
                        <div className='glass-panel p-3 rounded-xl border border-ct-outline/10'>
                          <div className='text-[10px] text-ct-outline uppercase tracking-tighter mb-1'>
                            Team Size
                          </div>
                          <div className='text-sm font-bold text-ct-on-surface'>
                            {entry.teamSize}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Achievements */}
                    {entry.achievements && (
                      <div>
                        <h4 className='text-xs font-black text-ct-secondary tracking-widest uppercase mb-3'>
                          Key Achievements & Responsibilities
                        </h4>
                        <ul className='space-y-3'>
                          {entry.achievements.map((item, i) => (
                            <li key={i} className='flex gap-3 text-sm'>
                              <span className='text-primary-main mt-1'>✦</span>
                              <span className='text-ct-on-surface-variant leading-relaxed'>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skills & Tools */}
                    <div className='space-y-4'>
                      <div>
                        <h4 className='text-[10px] font-bold text-ct-outline uppercase tracking-widest mb-2'>
                          Technologies
                        </h4>
                        <div className='flex flex-wrap gap-1.5'>
                          {entry.technologies.map(tech => (
                            <span
                              key={tech}
                              className='px-2 py-1 bg-ct-surface-container text-primary-main text-[10px] font-bold rounded border border-primary-main/10'
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      {entry.tools && (
                        <div>
                          <h4 className='text-[10px] font-bold text-ct-outline uppercase tracking-widest mb-2'>
                            Development Tools
                          </h4>
                          <div className='flex flex-wrap gap-1.5'>
                            {entry.tools.map(tool => (
                              <span
                                key={tool}
                                className='px-2 py-1 bg-ct-surface-container text-ct-secondary text-[10px] font-bold rounded border border-ct-secondary/10'
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
      </Portal>

      <motion.div
        layoutId={`card-${entry.company}-${id}`}
        onClick={() => setActive(entry)}
        className={cn(
          'w-full 2xl:w-[840px] shrink-0 relative z-10 cursor-pointer',
          // S-curve offset only on 2xl+ horizontal scroll
          index % 2 === 0 ? '2xl:-translate-y-[100px]' : '2xl:translate-y-[100px]'
        )}      >
        <div
          className='glass-panel p-6 md:p-14 rounded-3xl border-2 border-primary-main/40 shadow-[0_0_30px_rgba(208,188,255,0.15)] relative overflow-hidden hover:border-primary-main/80 transition-all duration-500 group'
          style={{
            animation: `float 6s ease-in-out infinite${
              index % 2 !== 0 ? ' -3s' : ''
            }`,
          }}
        >
          <div
            className={cn(
              'absolute w-32 h-32 bg-primary-main/10 rounded-full blur-3xl group-hover:bg-primary-main/20 transition-all',
              index % 2 === 0 ? '-top-10 -right-10' : '-bottom-10 -left-10'
            )}
          />
          <motion.div
            layoutId={`period-${entry.company}-${id}`}
            className='text-ct-secondary font-label-grotesk text-sm mb-5 tracking-widest'
          >
            [ {entry.period.toUpperCase()} ]
          </motion.div>
          <motion.h4
            layoutId={`role-${entry.company}-${id}`}
            className='text-3xl md:text-4xl font-bold text-ct-on-surface mb-4 tracking-tight'
          >
            {entry.role}
          </motion.h4>
          <motion.div
            layoutId={`company-${entry.company}-${id}`}
            className='text-sm text-ct-outline uppercase tracking-widest mb-5 font-bold'
          >
            {entry.company}
          </motion.div>
          <p className='text-ct-on-surface-variant text-lg leading-relaxed mb-10 line-clamp-3'>
            {entry.description}
          </p>
          <div className='flex flex-wrap gap-2'>
            {entry.technologies.slice(0, 5).map(tech => (
              <span
                key={tech}
                className='px-3 py-1.5 bg-ct-surface-container text-primary-main text-xs font-bold rounded border border-primary-main/20'
              >
                {tech}
              </span>
            ))}
            {entry.technologies.length > 5 && (
              <span className='text-xs text-ct-outline font-bold mt-2'>
                +{entry.technologies.length - 5} MORE
              </span>
            )}
          </div>

          <div className='mt-8 text-xs font-black text-ct-secondary tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2'>
            Click to Expand <X weight='bold' className='rotate-45' />
          </div>
        </div>
      </motion.div>
    </>
  );
}
