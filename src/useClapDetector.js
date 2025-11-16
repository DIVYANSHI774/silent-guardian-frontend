// src/useClapDetector.js
import { useEffect } from "react";

export default function useClapDetector(onClapDetected) {
  useEffect(() => {
    let audioContext;
    let analyser;
    let dataArray;

    async function startAudio() {
      try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        source.connect(analyser);

        const detectSound = () => {
          analyser.getByteFrequencyData(dataArray);
          const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

          if (volume > 160) {
            console.log("👏 Clap or loud sound detected!");
            onClapDetected && onClapDetected();
          }

          requestAnimationFrame(detectSound);
        };

        detectSound();
      } catch (err) {
        console.error("🎤 Microphone access error:", err);
      }
    }

    startAudio();

    return () => {
      if (audioContext) audioContext.close();
    };
  }, [onClapDetected]);
}
