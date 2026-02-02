import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();
  
  // Calendar logic
  const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentYear, today.getMonth(), 1).getDay(); // 0 is Sunday
  
  // Previous month filler
  const prevMonthDays = new Date(currentYear, today.getMonth(), 0).getDate();
  
  const calendarCells = [];
  
  // Previous month days (faded)
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarCells.push({ day: prevMonthDays - i, currentMonth: false });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push({ day: i, currentMonth: true });
  }
  
  // Next month days (to fill 42 grid cells 6x7)
  const remainingCells = 42 - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push({ day: i, currentMonth: false });
  }

  return (
    <div 
        className="absolute bottom-[40px] right-0 w-[330px] h-[340px] bg-gradient-to-b from-[#eef4f9] to-[#ffffff] border border-[#707070] shadow-[0_0_15px_rgba(0,0,0,0.4)] font-[Segoe UI,sans-serif] text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-200 z-[60] select-none rounded-tl-md rounded-tr-md p-3"
        onClick={(e) => e.stopPropagation()}
    >
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-2 px-1">
                <div className="text-[#1e5799] font-normal text-lg hover:text-[#0066cc] cursor-pointer">
                    {currentMonth}, {currentYear}
                </div>
                <div className="flex gap-1">
                    <button className="p-1 hover:bg-[#dcebfd] hover:border-[#7da2ce] border border-transparent rounded-sm transition-all">
                        <ChevronLeft size={16} className="text-[#1e5799]" />
                    </button>
                    <button className="p-1 hover:bg-[#dcebfd] hover:border-[#7da2ce] border border-transparent rounded-sm transition-all">
                        <ChevronRight size={16} className="text-[#1e5799]" />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 bg-white border border-[#a0a0a0] p-2">
                <div className="grid grid-cols-7 text-center mb-1">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                        <div key={d} className="text-xs font-normal text-slate-500">{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 text-center h-[calc(100%-24px)]">
                    {calendarCells.map((cell, idx) => {
                        const isToday = cell.currentMonth && cell.day === today.getDate();
                        return (
                            <div 
                                key={idx} 
                                className={`
                                    text-xs flex items-center justify-center cursor-default border border-transparent
                                    ${!cell.currentMonth ? 'text-slate-400' : 'text-slate-800 hover:bg-[#dcebfd] hover:border-[#7da2ce] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,1)]'}
                                    ${isToday ? 'bg-[#dcebfd] border-[#7da2ce] font-bold shadow-[inset_0_0_5px_rgba(60,127,177,0.3)]' : ''}
                                `}
                            >
                                {cell.day}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Clock Link */}
            <div className="mt-3 text-[#1e5799] text-sm hover:underline cursor-pointer text-center">
                Change date and time settings...
            </div>
        </div>
    </div>
  );
};
