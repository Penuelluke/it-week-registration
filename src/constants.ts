import { Event } from './types';

export const EVENTS: Event[] = [
  {
    id: 'sot-got-talent',
    name: 'SOT Got Talent',
    description: 'Showcase your amazing talents!',
    guidelines: [
      '🎤 SOT GOT TALENT 2025 – GUIDELINES 🎉',
      'Theme: CTRL + SHOW: Break the Code, Let IT Shine!',
      '',
      '👥 Who Can Join?',
      ' Open to all officially enrolled students of the School of Technology (SOT).',
      ' Every block or section must have at least one representative.',
      '',
      '👯 Number of Participants',
      ' You can perform solo, duo, or as a group – your call!',
      ' Just make sure your team represents your block/section.',
      '',
      '🎭 What Can You Perform?',
      ' Any safe and audience-appropriate talent is welcome! (Singing, dancing, acting, instruments, comedy, spoken word, magic, etc.)',
      ' ❗No dangerous acts involving fire, sharp objects, or anything that can compromise the safety of the venue and the audience.',
      '',
      '🕒 Performance Duration',
      ' Each act must run for 1 minute and 30 seconds up to 2 minutes only.',
      ' Time is strictly monitored: Going under or over the limit will result in point deductions.',
      '',
      '📝 Registration Details',
      ' You’re already in the right place! Fill out and submit the form below to register.',
      ' 📍 Deadline of registration: April 11, 2025',
      ' Late submissions will not be entertained!',
      '',
      '==============================================',
      'We’re not just techies—we’ve got talent, creativity, and surprises the campus hasn’t seen yet.',
      ' Got a skill? A hidden gem?',
      ' Now’s your chance to stand out and represent your block.',
      ' Join the first-ever SOT Got Talent and show them what we’re made of! 💥'
    ],
    requiresTeam: false,
    icon: 'Mic2',
    formType: 'talent'
  },
  {
    id: 'trash-on-show',
    name: 'Trash on Show (ML Edition)',
    description: 'Rampa! Rampa! Rampa! 🔥',
    guidelines: [
      'Submit a meme or parody related to ML',
      'Judging based on creativity and humor',
      'Content must be original',
      'No offensive or inappropriate content'
    ],
    requiresTeam: false,
    icon: 'Image',
    formType: 'trash on show'
  },
  {
    id: 'cod-mobile',
    name: 'COD Mobile (BR Mode)',
    description: 'Battle it out in Call of Duty Mobile!',
    guidelines: [
      'BR Squad (4 players)',
      'Double Elimination Format',
      'Device: Mobile/Tablet only',
      'Must have stable internet connection'
    ],
    requiresTeam: true,
    icon: 'Gamepad2',
    formType: 'game'
  },
  {
    id: 'mobile-legends',
    name: 'Mobile Legends: Bang Bang',
    description: 'Compete in the ultimate MOBA showdown!',
    guidelines: [
      'Classic 5v5',
      'Single Elimination',
      'Device: Mobile/Tablet only',
      'Must have stable internet connection'
    ],
    requiresTeam: true,
    icon: 'Sword',
    formType: 'game'
  }
];