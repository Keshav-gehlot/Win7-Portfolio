import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  type: 'input' | 'output';
  content: React.ReactNode;
}

export const TerminalApp: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Microsoft Windows [Version 6.1.7601]' },
    { type: 'output', content: 'Copyright (c) 2009 Microsoft Corporation.  All rights reserved.' },
    { type: 'output', content: ' ' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      execute(currentInput);
    }
  };

  const execute = (cmd: string) => {
      const trimmed = cmd.trim();
      const newHistory = [...lines, { type: 'input', content: `C:\\Users\\Keshav>${cmd}` } as TerminalLine];
      
      if (!trimmed) {
          setLines([...newHistory]);
          setCurrentInput('');
          return;
      }

      const args = trimmed.split(' ');
      const command = args[0].toLowerCase();
      
      let response: React.ReactNode = null;

      switch(command) {
          case 'help':
              response = (
                  <div className="whitespace-pre-wrap">
                      {`For more information on a specific command, type HELP command-name
HELP           Provides Help information for Windows commands.
WHOAMI         Displays the current logged in user.
LS             List information about the files (projects).
DIR            List information about the files (projects).
CLEAR          Clears the screen.
CLS            Clears the screen.
DATE           Displays or sets the date.
NMAP           Network exploration tool and security / port scanner.
SUDO           Execute a command as another user.`}
                  </div>
              );
              break;
          case 'whoami':
              response = 'portfolio\\visitor';
              break;
          case 'ls':
          case 'dir':
              response = (
                  <div className="whitespace-pre-wrap">
{` Volume in drive C is Portfolio
 Volume Serial Number is B4D3-H4CKS

 Directory of C:\\Users\\Keshav\\Projects

10/24/2025  08:00 PM    <DIR>          .
10/24/2025  08:00 PM    <DIR>          ..
06/15/2025  02:30 PM    <DIR>          Kraken-Password-Cracker
05/20/2025  10:00 AM    <DIR>          Net-Watch
04/10/2025  04:15 PM    <DIR>          CropSenz-AI
03/05/2025  09:45 AM    <DIR>          Malware-Visualizer
02/28/2025  11:20 AM    <DIR>          Air-Piano
01/15/2025  01:05 PM    <DIR>          Hands-Tracking
12/10/2024  05:55 PM    <DIR>          AI-Stock-Predictor
               0 File(s)              0 bytes
               9 Dir(s)  45,920,221,184 bytes free`}
                  </div>
              );
              break;
          case 'clear':
          case 'cls':
              setLines([]);
              setCurrentInput('');
              return;
          case 'date':
              response = `The current date is: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
              break;
          case 'sudo':
              response = 'User is not in the sudoers file. This incident will be reported.';
              break;
          case 'nmap':
              const width = window.innerWidth;
              const height = window.innerHeight;
              const ua = navigator.userAgent;
              response = (
                 <div className="whitespace-pre-wrap">
{`Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString().replace('T', ' ').split('.')[0]} UTC
Nmap scan report for visitor (127.0.0.1)
Host is up (0.00042s latency).

PORT      STATE SERVICE
80/tcp    open  http
443/tcp   open  https
3389/tcp  open  ms-wbt-server

Service Info:
OS: Windows 7 (Emulated)
Browser: ${ua}
Screen Resolution: ${width}x${height}

Nmap done: 1 IP address (1 host up) scanned in 0.52 seconds`}
                 </div>
              );
              break;
          case 'exit':
               response = 'To close the terminal, please click the "X" button in the top right corner.';
               break;
          default:
              response = `'${command}' is not recognized as an internal or external command,\noperable program or batch file.`;
      }

      if (response) {
          setLines([...newHistory, { type: 'output', content: response }]);
      } else {
           setLines([...newHistory]);
      }
      setCurrentInput('');
  };

  return (
    <div 
        className="h-full w-full bg-[#0c0c0c] text-[#cccccc] font-['Consolas','Lucida_Console','Monaco',monospace] text-sm p-2 overflow-y-auto select-text"
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
    >
        {lines.map((line, idx) => (
            <div key={idx} className="mb-1 whitespace-pre-wrap break-all leading-snug">
                {line.content}
            </div>
        ))}
        <div className="flex items-center">
            <span className="flex-shrink-0 mr-0.5">C:\Users\Keshav&gt;</span>
            <input 
                ref={inputRef}
                type="text" 
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-[#cccccc] caret-[#cccccc] p-0 font-inherit"
                autoComplete="off"
                autoFocus
                spellCheck={false}
            />
        </div>
    </div>
  );
};