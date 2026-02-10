import { Howl, Howler } from 'howler';
import { SoundAssets, SoundName } from '../assets/sounds';

class SoundService {
  private sounds: Map<SoundName, Howl> = new Map();
  private enabled: boolean = true;

  constructor() {
    // Increase pool size to handle more concurrent sounds if needed
    Howler.html5PoolSize = 20;
    this.preloadSounds();
  }

  private preloadSounds() {
    Object.entries(SoundAssets).forEach(([key, url]) => {
      this.sounds.set(key as SoundName, new Howl({
        src: [url],
        volume: 0.4, // Keep UI sounds subtle
        preload: true,
      }));
    });
  }

  public play(name: SoundName) {
    if (!this.enabled) return;
    
    const sound = this.sounds.get(name);
    if (sound) {
      // Create a fresh ID for overlap or just play
      sound.play();
    }
  }

  public setVolume(volume: number) {
    Howler.volume(volume);
  }
  
  public toggleMute() {
      this.enabled = !this.enabled;
      return this.enabled;
  }
}

export const soundService = new SoundService();