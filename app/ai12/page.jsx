"use client";

import React, { useState, useEffect } from "react";

export default function SpeechTest() {
  const [text, setText] = useState("");
  const [spoken, setSpoken] = useState("");

  const speak = (text) => {
    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 1;

    const voices = synth.getVoices();
    if (voices.length > 0) {
      utterance.voice = voices.find((v) => v.lang === "en-US") || voices[0];
      synth.speak(utterance);
    } else {
      // Retry once voices are loaded
      setTimeout(() => {
        const updatedVoices = synth.getVoices();
        utterance.voice =
          updatedVoices.find((v) => v.lang === "en-US") || updatedVoices[0];
        synth.speak(utterance);
      }, 200);
    }
  };

  useEffect(() => {
    // Load voices once
    if (typeof window !== "undefined") {
      window.speechSynthesis.onvoiceschanged = () => {
        console.log("Voices loaded:", window.speechSynthesis.getVoices());
      };
    }
  }, []);

  const handleClick = () => {
    const toSpeak = "Your AI assistant is now speaking!";
    setSpoken(toSpeak);
    speak(toSpeak);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🔊 Speech Synthesis Test</h2>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleClick}
      >
        Speak
      </button>

      {spoken && <p className="mt-4 text-gray-700">Speaking: {spoken}</p>}
    </div>
  );
}
