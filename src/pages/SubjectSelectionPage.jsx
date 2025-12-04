// src/pages/SubjectSelectionPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';

const subjects = [
  { id: 'english', label: 'Ingliz tili', color: 'bg-red-50 border-red-200' },
  { id: 'math', label: 'Matematika', color: 'bg-blue-50 border-blue-200' },
  { id: 'cs', label: 'Informatika', color: 'bg-purple-50 border-purple-200' },
  { id: 'chemistry', label: 'Kimyo', color: 'bg-green-50 border-green-200' },
  { id: 'history', label: 'Tarix', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'biology', label: 'Biologiya', color: 'bg-indigo-50 border-indigo-200' },
  { id: 'physics', label: 'Fizika', color: 'bg-pink-50 border-pink-200' },
  { id: 'russian', label: 'Rus tili', color: 'bg-gray-50 border-gray-200' },
];

const SubjectSelectionPage = () => {
  const { selectedSubjects, toggleSubject } = useStore();
  const navigate = useNavigate();

  const handleStartTest = () => {
    if (selectedSubjects.length === 3) {
      navigate('/test');
    } else {
      alert(`Iltimos, 3 ta fan tanlang. Hozir ${selectedSubjects.length} ta fan tanlangan.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Fanlarni tanlash
          </h1>
          <p className="text-gray-600 mb-4">
            Imtihon topshirish uchun 3 ta fanni tanlang (Rus tili majburiy)
          </p>
          
          <div className="inline-flex items-center gap-4 p-4 bg-blue-50 rounded-lg mb-6">
            <div>
              <p className="font-semibold text-blue-900">Tanlangan fanlar:</p>
              <p className="text-sm text-blue-700">Jami: {selectedSubjects.length}/3 fan</p>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {selectedSubjects.length}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                selectedSubjects.includes(subject.id)
                  ? `${subject.color} border-blue-500 ring-2 ring-blue-300`
                  : `${subject.color} hover:border-gray-300`
              } ${subject.id === 'russian' ? 'opacity-90' : ''}`}
              onClick={() => subject.id !== 'russian' && toggleSubject(subject.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{subject.label}</h3>
                {subject.id === 'russian' && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Majburiy</span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                {subject.id !== 'russian' ? (
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedSubjects.includes(subject.id) 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {selectedSubjects.includes(subject.id) ? '✓' : ''}
                    </div>
                    <span className="text-gray-600">
                      {selectedSubjects.includes(subject.id) ? 'Tanlangan' : 'Tanlanmagan'}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">Majburiy fan</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Testni boshlash:</h3>
              <p className="text-gray-600">
                {selectedSubjects.length === 3 
                  ? "Barcha 3 ta fan tanlandi. Testni boshlashingiz mumkin."
                  : `Yana ${3 - selectedSubjects.length} ta fan tanlang.`
                }
              </p>
            </div>
            
            <div className="flex gap-3">
              {selectedSubjects.length === 3 ? (
                <button
                  onClick={handleStartTest}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-lg"
                >
                  <span>Testni boshlash</span>
                  <span>→</span>
                </button>
              ) : (
                <div className="px-8 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium text-lg">
                  {3 - selectedSubjects.length} ta fan tanlang
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Test haqida ma'lumot:</h4>
            <ul className="text-blue-700 space-y-1">
              <li>• Har bir tanlangan fandan 10 ta savol (jami 30 ta savol)</li>
              <li>• Barcha savollar bir sahifada ko'rsatiladi</li>
              <li>• Test vaqti: 90 daqiqa (1.5 soat)</li>
              <li>• Javoblarni keyinchalik o'zgartirish mumkin</li>
              <li>• Testni yakunlaganingizdan so'ng qayta ochish mumkin emas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelectionPage;