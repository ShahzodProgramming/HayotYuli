// src/store.js
import { create } from 'zustand';

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
    
    // For each selected subject, add 10 questions
    selectedSubjects.forEach(subject => {
      // In real app, import questions from questionsDB
      // For now, create dummy questions
      for (let i = 1; i <= 10; i++) {
        allQuestions.push({
          id: `${subject}_${i}`,
          subject: subject,
          text: `${subject.charAt(0).toUpperCase() + subject.slice(1)} fanidan savol ${i}`,
          options: ["Variant A", "Variant B", "Variant C", "Variant D"],
          correctAnswer: Math.floor(Math.random() * 4), // Random correct answer for now
        });
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