import { useState } from 'react'
import { useSubject } from '../context/SubjectContext'
import { useAuth } from '../hooks/useAuth'
import { saveQuizResult } from '../services/db'
import PageScaffold from '../components/layout/PageScaffold'

const QUIZ_DATA = {
  'Web Dev': [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Management", "Home Tool Markup Language"], answer: 0 },
    { question: "Which property is used to change the background color?", options: ["color", "bg-color", "background-color", "bgcolor"], answer: 2 },
    { question: "What is the correct syntax for a React functional component?", options: ["function MyComp() {}", "class MyComp {}", "component MyComp() {}", "const MyComp = new Component()"], answer: 0 },
  ],
  'DSA': [
    { question: "What is the time complexity of pushing to a stack?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer: 0 },
    { question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Binary Tree", "Heap"], answer: 1 },
    { question: "A Linked List is which type of data structure?", options: ["Linear", "Non-linear", "Hierarchical", "Tabular"], answer: 0 },
  ],
  'Maths': [
    { question: "What is 25 * 4?", options: ["90", "100", "110", "120"], answer: 1 },
    { question: "Value of Pi up to 2 decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: 1 },
    { question: "Square root of 144?", options: ["10", "11", "12", "14"], answer: 2 },
  ],
  'English': [
    { question: "Which is a synonym of 'Happy'?", options: ["Gloomy", "Joyful", "Bitter", "Angry"], answer: 1 },
    { question: "Identify the verb: 'The cat jumped over the fence.'", options: ["Cat", "Jumped", "Fence", "Over"], answer: 1 },
    { question: "Opposite of 'Ancient'?", options: ["Old", "Classic", "Modern", "Historic"], answer: 2 },
  ],
}

function GradedQuiz() {
  const { user } = useAuth()
  const { selectedSubject } = useSubject()
  const questions = QUIZ_DATA[selectedSubject] || []
  
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleNext = async () => {
    const isCorrect = selectedOption === questions[currentIdx].answer
    const newScore = isCorrect ? score + 1 : score

    if (currentIdx + 1 < questions.length) {
      setScore(newScore)
      setCurrentIdx(currentIdx + 1)
      setSelectedOption(null)
    } else {
      setScore(newScore)
      setShowResult(true)
      
      // Save result to Firestore
      if (user) {
        setIsSaving(true)
        try {
          await saveQuizResult(user.uid, {
            subject: selectedSubject,
            score: newScore,
            totalQuestions: questions.length,
            percentage: Math.round((newScore / questions.length) * 100)
          })
        } catch (error) {
          console.error("Error saving result:", error)
        } finally {
          setIsSaving(false)
        }
      }
    }
  }

  const restartQuiz = () => {
    setCurrentIdx(0)
    setSelectedOption(null)
    setScore(0)
    setShowResult(false)
  }

  if (questions.length === 0) {
    return (
      <PageScaffold title="Graded Quiz" subtitle="No questions available.">
        <div className="text-center py-20 text-slate-500">
          We are still preparing the quiz for {selectedSubject}.
        </div>
      </PageScaffold>
    )
  }

  return (
    <PageScaffold
      title="Graded Quiz"
      subtitle={`Test your knowledge in ${selectedSubject}. One question at a time.`}
    >
      <div className="max-w-2xl mx-auto py-10">
        {!showResult ? (
          <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                <span>Question {currentIdx + 1} of {questions.length}</span>
                <span>{Math.round(((currentIdx + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <h3 className="text-2xl font-bold text-white mb-8 leading-relaxed">
              {questions[currentIdx].question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-10">
              {questions[currentIdx].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
                    selectedOption === idx 
                      ? 'border-violet-500 bg-violet-500/10 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
                      : 'border-white/5 bg-slate-950/50 text-slate-400 hover:border-white/10 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-6 w-6 shrink-0 flex items-center justify-center rounded-full border text-xs font-bold ${
                      selectedOption === idx ? 'border-violet-500 bg-violet-500 text-white' : 'border-slate-700 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={selectedOption === null || isSaving}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                selectedOption !== null 
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-xl hover:scale-[1.02] active:scale-95' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isSaving ? 'Saving...' : (currentIdx + 1 === questions.length ? 'Finish Quiz' : 'Next Question')}
            </button>
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-12 backdrop-blur-xl shadow-2xl text-center">
            <div className="text-6xl mb-6">
              {score === questions.length ? '🌟' : score > questions.length / 2 ? '👏' : '📚'}
            </div>
            <h3 className="text-3xl font-extrabold text-white mb-2">
              {score === questions.length ? 'Perfect Score!' : 'Quiz Completed!'}
            </h3>
            <p className="text-slate-400 mb-8">
              {score === questions.length 
                ? "You've mastered this subject's core concepts!" 
                : "Keep practicing to improve your score."}
            </p>
            
            <div className="flex flex-col gap-6 items-center mb-10">
              <div className="px-10 py-6 bg-slate-950 rounded-3xl border border-white/5 w-full max-w-sm">
                <span className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Your Score</span>
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  {score} / {questions.length}
                </span>
              </div>
              
              <div className="px-10 py-4 bg-slate-950 rounded-2xl border border-white/5 w-full max-w-sm">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Accuracy</span>
                <span className="text-2xl font-bold text-emerald-400">
                  {Math.round((score / questions.length) * 100)}%
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </PageScaffold>
  )
}

export default GradedQuiz
