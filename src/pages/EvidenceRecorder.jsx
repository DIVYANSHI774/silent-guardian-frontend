// src/pages/EvidenceRecorder.js
let mediaRecorder;
let chunks = [];

export function startEvidenceRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      chunks = [];

      mediaRecorder.ondataavailable = e => chunks.push(e.data);

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/mp3" });
        const formData = new FormData();
        formData.append("evidence", blob, "evidence.mp3");

        try {
          const res = await fetch("https://silent-guardian-backend.onrender.com/api/sos/uploadEvidence", {
            method: "POST",
            body: formData
          });
          const data = await res.json();
          console.log("Evidence uploaded:", data.fileUrl);

          // Save the uploaded URL to use in WhatsApp message
          localStorage.setItem("lastEvidenceUrl", data.fileUrl);
        } catch (err) {
          console.error("Evidence upload failed:", err);
        }
      };

      mediaRecorder.start();

      // Stop recording automatically after 10 seconds (adjustable)
      setTimeout(() => mediaRecorder.stop(), 10000);
    })
    .catch(err => console.error("Microphone access denied:", err));
}
