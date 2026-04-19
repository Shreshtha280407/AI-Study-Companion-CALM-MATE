import { useState, useEffect } from 'react'
import { useSubject } from '../context/SubjectContext'
import { useAuth } from '../hooks/useAuth'
import { getUserFlashcards, addFlashcard } from '../services/db'
import PageScaffold from '../components/layout/PageScaffold'

const INITIAL_SEED_CARDS = {
  'Web Dev': [
    { front: 'What does CSS stand for?', back: 'Cascading Style Sheets', subject: 'Web Dev' },
    { front: 'What is the purpose of the <div> tag?', back: 'It is a generic container for flow content, used to group elements for styling.', subject: 'Web Dev' },
    { front: 'What is a "Closure" in JS?', back: 'A function that remembers its lexical scope even when executed outside that scope.', subject: 'Web Dev' },
  ],
  'DSA': [
    { front: 'What is the time complexity of Binary Search?', back: 'O(log n)', subject: 'DSA' },
    { front: 'What is a Stack?', back: 'A LIFO (Last In First Out) data structure.', subject: 'DSA' },
    { front: 'Difference between Array and Linked List?', back: 'Arrays are contiguous in memory; Linked Lists are not.', subject: 'DSA' },
  ],
  'Maths': [
    { front: 'Derivative of sin(x)?', back: 'cos(x)', subject: 'Maths' },
    { front: 'What is the Pythagorean Theorem?', back: 'a² + b² = c²', subject: 'Maths' },
  ],
  'English': [
    { front: 'What is an Adjective?', back: 'A word that describes or modifies a noun.', subject: 'English' },
    { front: 'Definition of "Ambiguous"?', back: 'Open to more than one interpretation; having a double meaning.', subject: 'English' },
  ],
}

function Flashcards() {
  const { user } = useAuth()
  const { selectedSubject } = useSubject()
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [flippedCards, setFlippedCards] = useState({})

  const fetchFlashcards = async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const data = await getUserFlashcards(user.uid, selectedSubject)
      setCards(data)
    } catch (error) {
      console.error("Failed to fetch flashcards:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFlashcards()
    setFlippedCards({}) // Reset flips when subject changes
  }, [user, selectedSubject])

  const handleFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const seedFlashcards = async () => {
    if (!user) return
    const items = INITIAL_SEED_CARDS[selectedSubject] || []
    for (const item of items) {
      await addFlashcard(user.uid, item)
    }
    fetchFlashcards()
  }

  return (
    <PageScaffold
      title="Flashcards"
      subtitle={`Master your ${selectedSubject} concepts. All progress is saved to Firestore.`}
    >
      <div className="mb-6 flex justify-end">
        {cards.length === 0 && !isLoading && (
          <button 
            onClick={seedFlashcards}
            className="text-xs font-bold text-fuchsia-400 hover:text-fuchsia-300 underline underline-offset-4"
          >
            + Seed initial flashcards for {selectedSubject}
          </button>
        )}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full py-20 text-center animate-pulse text-slate-500">
            Loading your flashcards...
          </div>
        ) : cards.length > 0 ? (
          cards.map((card) => (
            <div 
              key={card.id} 
              className="perspective-1000 h-64 w-full cursor-pointer group"
              onClick={() => handleFlip(card.id)}
            >
              <div 
                className={`relative h-full w-full transition-transform duration-700 preserve-3d ${
                  flippedCards[card.id] ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center rounded-3xl border border-violet-500/30 bg-slate-900 p-8 text-center shadow-2xl transition-all group-hover:border-violet-500/50">
                  <span className="absolute top-4 right-6 text-xs font-bold text-violet-500 uppercase tracking-widest opacity-50">Front</span>
                  <p className="text-xl font-bold text-white leading-relaxed">
                    {card.front}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm">
                    <span className="animate-bounce">🖱️</span> Click to Reveal
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center rounded-3xl border border-fuchsia-500/30 bg-slate-900 p-8 text-center shadow-2xl shadow-fuchsia-500/10">
                  <span className="absolute top-4 right-6 text-xs font-bold text-fuchsia-500 uppercase tracking-widest opacity-50">Back</span>
                  <div className="h-1 w-12 bg-fuchsia-500/30 rounded-full mb-6"></div>
                  <p className="text-lg font-medium text-slate-200 leading-relaxed">
                    {card.back}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="text-4xl mb-4">📇</div>
            <p className="text-slate-500">No flashcards found for this subject yet.</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </PageScaffold>
  )
}

export default Flashcards
