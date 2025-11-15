PrepWise — AI-Powered Job Preparation Platform

🔗 **Live Demo:**  [ Job Prep](https://jobprep-rose.vercel.app/)

An intelligent platform that generates interviews, courses, and real-time AI voice interactions using VAPI, Gemini, Firebase, and Next.js.

🚀 Overview

PrepWise is a full-stack AI application designed to help users prepare for job interviews through:

AI-generated interview questions

AI-generated study courses

Real-time voice interviews using VAPI

Personalized feedback generated from transcripts

User authentication + secure data persistence (Firebase)

This project demonstrates deep knowledge in:
✔ Next.js App Router
✔ Server Actions & API Routes
✔ Firebase Auth & Firestore
✔ VAPI real-time voice agents
✔ Google Gemini 2.0 Flash
✔ Zod validation
✔ React Hooks, Clerk-like patterns, and user session flows
✔ Clean UI with Tailwind + shadcn

🌟 Key Features
1. AI-Generated Interview Questions

Users choose:

Role

Experience level

Tech stack

Question type (technical, behavioral, or mix)

Number of questions

A server route (/api/interview-actions/create-interview) uses Gemini Flash 2.0 to generate consistent, JSON-safe structured interview questions.

2. AI-Generated Study Courses

The system can generate:

Study topics

Tailored learning paths

Course content optimized for voice delivery

This uses generateText() with strict JSON-only outputs to ensure reliability.

3. Real-Time AI Voice Calls (VAPI)

Interview sessions happen with a live conversational AI voice agent, using:

VAPI SDK

Workflow variables

Live transcript capturing

Speaking indicators

Call lifecycle events (start, stop, error)

The Agent.tsx component manages:

State machine for call status

Collecting “final transcripts”

Automatic feedback generation after interviews

4. Automated Feedback System

After the call ends, the full transcript is sent to:

/api/vapi-actions/create-feedback


The system:

Scores communication & technical skills

Generates category-level comments

Stores results in Firestore

Shows feedback dashboards inside the user profile

5. Full Authentication System

Using Firebase Client SDK + Server SDK:

Sign up

Sign in

JWT session via HttpOnly cookies

Secure access to user-generated interviews and courses

Everything validated with Zod + React Hook Form.

6. Modern UI & UX

TailwindCSS + custom components

shadcn/ui for form inputs and modals

Animated call UI

Interview cards with dynamic cover images

Dashboards with date formatting (Day.js)

🧩 Tech Stack
Frontend

React

Next.js 14 App Router

TailwindCSS

shadcn/ui

React Hook Form + Zod

VAPI SDK

Day.js

Backend

Next.js API Routes

Firebase Admin SDK

Firebase Auth

Cloud Firestore

Google Gemini 2.0 Flash via AI SDK

AI Components

Gemini Flash 2.0 for content generation

VAPI for real-time conversational interview simulations

Infrastructure

Deployed with environment-based workflows

Secure with JWT-based HttpOnly cookies

Uses dynamic routing for interview sessions, results, and course viewer


🧠 Major Engineering Decisions
1. Server-first architecture

All AI generation happens server-side:

Avoids exposing API keys

Guarantees valid JSON

Ensures consistent prompt quality

2. VAPI event-driven design

The agent listens to:

call-start

call-end

transcript

speech-start

speech-end

error

Giving the user a real interview feel.

3. Firestore separation

Collections:

courses/

interviews/

feedback/

users/

Each document is linked by userId for secure querying.

4. Error-proof JSON parsing

Every AI response is validated:

try {
  parsedQuestions = JSON.parse(questions)
} catch { ... }


Prevents app-breaking malformed AI output.

🧪 What This Project Demonstrates About Me (Developer)

 I can:

✔ Build AI-powered platforms end-to-end
✔ Work with complex voice agent workflows
✔ Implement authentication & secure backend logic
✔ Architect scalable Next.js applications
✔ Enforce input/output validation with Zod
✔ Build production-ready UI with Tailwind
✔ Integrate Firebase securely on both client + server
✔ Handle real-time streaming data (transcripts)
✔ Design clean, reusable React components
📸 Screenshots

Below is a walkthrough of the core user flows — from authentication to interview, course teaching, and feedback — showcasing the full end-to-end product experience.

🔐 Authentication

Modern, minimal sign-in experience with Firebase-backed auth.

<img width="1910" height="907" alt="auth" src="https://github.com/user-attachments/assets/39348013-4e17-40b5-a4e8-c39ba83389f7" />
🏠 Home Dashboard

A clean, fast, and intuitive UI showing recent interviews, courses, and actions.

<img width="1878" height="879" alt="home-1" src="https://github.com/user-attachments/assets/b0e1e913-3fc5-48e4-9457-b8d90fa6a597" /> <img width="1854" height="870" alt="home-2" src="https://github.com/user-attachments/assets/230eff09-c709-4a69-af67-81870d70f544" />
🎙️ Interview & Course Generation Call

Real-time AI voice call generating interview questions or course topics on the fly.

<img width="1854" height="859" alt="interview generation" src="https://github.com/user-attachments/assets/d0ee0bdb-0c96-49d8-a569-fc8583a8d20a" />
📞 Interview Test & Course Teaching

Live AI interviewer testing the user — or explaining course modules conversationally.

<img width="1776" height="901" alt="interviewtest" src="https://github.com/user-attachments/assets/56cec79a-ba45-4fb9-924c-941257ffffef" />
🧠 Interview Feedback

AI-generated evaluation with scores, breakdowns, and personalized improvement suggestions.

<img width="1856" height="844" alt="feedback-1" src="https://github.com/user-attachments/assets/bfa71236-8045-44a5-b5cc-b6fa579124f0" /> <img width="1810" height="905" alt="feedback-2" src="https://github.com/user-attachments/assets/2824bd95-a7ba-4cba-9c3a-1e17ef6afbe4" />


📦 Installation & Setup
1. Install dependencies
npm install

2. Add environment variables

Create .env.local:

NEXT_PUBLIC_VAPI_WORKFLOW_ID=


NEXT_PUBLIC_VAPI_WORKFLOW2_ID=


NEXT_PUBLIC_BASE_URL=


GOOGLE_API_KEY=


FIREBASE_PROJECT_ID=


FIREBASE_PRIVATE_KEY=


FIREBASE_CLIENT_EMAIL=

3. Start development server
npm run dev

🎯 Future Improvements (Suggested Roadmap)

Add user analytics (preparation streak, goal tracking)

Add multi-language support

Add custom interview difficulty tuning

Add downloadable PDF feedback reports

Add AI-generated resume review module
