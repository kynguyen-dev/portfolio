import { CAREER_START_DATE } from '@constants';

const getYearsOfExperience = (): string => {
  const years = Math.floor(
    (Date.now() - CAREER_START_DATE.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );
  return `${years}+`;
};

export const APP_MESSAGES = {
  intro: {
    title: 'Ky Nguyen — Full-Stack Developer',
    description:
      'I build production-ready web apps with React & TypeScript — from logistics platforms to healthcare systems.' +
      ' Turning complex problems into clean, scalable solutions.',
  },
  profile: {
    opening: "Hi, I'm Ky Nguyen. Nice to meet you.",
    content:
      `With ${getYearsOfExperience()} years of experience as a Software Developer, I have built expertise in developing ` +
      'cross-browser, responsive web applications. I specialize in TypeScript and ReactJS within Agile environments, ' +
      'continuously improving codebase quality through optimization, documentation, mentoring, and code reviews. Passionate' +
      ' about learning and growth, I stay up to date with modern development technologies to enhance both my skills and team collaboration.',
    skills: {
      backEndDeveloper: 'Backend Developer',
      frontEndDeveloper: 'Frontend Developer',
      tools: 'Tools',
      backEndQuote:
        'I turn business logic into robust backend solutions that power the digital world.',
      frontEndQuote:
        'I like to code things from scratch and enjoy bringing ideas to life in the browser.',
      toolEndQuote:
        'I don’t just use tools; I master them to build something great.',
      languages: 'Languages I speak:',
      methods: 'The method I work:',
      toolsIUse: 'Tools I use:',
      enjoyCoding: 'Things I enjoy coding:',
      devTech: 'Dev Tech:',
      javaVersion: 'Java 8',
      java: 'Java',
      typeScript: 'TypeScript',
      javaScript: 'JavaScript',
      springBoot: 'Spring Boot',
      nextJS: 'NextJS',
      sqLite: 'SQLite',
      noSQL: 'NoSQL MongoDB',
      postgre: 'PostgreSQL',
      orm: 'Drizzle ORM',
      restful: 'RESTful API',
      junit: 'Junit',
      groovy: 'Groovy',
      android: 'Java Android',
      html: 'HTML',
      css: 'CSS',
      react: 'ReactJS',
      tailwind: 'Tailwind CSS',
      mui: 'Material UI',
      useQuery: 'TanStack Query',
      angular: 'AngularJS',
      vite: 'Vite',
      esLint: 'ESLint',
      prettier: 'Prettier',
      storybook: 'Storybook',
      jest: 'Jest',
      testLibrary: 'React Testing Library',
      reactHookForm: 'React Hook Form',
      auth0: 'Auth0',
      agile: 'Scrum/Agile',
      vsCode: 'Visual Studio Code',
      webStorm: 'WebStorm',
      intelliJ: 'IntelliJ IDE',
      postman: 'Postman',
      docker: 'Docker Desktop',
      git: 'Git',
      gitTools: 'GitHub/GitLab',
      jira: 'Jira',
      figma: 'Figma',
      motion: 'Motion',
      yarn: 'Yarn',
      husky: 'Husky',
      vanta: 'VantaJS',
      vercel: 'Vercel',
    },
  },
  projects: {
    logistic: {
      title: 'DrivaLink — Logistics',
      description:
        'Built an innovative logistics platform unifying driver safety, truck maintenance, and fleet tracking. ' +
        'Streamlined compliance workflows, reducing driver onboarding time. ' +
        'Architected responsive dashboards serving fleet operators daily.',
      contributions: [
        'Architected frontend with React 18, TypeScript & TanStack Query',
        'Built real-time fleet tracking dashboard with live GPS data',
        'Implemented role-based access control with Auth0',
        'Mentored 2 junior developers through code reviews & pair programming',
      ],
    },
    medical: {
      title: 'Epilepsy Research Platform',
      description:
        'Developed a clinical data management app for epilepsy researchers. ' +
        'Streamlined patient report workflows, cutting data-entry time for clinic staff. ' +
        'Built accessible, responsive interfaces meeting healthcare compliance standards.',
      contributions: [
        'Designed component library with Material UI for consistent UX',
        'Integrated RESTful APIs with TanStack Query for efficient data fetching',
        'Implemented form validation with React Hook Form + Yup schema',
        'Achieved 90%+ test coverage with Jest & React Testing Library',
      ],
    },
    education: {
      title: 'Edalex — Learner Dashboard',
      description:
        'Built a dynamic learner dashboard providing 24/7 access to badges, cohort comparisons, and attendance tracking. ' +
        'Deployed at multiple educational institutions, serving learners, parents, teachers and administrators.',
      contributions: [
        'Developed full-stack features with Next.js, MongoDB & Auth0',
        'Built interactive data visualizations for learner progress',
        'Implemented SSR for improved SEO and initial load performance',
        'Collaborated with designers to build a responsive, accessible UI',
      ],
    },
    hireService: {
      title: 'AirConSub — Hire Service',
      description:
        'Developed a full-stack subscription service handling booking, payments, and scheduling for air conditioner services. ' +
        'Implemented end-to-end booking flow with payment integration.',
      contributions: [
        'Built full-stack app with React, Next.js & Drizzle ORM',
        'Implemented booking & payment flow with Stripe integration',
        'Designed database schema with SQLite + Drizzle ORM migrations',
        'Set up CI/CD pipeline for automated testing and deployment',
      ],
    },
    recentWork: 'My Recent Work',
    recentWorkDescriptions:
      "Here are a few past design projects I've worked on. Want to know more?",
    emailMe: "Email me.",
    frontEndDeveloper: 'Front-End Developer',
    backEndDeveloper: 'Back-End Developer',
    fullStackDeveloper: 'Full-Stack Developer',
    visitWebSite: 'Visit Website >',
  },
  contacts: {
    visitMyGithub: 'Visit My Github',
    visitMyLinkedIn: 'Visit My LinkedIn',
    sendMeEmail: 'Send me an email',
    callMe: 'Call me',
    phoneCopied: 'Phone number copied to clipboard!',
  }
};
