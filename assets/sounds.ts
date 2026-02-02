export const SoundAssets = {
  // Navigation Start (The classic click)
  click: 'https://raw.githubusercontent.com/kylepaulsen/Windows-7-Sounds/master/Windows%20Navigation%20Start.wav',
  
  // Window Open (Simulated with Hardware Insert for a techy open feel)
  open: 'https://raw.githubusercontent.com/kylepaulsen/Windows-7-Sounds/master/Windows%20Hardware%20Insert.wav',
  
  // Window Close (Simulated with Hardware Remove)
  close: 'https://raw.githubusercontent.com/kylepaulsen/Windows-7-Sounds/master/Windows%20Hardware%20Remove.wav',
  
  // Minimize
  minimize: 'https://raw.githubusercontent.com/kylepaulsen/Windows-7-Sounds/master/Windows%20Minimize.wav',
  
  // Startup (Logon)
  startup: 'https://raw.githubusercontent.com/kylepaulsen/Windows-7-Sounds/master/Windows%20Logon%20Sound.wav',
  
  // Error / Ding
  error: 'https://raw.githubusercontent.com/kylepaulsen/Windows-7-Sounds/master/Windows%20Ding.wav',
  
  // Exclamation
  exclamation: 'https://raw.githubusercontent.com/kylepaulsen/Windows-7-Sounds/master/Windows%20Exclamation.wav',
};

export type SoundName = keyof typeof SoundAssets;