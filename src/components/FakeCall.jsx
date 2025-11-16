// FakeCall.jsx
import React, { useState, useRef, useEffect } from "react";

export default function FakeCall() {
  const [isRinging, setIsRinging] = useState(true);
  const [callActive, setCallActive] = useState(false);
  const [callTimer, setCallTimer] = useState(0);

  // Selected ringtone + voice
  const [selectedRingtone, setSelectedRingtone] = useState("tone1");
  const [selectedVoice, setSelectedVoice] = useState("voice1");

  // Ringtone list
  const ringtoneOptions = [
    { id: "tone1", label: "Classic Phone", src: "/ringtones/phone.mp3.wav" }
  ];

  // Voice list
  const voiceOptions = [
    { id: "voice1", label: "Female Voice", src: "/voice/female.mp3" },
    { id: "voice2", label: "Male Voice", src: "/voice/male.mp3" },
    { id: "voice3", label: "Police Siren", src: "/voice/police.mp3" }
  ];

  const ringtoneRef = useRef(null);
  const voiceRef = useRef(null);

  // Format time
  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Play ringtone on start
  useEffect(() => {
    if (isRinging && ringtoneRef.current) {
      const tone = ringtoneOptions.find((r) => r.id === selectedRingtone);
      ringtoneRef.current.src = tone.src;
      ringtoneRef.current.loop = true;
      ringtoneRef.current.play().catch(() => {});
    }
    return () => {
      if (ringtoneRef.current) {
        ringtoneRef.current.pause();
        ringtoneRef.current.currentTime = 0;
      }
    };
  }, [isRinging, selectedRingtone]);

  // Call timer
  useEffect(() => {
    let t;
    if (callActive) {
      t = setInterval(() => setCallTimer((s) => s + 1), 1000);
    }
    return () => clearInterval(t);
  }, [callActive]);

  // When call is answered → stop ringtone, play voice
  useEffect(() => {
    if (callActive) {
      const voice = voiceOptions.find((v) => v.id === selectedVoice);
      if (voiceRef.current) {
        voiceRef.current.src = voice.src;
        setTimeout(() => {
          voiceRef.current.play().catch(() => {});
        }, 300);
      }
    }
    return () => {
      if (voiceRef.current) {
        voiceRef.current.pause();
        voiceRef.current.currentTime = 0;
      }
    };
  }, [callActive, selectedVoice]);

  const answerCall = () => {
    setIsRinging(false);
    setCallActive(true);
    setCallTimer(0);

    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
  };

  const endCall = () => {
    setCallActive(false);

    if (voiceRef.current) {
      voiceRef.current.pause();
      voiceRef.current.currentTime = 0;
    }
  };

  return (
    <div style={styles.page}>
      {/* Hidden audio */}
      <audio ref={ringtoneRef} preload="auto" />
      <audio ref={voiceRef} preload="auto" />

      <div style={styles.card}>
        {/* Incoming call UI */}
        {isRinging && (
          <div style={styles.centerBox}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/599/599305.png"
              alt="caller"
              style={styles.photo}
            />
            <h2 style={styles.white}>Unknown Caller</h2>
            <p style={styles.subText}>Incoming call...</p>

            <button style={styles.answerBtn} onClick={answerCall}>
              Answer
            </button>
          </div>
        )}

        {/* Active call UI */}
        {!isRinging && callActive && (
          <div style={styles.centerBox}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/599/599305.png"
              alt="caller"
              style={styles.photoSmall}
            />
            <h2 style={styles.white}>Unknown Caller</h2>
            <p style={styles.subText}>{formatTime(callTimer)}</p>

            <button style={styles.endBtn} onClick={endCall}>
              End Call
            </button>
          </div>
        )}

        {/* Ended call */}
        {!isRinging && !callActive && (
          <div style={styles.centerBox}>
            <h2 style={styles.white}>Call Ended</h2>
          </div>
        )}

        {/* Settings */}
        <div style={styles.settings}>
          <h3 style={styles.white}>Settings</h3>

          <label style={styles.label}>Select Ringtone</label>
          <select
            style={styles.select}
            value={selectedRingtone}
            onChange={(e) => setSelectedRingtone(e.target.value)}
          >
            {ringtoneOptions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>

          <label style={styles.label}>Select Voice</label>
          <select
            style={styles.select}
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            {voiceOptions.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// ------------------ Inline CSS ------------------
const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  card: {
    background: "#111",
    width: "100%",
    maxWidth: 380,
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 0 15px rgba(255,255,255,0.05)",
    textAlign: "center"
  },
  centerBox: {
    textAlign: "center",
    marginBottom: 20
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    marginBottom: 15
  },
  photoSmall: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    marginBottom: 10
  },
  white: { color: "#fff", margin: 0 },
  subText: { color: "#bbb", marginTop: 6, marginBottom: 20 },

  answerBtn: {
    width: "100%",
    padding: "12px 0",
    background: "#21d66c",
    color: "#000",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer"
  },

  endBtn: {
    width: "100%",
    padding: "12px 0",
    background: "#ff3b30",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer"
  },

  settings: {
    marginTop: 25,
    background: "#1a1a1a",
    padding: 15,
    borderRadius: 8
  },
  label: {
    color: "#bbb",
    display: "block",
    marginTop: 10,
    marginBottom: 5
  },
  select: {
    width: "100%",
    padding: 8,
    borderRadius: 6,
    border: "1px solid #444",
    background: "#000",
    color: "#fff"
  }
};
