import { Event } from './types';

export const EVENTS: Event[] = [
  {
    id: 'sot-got-talent',
    name: 'SOT Got Talent',
    description: 'Showcase your amazing talents!',
    guidelines: [
      '🎤 SOT GOT TALENT 2025 – GUIDELINES 🎉',
      '❗ EXCLUSIVE FOR SOT STUDENTS ONLY ❗',
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
      ' ❗ No dangerous acts involving fire, sharp objects, or anything that can compromise the safety of the venue and the audience.',
      '',
      '🕒 Performance Duration',
      ' Each act must run for 1 minute and 30 seconds up to 2 minutes only.',
      ' Time is strictly monitored: Going under or over the limit will result in point deductions.',
      '',
      '📝 Registration Details',
      ' You’re already in the right place! Fill out and submit the form below to register.',
      ' 📍 Deadline of registration: April 17, 2025',
      '- Late submissions will not be entertained!',
      '',
      '🏆 Prizes & Recognition',
      '- Certificate and a trophy will be awarded for the winner.',
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
      '♻️ TRASH ON SHOW – MOBILE LEGENDS EDITION 👑',
      'Theme: Cosplay Meets Conservation – Style with Purpose!',
      '',
      '🧍 Who Can Join?',
      '- Open to all students who want to showcase their creativity using recycled materials.',
      '- Participants must register individually.',
      '',
      '🧵 Costume Requirements',
      '- Participants must prepare outfits inspired by a Mobile Legends hero.',
      '- At least 75% of the costume must be made of recycled materials (e.g., plastics, newspapers, chipboard, cardboard, etc.).',
      '',
      '📸 Submission of Photos',
      ' Contestants must submit two (2) portrait photos while wearing their full costume:',
      ' 1. Full-body photo of the participant in costume.',
      ' 2. Full-body photo focusing on the costume itself.',
      '',
      '🎥 Video Requirement',
      ' A video (maximum of 1 minute) must be recorded to showcase the participant’s character portrayal and costume.',
      '',
      ' 📍 Other Important Details',
      '- The person must have a short cosplay skit with minimum ug two (2) sentences to highlight the character on the runway show.',
      '',
      '📅 Submission Deadline',
      '- All videos and portrait photos must be submitted at least ❗ five (5) days before the event.',
      '- Late submissions or failure to comply with guidelines will result in ❗ instant disqualification.',
      '📝 Registration Details',
      ' Fill out the form below completely to register.',
      ' 📍 Deadline of registration: April 17, 2025',
      '- Late submissions will not be entertained!',
      '',
      '🎯 Criteria for Judging:',
      ' 💄 Resemblance – Makeup, accessories, and costume similarity to the hero. (50%)',
      ' 👖 Characterization – Accurate portrayal in the video presentation. (30%)',
      '🧵 Craftsmanship – Creativity, skill, and ingenuity in material use. (20%)',
      '',
      '🏆 Prizes & Recognition',
      '- Certificate and a trophy will be awarded for the winner.',
      '==============================================',
      '- This isn’t just cosplay—it’s art with a mission. 💥',
      '- Show off your ML hero look, support recycling, and slay the runway with your one-of-a-kind creation!',
      '- Be bold. Be recycled. Be legendary. ✨'
    ],
    requiresTeam: false,
    icon: 'Image',
    formType: 'trash on show'
  },
  {
    id: 'call-of-duty',
    name: 'COD Mobile (BR Mode)',
    description: 'Battle it out in Call of Duty Mobile!',
    guidelines: [
      '🎮 CALL OF DUTY MOBILE – BATTLE ROYALE MODE 🔥',
      'Platform: Mobile Devices (Call of Duty: Mobile)',
      '',
      '👥 Team Format',
      ' Play Solo, Dou, Squad – your choice!',
      '',
      '📍 Match Info',
      ' Game Mode: Battle Royale',
      ' Map: Isolated',
      ' Number of Matches: 1 Round',
      ' Tournament Format: Knockout / Last Man or Team Standing',
      '',
      '📝 Registration',
      ' Each player/team must register before the official deadline.',
      ' Players must use their registered IGN (In-Game Name) for the entire tournament.',
      ' ❌ Smurfing or switching accounts is strictly prohibited.',
      ' 📍 Deadline of registration: April 17, 2025',
      '- Late submissions will not be entertained!',
      ' 📶 Participants must use their own mobile data or internet connection during the match.',
      '',
      '🛠️ Game Settings',
      ' Perspective: TPP Squad',
      ' Weapons: All allowed',
      ' Operator Skills / Class: Disabled',
      ' Vehicles: Allowed',
      ' Airdrops: Enabled',
      ' Revive Flights: Enabled',
      '',
      '⚔️ Match Rules',
      ' Players must join the custom room within 5 minutes of the invite.',
      ' ❌ No glitching, hacking, or use of third-party software – results in instant DQ.',
      ' Mic communication allowed only within the team.',
      '',
      '⚖️ Disqualification Criteria',
      ' 🚫 Use of emulators (unless explicitly permitted).',
      ' 🚫 Unsportsmanlike behavior such as trash talk or harassment.',
      ' 🚫 Stream sniping or leaking opponent information.',
      ' 🚫 Teaming with opponents.',
      ' 🚫 Failing to show up or being more than 10 minutes late.',
      '',
      '🏆 Prizes & Recognition',
      '- Certificates and a trophy will be awarded to the champion(s).',
      '',
      '==============================================',
      '- Gear up, squad up, and drop into the battlegrounds!',
      '- Show your tactical prowess and dominate the battlefield.',
      '- Will you be the last one standing? 💥'
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
      '🎮 MOBILE LEGENDS – TOURNAMENT GUIDELINES 🔥',
      '👥 Team Format',
      ' 5v5 – Team play with 5 main players, 1 reserve player, and 1 coach (2 substitutions total allowed).',
      ' Teams are based on three departments: School of Education, School of Business, and School of Technology.',
      ' A total of 9 teams will compete in a round-robin format before the playoffs, with 3 teams per department.',
      ' The playoffs will be a Three-Team Double Elimination Match based on the departmental structure.',
      '',
      '📍 Match Info',
      ' Game Mode: Draft Pick',
      ' Pick & Ban: In-game process.',
      ' Tournament Format: Double Elimination (Best of 1 for the first round, Best of 3 for the second round, Best of 5 for Grand Finals)',
      ' In the event of an overtime, the match will be played as Best of 3.',
      '',
      '📝 Registration',
      ' All team members, including coaches (substitutes), must be listed on the official roster submitted by their Team Captain',
      ' Players not on the roster will not be allowed to play.',
      ' A player’s clothing must be appropriate and in the colors of their respective team/school.',
      ' 📍 Deadline of registration: April 17, 2025',
      '- Late submissions will not be entertained!',
      ' 📶 Participants must use their own mobile data or internet connection during the match.',
      '',
      '⚔️ Match Rules',
      ' Teams must be ready 60 minutes before the scheduled match. A 15-minute delay results in a loss of the first game.',
      ' A second 15-minute delay will result in a loss of the entire series.',
      ' Victory Condition: The first team to destroy the opponent’s ancient or if all players on a team disconnect intentionally, the remaining team wins. If the match reaches the limit, the team with the highest score wins.',
      ' All team members must play using their registered IGN. Substitutions can only be made with listed reserve players.',
      '',
      '🛠️ Equipment & Playing Area',
      ' All teams must bring their own mobile device, charger, and headsets.',
      ' The game will be played in Rm. 15 and 17, right beside NBI Building at Mandaue City College.',
      '',
      '⚖️ Disqualification Criteria',
      ' Hack, mods, or third-party apps are strictly prohibited.',
      ' A player’s device may be inspected for suspected cheating.',
      ' Violating any rules may result in disqualification.',
      '',
      '🏆 Prizes & Recognition',
      '- Trophies and certificates will be awarded to the winning team.',
      '',
      '==============================================',
      ' Get ready, compete, and prove that your team is the best in Mobile Legends! 💥'
    ],
    requiresTeam: true,
    icon: 'Sword',
    formType: 'game'
  }  
];