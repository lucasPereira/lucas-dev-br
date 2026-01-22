
import React, { useState } from 'react';
import { CannabisLeaf } from './Icons';

interface Props {
  onStart: (names: string[]) => void;
}

const TournamentSetup: React.FC<Props> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);

  const addParticipant = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (name.trim() && !participants.includes(name.trim())) {
      setParticipants([...participants, name.trim()]);
      setName('');
    }
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleStart = () => {
    if (participants.length < 6) {
      alert("A Copa Joacannabis exige pelo menos 6 pilotos pra brisa ser boa! 🌿");
      return;
    }
    onStart(participants);
  };

  return (
    <div className="bg-emerald-800/20 backdrop-blur-xl rounded-[3rem] p-8 border-4 border-emerald-400/30 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
        <CannabisLeaf className="w-48 h-48 rotate-12" />
      </div>

      <h2 className="text-3xl font-bungee text-emerald-200 mb-8 text-center flex items-center justify-center gap-4">
        <CannabisLeaf className="text-yellow-400 w-10 h-10" />
        CHAMADA DOS PILOTOS
        <CannabisLeaf className="text-yellow-400 w-10 h-10" />
      </h2>
      
      <form onSubmit={addParticipant} className="flex flex-col md:flex-row gap-4 mb-10 relative z-10">
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Qual o nome do brisado?..."
          className="flex-1 bg-white/10 border-4 border-emerald-400/20 rounded-3xl px-6 py-4 text-white focus:outline-none focus:border-emerald-300 transition-all placeholder:text-emerald-200/40 text-xl"
        />
        <button 
          type="submit"
          className="bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-bungee px-10 py-4 rounded-3xl transition-all active:scale-95 shadow-lg border-b-4 border-emerald-600 flex items-center justify-center gap-2 text-xl"
        >
          INSCREVER 🌿
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[30rem] overflow-y-auto pr-2 mb-10 no-scrollbar relative z-10">
        {participants.length === 0 ? (
          <div className="col-span-full py-16 text-center border-4 border-dashed border-emerald-400/20 rounded-3xl bg-white/5">
            <p className="text-6xl mb-4">🛸</p>
            <p className="text-emerald-200/60 font-bungee uppercase tracking-wider">Aguardando os pilotos aparecerem...</p>
          </div>
        ) : (
          participants.map((p, i) => (
            <div key={i} className="flex items-center justify-between bg-emerald-700/30 p-5 rounded-3xl border-2 border-emerald-400/20 hover:border-emerald-300 transition-all group shadow-inner">
              <span className="text-xl font-bold flex items-center gap-4 text-emerald-50">
                <span className="bg-emerald-400 text-emerald-900 text-xs w-8 h-8 flex items-center justify-center rounded-full font-bungee transform -rotate-12">{i + 1}</span>
                {p}
              </span>
              <button 
                onClick={() => removeParticipant(i)}
                className="text-red-400/60 hover:text-red-400 transition-colors font-bungee text-xs px-3 py-1 bg-red-900/20 rounded-xl"
              >
                REMOVER
              </button>
            </div>
          ))
        )}
      </div>

      <div className="text-center pt-8 border-t-4 border-emerald-400/10">
        <button 
          onClick={handleStart}
          disabled={participants.length < 6}
          className={`w-full font-bungee text-3xl px-12 py-8 rounded-[2.5rem] shadow-2xl transition-all transform ${
            participants.length < 6 
            ? 'bg-emerald-900/50 text-emerald-800 cursor-not-allowed border-4 border-transparent' 
            : 'bg-yellow-400 hover:bg-yellow-300 text-emerald-900 hover:scale-[1.02] active:scale-95 trippy-glow border-b-8 border-yellow-600'
          }`}
        >
          {participants.length < 6 ? 'FALTA GENTE NA RODA...' : (
            <span className="flex items-center justify-center gap-4">
              <CannabisLeaf className="w-8 h-8" />
              BORA DAR O START!
              <CannabisLeaf className="w-8 h-8" />
            </span>
          )}
        </button>
        <p className={`mt-6 text-sm font-bungee tracking-[0.3em] ${participants.length < 6 ? 'text-orange-300' : 'text-emerald-200'}`}>
          Total: {participants.length} / 6 mínimos {participants.length >= 6 && "🔥"}
        </p>
      </div>
    </div>
  );
};

export default TournamentSetup;
