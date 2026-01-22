
import React, { useState, useEffect, useCallback } from 'react';
import { Participant, TournamentState, Round, Group } from './types';
import { createGroups, getAdvancingPlayers } from './utils/tournament';
import TournamentSetup from './components/TournamentSetup';
import RoundView from './components/RoundView';
import FinalResults from './components/FinalResults';
import { CannabisLeaf } from './components/Icons';

const STORAGE_KEY = 'mario_kart_tournament_v1';

const INITIAL_STATE: TournamentState = {
  participants: [],
  rounds: [],
  status: 'setup',
  viewingRoundIndex: 0
};

const App: React.FC = () => {
  const [state, setState] = useState<TournamentState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STATE;
    } catch (e) {
      return INITIAL_STATE;
    }
  });

  // Sincroniza o estado com o localStorage
  useEffect(() => {
    if (state.status === 'setup' && state.participants.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const startTournament = (names: string[]) => {
    const participants: Participant[] = names.map(name => ({
      id: Math.random().toString(36).substr(2, 9),
      name
    }));

    const firstRoundGroups = createGroups(participants);
    const isFinal = participants.length <= 4;

    const firstRound: Round = {
      number: 1,
      groups: firstRoundGroups,
      isFinal,
      completed: false
    };

    setState({
      participants,
      rounds: [firstRound],
      status: 'active',
      viewingRoundIndex: 0
    });
  };

  const updateGroupResults = (roundIndex: number, groupId: string, results: Record<string, number>) => {
    setState(prev => {
      const newRounds = [...prev.rounds];
      const round = { ...newRounds[roundIndex] };
      round.groups = round.groups.map(g => g.id === groupId ? { ...g, results } : g);
      newRounds[roundIndex] = round;
      return { ...prev, rounds: newRounds };
    });
  };

  const advanceRound = () => {
    const lastRoundIndex = state.rounds.length - 1;
    const currentRound = state.rounds[lastRoundIndex];
    
    const allCompleted = currentRound.groups.every(g => 
      Object.keys(g.results).length === g.participants.length
    );

    if (!allCompleted) {
      alert("Pera lá, amigão! Preenche todos os resultados antes de seguir viagem. 💨");
      return;
    }

    if (currentRound.isFinal) {
      const finalGroup = currentRound.groups[0];
      const winnerId = Object.entries(finalGroup.results).find(([_, pos]) => pos === 1)?.[0];
      const winner = state.participants.find(p => p.id === winnerId);
      
      setState(prev => ({ ...prev, status: 'finished', winner }));
      return;
    }

    const advancing = getAdvancingPlayers(currentRound);
    const isNextFinal = advancing.length <= 4;
    const nextGroups = createGroups(advancing);

    const nextRound: Round = {
      number: currentRound.number + 1,
      groups: nextGroups,
      isFinal: isNextFinal,
      completed: false
    };

    setState(prev => {
      const newRounds = [...prev.rounds, nextRound];
      return {
        ...prev,
        rounds: newRounds,
        viewingRoundIndex: newRounds.length - 1
      };
    });
  };

  const setViewingRound = (index: number) => {
    setState(prev => ({ ...prev, viewingRoundIndex: index }));
  };

  const resetTournament = useCallback((ask: boolean = true) => {
    if (ask) {
      const confirmed = window.confirm("Tem certeza que quer zerar a brisa? Todo o progresso será perdido. 🌿");
      if (!confirmed) return;
    }
    
    // Limpa o localStorage e reseta o estado
    localStorage.removeItem(STORAGE_KEY);
    setState(INITIAL_STATE);
  }, []);

  return (
    <div className="min-h-screen pb-12 transition-colors duration-500">
      {/* Decorative floating leaves - pointer-events-none is CRITICAL */}
      <CannabisLeaf className="floating-flower text-emerald-400 w-32 h-32 top-10 left-10 pointer-events-none" />
      <CannabisLeaf className="floating-flower text-emerald-400 w-24 h-24 bottom-20 right-20 pointer-events-none" style={{ animationDelay: '-5s' } as any} />
      <CannabisLeaf className="floating-flower text-emerald-400 w-40 h-40 top-1/2 left-[-40px] pointer-events-none" style={{ animationDelay: '-10s' } as any} />

      <header className="py-12 px-4 text-center cannabis-gradient shadow-xl mb-8 relative overflow-hidden border-b-8 border-yellow-400">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex flex-wrap gap-12 p-8 items-center justify-center">
          {Array.from({length: 12}).map((_, i) => (
            <CannabisLeaf key={i} className="w-16 h-16" />
          ))}
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-7xl font-bungee text-white drop-shadow-2xl italic tracking-tighter flex items-center justify-center gap-4">
            <CannabisLeaf className="w-12 h-12 md:w-20 md:h-20 text-yellow-300" />
            1ª COPA JOACANNABIS
            <CannabisLeaf className="w-12 h-12 md:w-20 md:h-20 text-yellow-300" />
          </h1>
          <p className="text-xl md:text-3xl font-bungee text-yellow-200 mt-2 tracking-widest drop-shadow-md">
            SÓ AS MELHORES BRISAS 💨
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 relative z-20">
        {state.status === 'setup' && (
          <TournamentSetup onStart={startTournament} />
        )}

        {state.status === 'active' && state.viewingRoundIndex !== undefined && (
          <RoundView 
            rounds={state.rounds}
            currentViewingIndex={state.viewingRoundIndex}
            onSetViewingRound={setViewingRound}
            onUpdateResults={updateGroupResults}
            onAdvance={advanceRound}
          />
        )}

        {state.status === 'finished' && (
          <FinalResults 
            winner={state.winner} 
            rounds={state.rounds} 
            onReset={() => resetTournament(false)} 
          />
        )}
      </main>

      <footer className="mt-16 text-center text-emerald-300/60 font-bold text-sm flex flex-col items-center gap-4 pointer-events-none">
        <CannabisLeaf className="w-10 h-10 opacity-30" />
        <p className="tracking-widest uppercase">Joga com calma, aproveita a brisa. 🌈✨</p>
      </footer>
    </div>
  );
};

export default App;
