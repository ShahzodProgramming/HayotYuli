// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { questionsDB } from '../data/questions';

const AdminPage = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('english');
    const [questions, setQuestions] = useState({});
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    // Form state for new/edit question
    const [questionForm, setQuestionForm] = useState({
        q: '',
        options: ['', '', '', ''],
        a: 0,
    });

    const subjects = ['english', 'math', 'cs', 'chemistry', 'history', 'biology', 'physics', 'russian'];

    const subjectNames = {
        english: 'Ingliz tili',
        math: 'Matematika',
        cs: 'Informatika',
        chemistry: 'Kimyo',
        history: 'Tarix',
        biology: 'Biologiya',
        physics: 'Fizika',
        russian: 'Rus tili',
    };

    // Load questions from localStorage or use default
    useEffect(() => {
        const stored = localStorage.getItem('questionsDB');
        if (stored) {
            setQuestions(JSON.parse(stored));
        } else {
            setQuestions(questionsDB);
        }
    }, []);

    // Save questions to localStorage
    const saveQuestions = (newQuestions) => {
        setQuestions(newQuestions);
        localStorage.setItem('questionsDB', JSON.stringify(newQuestions));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple password check - in production use proper authentication
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Noto\'g\'ri parol!');
        }
    };

    const handleAddQuestion = () => {
        if (!questionForm.q.trim() || questionForm.options.some(opt => !opt.trim())) {
            alert('Barcha maydonlarni to\'ldiring!');
            return;
        }

        const newQuestions = { ...questions };
        if (!newQuestions[selectedSubject]) {
            newQuestions[selectedSubject] = [];
        }
        newQuestions[selectedSubject].push({ ...questionForm });
        saveQuestions(newQuestions);
        resetForm();
        setIsAddingNew(false);
    };

    const handleUpdateQuestion = () => {
        if (!questionForm.q.trim() || questionForm.options.some(opt => !opt.trim())) {
            alert('Barcha maydonlarni to\'ldiring!');
            return;
        }

        const newQuestions = { ...questions };
        newQuestions[selectedSubject][editingQuestion] = { ...questionForm };
        saveQuestions(newQuestions);
        resetForm();
        setEditingQuestion(null);
    };

    const handleDeleteQuestion = (index) => {
        if (window.confirm('Savolni o\'chirishni xohlaysizmi?')) {
            const newQuestions = { ...questions };
            newQuestions[selectedSubject].splice(index, 1);
            saveQuestions(newQuestions);
        }
    };

    const startEdit = (index) => {
        const question = questions[selectedSubject][index];
        setQuestionForm({ ...question });
        setEditingQuestion(index);
        setIsAddingNew(false);
    };

    const resetForm = () => {
        setQuestionForm({
            q: '',
            options: ['', '', '', ''],
            a: 0,
        });
    };

    const cancelEdit = () => {
        resetForm();
        setEditingQuestion(null);
        setIsAddingNew(false);
    };

    const startAddNew = () => {
        resetForm();
        setIsAddingNew(true);
        setEditingQuestion(null);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                        <p className="text-gray-600 mt-2">Savollarni boshqarish tizimi</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Parol
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Parolni kiriting"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                        >
                            Kirish
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const currentSubjectQuestions = questions[selectedSubject] || [];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                                <p className="text-gray-600">Savollarni qo'shish va tahrirlash</p>
                            </div>
                            <button
                                onClick={() => {
                                    setIsAuthenticated(false);
                                    setPassword('');
                                }}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                            >
                                Chiqish
                            </button>
                        </div>
                    </div>

                    {/* Subject Selector */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Fan tanlash</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {subjects.map((subject) => (
                                <button
                                    key={subject}
                                    onClick={() => {
                                        setSelectedSubject(subject);
                                        cancelEdit();
                                    }}
                                    className={`px-4 py-3 rounded-lg font-medium transition-colors ${selectedSubject === subject
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {subjectNames[subject]}
                                    <span className="ml-2 text-xs">
                                        ({(questions[subject] || []).length})
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add/Edit Question Form */}
                    {(isAddingNew || editingQuestion !== null) && (
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                {editingQuestion !== null ? 'Savolni tahrirlash' : 'Yangi savol qo\'shish'}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Savol matni
                                    </label>
                                    <input
                                        type="text"
                                        value={questionForm.q}
                                        onChange={(e) => setQuestionForm({ ...questionForm, q: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Savolni kiriting"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Javob variantlari
                                    </label>
                                    {questionForm.options.map((option, index) => (
                                        <div key={index} className="flex items-center gap-3 mb-2">
                                            <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded font-medium text-gray-700">
                                                {String.fromCharCode(65 + index)}
                                            </span>
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) => {
                                                    const newOptions = [...questionForm.options];
                                                    newOptions[index] = e.target.value;
                                                    setQuestionForm({ ...questionForm, options: newOptions });
                                                }}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder={`Variant ${String.fromCharCode(65 + index)}`}
                                            />
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="correctAnswer"
                                                    checked={questionForm.a === index}
                                                    onChange={() => setQuestionForm({ ...questionForm, a: index })}
                                                    className="w-5 h-5 text-green-600"
                                                />
                                                <span className="ml-2 text-sm text-gray-600">To'g'ri</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={editingQuestion !== null ? handleUpdateQuestion : handleAddQuestion}
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                                    >
                                        {editingQuestion !== null ? 'Saqlash' : 'Qo\'shish'}
                                    </button>
                                    <button
                                        onClick={cancelEdit}
                                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                                    >
                                        Bekor qilish
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Add New Button */}
                    {!isAddingNew && editingQuestion === null && (
                        <div className="mb-6">
                            <button
                                onClick={startAddNew}
                                className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Yangi savol qo'shish
                            </button>
                        </div>
                    )}

                    {/* Questions List */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            {subjectNames[selectedSubject]} savollari ({currentSubjectQuestions.length})
                        </h2>

                        {currentSubjectQuestions.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p>Hozircha savollar yo'q</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {currentSubjectQuestions.map((question, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-medium text-sm">
                                                        {index + 1}
                                                    </span>
                                                    <h3 className="font-medium text-gray-800">{question.q}</h3>
                                                </div>

                                                <div className="ml-10 space-y-1">
                                                    {question.options.map((option, optIndex) => (
                                                        <div
                                                            key={optIndex}
                                                            className={`flex items-center gap-2 text-sm ${question.a === optIndex
                                                                    ? 'text-green-700 font-medium'
                                                                    : 'text-gray-600'
                                                                }`}
                                                        >
                                                            <span className={`w-6 h-6 flex items-center justify-center rounded text-xs ${question.a === optIndex
                                                                    ? 'bg-green-100'
                                                                    : 'bg-gray-100'
                                                                }`}>
                                                                {String.fromCharCode(65 + optIndex)}
                                                            </span>
                                                            <span>{option}</span>
                                                            {question.a === optIndex && (
                                                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex gap-2 ml-4">
                                                <button
                                                    onClick={() => startEdit(index)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Tahrirlash"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteQuestion(index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="O'chirish"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
