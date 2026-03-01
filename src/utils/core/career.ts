import { CAREER_START_DATE } from '@constants';

/** Calculate years of experience from career start date */
export const getYearsOfExperience = (): number =>
  Math.floor(
    (Date.now() - CAREER_START_DATE.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
  );
