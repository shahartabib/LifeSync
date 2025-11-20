# 🎨 SurvAi - Visual Design Guide

## Quick Overview

### 🌐 Web Application User Flows

```
FIRST TIME USER
┌─────────────┐     ┌──────────┐     ┌─────────────┐     ┌──────────────┐
│   Home      │───▶ │  Signup  │───▶ │  Dashboard  │───▶ │   Create     │
│   Page      │     │  Page    │     │   Page      │     │   Survey     │
└─────────────┘     └──────────┘     └─────────────┘     └──────────────┘
      │                                                          │
      │ [Login]                                                  │
      ▼                                                          ▼
┌──────────────┐                                      ┌──────────────────┐
│  Login Page  │                                      │  Survey Builder  │
│              │                                      │  (Edit/Add Q's)  │
└──────────────┘                                      └──────────────────┘
                                                              │
                                                              ▼
                                                      ┌──────────────────┐
                                                      │  Publish Survey  │
                                                      └──────────────────┘


RETURNING USER
┌─────────────┐     ┌──────────┐     ┌──────────────────┐
│   Home      │───▶ │  Login   │───▶ │    Dashboard     │
│   Page      │     │  Page    │     │   (View Stats)   │
└─────────────┘     └──────────┘     └──────────────────┘
                                              │
                          ┌───────────┬───────┴───────┬──────────┐
                          ▼           ▼               ▼          ▼
                    ┌──────────┐ ┌──────────┐ ┌─────────┐ ┌────────────┐
                    │  My      │ │ Create   │ │Analytics│ │ Settings   │
                    │ Surveys  │ │ Survey   │ │ View    │ │ Page       │
                    └──────────┘ └──────────┘ └─────────┘ └────────────┘


SURVEY RESPONDER (PUBLIC)
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Survey Share    │───▶ │  Survey Form     │───▶ │  Thank You        │
│  Link / QR Code  │     │  (Questions)     │     │  Page             │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

---

## 📱 Mobile User Flows

```
LOGIN FLOW
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Login   │───▶ │  Enter   │───▶ │Dashboard │
│  Screen  │     │ Creds    │     │  Screen  │
└──────────┘     └──────────┘     └──────────┘
       │                                │
       │[Create Account]               │
       ▼                                ▼
┌──────────────┐                ┌──────────────┐
│   Signup     │                │ Tab Navigator│
│   Screen     │                │ - Home       │
└──────────────┘                │ - Surveys    │
                                │ - Analytics  │
                                │ - Profile    │
                                └──────────────┘


SURVEY FLOW
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Surveys     │───▶ │ Survey List  │───▶ │ Survey Form  │
│  Tab         │     │ with Filter  │     │ (Respond)    │
└──────────────┘     └──────────────┘     └──────────────┘
                            │                     │
                            │[Create]             │[Submit]
                            ▼                     ▼
                    ┌──────────────┐     ┌──────────────┐
                    │ Create       │     │ Thank You    │
                    │ Survey Modal │     │ Screen       │
                    └──────────────┘     └──────────────┘


ANALYTICS FLOW
┌──────────────────────────────┐
│   Analytics Tab              │
│ - Pie Chart (Sentiment)      │
│ - Bar Chart (Ratings)        │
│ - Stats Cards                │
│ - Question Breakdown         │
└──────────────────────────────┘
```

---

## 🎯 Key Screens Summary

### WEB APPLICATION

| Screen | Purpose | Key Features |
|--------|---------|--------------|
| **Home** | Landing & intro | Features, CTA buttons, Navigation |
| **Login** | User authentication | Email/pass input, Remember me, Recovery |
| **Signup** | New user registration | Email, password strength, Terms, Lang select |
| **Dashboard** | Main hub | Welcome, Stats, Activity, Quick actions |
| **My Surveys** | Survey management | List, Filter, Sort, Actions (Edit/Share) |
| **Survey Builder** | Create surveys | Title/desc, Drag-drop questions, Preview |
| **AI Generator** | Auto-generate | Prompt input, Progress bar, Result preview |
| **Survey Form** | Respond to survey | Typed questions, Progress bar, Submit |
| **Analytics** | View results | Charts, Sentiment, Response breakdown |
| **Settings** | User preferences | Profile, Account, Notifications, Privacy |

### MOBILE APPLICATION

| Screen | Purpose | Key Features |
|--------|---------|--------------|
| **Login** | Authentication | Email/password, Biometric ready |
| **Dashboard** | Overview | Stats, Recent surveys, Quick actions |
| **Surveys List** | All surveys | Swipe actions, Filter, Search |
| **Survey Form** | Respond | Full-screen questions, Swipe navigation |
| **Analytics** | View stats | Charts optimized for mobile, Scrollable |
| **Profile** | User info | Avatar, Settings, Logout |

---

## 🎨 Design System

### Color Palette

```
Primary Colors:
  - Primary Blue:     #0ea5e9 (Sky blue - Actions, Links)
  - Secondary Gray:   #64748b (Slate - Text, Borders)
  - Success Green:    #10b981 (Emerald - Confirmations)
  - Warning Orange:   #f59e0b (Amber - Alerts)
  - Danger Red:       #ef4444 (Rose - Errors)

Neutral Colors:
  - Dark:     #0f172a (Almost black)
  - Light:    #f8fafc (Almost white)
  - Gray:     #94a3b8 (Medium gray)
```

### Typography

```
Headings:
  - H1: 32px, Bold (Titles)
  - H2: 24px, Bold (Section headers)
  - H3: 20px, Semibold (Subsections)
  - H4: 16px, Semibold (Card titles)

Body:
  - Regular: 16px, Regular (Body text)
  - Small: 14px, Regular (Secondary text)
  - Tiny: 12px, Regular (Captions)

Font Family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI"
```

### Spacing (8px grid)

```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

### Border Radius

```
sm: 4px (Small elements)
md: 8px (Cards, inputs)
lg: 12px (Large cards)
full: 9999px (Pills, circles)
```

---

## 🏗️ Layout Structure

### Web - Desktop Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Logo    Navigation       Search    Profile Menu  Settings  │  Header (60px)
├────────────────────────────────────────────────────────────┤
│ │                                                             │
│ │ Sidebar     │  Main Content Area                           │
│ │             │                                              │
│ │ - Dashboard │  ┌──────────────────────────────────────┐   │
│ │ - Surveys   │  │                                      │   │
│ │ - Analytics │  │     Page Content                     │   │
│ │ - Settings  │  │                                      │   │
│ │             │  └──────────────────────────────────────┘   │
│ │ User Info   │                                              │
│ │ Logout      │                                              │
│ │             │                                              │
└─────────────────────────────────────────────────────────────┘
  240px        1fr
```

### Mobile - Full Screen Layout

```
┌──────────────────────────┐
│ Header (56px)            │
├──────────────────────────┤
│                          │
│  Main Content Area       │
│  (Full Width)            │
│                          │
│                          │
│                          │
├──────────────────────────┤
│ Bottom Tab Navigation    │
│ (56px)                   │
└──────────────────────────┘
```

---

## 📊 Component Sizes & Spacing

### Buttons

```
Primary Button
┌──────────────────────┐
│  Create Survey       │  Height: 44px
│                      │  Padding: 12px 24px
└──────────────────────┘  Corner: 8px

Secondary Button
┌──────────────────────┐
│  Cancel              │  Height: 40px
└──────────────────────┘

Small Button (Icon)
┌────┐
│ 🔍 │  Height: 32px
└────┘
```

### Input Fields

```
┌─────────────────────────────────────────────┐
│ Label: Email Address                        │
│ ┌───────────────────────────────────────┐   │
│ │ user@example.com                  ✓  │   │ Height: 44px
│ └───────────────────────────────────────┘   │
│ Helper text: We'll never share your email   │
└─────────────────────────────────────────────┘
```

### Cards

```
┌─────────────────────────┐
│                         │
│  Card Content           │ Padding: 24px
│  - Title                │ Border-radius: 12px
│  - Description          │ Box-shadow: 0 1px 3px
│                         │ Background: #fff
│                         │
└─────────────────────────┘
```

---

## 🔄 Animations & Transitions

```
Page Transitions:       200ms ease-out fade
Button Hover:           150ms ease-out scale
Form Focus:             200ms ease-out color
Loading Spinner:        1s linear infinite
Progress Bar:           300ms ease-out width
Slide In (Mobile):      250ms ease-out transform
Dropdown Open:          200ms ease-out opacity/transform
```

---

## ♿ Accessibility

### Focus States
- All interactive elements have visible focus ring (2px, #0ea5e9)
- Focus visible on keyboard navigation

### ARIA Labels
- Buttons have aria-label for screen readers
- Form inputs have associated labels
- Icons have aria-hidden or labels

### Color Contrast
- Text: Minimum 4.5:1 ratio (WCAG AA)
- UI Components: Minimum 3:1 ratio

### Keyboard Navigation
- Tab order follows visual flow
- Escape to close modals
- Enter to submit forms
- Arrow keys for list navigation

---

## 📐 Responsive Breakpoints

```
Mobile:  320px - 640px  (sm)
Tablet:  641px - 1024px (md)
Desktop: 1025px+        (lg)

Grid System: 12 columns
- Mobile:  12 columns, 1 column layouts
- Tablet:  6-8 columns, 2 column layouts
- Desktop: 12 columns, 3-4 column layouts
```

---

## 🎬 User Journey Maps

### First-Time User Journey

```
Step 1: Discovers SurvAi
   ↓ (Homepage → Features → CTA)
Step 2: Signs Up
   ↓ (Email → Password → Confirm)
Step 3: Email Verification
   ↓ (Click link in email)
Step 4: First Login
   ↓ (Successful auth)
Step 5: Dashboard Welcome
   ↓ (See dashboard stats)
Step 6: Create First Survey
   ↓ (Builder or AI Generator)
Step 7: Publish Survey
   ↓ (Share link/QR)
Step 8: Get First Response
   ↓ (Response submitted)
Step 9: View Analytics
   ↓ (See results)
Step 10: Pro User
   ✓ (Fully engaged)
```

### Survey Creator Journey

```
Have Idea
   ↓
Choose Method [Create | AI Generate]
   ├─→ Manual Create
   │     ↓
   │  Add Questions [Add → Set Type → Configure]
   │     ↓
   │  Preview
   │     ↓
   │  Publish
   │
   └─→ AI Generate
         ↓
      Describe Topic
         ↓
      AI Generates
         ↓
      Review & Edit
         ↓
      Publish

Final Step (Both Paths)
   ↓
Share Survey [Link | QR | Email]
   ↓
Monitor Responses [Live]
   ↓
View Analytics [Sentiment, Charts, Insights]
```

### Survey Responder Journey

```
Receive Survey [Link | QR | Email | Embed]
   ↓
Open Survey
   ↓
See First Question
   ↓
Answer Questions [Iterate until end]
   ├─→ Text Answer
   ├─→ Multiple Choice
   ├─→ Rating Scale
   └─→ Other Types
   ↓
Review Answers
   ↓
Submit Response
   ↓
See Thank You
   ✓ (Complete)
```

---

## 📱 Mobile-First Approach

### Progressive Enhancement

```
Mobile Base (320px+)
  ↓
Tablet Enhancements (640px+)
  ↓
Desktop Enhancements (1025px+)

Example - Survey List:
Mobile:  Single column stack
Tablet:  2-column grid
Desktop: 3-4 column grid with sidebar
```

---

## 🎯 Design Goals

- **Simplicity**: Intuitive, no learning curve
- **Clarity**: Clear calls-to-action
- **Consistency**: Unified design language
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Fast load times, smooth animations
- **Mobile-First**: Perfect on all devices
- **Dark Mode Ready**: Foundation for dark theme

---

## 📊 Sample Dashboard Metrics Display

```
Top Row (KPIs)
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Surveys   │  │ Responses   │  │ Completion  │
│      5      │  │    1,234    │  │     78%     │
└─────────────┘  └─────────────┘  └─────────────┘

Charts Row
┌─────────────────────┐  ┌──────────────────────┐
│ Response Timeline   │  │ Sentiment Analysis   │
│ (Line Chart)        │  │ (Pie Chart)          │
└─────────────────────┘  └──────────────────────┘

List Row
┌──────────────────────────────────────────────┐
│ Recent Surveys / Responses                   │
│ - Item 1 with metadata and actions           │
│ - Item 2 with metadata and actions           │
│ - Item 3 with metadata and actions           │
└──────────────────────────────────────────────┘
```

---

This visual guide serves as the design blueprint for implementing the SurvAi UI components!
