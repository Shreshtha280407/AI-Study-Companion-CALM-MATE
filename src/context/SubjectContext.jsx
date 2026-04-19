import { createContext, useContext, useState } from 'react'

const SubjectContext = createContext()

export const SUBJECTS = ['Web Dev', 'DSA', 'Maths', 'English']

export function SubjectProvider({ children }) {
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0])

  const value = {
    selectedSubject,
    setSelectedSubject,
    subjects: SUBJECTS
  }

  return (
    <SubjectContext.Provider value={value}>
      {children}
    </SubjectContext.Provider>
  )
}

export function useSubject() {
  const context = useContext(SubjectContext)
  if (!context) {
    throw new Error('useSubject must be used within a SubjectProvider')
  }
  return context
}
