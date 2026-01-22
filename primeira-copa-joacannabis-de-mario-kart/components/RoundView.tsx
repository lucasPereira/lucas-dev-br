
import React from 'react';
import { Round } from '../types';
import GroupCard from './GroupCard';
import { CannabisLeaf } from './Icons';

interface Props {
  rounds: Round[];
  currentViewingIndex: number;
  onSetViewingRound: (index: number) => void;
  onUpdateResults: (roundIndex: number, groupId: string, results: Record<string, number>) => void;
  onAdvance: () => void;
}

const RoundView: React.FC<Props> = ({ 
  rounds, 
  currentViewingIndex, 
  onSetViewingRound, 
  onUpdateResults, 
  onAdvance 
}) => {
  const round = rounds[currentViewingIndex];
  const isLatestRound = currentViewingIndex === rounds.length - 1;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Navegação entre Rodadas */}
      <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar items-center justify-center">
        {rounds.map((r, idx) => (
          <button
            key={idx}
            onClick={() => onSetViewingRound(idx)}
            className={`px-10 py-3 rounded-[1.5rem] font-bungee whitespace-nowrap transition-all border-4 flex items-center gap-3 ${
              currentViewingIndex === idx 
                ? 'bg-emerald-400 border-white text-emerald-900 scale-110 shadow-xl' 
                : 'bg-emerald-700/20 border-emerald-400/20 text-emerald-300 hover:text-emerald-100'
            }`}
          >
            {r.isFinal ? (
              <>🏆 FINAL</>
            ) : (
              <>
                <CannabisLeaf className="w-5 h-5" />
                RODADA {r.number}
              </>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-emerald-800/20 p-10 rounded-[3rem] border-4 border-emerald-400/20 backdrop-blur-md relative overflow-hidden">
        {/* Decorative Leaf - Ensure pointer-events-none */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
           <CannabisLeaf className="w-32 h-32" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bungee text-white flex items-center gap-4">
            {round.isFinal ? (
              <>
                <CannabisLeaf className="text-yellow-400 w-12 h-12" />
                A GRANDE FINAL
                <CannabisLeaf className="text-yellow-400 w-12 h-12" />
              </>
            ) : (
              <>
                <CannabisLeaf className="text-emerald-300 w-10 h-10" />
                FASE {round.number}
              </>
            )}
          </h2>
          <p className="text-emerald-200 mt-3 font-bungee tracking-wider text-sm opacity-80 uppercase">
            {!isLatestRound 
              ? 'Dando uma olhada no passado... 🕰️' 
              : round.isFinal 
                ? 'Quem brisa mais leva a coroa! 😎' 
                : 'Pé no acelerador: os 2 melhores avançam!'}
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-4 relative z-20">
          {isLatestRound && (
            <button 
              onClick={onAdvance}
              className="bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-bungee px-10 py-5 rounded-[2rem] transition-all shadow-2xl active:scale-95 border-b-8 border-yellow-600 text-xl flex items-center gap-3 cursor-pointer"
            >
              {round.isFinal ? 'ENCERRAR BRISA' : (
                <>
                   SEGUIR VIAGEM 💨
                   <CannabisLeaf className="w-6 h-6" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {round.groups.map((group) => (
          <GroupCard 
            key={group.id} 
            group={group} 
            readOnly={!isLatestRound}
            onUpdate={(results) => onUpdateResults(currentViewingIndex, group.id, results)} 
          />
        ))}
      </div>
    </div>
  );
};

export default RoundView;
