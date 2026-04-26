import doctorsData from './doctors.json';
import housingData from './apartments.json';

const roommateListing = {
  id: 'roommate-1',
  title: 'Roommate Post - City Center Flat',
  description: 'Julia and Anna are looking for two roommates close to campus transport lines.',
};

const allHousingListings = [...housingData, roommateListing];

const doctorAppointmentById = {
  1: {
    slot: 'Tuesday, 11:30',
    location: 'Luxmed Nadbystrzycka 9',
  },
  2: {
    slot: 'Wednesday, 09:20',
    location: 'Medi Clinic Center',
  },
  3: {
    slot: 'Friday, 14:10',
    location: 'Ortho Point Lublin',
  },
  4: {
    slot: 'Monday, 12:00',
    location: 'Women Health Office',
  },
  5: {
    slot: 'Thursday, 16:40',
    location: 'Dental Point Zana',
  },
  6: {
    slot: 'Tuesday, 10:15',
    location: 'Skin Clinic CityFit',
  },
  7: {
    slot: 'Monday, 17:00',
    location: 'MindCare Lublin',
  },
  8: {
    slot: 'Saturday, 08:45',
    location: 'Sports Med Arena',
  },
};

const housingHostByListingId = {
  '1': {
    name: 'Kasia',
    role: 'Host',
    opening: 'Hi, the room is still available and ready from next week.',
    followUp: 'You can visit today after 17:00. Please bring your student ID.',
  },
  '2': {
    name: 'Pawel',
    role: 'Host',
    opening: 'Hello, two places are still open in this flat.',
    followUp: 'I can show you the apartment tomorrow evening.',
  },
  '3': {
    name: 'Maria',
    role: 'Host',
    opening: 'Hi, yes, this women-only room is still free.',
    followUp: 'If you want, we can schedule a video tour first.',
  },
  '4': {
    name: 'Ola and Mateusz',
    role: 'Hosts',
    opening: 'Hey, we are looking for two new flatmates.',
    followUp: 'Move-in can be flexible between 1st and 10th next month.',
  },
  '5': {
    name: 'Agnieszka',
    role: 'Host',
    opening: 'Hi, this studio share is still available.',
    followUp: 'Please tell me if you prefer morning or evening visit.',
  },
  '6': {
    name: 'Bartek',
    role: 'Host',
    opening: 'Hello, one male spot is open in our student house.',
    followUp: 'We can meet near the tram loop and walk there together.',
  },
  '7': {
    name: 'Kamil',
    role: 'Host',
    opening: 'Hi, one place is available in this premium flat.',
    followUp: 'I can share extra photos and a short move-in checklist.',
  },
  '8': {
    name: 'Natalia',
    role: 'Host',
    opening: 'Hello, two places are open in this women-only apartment.',
    followUp: 'The closest night bus stop is 3 minutes away.',
  },
  'roommate-1': {
    name: 'Julia and Anna',
    role: 'Roommates',
    opening: 'Hi, we are still searching for two roommates in city center.',
    followUp: 'We can have a short call before showing the flat.',
  },
};

const studentThreadTemplates = {
  'student-1': {
    id: 'student-1',
    kind: 'student',
    contactName: 'Luca Ferri',
    subtitle: 'Mechanical Engineering - Erasmus buddy',
    avatarType: 'initials',
    avatarInitials: 'LF',
    avatarBg: 'linear-gradient(135deg, #1971d8 0%, #34d399 100%)',
    unreadCount: 2,
    messages: [
      {
        id: 'student-1-1',
        sender: 'contact',
        text: 'Hey! Are you going to the language exchange tonight?',
        timestamp: toIso(12, 5),
      },
      {
        id: 'student-1-2',
        sender: 'me',
        text: 'Yes, I will be there around 19:00.',
        timestamp: toIso(12, 8),
      },
      {
        id: 'student-1-3',
        sender: 'contact',
        text: 'Great, I saved us seats near the stage.',
        timestamp: toIso(12, 12),
      },
    ],
  },
  'student-2': {
    id: 'student-2',
    kind: 'student',
    contactName: 'Nadia Petrova',
    subtitle: 'Architecture - studio group',
    avatarType: 'initials',
    avatarInitials: 'NP',
    avatarBg: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    unreadCount: 0,
    messages: [
      {
        id: 'student-2-1',
        sender: 'contact',
        text: 'Can we review our presentation slides after class?',
        timestamp: toIso(12, 28),
      },
      {
        id: 'student-2-2',
        sender: 'me',
        text: 'Sure, lets meet in the library at 16:30.',
        timestamp: toIso(12, 31),
      },
      {
        id: 'student-2-3',
        sender: 'contact',
        text: 'Perfect. I will bring the final diagram draft.',
        timestamp: toIso(12, 34),
      },
    ],
  },
  'student-3': {
    id: 'student-3',
    kind: 'student',
    contactName: 'Omar Hassan',
    subtitle: 'Computer Science - project teammate',
    avatarType: 'initials',
    avatarInitials: 'OH',
    avatarBg: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    unreadCount: 1,
    messages: [
      {
        id: 'student-3-1',
        sender: 'me',
        text: 'I pushed the frontend update to our repo.',
        timestamp: toIso(12, 48),
      },
      {
        id: 'student-3-2',
        sender: 'contact',
        text: 'Nice! I will connect the API tonight and test it.',
        timestamp: toIso(12, 52),
      },
      {
        id: 'student-3-3',
        sender: 'contact',
        text: 'Can you send me your branch name?',
        timestamp: toIso(12, 55),
      },
    ],
  },
};

function toIso(hour, minute) {
  const date = new Date(Date.UTC(2026, 3, 26, hour, minute, 0));
  return date.toISOString();
}

export function getDoctorThreadId(doctorId) {
  return `doctor-${String(doctorId)}`;
}

export function getHousingThreadId(listingId) {
  return `housing-${String(listingId)}`;
}

export function getStudentThreadId(studentId) {
  return `student-${String(studentId)}`;
}

function buildDoctorThread(doctorId) {
  const doctor = doctorsData.find((item) => String(item.id) === String(doctorId));
  if (!doctor) {
    return null;
  }

  const appointment = doctorAppointmentById[doctor.id] ?? {
    slot: 'Wednesday, 10:00',
    location: 'Main Clinic',
  };

  const threadId = getDoctorThreadId(doctor.id);
  const messages = [
    {
      id: `${threadId}-1`,
      sender: 'contact',
      text: `Hi, this is ${doctor.name}. I can help in English if needed.`,
      timestamp: toIso(9, 5),
    },
    {
      id: `${threadId}-2`,
      sender: 'me',
      text: 'Thank you. I need a check-up this week, is there any slot?',
      timestamp: toIso(9, 8),
    },
    {
      id: `${threadId}-3`,
      sender: 'system',
      text: `Appointment confirmed with ${doctor.name}: ${appointment.slot}, ${appointment.location}.`,
      timestamp: toIso(9, 9),
      tone: 'appointment',
    },
    {
      id: `${threadId}-4`,
      sender: 'contact',
      text: 'Please bring your passport and student insurance card.',
      timestamp: toIso(9, 12),
    },
  ];

  return {
    id: threadId,
    kind: 'doctor',
    contactName: doctor.name,
    subtitle: doctor.specialty,
    avatarType: 'doctor',
    avatarId: doctor.id,
    unreadCount: doctor.id === 1 ? 1 : 0,
    messages,
  };
}

function buildHousingThread(listingId) {
  const listing = allHousingListings.find((item) => String(item.id) === String(listingId));
  if (!listing) {
    return null;
  }

  const hostMeta = housingHostByListingId[String(listing.id)] ?? {
    name: 'Apartment Host',
    role: 'Host',
    opening: 'Hi, this listing is still active.',
    followUp: 'Let me know when you can visit.',
  };

  const threadId = getHousingThreadId(listing.id);
  const messages = [
    {
      id: `${threadId}-1`,
      sender: 'contact',
      text: hostMeta.opening,
      timestamp: toIso(11, 20),
    },
    {
      id: `${threadId}-2`,
      sender: 'me',
      text: `Hi ${hostMeta.name.split(' ')[0]}, I am interested in "${listing.title}".`,
      timestamp: toIso(11, 24),
    },
    {
      id: `${threadId}-3`,
      sender: 'contact',
      text: hostMeta.followUp,
      timestamp: toIso(11, 29),
    },
  ];

  return {
    id: threadId,
    kind: 'housing',
    contactName: hostMeta.name,
    subtitle: `${hostMeta.role} for ${listing.title}`,
    avatarType: 'housing',
    avatarId: listing.id,
    unreadCount: String(listing.id) === '1' ? 1 : 0,
    messages,
  };
}

function buildStudentThread(threadId) {
  const template = studentThreadTemplates[threadId];
  if (!template) {
    return null;
  }

  return {
    ...template,
    messages: template.messages.map((message) => ({ ...message })),
  };
}

export function resolveChatThread(threadId) {
  if (!threadId) {
    return null;
  }

  if (threadId.startsWith('doctor-')) {
    return buildDoctorThread(threadId.replace('doctor-', ''));
  }

  if (threadId.startsWith('housing-')) {
    return buildHousingThread(threadId.replace('housing-', ''));
  }

  if (threadId.startsWith('student-')) {
    return buildStudentThread(threadId);
  }

  return null;
}

export const DEFAULT_CHAT_THREAD_ID = getDoctorThreadId(1);

export function getInitialChatThreads() {
  return [
    resolveChatThread(getDoctorThreadId(1)),
    resolveChatThread(getHousingThreadId(1)),
    resolveChatThread(getStudentThreadId(1)),
    resolveChatThread(getStudentThreadId(2)),
    resolveChatThread(getStudentThreadId(3)),
  ].filter(Boolean);
}
