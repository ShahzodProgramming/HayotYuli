// src/pages/TestPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';

const TestPage = () => {
  const navigate = useNavigate();
  const { testSession, selectedSubjects, setAnswer, completeTestSession, startTestSession } = useStore();
  const { questions, answers, completed } = testSession;
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds

  // Initialize test session when component mounts
  useEffect(() => {
    if (questions.length === 0) {
      startTestSession();
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || completed) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, completed]);

  // Format time
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress
  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  // Handle submit
  const handleSubmit = () => {
    if (answeredCount < questions.length) {
      if (!window.confirm(`Siz ${questions.length - answeredCount} ta savolga javob bermadingiz. Testni yakunlashni xohlaysizmi?`)) {
        return;
      }
    }
    completeTestSession();
  };

  if (completed) {
    // Calculate score
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-4">Test yakunlandi!</h1>
            <p className="text-xl text-gray-700 mb-6">
              Umumiy natija: {score}/{questions.length} ({Math.round((score/questions.length) * 100)}%)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {selectedSubjects.map(subject => {
              const subjectQuestions = questions.filter(q => q.subject === subject);
              const subjectAnswers = subjectQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
              return (
                <div key={subject} className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                  </h3>
                  <p className="text-blue-700">
                    {subjectAnswers}/{subjectQuestions.length} to'g'ri
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t">
            <button
              onClick={() => navigate('/subjects')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              ← Asosiy sahifaga qaytish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Test header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Test imtihoni</h1>
              <p className="text-gray-600">
                {selectedSubjects.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')} fanlaridan
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600">Qolgan vaqt</div>
                <div className="text-xl font-bold text-blue-700">{formatTime(timeLeft)}</div>
              </div>
              
              <div className="px-4 py-2 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600">Javob berildi</div>
                <div className="text-xl font-bold text-green-700">{answeredCount}/{questions.length}</div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {Math.round(progress)}% yakunlandi
          </div>
        </div>

        {/* Questions grid - All 30 questions on one page */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {questions.map((question, index) => (
            <div key={question.id} className="p-6 border rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-start mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-medium mr-3">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {question.subject.charAt(0).toUpperCase() + question.subject.slice(1)}
                    </span>
                    {answers[question.id] !== undefined && (
                      <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded">
                        Javob berildi
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium text-gray-800">{question.text}</h3>
                </div>
              </div>

              <div className="space-y-3 ml-11">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`flex items-center p-3 rounded-lg cursor-pointer border transition-colors ${
                      answers[question.id] === optionIndex
                        ? 'bg-blue-50 border-blue-300'
                        : 'hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question_${question.id}`}
                      checked={answers[question.id] === optionIndex}
                      onChange={() => setAnswer(question.id, optionIndex)}
                      className="w-5 h-5 text-blue-600 mr-3"
                    />
                    <div className="flex items-center">
                      <span className="w-6 h-6 flex items-center justify-center bg-gray-100 text-gray-700 rounded mr-3 font-medium">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit section */}
        <div className="pt-8 border-t">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Testni yakunlash
              </h3>
              <p className="text-gray-600">
                Barcha savollarga javob berganingizdan so'ng "Testni yakunlash" tugmasini bosing
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (window.confirm("Testni tark etmoqchimisiz? Barcha javoblaringiz saqlanadi.")) {
                    navigate('/subjects');
                  }
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                Saqlab qaytish
              </button>
              
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-md"
              >
                Testni yakunlash
              </button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              <span className="font-medium">Diqqat:</span> Testni yakunlaganingizdan so'ng qayta o'zgartirish imkoni yo'q.
              Barcha {questions.length} ta savolga javob berganingizga ishonch hosil qiling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;