import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RefreshCw, Trophy, Brain } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  topic: string;
}

const quizQuestions: Record<string, Question[]> = {
  'simple-interest': [
    {
      id: 1,
      question: "Si un capital de 1000€ est placé à un taux d'intérêt simple de 5% pendant 2 ans, quel sera l'intérêt total ?",
      options: ["50€", "100€", "150€", "200€"],
      correctAnswer: 1,
      explanation: "Formule: I = C × t × n, où I = intérêt, C = capital, t = taux, n = nombre d'années. Donc: 1000 × 0.05 × 2 = 100€"
    },
    {
      id: 2,
      question: "Quel est le capital final après 3 ans si on place 2000€ à 4% d'intérêt simple ?",
      options: ["2080€", "2160€", "2240€", "2400€"],
      correctAnswer: 2,
      explanation: "Capital final = Capital initial + Intérêts. Intérêts = 2000 × 0.04 × 3 = 240€. Donc: 2000 + 240 = 2240€"
    },
    {
      id: 3,
      question: "Pour obtenir 300€ d'intérêts sur 2 ans à 6%, quel capital faut-il placer ?",
      options: ["2000€", "2500€", "3000€", "2800€"],
      correctAnswer: 1,
      explanation: "300 = C × 0.06 × 2, donc C = 300 / (0.06 × 2) = 2500€"
    },
    {
      id: 4,
      question: "Quel taux d'intérêt simple donnera 150€ d'intérêts sur un capital de 3000€ en 1 an ?",
      options: ["3%", "4%", "5%", "6%"],
      correctAnswer: 2,
      explanation: "150 = 3000 × t × 1, donc t = 150 / 3000 = 0.05 = 5%"
    },
    {
      id: 5,
      question: "En combien d'années un capital de 4000€ placé à 3% rapportera 600€ d'intérêts ?",
      options: ["3 ans", "4 ans", "5 ans", "6 ans"],
      correctAnswer: 2,
      explanation: "600 = 4000 × 0.03 × n, donc n = 600 / (4000 × 0.03) = 5 ans"
    }
  ],
  'commercial-discount': [
    {
      id: 1,
      question: "Quel est l'escompte commercial sur un effet de 5000€ à 6% sur 90 jours ?",
      options: ["45€", "75€", "85€", "95€"],
      correctAnswer: 1,
      explanation: "Escompte = (Nominal × taux × jours) / 360. Donc: (5000 × 0.06 × 90) / 360 = 75€"
    },
    {
      id: 2,
      question: "Quelle est la valeur actuelle commerciale d'un effet de 3000€ escompté à 4% sur 180 jours ?",
      options: ["2880€", "2820€", "2760€", "2700€"],
      correctAnswer: 1,
      explanation: "Escompte = (3000 × 0.04 × 180) / 360 = 120€. Valeur actuelle = 3000 - 120 = 2880€"
    },
    {
      id: 3,
      question: "Pour un effet de 4000€ sur 120 jours, quel taux donne un escompte de 80€ ?",
      options: ["3%", "4%", "5%", "6%"],
      correctAnswer: 2,
      explanation: "80 = (4000 × t × 120) / 360, donc t = (80 × 360) / (4000 × 120) = 0.06 = 6%"
    },
    {
      id: 4,
      question: "Quel est le taux effectif global (TEG) pour un escompte de 50€ sur un nominal de 2000€ sur 60 jours ?",
      options: ["7.5%", "8.5%", "9.5%", "10.5%"],
      correctAnswer: 1,
      explanation: "TEG = (Escompte × 360) / (Nominal × jours) = (50 × 360) / (2000 × 60) = 0.085 = 8.5%"
    },
    {
      id: 5,
      question: "Pour une valeur nominale de 6000€ et un taux de 5%, en combien de jours l'escompte sera de 100€ ?",
      options: ["120 jours", "144 jours", "168 jours", "180 jours"],
      correctAnswer: 0,
      explanation: "100 = (6000 × 0.05 × n) / 360, donc n = (100 × 360) / (6000 × 0.05) = 120 jours"
    }
  ]
};

export function Quiz({ topic }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const questions = quizQuestions[topic] || [];

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsAnswerCorrect(correct);
    if (correct) setScore(score + 1);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      setShowConfetti(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setShowExplanation(false);
    setQuizComplete(false);
    setShowConfetti(false);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (quizComplete) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 transform hover:shadow-xl">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz Terminé !
          </h2>
          <p className="text-lg mb-6">
            Votre score : <span className={`font-bold ${getScoreColor()}`}>{score}</span> sur {questions.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000 ease-out"
              style={{ width: `${(score / questions.length) * 100}%` }}
            ></div>
          </div>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center gap-2 mx-auto hover:scale-105 transform transition-transform duration-200"
          >
            <RefreshCw className="w-5 h-5 animate-spin" />
            Recommencer le quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Question {currentQuestion + 1} sur {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Score: {score}/{questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {questions[currentQuestion].question}
          </h3>
        </div>

        <div className="grid gap-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 text-left rounded-lg transition-all duration-300 transform hover:scale-102 ${
                selectedAnswer === null
                  ? 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-md'
                  : selectedAnswer === index
                    ? isAnswerCorrect
                      ? 'bg-green-100 dark:bg-green-900 shadow-lg'
                      : 'bg-red-100 dark:bg-red-900 shadow-lg'
                    : index === questions[currentQuestion].correctAnswer && selectedAnswer !== null
                      ? 'bg-green-100 dark:bg-green-900 shadow-lg'
                      : 'bg-white dark:bg-gray-700'
              } border-2 ${
                selectedAnswer === null
                  ? 'border-transparent hover:border-blue-200 dark:hover:border-blue-700'
                  : selectedAnswer === index
                    ? isAnswerCorrect
                      ? 'border-green-500'
                      : 'border-red-500'
                    : index === questions[currentQuestion].correctAnswer && selectedAnswer !== null
                      ? 'border-green-500'
                      : 'border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`${
                  selectedAnswer === index
                    ? isAnswerCorrect
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                    : 'text-gray-700 dark:text-gray-300'
                } font-medium`}>
                  {option}
                </span>
                {selectedAnswer === index && (
                  isAnswerCorrect
                    ? <CheckCircle className="w-5 h-5 text-green-500 animate-bounce" />
                    : <XCircle className="w-5 h-5 text-red-500 animate-bounce" />
                )}
                {index === questions[currentQuestion].correctAnswer && selectedAnswer !== null && selectedAnswer !== index && (
                  <CheckCircle className="w-5 h-5 text-green-500 animate-bounce" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className={`p-6 rounded-lg transform transition-all duration-300 ${
            isAnswerCorrect
              ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200'
              : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200'
          }`}>
            <div className="flex items-start gap-3">
              <Brain className={`w-6 h-6 ${isAnswerCorrect ? 'text-green-500' : 'text-red-500'} mt-1`} />
              <div>
                <h4 className="font-medium mb-2">Explication :</h4>
                <p className="text-sm">{questions[currentQuestion].explanation}</p>
              </div>
            </div>
          </div>
        )}

        {selectedAnswer !== null && (
          <button
            onClick={handleNextQuestion}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 transform"
          >
            {currentQuestion < questions.length - 1 ? (
              <>
                Question suivante
                <ArrowRight className="w-5 h-5 animate-pulse" />
              </>
            ) : (
              <>
                Terminer le quiz
                <Trophy className="w-5 h-5 animate-bounce" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}