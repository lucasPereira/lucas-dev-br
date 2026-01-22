
import { Participant, Group, Round } from '../types';

export const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const createGroups = (participants: Participant[]): Group[] => {
  const shuffled = shuffleArray(participants);
  const total = shuffled.length;
  
  // Max 4 players per group. 
  // Minimum groups = Math.ceil(total / 4)
  const numGroups = Math.ceil(total / 4);
  const groups: Group[] = Array.from({ length: numGroups }, (_, i) => ({
    id: `g-${i + 1}`,
    participants: [],
    results: {},
  }));

  // Distribute players round-robin to ensure difference <= 1
  shuffled.forEach((p, index) => {
    const groupIndex = index % numGroups;
    groups[groupIndex].participants.push(p);
  });

  return groups;
};

export const getAdvancingPlayers = (round: Round): Participant[] => {
  const advancing: Participant[] = [];
  
  round.groups.forEach(group => {
    // Sort participants by result position
    const sorted = [...group.participants].sort((a, b) => {
      const posA = group.results[a.id] || 99;
      const posB = group.results[b.id] || 99;
      return posA - posB;
    });

    // Top 2 advance
    advancing.push(...sorted.slice(0, 2));
  });

  return advancing;
};
