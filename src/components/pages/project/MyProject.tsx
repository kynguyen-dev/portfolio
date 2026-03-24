import { useState, useEffect } from 'react';
import { animated, useTrail } from '@react-spring/web';
import { PFGradientTypography, PFTypography } from '@components/core';
import { Overlay, OverlayContent } from '@components/core/overlay';
import { GithubLogo } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import {
  APP_INFORMATION,
  APP_THEMES,
  APP_TYPOGRAPHIES,
  DRIVALINK_URL,
  EPILEPSY_PROJECT_URL,
  LEARNER_DASHBOARD_URL,
} from '@constants';
import { StyledButton } from '@components/core/button';
import { cn } from '@utils/core/cn';
import { useInView } from '@utils/animations/springVariants';

const SPRITE_URL = '/images/projects-sprite.jpg';

const SPRITE_POSITIONS = ['0% 0%', '100% 0%', '0% 100%', '100% 100%'] as const;

interface ProjectCardProps {
  titleKey: string;
  descriptionKey: string;
  roleKey: string;
  contributionsKey: string;
  spritePosition: string;
  url: string;
  githubUrl?: string;
  isPrivate?: boolean;
}

const projectDefs: ProjectCardProps[] = [
  {
    titleKey: 'projects.logistic.title',
    descriptionKey: 'projects.logistic.description',
    roleKey: 'projects.fullStackDeveloper',
    contributionsKey: 'projects.logistic.contributions',
    spritePosition: SPRITE_POSITIONS[0],
    url: DRIVALINK_URL,
  },
  {
    titleKey: 'projects.medical.title',
    descriptionKey: 'projects.medical.description',
    roleKey: 'projects.frontEndDeveloper',
    contributionsKey: 'projects.medical.contributions',
    spritePosition: SPRITE_POSITIONS[1],
    url: EPILEPSY_PROJECT_URL,
  },
  {
    titleKey: 'projects.education.title',
    descriptionKey: 'projects.education.description',
    roleKey: 'projects.fullStackDeveloper',
    contributionsKey: 'projects.education.contributions',
    spritePosition: SPRITE_POSITIONS[2],
    url: LEARNER_DASHBOARD_URL,
  },
  {
    titleKey: 'projects.hireService.title',
    descriptionKey: 'projects.hireService.description',
    roleKey: 'projects.fullStackDeveloper',
    contributionsKey: 'projects.hireService.contributions',
    spritePosition: SPRITE_POSITIONS[3],
    url: '',
    isPrivate: true,
  },
];

export const MyProject = () => {
  const { t } = useTranslation();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const { ref, inView } = useInView();

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  const toggleCard = (title: string) => {
    setActiveCard(prev => (prev === title ? null : title));
  };

  const trail = useTrail(projectDefs.length, {
    from: { opacity: 0, y: 50 },
    to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div
      id='projects'
      className='w-full flex flex-col justify-center items-center gap-8 md:gap-16'
    >
      <PFGradientTypography
        variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
        theme={APP_THEMES.DARK}
      >
        {t('projects.recentWork')}
      </PFGradientTypography>
      <div className='flex flex-row justify-center items-center gap-2'>
        <PFTypography
          variant={APP_TYPOGRAPHIES.SUBTITLE_PRIMARY}
          className='text-black text-center'
        >
          {t('projects.recentWorkDescriptions')}{' '}
          <a
            href={APP_INFORMATION.EMAIL_TO}
            className='no-underline font-bold text-primary-main'
          >
            {t('projects.emailMe')}
          </a>
        </PFTypography>
      </div>
      <div ref={ref} className='grid grid-cols-1 sm:grid-cols-2 gap-8 w-full'>
        {trail.map((style, index) => {
          const project = projectDefs[index];
          const title = t(project.titleKey);
          const description = t(project.descriptionKey);
          const role = t(project.roleKey);
          const contributions = t(project.contributionsKey, {
            returnObjects: true,
          }) as string[];

          return (
            <animated.div
              key={project.titleKey}
              style={style}
              className='flex-1'
            >
              <div
                tabIndex={0}
                role='button'
                aria-expanded={activeCard === title}
                aria-label={t('projects.viewDetails', { title })}
                onClick={() => isTouchDevice && toggleCard(title)}
                onFocus={() => !isTouchDevice && setActiveCard(title)}
                onBlur={() => !isTouchDevice && setActiveCard(null)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCard(title);
                  }
                }}
                className={cn(
                  'relative overflow-hidden rounded-lg w-full h-[320px] sm:h-[380px] md:h-[480px] cursor-pointer outline-none transition-all duration-300',
                  !isTouchDevice && [
                    'hover:bg-primary-dark hover:-translate-y-1',
                    'focus-visible:bg-primary-dark focus-visible:-translate-y-1',
                    'hover:[&_.project-image]:opacity-0 focus-visible:[&_.project-image]:opacity-0',
                    'hover:[&_.overlay]:opacity-100 focus-visible:[&_.overlay]:opacity-100',
                    'hover:[&_.overlay-content]:opacity-100 hover:[&_.overlay-content]:translate-y-0 focus-visible:[&_.overlay-content]:opacity-100 focus-visible:[&_.overlay-content]:translate-y-0',
                    'hover:[&_.default-text]:opacity-0 focus-visible:[&_.default-text]:opacity-0',
                  ],
                  isTouchDevice &&
                    activeCard === title && [
                      'bg-primary-dark',
                      '[&_.project-image]:opacity-0',
                      '[&_.overlay]:opacity-100',
                      '[&_.overlay-content]:opacity-100 [&_.overlay-content]:translate-y-0',
                      '[&_.default-text]:opacity-0',
                    ],
                  'focus-visible:ring-2 focus-visible:ring-primary-light'
                )}
              >
                <div
                  className='project-image w-full h-full absolute top-0 left-0 bg-no-repeat bg-[200%_200%] transition-opacity duration-300'
                  role='img'
                  aria-label={title}
                  style={{
                    backgroundImage: `url('${SPRITE_URL}')`,
                    backgroundPosition: project.spritePosition,
                  }}
                />
                <div className='default-text absolute bottom-0 left-0 right-0 text-center bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-8 transition-opacity duration-300'>
                  <PFTypography
                    variant={APP_TYPOGRAPHIES.HEADER_SECONDARY}
                    className='text-white font-bold text-[1.1rem] md:text-[1.5rem]'
                    style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)' }}
                  >
                    {title}
                  </PFTypography>
                  <PFTypography
                    variant='caption'
                    className='text-white/85 tracking-widest font-semibold text-[0.7rem] md:text-[0.75rem]'
                  >
                    {role}
                  </PFTypography>
                </div>

                <Overlay className='overlay opacity-0 transition-opacity duration-300'>
                  <OverlayContent className='overlay-content opacity-0 translate-y-4 transition-all duration-300 w-full min-h-fit'>
                    <div className='flex flex-col gap-4 md:gap-8 items-center px-4 md:px-12 py-8'>
                      <PFGradientTypography
                        variant={APP_TYPOGRAPHIES.HEADER_SECONDARY}
                        theme={APP_THEMES.LIGHT}
                        className='font-bold text-[1rem] md:text-[1.25rem]'
                      >
                        {role}
                      </PFGradientTypography>
                      <PFTypography className='text-white text-[0.8rem] md:text-[0.9rem] leading-relaxed opacity-95 max-w-[450px]'>
                        {description}
                      </PFTypography>

                      {Array.isArray(contributions) &&
                        contributions.length > 0 && (
                          <div className='flex flex-col gap-4 w-full max-w-[400px] my-4 md:my-8'>
                            {contributions.slice(0, 3).map((c, ci) => (
                              <div
                                key={ci}
                                className='flex flex-row items-start gap-6'
                              >
                                <div className='w-1.5 h-1.5 rounded-full bg-secondary-light mt-2 flex-shrink-0' />
                                <PFTypography className='text-white/90 text-[0.75rem] md:text-[0.85rem] leading-normal text-left'>
                                  {c}
                                </PFTypography>
                              </div>
                            ))}
                          </div>
                        )}

                      <div className='flex flex-row gap-8 items-center mt-4 md:mt-8'>
                        {project.url ? (
                          <StyledButton
                            variant='solid'
                            className='rounded-full px-8 md:px-16 text-[0.75rem] md:text-[0.875rem]'
                            onClick={e => {
                              e.stopPropagation();
                              window.open(
                                project.url,
                                '_blank',
                                'noopener,noreferrer'
                              );
                            }}
                          >
                            {t('projects.visitWebSite')}
                          </StyledButton>
                        ) : (
                          <PFTypography
                            variant='body2'
                            className='text-white/70 italic text-[0.75rem] md:text-[0.875rem]'
                          >
                            {t('projects.privateProject')}
                          </PFTypography>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            onClick={e => e.stopPropagation()}
                            className='text-white flex hover:text-secondary-light transition-colors'
                            aria-label={`View ${title} on GitHub`}
                          >
                            <GithubLogo size={24} />
                          </a>
                        )}
                      </div>
                    </div>
                  </OverlayContent>
                </Overlay>
              </div>
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};
