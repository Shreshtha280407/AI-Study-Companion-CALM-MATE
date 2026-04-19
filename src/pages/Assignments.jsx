import { useState, useEffect } from 'react'
import { useSubject } from '../context/SubjectContext'
import { useAuth } from '../hooks/useAuth'
import { getUserAssignments, toggleAssignmentStatus, addAssignment } from '../services/db'
import PageScaffold from '../components/layout/PageScaffold'

const INITIAL_SEED_DATA = {
  'Web Dev': [
    { title: 'HTML Semantic Elements', description: 'Build a layout using only semantic HTML5 tags.', difficulty: 'Beginner', subject: 'Web Dev' },
    { title: 'CSS Flexbox Layout', description: 'Create a responsive navbar and grid using Flexbox.', difficulty: 'Intermediate', subject: 'Web Dev' },
  ],
  'DSA': [
    { title: 'Reverse a Linked List', description: 'Implement an iterative and recursive solution.', difficulty: 'Medium', subject: 'DSA' },
    { title: 'Binary Search Implementation', description: 'Solve 5 binary search problems on LeetCode.', difficulty: 'Easy', subject: 'DSA' },
  ],
  'Maths': [
    { title: 'Derivatives Practice', description: 'Solve the worksheet on chain rule and power rule.', difficulty: 'Hard', subject: 'Maths' },
  ],
  'English': [
    { title: 'Grammar & Punctuation', description: 'Complete the advanced grammar quiz.', difficulty: 'Easy', subject: 'English' },
  ],
}

function Assignments() {
  const { user } = useAuth()
  const { selectedSubject } = useSubject()
  const [assignments, setAssignments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAssignments = async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const data = await getUserAssignments(user.uid, selectedSubject)
      setAssignments(data)
    } catch (error) {
      console.error("Failed to fetch:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAssignments()
  }, [user, selectedSubject])

  const handleToggle = async (id, currentStatus) => {
    try {
      await toggleAssignmentStatus(user.uid, id, currentStatus)
      // Optimistic UI update
      setAssignments(prev => prev.map(a => 
        a.id === id ? { ...a, completed: !currentStatus } : a
      ))
    } catch (error) {
      alert("Failed to update status")
    }
  }

  const seedData = async () => {
    if (!user) return
    const items = INITIAL_SEED_DATA[selectedSubject] || []
    for (const item of items) {
      await addAssignment(user.uid, item)
    }
    fetchAssignments()
  }

  return (
    <PageScaffold
      title="Assignments"
      subtitle={`Focusing on ${selectedSubject}. All data is now synced with Firestore.`}
    >
      <div className="mb-6 flex justify-end">
        {assignments.length === 0 && !isLoading && (
          <button 
            onClick={seedData}
            className="text-xs font-bold text-violet-400 hover:text-violet-300 underline underline-offset-4"
          >
            + Seed initial assignments for {selectedSubject}
          </button>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full py-20 text-center animate-pulse text-slate-500">
            Loading your assignments...
          </div>
        ) : assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div 
              key={assignment.id} 
              className={`group relative flex flex-col rounded-2xl border transition-all duration-300 p-6 ${
                assignment.completed 
                  ? 'border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                  : 'border-white/5 bg-slate-900/50 hover:border-violet-500/30'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  assignment.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  assignment.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {assignment.difficulty}
                </span>
                {assignment.completed && (
                  <span className="text-emerald-400 text-lg">✓</span>
                )}
              </div>

              <h3 className={`text-lg font-bold mb-2 transition-colors ${
                assignment.completed ? 'text-emerald-300' : 'text-white'
              }`}>
                {assignment.title}
              </h3>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                {assignment.description}
              </p>

              <button
                onClick={() => handleToggle(assignment.id, assignment.completed)}
                className={`mt-auto w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  assignment.completed
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-95'
                }`}
              >
                {assignment.completed ? 'Completed' : 'Mark as Complete'}
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="text-4xl mb-4">📂</div>
            <p className="text-slate-500">No assignments found for this subject yet.</p>
          </div>
        )}
      </div>
    </PageScaffold>
  )
}

export default Assignments

