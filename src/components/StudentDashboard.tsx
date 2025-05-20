import React, { useState } from 'react';
import { GraduationCap, Calculator, BookOpen, BrainCircuit, ArrowRight } from 'lucide-react';
import { CommercialDiscount } from './CommercialDiscount';
import { RationalDiscount } from './RationalDiscount';
import { Agios } from './Agios';
import { CourseViewer } from './CourseViewer';
import { Quiz } from './Quiz';

// ------------------- Types --------------------
interface Chapter {
  title: string;
  topics: string[];
  pdfUrl: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  objectives: string[];
  chapters: Chapter[];
}

interface CalculatorItem {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  component: React.ComponentType;
}

interface QuizTopic {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: string;
}

// ------------------- Données --------------------
const courses: Course[] = [
  {
    id: 1,
    title: "Intérêts Simples",
    description: "Comprendre et calculer les intérêts simples en finance",
    image: "https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "2 heures",
    level: "Débutant",
    objectives: [
      "Comprendre le concept d'intérêt simple",
      "Maîtriser les formules de calcul",
      "Appliquer les concepts à des cas pratiques"
    ],
    chapters: [
      {
        title: "Introduction aux intérêts simples",
        topics: ["Définition", "Formules de base", "Cas d'utilisation"],
        pdfUrl: "#"
      },
      {
        title: "Calculs pratiques",
        topics: ["Exercices guidés", "Cas réels", "Astuces de calcul"],
        pdfUrl: "#"
      }
    ]
  },
  {
    id: 2,
    title: "Escompte Commercial",
    description: "Maîtriser les calculs d'escompte commercial",
    image: "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "3 heures",
    level: "Intermédiaire",
    objectives: [
      "Comprendre le principe de l'escompte commercial",
      "Calculer les différents types d'escompte",
      "Analyser les impacts financiers"
    ],
    chapters: [
      {
        title: "Fondamentaux de l'escompte",
        topics: ["Définition", "Types d'escompte", "Applications"],
        pdfUrl: "#"
      },
      {
        title: "Calculs avancés",
        topics: ["Méthodes de calcul", "Études de cas", "Optimisation"],
        pdfUrl: "#"
      }
    ]
  }
];

const calculators: CalculatorItem[] = [
  {
    id: 'commercial',
    title: "Escompte Commercial",
    description: "Calculez l'escompte commercial et la valeur actuelle",
    icon: <Calculator className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    component: CommercialDiscount
  },
  {
    id: 'rational',
    title: "Escompte Rationnel",
    description: "Déterminez l'escompte rationnel et la valeur actuelle",
    icon: <Calculator className="w-6 h-6" />,
    color: "from-purple-500 to-purple-600",
    component: RationalDiscount
  },
  {
    id: 'agios',
    title: "Agios",
    description: "Calculez les agios et le coût total",
    icon: <Calculator className="w-6 h-6" />,
    color: "from-green-500 to-green-600",
    component: Agios
  }
];

const quizTopics: QuizTopic[] = [
  {
    id: 'simple-interest',
    title: "Intérêts Simples",
    description: "Testez vos connaissances sur les intérêts simples",
    questions: 5,
    duration: "10 min",
  },
  {
    id: 'commercial-discount',
    title: "Escompte Commercial",
    description: "Évaluez votre maîtrise de l'escompte commercial",
    questions: 5,
    duration: "10 min",
  }
];

// ------------------- Composant principal --------------------
export function StudentDashboard() {
  const [selectedView, setSelectedView] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setSelectedView('course');
  };

  const handleCalculatorClick = (calculatorId: string) => {
    setSelectedCalculator(calculatorId);
    setSelectedView('calculator');
  };

  const handleQuizClick = (quizId: string) => {
    setSelectedQuiz(quizId);
    setSelectedView('quiz');
  };

  const handleBack = () => {
    setSelectedView('dashboard');
    setSelectedCourse(null);
    setSelectedCalculator(null);
    setSelectedQuiz(null);
  };

  if (selectedView === 'course' && selectedCourse) {
    return <CourseViewer course={selectedCourse} onBack={handleBack} />;
  }

  if (selectedView === 'calculator' && selectedCalculator) {
    const CalculatorComponent = calculators.find(c => c.id === selectedCalculator)?.component;
    if (CalculatorComponent) {
      return (
        <div className="space-y-4">
          <button
            onClick={handleBack}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Retour au tableau de bord
          </button>
          <CalculatorComponent />
        </div>
      );
    }
  }

  if (selectedView === 'quiz' && selectedQuiz) {
    return (
      <div className="space-y-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Retour au tableau de bord
        </button>
        <Quiz topic={selectedQuiz} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cours Section */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cours Disponibles</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => (
            <div key={course.id} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-gray-200 text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">{course.duration}</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">{course.level}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <button 
                  onClick={() => handleCourseClick(course)}
                  className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  Commencer le cours
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Calculateurs Section */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calculateurs Financiers</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {calculators.map(calc => (
            <div key={calc.id} className="relative group overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300">
              <div className="p-6 bg-gradient-to-br dark:from-gray-700 dark:to-gray-600 from-gray-50 to-gray-100 h-full">
                <div className={`p-3 bg-gradient-to-br ${calc.color} rounded-lg w-fit mb-4`}>
                  {calc.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{calc.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{calc.description}</p>
                <button 
                  onClick={() => handleCalculatorClick(calc.id)}
                  className="mt-4 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300 flex items-center gap-2"
                >
                  Ouvrir le calculateur
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz Section */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz par Thème</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizTopics.map(topic => (
            <div key={topic.id} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{topic.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{topic.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{topic.questions} questions</span>
                <span>{topic.duration}</span>
              </div>
              <button 
                onClick={() => handleQuizClick(topic.id)}
                className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center gap-2"
              >
                Commencer le quiz
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
