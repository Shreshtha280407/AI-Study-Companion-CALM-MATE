import { db } from './firebase'
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  where,
  orderBy,
  limit,
  serverTimestamp 
} from 'firebase/firestore'

/**
 * Fetch all assignments for a specific user and subject
 */
export const getUserAssignments = async (userId, subject) => {
  try {
    const assignmentsRef = collection(db, 'users', userId, 'assignments')
    const q = query(assignmentsRef, where('subject', '==', subject))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error("Error fetching assignments:", error)
    throw error
  }
}

/**
 * Add a new assignment for a user
 */
export const addAssignment = async (userId, assignmentData) => {
  try {
    const assignmentsRef = collection(db, 'users', userId, 'assignments')
    const docRef = await addDoc(assignmentsRef, {
      ...assignmentData,
      completed: false,
      createdAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding assignment:", error)
    throw error
  }
}

/**
 * Toggle the completed status of an assignment
 */
export const toggleAssignmentStatus = async (userId, assignmentId, currentStatus) => {
  try {
    const assignmentRef = doc(db, 'users', userId, 'assignments', assignmentId)
    await updateDoc(assignmentRef, {
      completed: !currentStatus
    })
  } catch (error) {
    console.error("Error updating assignment status:", error)
    throw error
  }
}

/**
 * Fetch flashcards for a specific user and subject
 */
export const getUserFlashcards = async (userId, subject) => {
  try {
    const flashcardsRef = collection(db, 'users', userId, 'flashcards')
    const q = query(flashcardsRef, where('subject', '==', subject))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error("Error fetching flashcards:", error)
    throw error
  }
}

/**
 * Add a new flashcard
 */
export const addFlashcard = async (userId, flashcardData) => {
  try {
    const flashcardsRef = collection(db, 'users', userId, 'flashcards')
    const docRef = await addDoc(flashcardsRef, {
      ...flashcardData,
      createdAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding flashcard:", error)
    throw error
  }
}

/**
 * Save a quiz result
 */
export const saveQuizResult = async (userId, resultData) => {
  try {
    const resultsRef = collection(db, 'users', userId, 'quizzes')
    const docRef = await addDoc(resultsRef, {
      ...resultData,
      createdAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error("Error saving quiz result:", error)
    throw error
  }
}

/**
 * Get the latest quiz result for a user and subject
 */
export const getLatestQuizResult = async (userId, subject) => {
  try {
    const resultsRef = collection(db, 'users', userId, 'quizzes')
    const q = query(
      resultsRef, 
      where('subject', '==', subject),
      orderBy('createdAt', 'desc'),
      limit(1)
    )
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      return {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data()
      }
    }
    return null
  } catch (error) {
    console.error("Error fetching latest quiz result:", error)
    throw error
  }
}


