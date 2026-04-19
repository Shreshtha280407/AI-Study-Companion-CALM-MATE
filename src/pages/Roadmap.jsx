import { useState } from 'react'
import { useSubject } from '../context/SubjectContext'
import PageScaffold from '../components/layout/PageScaffold'

const ROADMAPS = {
  'Web Dev': [
    { level: 'Beginner', topics: ['HTML5 & Semantic tags', 'CSS3 & Flexbox', 'Basic JavaScript', 'Browser Developer Tools'] },
    { level: 'Intermediate', topics: ['React Fundamentals', 'Tailwind CSS', 'API Integration', 'React Router'] },
    { level: 'Advanced', topics: ['State Management (Redux/Zustand)', 'Next.js Framework', 'Authentication Systems', 'Deployment & CI/CD'] },
  ],
  'DSA': [
    { level: 'Beginner', topics: ['Arrays & Strings', 'Linked Lists', 'Stack & Queue', 'Time Complexity (Big O)'] },
    { level: 'Intermediate', topics: ['Recursion & Backtracking', 'Trees & BST', 'Searching & Sorting Algorithms', 'Hash Maps'] },
    { level: 'Advanced', topics: ['Dynamic Programming', 'Graph Algorithms', 'Heap & Priority Queue', 'Advanced String Algos (Trie/KMP)'] },
  ],
  'Maths': [
    { level: 'Beginner', topics: ['Algebra Basics', 'Trigonometry Fundamentals', 'Coordinate Geometry', 'Set Theory'] },
    { level: 'Intermediate', topics: ['Differentiation', 'Integration', 'Probability', 'Matrices & Determinants'] },
    { level: 'Advanced', topics: ['Vector Calculus', 'Linear Algebra', 'Complex Numbers', 'Differential Equations'] },
  ],
  'English': [
    { level: 'Beginner', topics: ['Parts of Speech', 'Tense Masterclass', 'Sentence Structure', 'Basic Vocabulary'] },
    { level: 'Intermediate', topics: ['Active & Passive Voice', 'Direct & Indirect Speech', 'Idioms & Phrases', 'Paragraph Writing'] },
    { level: 'Advanced', topics: ['Critical Thinking & Reading', 'Business Writing', 'Advanced Grammar Rules', 'Public Speaking Prep'] },
  ],
}

function Roadmap() {
  const { selectedSubject } = useSubject()
  const [completedTopics, setCompletedTopics] = useState([])
  const stages = ROADMAPS[selectedSubject] || []

  const toggleTopic = (topic) => {
    setCompletedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic) 
        : [...prev, topic]
    )
  }

  return (
    <PageScaffold
      title="Learning Roadmap"
      subtitle={`Your step-by-step path to master ${selectedSubject}. Click topics to mark them as completed.`}
    >
      <div className="max-w-4xl mx-auto py-8">
        {stages.length > 0 ? (
          <div className="relative space-y-12">
            {/* The vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/50 via-fuchsia-500/50 to-transparent hidden md:block"></div>

            {stages.map((stage, index) => (
              <div key={index} className="relative flex flex-col md:flex-row gap-8 items-start group">
                
                {/* Milestone Indicator */}
                <div className="z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-900 border-2 border-violet-500/30 text-2xl shadow-[0_0_20px_rgba(139,92,246,0.1)] group-hover:border-violet-500 transition-colors duration-500">
                  {index === 0 ? '🌱' : index === 1 ? '🚀' : '👑'}
                </div>

                {/* Stage Card */}
                <div className="flex-1 rounded-3xl border border-white/5 bg-slate-900/40 p-8 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/20 hover:bg-slate-900/60 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-2xl font-bold uppercase tracking-tight ${
                      stage.level === 'Beginner' ? 'text-emerald-400' :
                      stage.level === 'Intermediate' ? 'text-violet-400' :
                      'text-fuchsia-400'
                    }`}>
                      {stage.level}
                    </h3>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        Stage {index + 1}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-1 font-medium">
                        {stage.topics.filter(t => completedTopics.includes(t)).length} / {stage.topics.length} Done
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stage.topics.map((topic, i) => (
                      <button 
                        key={i} 
                        onClick={() => toggleTopic(topic)}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 text-left ${
                          completedTopics.includes(topic)
                            ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                            : 'border-white/5 bg-slate-950/50 text-slate-300 hover:border-white/10 hover:bg-slate-950'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            completedTopics.includes(topic) ? 'bg-emerald-400' : 'bg-violet-500/50'
                          }`}></div>
                          <span className="font-medium">{topic}</span>
                        </div>
                        {completedTopics.includes(topic) && (
                          <span className="text-emerald-400 text-sm">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <p className="text-slate-500">No roadmap found for this subject yet.</p>
          </div>
        )}
      </div>
    </PageScaffold>
  )
}

export default Roadmap
