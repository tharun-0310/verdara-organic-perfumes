import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import fragrances from '../data/fragrances';

const questions = [
  {
    id: 'environment',
    question: 'Which environment feels most like you?',
    options: [
      { label: 'Forest', value: 'forest', fragrance: 0 },
      { label: 'Rose Garden', value: 'rose', fragrance: 1 },
      { label: 'Citrus Orchard', value: 'citrus', fragrance: 2 },
      { label: 'Ocean', value: 'ocean', fragrance: 3 },
      { label: 'Lavender Field', value: 'lavender', fragrance: 4 },
      { label: 'Warm Woods', value: 'woods', fragrance: 5 },
    ],
  },
  {
    id: 'intensity',
    question: 'What fragrance intensity do you prefer?',
    options: [
      { label: 'Fresh & Light', value: 'fresh' },
      { label: 'Soft & Delicate', value: 'soft' },
      { label: 'Balanced', value: 'balanced' },
      { label: 'Deep & Rich', value: 'deep' },
    ],
  },
  {
    id: 'occasion',
    question: 'When do you usually wear perfume?',
    options: [
      { label: 'Morning', value: 'morning' },
      { label: 'Work', value: 'work' },
      { label: 'Evening', value: 'evening' },
      { label: 'Special Occasions', value: 'special' },
    ],
  },
];

const variants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function ScentFinderSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const currentQ = questions[step];

  const handleAnswer = (option) => {
    const newAnswers = { ...answers, [currentQ.id]: option };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate result
      const envAnswer = newAnswers.environment;
      const envOption = questions[0].options.find((o) => o.value === envAnswer.value);
      const fragranceIndex = envOption?.fragrance ?? 0;
      setResult(fragrances[fragranceIndex]);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <section id="scent-finder" className="py-32 bg-verdara-forest overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="section-label text-verdara-gold mb-4">Personalised</p>
        <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] text-verdara-cream mb-16">
          Find Your Verdara.
        </h2>

        <AnimatePresence mode="wait">
          {result ? (
            /* ── Result ─────────────────────────────────────────── */
            <motion.div
              key="result"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <p className="section-label text-verdara-gold/60">Your Perfect Scent</p>

              {/* Bottle preview */}
              <div
                className="w-32 h-48 rounded flex items-end justify-center overflow-hidden mx-auto"
                style={{
                  background: `linear-gradient(160deg, ${result.envColor1}, ${result.envColor2})`,
                  boxShadow: `0 0 60px ${result.glowColor}40`,
                }}
                aria-hidden="true"
              >
                <div
                  className="w-20 h-32 rounded-t overflow-hidden animate-float"
                  style={{ background: result.glassTint, opacity: 0.85 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-3/4" style={{ background: result.liquidColor, opacity: 0.7 }} />
                </div>
              </div>

              <div>
                <h3 className="font-display text-4xl text-verdara-cream mb-3">{result.name}</h3>
                <p className="text-verdara-cream/60 font-body font-300 mb-8">{result.tagline}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/products/${result.slug}`} className="btn-primary">
                  Discover {result.name}
                </Link>
                <button onClick={reset} className="btn-outline border-verdara-cream/30">
                  Try Again
                </button>
              </div>
            </motion.div>
          ) : (
            /* ── Question ──────────────────────────────────────── */
            <motion.div
              key={`question-${step}`}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Progress */}
              <div className="flex justify-center gap-2 mb-10">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className="h-px transition-all duration-400"
                    style={{
                      width: i === step ? '32px' : '16px',
                      background: i <= step ? '#c9a84c' : '#c9a84c30',
                    }}
                  />
                ))}
              </div>

              <p className="section-label text-verdara-gold/60 mb-4">
                {step + 1} / {questions.length}
              </p>
              <h3 className="font-display text-[clamp(1.8rem,3vw,3rem)] text-verdara-cream mb-10">
                {currentQ.question}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {currentQ.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option)}
                    className="border border-verdara-cream/10 hover:border-verdara-gold/50 px-5 py-4 text-verdara-cream/70 hover:text-verdara-cream text-sm font-body font-300 transition-all duration-300 hover:bg-verdara-gold/5"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
