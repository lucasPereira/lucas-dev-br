
import React from 'react';
import { Group, Participant } from '../types';
import { CannabisLeaf } from './Icons';

interface Props {
  group: Group;
  onUpdate: (results: Record<string, number>) => void;
  readOnly?: boolean;
}

const GroupCard: React.FC<Props> = ({ group, onUpdate, readOnly }) => {
  const handleChangeRank = (participantId: string, rank: string) => {
    if (readOnly) return;
    
    const value = parseInt(rank, 10);
    const newResults = { ...group.results };
    
    if (isNaN(value)) {
      delete newResults[participantId];
    } else {
      Object.keys(newResults).forEach(key => {
        if (newResults[key] === value && key !== participantId) {
          delete newResults[key];
        }
      });
      newResults[participantId] = value;
    }
    
    onUpdate(newResults);
  };

  const getPosStyle = (pos?: number) => {
    switch(pos) {
      case 1: return 'border-yellow-400 bg-yellow-400/30 text-yellow-100 shadow-[inset_0_0_20px_rgba(250,204,21,0.2)] scale-[1.02] z-10';
      case 2: return 'border-emerald-300 bg-emerald-300/20 text-emerald-50';
      case 3: return 'border-emerald-600 bg-emerald-800/20 text-emerald-400 opacity-80';
      case 4: return 'border-emerald-900 bg-emerald-950/20 text-emerald-900 opacity-60';
      default: return 'border-emerald-400/10 bg-white/5 text-emerald-200';
    }
  };

  return (
    <div className={`bg-emerald-700/20 rounded-[2.5rem] border-4 border-emerald-400/10 overflow-hidden shadow-2xl flex flex-col transition-all hover:border-emerald-400/30 group ${readOnly ? 'opacity-90 grayscale-[0.3]' : ''}`}>
      <div className={`${readOnly ? 'bg-emerald-900/80' : 'bg-emerald-500'} px-10 py-5 font-bungee text-2xl flex justify-between items-center text-emerald-950`}>
        <span className="flex items-center gap-3">
          <CannabisLeaf className="w-8 h-8 opacity-60 group-hover:opacity-100 transition-opacity" />
          GRUPO {group.id.split('-')[1]}
        </span>
        {readOnly && <span className="text-[10px] bg-emerald-950/40 px-4 py-1 rounded-full text-emerald-200 font-black tracking-widest">PASSADO</span>}
      </div>
      
      <div className="p-8 space-y-5">
        {group.participants.map((p) => {
          const currentRank = group.results[p.id];
          return (
            <div 
              key={p.id} 
              className={`flex items-center justify-between p-6 rounded-[1.5rem] border-2 transition-all relative overflow-hidden ${getPosStyle(currentRank)}`}
            >
              {currentRank === 1 && <div className="absolute top-0 right-0 p-2 opacity-20"><CannabisLeaf className="w-10 h-10" /></div>}
              <span className="font-black text-2xl truncate flex-1 tracking-tight">{p.name}</span>
              {readOnly ? (
                <span className="font-bungee bg-emerald-950/40 px-5 py-2 rounded-2xl text-lg flex items-center gap-2">
                  {currentRank === 1 && <CannabisLeaf className="w-5 h-5 text-yellow-400" />}
                  {currentRank ? `${currentRank}º` : '--'}
                </span>
              ) : (
                <select
                  value={currentRank || ''}
                  onChange={(e) => handleChangeRank(p.id, e.target.value)}
                  className="bg-emerald-950/60 text-emerald-200 rounded-[1.2rem] px-4 py-3 focus:outline-none border-2 border-emerald-400/20 ml-6 font-bungee text-sm cursor-pointer hover:border-emerald-300 transition-all shadow-inner"
                >
                  <option value="">RANK</option>
                  <option value="1">1º (O BRABO)</option>
                  <option value="2">2º (BRISOU)</option>
                  <option value="3">3º (DORMIU)</option>
                  {group.participants.length >= 4 && <option value="4">4º (VACILOU)</option>}
                </select>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-10 py-4 bg-emerald-500/5 text-[10px] text-emerald-300 font-black uppercase tracking-[0.4em] text-center flex items-center justify-center gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        {Object.keys(group.results).length} / {group.participants.length} brisas computadas
      </div>
    </div>
  );
};

export default GroupCard;
