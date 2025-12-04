// src/pages/RegistrationPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';

const RegistrationPage = () => {
  const { formData, setFormData, completeRegistration } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (completeRegistration()) {
      navigate('/subjects');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            "Hayot yo'li education" - Ro'yxatdan o'tish
          </h1>
          <p className="text-gray-700 italic">
            — bu Rossiya Federatsiyasining davlat universitetlarida bepul ta'lim olish yo'li!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* F.I.O Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Shaxsiy ma'lumotlar</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Ismingiz *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.first_name}
                  onChange={(e) => setFormData('first_name', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block font-medium text-gray-700 mb-2">Familiyangiz *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.last_name}
                  onChange={(e) => setFormData('last_name', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block font-medium text-gray-700 mb-2">Telefon raqamingiz</label>
                <input
                  type="tel"
                  placeholder="+998 90 123-45-67"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.phone}
                  onChange={(e) => setFormData('phone', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block font-medium text-gray-700 mb-2">Viloyatingiz *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.region}
                  onChange={(e) => setFormData('region', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block font-medium text-gray-700 mb-2">Tumaningiz</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.district}
                  onChange={(e) => setFormData('district', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block font-medium text-gray-700 mb-2">Maktab/Litsey/Kollej raqami *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.school_number}
                  onChange={(e) => setFormData('school_number', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">So'rovnoma savollari</h2>
            <p className="text-gray-600 italic">Har bir savolga to'liq javob bering *</p>
            
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="space-y-2">
                <label className="block font-medium text-gray-700">
                  {num}. {
                    num === 1 ? "Hozirda qayerda o'qiysiz? (Maktab, litsey, kollej, universitet)" :
                    num === 2 ? "Rus tili yoki boshqa fanlardan sertifikatingiz bormi? (Sertifikat turi va darajasi)" :
                    num === 3 ? "Qaysi yo'nalishda o'qimoqchisiz? (Tibbiyot, IT, Iqtisodiyot, Pedagogika va h.k)" :
                    num === 4 ? "Kelajakda kim bo'lmoqchisiz?" :
                    num === 5 ? "Chet elda o'qishga tayyormisiz?" :
                    "Rus tilida o'qishga tayyormisiz?"
                  } *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData[`q${num}`]}
                  onChange={(e) => setFormData(`q${num}`, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>

          {/* Language Proficiency */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Tillarni bilish darajangizni belgilang</h2>
            
            <div className="space-y-4">
              {['english_level', 'russian_level'].map((language) => (
                <div key={language} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">
                    {language === 'english_level' ? 'Ingliz tili' : 'Rus tili'}
                  </span>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {['none', 'medium', 'good'].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={language}
                          value={level}
                          checked={formData[language] === level}
                          onChange={(e) => setFormData(language, e.target.value)}
                          className="w-5 h-5 text-blue-600"
                        />
                        <span className="text-gray-700">
                          {level === 'none' ? "Bilmayman" : 
                           level === 'medium' ? "O'rtacha bilaman" : "Yaxshi bilaman"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg shadow-md hover:shadow-lg transition-all"
            >
              Fanlarni tanlashga o'tish →
            </button>
            <p className="text-gray-600 text-sm mt-4">
              * Barcha maydonlarni to'ldirgach, fanlarni tanlash sahifasiga o'tasiz
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;