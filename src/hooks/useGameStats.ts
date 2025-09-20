import { useState, useEffect, useCallback } from 'react';
import type { GameStats } from '../types/game';

export const useGameStats = () => {
  const [stats, setStats] = useState<GameStats>({
    wpm: 0,
    accuracy: 0,
    totalWords: 0,
    correctWords: 0,
    incorrectWords: 0,
    timeElapsed: 0,
  });

  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentInput, setCurrentInput] = useState('');
  const [targetText, setTargetText] = useState('');
  const [isGameActive, setIsGameActive] = useState(false);
  const [mistakes, setMistakes] = useState<string[]>([]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGameActive && startTime) {
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setStats(prev => ({ ...prev, timeElapsed: elapsed }));
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive, startTime]);

  const startGame = useCallback((text: string) => {
    setTargetText(text);
    setCurrentInput('');
    setStartTime(Date.now());
    setIsGameActive(true);
    setMistakes([]);
    setStats({
      wpm: 0,
      accuracy: 0,
      totalWords: 0,
      correctWords: 0,
      incorrectWords: 0,
      timeElapsed: 0,
    });
  }, []);

  const updateInput = useCallback((input: string) => {
    if (!isGameActive) return;

    setCurrentInput(input);
    
    // Calculate accuracy and WPM
    const correctChars = input.split('').filter((char, index) => 
      index < targetText.length && char === targetText[index]
    ).length;
    
    const accuracy = input.length > 0 ? (correctChars / input.length) * 100 : 100;
    const timeInMinutes = stats.timeElapsed / 60;
    const wordsTyped = input.length / 5; // Standard: 5 characters = 1 word
    const wpm = timeInMinutes > 0 ? Math.round(wordsTyped / timeInMinutes) : 0;

    // Check for mistakes
    if (input.length > 0 && input[input.length - 1] !== targetText[input.length - 1]) {
      const wrongChar = targetText[input.length - 1];
      if (wrongChar && !mistakes.includes(wrongChar)) {
        setMistakes(prev => [...prev, wrongChar]);
      }
    }

    setStats(prev => ({
      ...prev,
      wpm,
      accuracy: Math.round(accuracy),
      totalWords: Math.ceil(input.length / 5),
    }));

    // Check if game is complete
    if (input === targetText) {
      setIsGameActive(false);
      setStats(prev => ({
        ...prev,
        correctWords: prev.totalWords,
      }));
    }
  }, [isGameActive, targetText, stats.timeElapsed, mistakes]);

  const resetGame = useCallback(() => {
    setIsGameActive(false);
    setCurrentInput('');
    setStartTime(null);
    setTargetText('');
    setMistakes([]);
    setStats({
      wpm: 0,
      accuracy: 0,
      totalWords: 0,
      correctWords: 0,
      incorrectWords: 0,
      timeElapsed: 0,
    });
  }, []);

  return {
    stats,
    currentInput,
    targetText,
    isGameActive,
    mistakes,
    startGame,
    updateInput,
    resetGame,
  };
};