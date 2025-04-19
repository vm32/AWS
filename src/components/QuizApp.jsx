import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answered, setAnswered] = useState(false);

  const questions = [
    {
      id: 1,
      questionText: 'من الممارسات الصحيحة لتبادل مستندات العمل:',
      options: [
        'إرسالها عبر البريد الشخصي أو تطبيقات التواصل',
        'تسليمها يدويًا فقط',
        'استخدام القنوات الرسمية المعتمدة في الوزارة',
        'إرسالها في مجموعة العمل على تطبيق الواتساب'
      ],
      correctAnswer: 2
    },
    {
      id: 2,
      questionText: 'ماهي القنوات المعتمدة لمشاركة الملفات في الوزارة:',
      options: [
        'شارك',
        'البريد الالكتروني الرسمي',
        'نظام الاتصالات الإدارية لمشاركة الخطابات',
        'جميع ما سبق'
      ],
      correctAnswer: 3
    },
    {
      id: 3,
      questionText: 'ما هو الخطر الأساسي من إرسال ملفات حساسة عبر برامج التواصل الاجتماعي مثل الواتس اب؟',
      options: [
        'سرعة الإرسال الزائدة',
        'احتمال فقدان الجوال فقط',
        'تعرض البيانات للتسريب أو الاختراق',
        'امتلاء ذاكرة الهاتف'
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      questionText: 'ما هي العقوبة في حال قام الموظف بتسريب بيانات الوزارة ؟',
      options: [
        'تنبيه ولفت نظر فقط',
        'لا توجد أي عقوبة',
        'السجن لمدة لا تزيد عن 20 عام او غرامة لا تزيد عن مليون ريال سعودي او كلاهما',
        'خصم راتب'
      ],
      correctAnswer: 2
    },
    {
      id: 5,
      questionText: 'ما لمقصود بتقنية التزييف العميق (Deepfake)؟',
      options: [
        'نوع من الذكاء الاصطناعي مصمم لأتمتة المهام',
        'تقنية وسائط رقمية تستخدم الذكاء الاصطناعي لإنشاء مقاطع فيديو أو تسجيلات صوتية مزيفة تبدو واقعية',
        'بروتوكول أمان لحماية المعلومات الرقمية',
        'معيار صناعي لضغط الفيديو'
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      questionText: 'ماهي المخاطر الرئيسية المرتبطة بتكنولوجيا التزييف العميق؟',
      options: [
        'زيادة جودة الفيديو',
        'تحسين تجربة المستخدم في الوسائط الرقمية',
        'إمكانية التضليل والتلاعب بالرأي العام',
        'تحسين دقة التعرف على الوجه'
      ],
      correctAnswer: 2
    }
  ];

  const handleAnswerClick = (answerIndex) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 2);
    } else {
      setShowFeedback(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswered(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswered(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4 flex justify-center items-center font-sans" dir="rtl">
      <div className="w-full max-w-2xl mx-auto">
        {!showScore ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 md:p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">اختبار الأمن والخصوصية</h2>
              <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                السؤال {currentQuestion + 1} من {questions.length}
              </div>
            </div>
            
            <motion.div 
              key={currentQuestion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                {questions[currentQuestion].questionText}
              </h3>
              
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerClick(index)}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                      selectedAnswer === index
                        ? index === questions[currentQuestion].correctAnswer
                          ? 'bg-green-100 border-green-500'
                          : 'bg-red-100 border-red-500'
                        : 'bg-gray-50 border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        selectedAnswer === index
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="mr-3">
                    <p className="text-sm text-amber-700">
                      الإجابة الصحيحة هي: {questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!answered}
                onClick={handleNextQuestion}
                className={`px-6 py-3 rounded-full font-medium ${
                  answered
                    ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'إنهاء الاختبار' : 'السؤال التالي'}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center"
          >
            <div className="mb-6">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-full bg-indigo-100 mx-auto flex items-center justify-center"
              >
                <span className="text-3xl font-bold text-indigo-600">{score}</span>
              </motion.div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">اكتمل الاختبار!</h2>
            <p className="text-gray-600 mb-6">حصلت على {score} من أصل {questions.length * 2} نقاط</p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {score >= (questions.length * 2 * 0.8) ? (
                <div className="text-green-600 mb-6">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="font-medium">أحسنت! لديك فهم ممتاز لسياسات الأمن والخصوصية.</p>
                </div>
              ) : score >= (questions.length * 2 * 0.6) ? (
                <div className="text-amber-600 mb-6">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm1-9a1 1 0 00-1 1v4a1 1 0 102 0V5a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="font-medium">جيد! يمكنك تحسين معرفتك بسياسات الأمن والخصوصية.</p>
                </div>
              ) : (
                <div className="text-red-600 mb-6">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="font-medium">تحتاج إلى مراجعة سياسات الأمن والخصوصية بشكل أفضل.</p>
                </div>
              )}
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartQuiz}
              className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium shadow-md hover:bg-indigo-700"
            >
              إعادة الاختبار
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;