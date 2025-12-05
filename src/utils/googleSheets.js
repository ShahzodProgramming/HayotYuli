// src/utils/googleSheets.js

/**
 * Submit data to Google Sheets via Google Apps Script Web App
 * @param {Object} data - The data to submit
 * @returns {Promise<Object>} Response from Google Sheets
 */
export async function submitToGoogleSheets(data) {
    const url = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

    if (!url || url === 'your_google_apps_script_url_here') {
        throw new Error('Google Apps Script URL not configured. Please set VITE_GOOGLE_APPS_SCRIPT_URL in .env file');
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires no-cors
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Note: With no-cors mode, we can't read the response
        // We assume success if no error is thrown
        return {
            status: 'success',
            message: 'Data submitted successfully',
        };
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        throw new Error(`Failed to submit data: ${error.message}`);
    }
}

/**
 * Calculate score from test session
 * @param {Object} testSession - Test session with questions and answers
 * @returns {Object} Score data { score, total, percentage }
 */
export function calculateScore(testSession) {
    const { questions, answers } = testSession;
    let score = 0;

    questions.forEach(q => {
        if (answers[q.id] === q.correctAnswer) {
            score++;
        }
    });

    const total = questions.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    return { score, total, percentage };
}

/**
 * Format quiz data for Google Sheets submission
 * @param {Object} formData - User registration data
 * @param {Array} selectedSubjects - Selected subjects
 * @param {Object} testSession - Test session with answers
 * @returns {Object} Formatted data object
 */
export function formatQuizData(formData, selectedSubjects, testSession) {
    const scoreData = calculateScore(testSession);

    return {
        // Personal information
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        region: formData.region,
        district: formData.district,
        school_number: formData.school_number,

        // Registration questions
        q1: formData.q1,
        q2: formData.q2,
        q3: formData.q3,
        q4: formData.q4,
        q5: formData.q5,
        q6: formData.q6,

        // Language levels
        english_level: formData.english_level,
        russian_level: formData.russian_level,

        // Quiz data
        selectedSubjects: selectedSubjects,
        testAnswers: testSession.answers,
        testCompleted: testSession.completed,

        // Score data
        score: scoreData.score,
        totalQuestions: scoreData.total,
        scorePercentage: scoreData.percentage,
    };
}
