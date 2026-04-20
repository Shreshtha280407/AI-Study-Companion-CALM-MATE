<h1 align="center">AI Study Companion - CALM MATE</h1>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=32&pause=1000&color=478EF7&center=true&vCenter=true&width=500&lines=CALM+MATE;AI+Study+Companion;Practice+Smarter;Track+Progress;Powered+by+AI" />
</p>


## Problem Statement=>

Students often struggle with:

- Lack of structured study plans
- Difficulty in deciding what to practice next
- Inconsistent learning habits
- No centralized system for revision, quizzes, and tracking

## Solution=>

Calm Mate is an AI-powered platform designed to:

- Generate personalized study content
- Provide structured learning paths
- Offer practice questions, flashcards, and quizzes
- Track user progress and performance

## Key Features=>

 **Secure Authentication:** Firebase-powered login system ensuring user data privacy.
- Email/Password login 
- Google Sign-In
- Protected routes

  
**Subject-Centric Dashboard:** A unified hub where all progress, stats, and tasks are filtered based on the student's current focus.
- Subject-based learning system
- Random practice question generator
- Progress tracking (Assignments + Quiz performance)

**AI-Powered Assignment Generation:** Uses Llama 3 (GroqCloud) to generate subject-specific practice tasks instantly.
- AI-generated subject-wise practice questions
- Mark assignments as complete
- Track completion percentage

**Interactive Flashcards:** 3D-flip study cards for concept memorization, synced with Firestore.
- Topic-based flashcards
- Interactive flip UI
- Helps in quick revision

**Dynamic Learning Roadmaps:** Visual, milestone-based learning paths for Web Development, DSA, Maths, and English.
- Beginner → Intermediate → Advanced learning path
- Track topic-wise progress

**Graded Assessments:** Integrated quiz engine with real-time scoring and performance analytics.
- MCQ-based quizzes
- Score calculation
- Performance tracking

## Tech Stack=>

- **Frontend:** React 19, Vite, Tailwind CSS
-  **Backend/Database:** Firebase Firestore, Firebase Auth
-  **AI Engine:** GroqCloud SDK (Llama 3.3 70B)
-  **Routing:** React Router 7
- **State Management:** React Context API (Subject & Auth)

## Installation & Setup=>

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Shreshtha280407/AI-Study-Companion-CALM-MATE.git
    cd calm-mate
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and add your credentials:
    ```env
    VITE_FIREBASE_API_KEY=your_key
    VITE_FIREBASE_AUTH_DOMAIN=your_domain
    VITE_FIREBASE_PROJECT_ID=your_id
    VITE_FIREBASE_STORAGE_BUCKET=your_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    
    VITE_GROQ_API_KEY=your_groq_api_key
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

## Database Security=>

The project uses strict Firestore Security Rules to ensure that students can only read and write their own data. Sub-collections are nested under unique User IDs to prevent unauthorized data access.

## Future Improvements=>

- AI-based personalized recommendations
- Weak topic detection
- Daily study reminders
- Chat-based AI tutor
- Advanced analytics dashboard

 If you like this project

Give it a ⭐ on GitHub!
    
