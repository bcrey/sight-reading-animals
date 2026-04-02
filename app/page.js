"use client";

import { useState, useCallback, useEffect } from "react";

const SIGHT_WORDS = [
  "the", "and", "a", "to", "said", "in", "he", "I", "of", "it",
  "was", "you", "they", "on", "she", "is", "for", "at", "his", "but",
  "that", "with", "all", "we", "can", "up", "had", "my", "her", "what",
  "there", "out", "this", "have", "from", "go", "one", "like", "see", "look",
  "are", "do", "not", "were", "get", "has", "him", "no", "come", "make",
  "been", "will", "into", "who", "then", "did", "could", "time", "very", "your",
  "big", "red", "run", "play", "jump", "help", "too", "little", "down", "here"
];

const ANIMALS = [
  { emoji: "🐶", name: "Puppy!", bg: "#FFF3E0" },
  { emoji: "🐱", name: "Kitty!", bg: "#FCE4EC" },
  { emoji: "🐰", name: "Bunny!", bg: "#F3E5F5" },
  { emoji: "🐼", name: "Panda!", bg: "#E8F5E9" },
  { emoji: "🦊", name: "Fox!", bg: "#FFF8E1" },
  { emoji: "🐸", name: "Froggy!", bg: "#E0F7FA" },
  { emoji: "🦋", name: "Butterfly!", bg: "#EDE7F6" },
  { emoji: "🐧", name: "Penguin!", bg: "#E3F2FD" },
  { emoji: "🦄", name: "Unicorn!", bg: "#FCE4EC" },
  { emoji: "🐢", name: "Turtle!", bg: "#E8F5E9" },
  { emoji: "🐝", name: "Bee!", bg: "#FFFDE7" },
  { emoji: "🦉", name: "Owl!", bg: "#EFEBE9" },
  { emoji: "🐬", name: "Dolphin!", bg: "#E0F7FA" },
  { emoji: "🦁", name: "Lion!", bg: "#FFF3E0" },
  { emoji: "🐨", name: "Koala!", bg: "#ECEFF1" },
  { emoji: "🦜", name: "Parrot!", bg: "#E8F5E9" },
  { emoji: "🐙", name: "Octopus!", bg: "#F3E5F5" },
  { emoji: "🦀", name: "Crab!", bg: "#FFEBEE" },
  { emoji: "🐞", name: "Ladybug!", bg: "#FFEBEE" },
  { emoji: "🦊", name: "Fox!", bg: "#FFF8E1" },
];

const PRAISE = [
  "Amazing!", "Great job!", "You did it!", "Wonderful!",
  "Superstar!", "Way to go!", "Fantastic!", "Awesome!",
  "Brilliant!", "You rock!", "So smart!", "Hooray!"
];

const WORD_COLORS = [
  "#E53935", "#8E24AA", "#1E88E5", "#00897B",
  "#F4511E", "#6D4C41", "#5E35B1", "#00ACC1",
  "#D81B60", "#3949AB", "#039BE5", "#7CB342"
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Stars({ count }) {
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
      {Array.from({ length: Math.min(count, 30) }).map((_, i) => (
        <span key={i} style={{
          fontSize: 20,
          animation: "starPop 0.4s ease-out forwards",
          animationDelay: `${i * 0.04}s`,
          opacity: 0,
        }}>⭐</span>
      ))}
    </div>
  );
}

function Sparkles() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: 8 + Math.random() * 12,
          height: 8 + Math.random() * 12,
          borderRadius: "50%",
          background: ["#FFD54F", "#FF8A80", "#B388FF", "#84FFFF", "#CCFF90", "#FF80AB"][Math.floor(Math.random() * 6)],
          animation: `sparkle ${1 + Math.random() * 1.5}s ease-out forwards`,
          animationDelay: `${Math.random() * 0.5}s`,
          opacity: 0,
        }} />
      ))}
    </div>
  );
}

export default function SightWordsGame() {
  const [mounted, setMounted] = useState(false);
  const [words, setWords] = useState(SIGHT_WORDS);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState("reading");
  const [animal, setAnimal] = useState(null);
  const [praise, setPraise] = useState("");
  const [wordColor, setWordColor] = useState(WORD_COLORS[0]);
  const [bounceKey, setBounceKey] = useState(0);

  useEffect(() => {
    setWords(shuffle(SIGHT_WORDS));
    setMounted(true);
  }, []);

  const currentWord = words[index];

  const pickAnimal = useCallback(() => {
    return ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  }, []);

  const handleCorrect = () => {
    const a = pickAnimal();
    const p = PRAISE[Math.floor(Math.random() * PRAISE.length)];
    setAnimal(a);
    setPraise(p);
    setScore(s => s + 1);
    setPhase("reveal");
  };

  const handleNext = () => {
    if (index + 1 >= words.length) {
      setPhase("done");
      return;
    }
    setIndex(i => i + 1);
    setWordColor(WORD_COLORS[Math.floor(Math.random() * WORD_COLORS.length)]);
    setBounceKey(k => k + 1);
    setPhase("reading");
  };

  const handleRestart = () => {
    setWords(shuffle(SIGHT_WORDS));
    setIndex(0);
    setScore(0);
    setPhase("reading");
    setBounceKey(k => k + 1);
  };

  if (!mounted) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(170deg, #FFF9C4 0%, #F8BBD0 40%, #B3E5FC 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{ fontSize: 48 }}>📚</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #FFF9C4 0%, #F8BBD0 40%, #B3E5FC 100%)",
      fontFamily: "'Fredoka', 'Nunito', 'Quicksand', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px 16px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0.3) rotate(-8deg); opacity: 0; }
          50% { transform: scale(1.15) rotate(3deg); opacity: 1; }
          70% { transform: scale(0.9) rotate(-1deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-6deg); }
          75% { transform: rotate(6deg); }
        }
        @keyframes sparkle {
          0% { transform: scale(0) translateY(0); opacity: 1; }
          50% { opacity: 1; }
          100% { transform: scale(1.5) translateY(-80px); opacity: 0; }
        }
        @keyframes starPop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes animalBounce {
          0% { transform: scale(0) rotate(-20deg); }
          40% { transform: scale(1.3) rotate(10deg); }
          60% { transform: scale(0.85) rotate(-5deg); }
          80% { transform: scale(1.1) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes slideUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes bgBubble {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-30px) scale(1.1); opacity: 0.25; }
        }
      `}</style>

      {/* Background bubbles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "fixed",
          width: 60 + i * 40,
          height: 60 + i * 40,
          borderRadius: "50%",
          background: ["#FFE082", "#F48FB1", "#81D4FA", "#CE93D8", "#A5D6A7", "#FFAB91"][i],
          left: `${10 + i * 15}%`,
          top: `${20 + (i % 3) * 25}%`,
          animation: `bgBubble ${4 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.7}s`,
          pointerEvents: "none",
          zIndex: 0,
        }} />
      ))}

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 500, textAlign: "center" }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#4A148C",
          margin: "0 0 4px 0",
          textShadow: "2px 2px 0 rgba(255,255,255,0.7)",
          letterSpacing: -0.5,
        }}>
          📚 Word Reader
        </h1>
        <p style={{
          fontSize: 15,
          color: "#7B1FA2",
          margin: "0 0 16px 0",
          fontWeight: 500,
          opacity: 0.8,
        }}>
          Read the word out loud, then tap the green button!
        </p>

        {/* Score bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginBottom: 20,
        }}>
          <div style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: 50,
            padding: "8px 20px",
            fontWeight: 600,
            fontSize: 16,
            color: "#E65100",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}>
            ⭐ {score} words
          </div>
          <div style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: 50,
            padding: "8px 20px",
            fontWeight: 600,
            fontSize: 14,
            color: "#5E35B1",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}>
            {index + 1} / {words.length}
          </div>
        </div>

        {/* Main card */}
        <div style={{
          background: phase === "reveal" && animal ? animal.bg : "rgba(255,255,255,0.92)",
          borderRadius: 32,
          padding: "36px 24px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)",
          position: "relative",
          minHeight: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.5s ease",
        }}>
          {phase === "reading" && (
            <>
              <div
                key={bounceKey}
                style={{
                  fontSize: 90,
                  fontWeight: 700,
                  color: wordColor,
                  animation: "bounceIn 0.6s ease-out",
                  textShadow: `3px 3px 0 ${wordColor}22`,
                  letterSpacing: 2,
                  marginBottom: 36,
                  lineHeight: 1,
                }}
              >
                {currentWord}
              </div>

              <button
                onClick={handleCorrect}
                style={{
                  background: "linear-gradient(135deg, #43A047, #66BB6A)",
                  border: "none",
                  borderRadius: 60,
                  padding: "20px 56px",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "white",
                  cursor: "pointer",
                  boxShadow: "0 6px 0 #2E7D32, 0 8px 24px rgba(46,125,50,0.3)",
                  fontFamily: "inherit",
                  animation: "pulse 2s ease-in-out infinite",
                  transition: "transform 0.1s",
                  position: "relative",
                }}
                onMouseDown={e => e.currentTarget.style.transform = "translateY(4px)"}
                onMouseUp={e => e.currentTarget.style.transform = "translateY(0)"}
                onTouchStart={e => e.currentTarget.style.transform = "translateY(4px)"}
                onTouchEnd={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                ✅ I Read It!
              </button>
            </>
          )}

          {phase === "reveal" && animal && (
            <>
              <Sparkles />
              <div style={{
                fontSize: 110,
                animation: "animalBounce 0.8s ease-out",
                marginBottom: 8,
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
              }}>
                {animal.emoji}
              </div>
              <div style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#4A148C",
                animation: "slideUp 0.5s ease-out 0.3s both",
                marginBottom: 4,
              }}>
                {animal.name}
              </div>
              <div style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#E65100",
                animation: "slideUp 0.5s ease-out 0.45s both",
                marginBottom: 28,
              }}>
                {praise}
              </div>

              <button
                onClick={handleNext}
                style={{
                  background: "linear-gradient(135deg, #7C4DFF, #B388FF)",
                  border: "none",
                  borderRadius: 60,
                  padding: "16px 48px",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "white",
                  cursor: "pointer",
                  boxShadow: "0 5px 0 #5E35B1, 0 8px 24px rgba(94,53,177,0.3)",
                  fontFamily: "inherit",
                  animation: "slideUp 0.5s ease-out 0.6s both",
                  transition: "transform 0.1s",
                }}
                onMouseDown={e => e.currentTarget.style.transform = "translateY(3px)"}
                onMouseUp={e => e.currentTarget.style.transform = "translateY(0)"}
                onTouchStart={e => e.currentTarget.style.transform = "translateY(3px)"}
                onTouchEnd={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                Next Word ➡️
              </button>
            </>
          )}

          {phase === "done" && (
            <>
              <div style={{
                fontSize: 60,
                animation: "wiggle 1s ease-in-out infinite",
                marginBottom: 12,
              }}>🎉</div>
              <div style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#4A148C",
                marginBottom: 8,
              }}>
                All Done!
              </div>
              <div style={{
                fontSize: 18,
                color: "#7B1FA2",
                marginBottom: 8,
                fontWeight: 500,
              }}>
                You read {score} words!
              </div>
              <Stars count={score} />
              <button
                onClick={handleRestart}
                style={{
                  background: "linear-gradient(135deg, #FF7043, #FF8A65)",
                  border: "none",
                  borderRadius: 60,
                  padding: "16px 48px",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "white",
                  cursor: "pointer",
                  boxShadow: "0 5px 0 #D84315, 0 8px 24px rgba(216,67,21,0.3)",
                  fontFamily: "inherit",
                  marginTop: 20,
                  transition: "transform 0.1s",
                }}
                onMouseDown={e => e.currentTarget.style.transform = "translateY(3px)"}
                onMouseUp={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                Play Again! 🔄
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
