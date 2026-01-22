
export interface Participant {
  id: string;
  name: string;
}

export interface GroupResult {
  participantId: string;
  position: number; // 1, 2, 3, 4
}

export interface Group {
  id: string;
  participants: Participant[];
  results: Record<string, number>; // participantId -> position
}

export interface Round {
  number: number;
  groups: Group[];
  isFinal: boolean;
  completed: boolean;
}

export interface TournamentState {
  participants: Participant[];
  rounds: Round[];
  status: 'setup' | 'active' | 'finished';
  winner?: Participant;
  viewingRoundIndex?: number;
}
