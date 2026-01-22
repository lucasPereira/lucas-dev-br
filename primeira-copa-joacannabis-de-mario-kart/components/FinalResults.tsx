
import React from 'react';
import { Participant, Round } from '../types';
import { CannabisLeaf } from './Icons';

interface Props {
  winner?: Participant;
  rounds: Round[];
  onReset: () => void;
}

const FinalResults: React.FC<Props> = ({ winner, rounds, onReset }) => {
  return (
    <div className="text-center animate-fadeIn py-8">
      <div className="relative inline-block mb-16">
        <div className="absolute -inset-20 bg-emerald-400 blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute -inset-20 bg-yellow-400 blur-[120px] opacity-20 animate-pulse delay-700"></div>
        
        <div className="relative bg-emerald-800/30 backdrop-blur-3xl p-16 rounded-[5rem] border-8 border-yellow-400 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <CannabisLeaf className="w-full h-full" />
          </div>
          
          <div className="flex justify-center gap-8 mb-10 text-7xl relative z-10">
            <CannabisLeaf className="text-emerald-300" />
            <span className="animate-bounce drop-shadow-lg">👑</span>
            <CannabisLeaf className="text-emerald-300" />
          </div>
          
          <h2 className="text-3xl font-bungee text-yellow-300 mb-4 tracking-tighter drop-shadow-md">O GRANDE REI DA BRISA</h2>
          <h3 className="text-6xl md:text-8xl font-bungee text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] tracking-tighter transform -rotate-3 mb-4">
            {winner?.name || 'MISTERIOSO'}
          </h3>
          
          <div className="mt-12 flex justify-center gap-4 relative z-10">
             <div className="w-20 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
             <div className="w-20 h-4 bg-yellow-400 rounded-full animate-pulse delay-150"></div>
             <div className="w-20 h-4 bg-emerald-400 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-10 relative z-10">
        <p className="text-emerald-100 text-2xl font-bungee tracking-wider leading-relaxed drop-shadow-sm">
          A Copa Joacannabis terminou! O mundo nunca mais será o mesmo depois dessa brisa. 🌈💨
        </p>
        <button 
          onClick={onReset}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-bungee text-3xl px-12 py-10 rounded-[3rem] shadow-[0_20px_50px_rgba(250,204,21,0.4)] transition-all transform hover:scale-105 active:scale-95 border-b-12 border-yellow-600"
        >
          MAIS UMA RODADA? 🏁✨
        </button>
      </div>

      <div className="mt-24 text-left max-w-2xl mx-auto bg-emerald-800/20 p-12 rounded-[4rem] border-4 border-emerald-400/20 backdrop-blur-md">
        <h4 className="font-bungee text-emerald-200 text-3xl mb-10 border-b-4 border-emerald-400/10 pb-6 flex items-center gap-5">
          <CannabisLeaf className="text-yellow-400 w-10 h-10" />
          PÓDIO FINAL DA COPA
        </h4>
        <div className="space-y-8">
          {rounds[rounds.length - 1].groups[0].participants
            .sort((a, b) => {
               const results = rounds[rounds.length - 1].groups[0].results;
               return (results[a.id] || 99) - (results[b.id] || 99);
            })
            .map((p, i) => (
              <div key={p.id} className="flex items-center justify-between py-6 border-b-4 border-emerald-400/5 last:border-0 group">
                 <div className="flex items-center gap-8">
                   <span className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-bungee text-3xl shadow-2xl transition-transform group-hover:scale-110
                     ${i === 0 ? 'bg-yellow-400 text-emerald-950 rotate-6 scale-110' : i === 1 ? 'bg-emerald-300 text-emerald-950 -rotate-6' : i === 2 ? 'bg-emerald-600 text-emerald-100' : 'bg-emerald-900 text-emerald-600 opacity-50'}`}>
                     {i + 1}
                   </span>
                   <div>
                     <span className="text-3xl font-black text-white tracking-tighter block drop-shadow-md">{p.name}</span>
                     <span className="text-xs font-bungee text-emerald-400/60 uppercase tracking-widest mt-1">Pódio da Brisa</span>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className="text-emerald-300 font-bungee text-xl">
                     {i === 0 ? 'OURO 🌿' : i === 1 ? 'PRATA ✨' : i === 2 ? 'BRONZE 💨' : '4º LUGAR'}
                   </span>
                 </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default FinalResults;
