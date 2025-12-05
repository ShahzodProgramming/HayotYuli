// src/store.js
import { create } from 'zustand';
import { questionsDB } from './data/questions';

const useStore = create((set, get) => ({
  // Form data
  formData: {
    first_name: '',
    last_name: '',
    phone: '',
    region: '',
    district: '',
    school_number: '',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    english_level: '',
    russian_level: '',
  },

  // Selected subjects (russian is mandatory)
  selectedSubjects: ['russian'],

  // All test questions and answers for current session
  testSession: {
    subject: null,
    questions: [],
    answers: {},
    completed: false,
  },

  // Actions
  setFormData: (field, value) => set((state) => ({
    formData: {
      ...state.formData,
      [field]: value,
    },
  })),

  toggleSubject: (subject) => set((state) => {
    if (subject === 'russian') return state; // Russian is mandatory

    const newSubjects = state.selectedSubjects.includes(subject)
      ? state.selectedSubjects.filter(s => s !== subject)
      : [...state.selectedSubjects, subject];

    // Limit to 3 subjects including russian
    if (newSubjects.length <= 3) {
      return { selectedSubjects: newSubjects };
    }
    return state;
  }),

  // Prepare test session with all selected subjects' questions
  startTestSession: () => {
    const { selectedSubjects } = get();
    const allQuestions = [];

    // Try to get questions from localStorage first
    let customQuestions = null;
    const storedQuestions = localStorage.getItem('questionsDB');

    if (storedQuestions) {
      try {
        customQuestions = JSON.parse(storedQuestions);
      } catch (e) {
        console.error('Error parsing stored questions:', e);
        customQuestions = null;
      }
    }


    // For each selected subject, add questions
    selectedSubjects.forEach(subject => {
      // Try to get questions from custom storage first
      if (customQuestions && customQuestions[subject] && customQuestions[subject].length > 0) {
        // Use custom questions from admin panel
        customQuestions[subject].forEach((q, i) => {
          allQuestions.push({
            id: `${subject}_${i}`,
            subject: subject,
            text: q.q,
            options: q.options,
            correctAnswer: q.a,
          });
        });
      } else if (questionsDB[subject] && questionsDB[subject].length > 0) {
        // Use default questions from imported questionsDB
        questionsDB[subject].forEach((q, i) => {
          allQuestions.push({
            id: `${subject}_${i}`,
            subject: subject,
            text: q.q,
            options: q.options,
            correctAnswer: q.a,
          });
        });
      } else {
        // Fallback to dummy questions if no questions available
        for (let i = 1; i <= 10; i++) {
          allQuestions.push({
            id: `${subject}_${i}`,
            subject: subject,
            text: `${subject.charAt(0).toUpperCase() + subject.slice(1)} fanidan savol ${i}`,
            options: ["Variant A", "Variant B", "Variant C", "Variant D"],
            correctAnswer: Math.floor(Math.random() * 4),
          });
        }
      }
    });

    set({
      testSession: {
        subject: 'combined', // Indicates combined test
        questions: allQuestions,
        answers: {},
        completed: false,
      },
    });
  },

  // Update answer for a question
  setAnswer: (questionId, answerIndex) => set((state) => ({
    testSession: {
      ...state.testSession,
      answers: {
        ...state.testSession.answers,
        [questionId]: answerIndex,
      },
    },
  })),

  // Mark test as completed
  completeTestSession: () => set((state) => ({
    testSession: {
      ...state.testSession,
      completed: true,
    },
  })),

  // Validate registration
  completeRegistration: () => {
    const { formData } = get();
    const requiredFields = ['first_name', 'last_name', 'region', 'school_number', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6'];

    for (const field of requiredFields) {
      if (!formData[field]?.trim()) {
        alert(`Iltimos, ${field} maydonini to'ldiring`);
        return false;
      }
    }

    return true;
  },
}));

export default useStore;