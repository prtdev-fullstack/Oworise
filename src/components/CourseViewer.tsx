import React from 'react';
import { ArrowLeft, Clock, Target, BookOpen, CheckCircle, FileText } from 'lucide-react';

interface Chapter {
  title: string;
  topics: string[];
  pdfUrl: string;
}

interface Course {
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  objectives: string[];
  chapters: Chapter[];
}

interface CourseViewerProps {
  course: Course;
  onBack: () => void;
}

export function CourseViewer({ course, onBack }: CourseViewerProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux cours
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              {course.duration}
            </span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
              {course.level}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-8">{course.description}</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="h-6 w-6 text-emerald-500" />
                Objectifs d'apprentissage
              </h2>
              <div className="grid gap-3">
                {course.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3 bg-emerald-50 p-4 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <p className="text-gray-700">{objective}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-emerald-500" />
                Programme du cours
              </h2>
              <div className="space-y-6">
                {course.chapters.map((chapter, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Chapitre {index + 1}: {chapter.title}
                      </h3>
                      <a
                        href={chapter.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        Voir le cours
                      </a>
                    </div>
                    <div className="grid gap-3">
                      {chapter.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center gap-3 text-gray-700">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <p>{topic}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}