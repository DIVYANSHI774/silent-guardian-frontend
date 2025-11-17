// EvidenceRecorder.js

export async function startEvidenceRecording() {
  try {
    // Ask for audio + video permissions
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // Create a recorder
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      // Auto-download evidence
      const a = document.createElement("a");
      a.href = url;
      a.download = "evidence_recording.webm";
      a.click();
    };

    recorder.start();

    // Stop after 60 seconds (1 min evidence)
    setTimeout(() => {
      recorder.stop();
      stream.getTracks().forEach((t) => t.stop());
    }, 60 * 1000);

    console.log("🎥 Evidence recording started for 60 seconds...");

  } catch (err) {
    console.error("Recording Failed:", err);
  }
}
