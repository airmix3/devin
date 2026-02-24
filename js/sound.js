// Simple sound system using Web Audio API
const Sound = {
    audioCtx: null,
    enabled: true,

    init: function() {
        try {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            this.enabled = false;
        }
    },

    resume: function() {
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    },

    // Play a simple tone
    playTone: function(frequency, duration, type, volume) {
        if (!this.enabled || !this.audioCtx) return;
        type = type || 'square';
        volume = volume || 0.1;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
        gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
    },

    // Sound effects
    jump: function() {
        this.playTone(400, 0.1, 'square', 0.08);
        setTimeout(() => this.playTone(600, 0.1, 'square', 0.08), 50);
    },

    coin: function() {
        this.playTone(988, 0.08, 'square', 0.08);
        setTimeout(() => this.playTone(1319, 0.3, 'square', 0.08), 80);
    },

    stomp: function() {
        this.playTone(400, 0.08, 'square', 0.08);
        setTimeout(() => this.playTone(500, 0.15, 'square', 0.06), 60);
    },

    powerup: function() {
        const notes = [523, 659, 784, 1047];
        notes.forEach((note, i) => {
            setTimeout(() => this.playTone(note, 0.15, 'square', 0.08), i * 100);
        });
    },

    bump: function() {
        this.playTone(200, 0.1, 'triangle', 0.1);
    },

    breakBlock: function() {
        this.playTone(300, 0.05, 'square', 0.08);
        setTimeout(() => this.playTone(200, 0.05, 'square', 0.08), 30);
        setTimeout(() => this.playTone(100, 0.1, 'square', 0.06), 60);
    },

    die: function() {
        const notes = [500, 400, 350, 300, 250, 200];
        notes.forEach((note, i) => {
            setTimeout(() => this.playTone(note, 0.2, 'square', 0.08), i * 150);
        });
    },

    flagpole: function() {
        const notes = [523, 587, 659, 698, 784, 880, 988, 1047];
        notes.forEach((note, i) => {
            setTimeout(() => this.playTone(note, 0.15, 'square', 0.08), i * 80);
        });
    },

    oneUp: function() {
        const notes = [330, 392, 523, 392, 523, 698];
        notes.forEach((note, i) => {
            setTimeout(() => this.playTone(note, 0.1, 'square', 0.08), i * 80);
        });
    },
};
