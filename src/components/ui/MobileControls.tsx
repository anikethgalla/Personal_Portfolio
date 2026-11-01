import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Pause } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const MobileControls: React.FC = () => {
  const { setTouchControls } = useGame();

  const handleTouch = (key: 'forward' | 'backward' | 'left' | 'right' | 'brake', isPressed: boolean) => {
    setTouchControls(prev => {
      let forward = prev.forward;
      let turn = prev.turn;
      let brake = prev.brake;

      if (key === 'forward') forward = isPressed ? 1 : 0;
      if (key === 'backward') forward = isPressed ? -1 : 0;
      if (key === 'left') turn = isPressed ? 1 : 0;
      if (key === 'right') turn = isPressed ? -1 : 0;
      if (key === 'brake') brake = isPressed;

      return { forward, turn, brake };
    });
  };

  return (
    <div className="fixed bottom-4 inset-x-4 z-40 flex justify-between items-end pointer-events-none md:hidden select-none">
      {/* Steering D-Pad (Left Side) */}
      <div className="pointer-events-auto flex items-center gap-2 bg-[#ded7cb]/80 backdrop-blur-md p-2 rounded-2xl border border-[#c5b9a8] clay-shadow">
        <button
          onTouchStart={() => handleTouch('left', true)}
          onTouchEnd={() => handleTouch('left', false)}
          onMouseDown={() => handleTouch('left', true)}
          onMouseUp={() => handleTouch('left', false)}
          className="w-13 h-13 rounded-xl bg-[#ece5dc] active:bg-[#ea580c] active:text-white text-[#2c2622] flex items-center justify-center font-bold text-lg shadow-sm border border-[#d8cdbf]"
          aria-label="Steer Left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onTouchStart={() => handleTouch('right', true)}
          onTouchEnd={() => handleTouch('right', false)}
          onMouseDown={() => handleTouch('right', true)}
          onMouseUp={() => handleTouch('right', false)}
          className="w-13 h-13 rounded-xl bg-[#ece5dc] active:bg-[#ea580c] active:text-white text-[#2c2622] flex items-center justify-center font-bold text-lg shadow-sm border border-[#d8cdbf]"
          aria-label="Steer Right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Gas / Brake Pedals (Right Side) */}
      <div className="pointer-events-auto flex flex-col gap-2 bg-[#ded7cb]/80 backdrop-blur-md p-2 rounded-2xl border border-[#c5b9a8] clay-shadow">
        <div className="flex gap-2">
          {/* Brake */}
          <button
            onTouchStart={() => handleTouch('brake', true)}
            onTouchEnd={() => handleTouch('brake', false)}
            onMouseDown={() => handleTouch('brake', true)}
            onMouseUp={() => handleTouch('brake', false)}
            className="w-13 h-13 rounded-xl bg-[#dc2626]/20 active:bg-[#dc2626] active:text-white text-[#dc2626] flex items-center justify-center font-bold text-xs border border-[#dc2626]/30 shadow-sm"
            aria-label="Brake"
          >
            <Pause className="w-5 h-5" />
          </button>

          {/* Gas / Forward */}
          <button
            onTouchStart={() => handleTouch('forward', true)}
            onTouchEnd={() => handleTouch('forward', false)}
            onMouseDown={() => handleTouch('forward', true)}
            onMouseUp={() => handleTouch('forward', false)}
            className="w-13 h-13 rounded-xl bg-[#ea580c] active:bg-[#c2410c] text-white flex items-center justify-center font-bold shadow-md"
            aria-label="Drive Forward"
          >
            <ChevronUp className="w-7 h-7" />
          </button>
        </div>

        {/* Reverse */}
        <button
          onTouchStart={() => handleTouch('backward', true)}
          onTouchEnd={() => handleTouch('backward', false)}
          onMouseDown={() => handleTouch('backward', true)}
          onMouseUp={() => handleTouch('backward', false)}
          className="w-full h-11 rounded-xl bg-[#ece5dc] active:bg-[#d0c6b9] text-[#2c2622] flex items-center justify-center font-bold border border-[#d8cdbf]"
          aria-label="Reverse"
        >
          <ChevronDown className="w-5 h-5" />
          <span className="text-[11px] font-bold ml-1 uppercase">Reverse</span>
        </button>
      </div>
    </div>
  );
};

