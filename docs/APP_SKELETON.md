# SurvAi - App Skeleton & UI Structure

## Web App (Next.js) - Routing & Structure

### App Router Structure (Next.js 14)

```
frontend/web/src/app/
├── layout.tsx                 # Root layout with providers
├── page.tsx                   # Home page (/)
├── error.tsx                  # Error page
├── not-found.tsx             # 404 page
│
├── (auth)/                    # Auth route group (no header/sidebar)
│   ├── layout.tsx            # Auth layout
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── signup/
│   │   └── page.tsx          # Signup page
│   ├── forgot-password/
│   │   └── page.tsx          # Forgot password page
│   └── reset-password/
│       └── page.tsx          # Reset password page
│
├── (dashboard)/              # Dashboard route group (with sidebar/header)
│   ├── layout.tsx            # Dashboard layout
│   ├── surveys/
│   │   ├── page.tsx          # My Surveys list
│   │   ├── [id]/
│   │   │   ├── page.tsx      # Survey details
│   │   │   ├── edit/
│   │   │   │   └── page.tsx  # Survey editor
│   │   │   └── analytics/
│   │   │       └── page.tsx  # Survey analytics
│   │   └── create/
│   │       ├── page.tsx      # Create survey
│   │       └── ai-generate/
│   │           └── page.tsx  # AI survey generation
│   │
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard
│   │
│   ├── responses/
│   │   ├── page.tsx          # All responses
│   │   └── [id]/
│   │       └── page.tsx      # Response detail
│   │
│   ├── settings/
│   │   ├── page.tsx          # Settings page
│   │   ├── profile/
│   │   │   └── page.tsx      # Profile settings
│   │   ├── account/
│   │   │   └── page.tsx      # Account settings
│   │   └── billing/
│   │       └── page.tsx      # Billing & subscription
│   │
│   └── help/
│       └── page.tsx          # Help & documentation
│
└── surveys/
    ├── [id]/
    │   └── page.tsx          # Public survey responder page (no auth required)
    └── [id]/
        └── success/
            └── page.tsx      # Thank you page
```

---

## Page Layouts & Wireframes

### 1. HOME PAGE (/)

```
┌─────────────────────────────────────────────────────────────┐
│  Logo        Navigation (Features, Pricing, Docs)  Login|SignUp │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                               │
│     🤖 Welcome to SurvAi                                    │
│     AI-Powered Survey Platform                              │
│                                                               │
│     ┌──────────────────────────────────────────────────┐   │
│     │  Create surveys with AI, analyze responses       │   │
│     │  with sentiment analysis, and get actionable     │   │
│     │  insights - all in one platform.                │   │
│     └──────────────────────────────────────────────────┘   │
│                                                               │
│           [Get Started]  [Learn More]                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Features Section:                                           │
│  ✨ AI Survey Generation                                    │
│  📊 Real-time Analytics                                     │
│  🌍 Multilingual Support                                    │
│  📱 Mobile-First Design                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Footer: Privacy, Terms, Contact, Social                    │
└─────────────────────────────────────────────────────────────┘
```

---

### 2. LOGIN PAGE (/auth/login)

```
┌─────────────────────────────────────────────────────────────┐
│                       SurvAi Logo                            │
│                                                               │
│                    ┌─────────────────┐                       │
│                    │   Welcome Back  │                       │
│                    │                 │                       │
│  Email:     ┌──────────────────────┐│                       │
│             │                      ││                       │
│             └──────────────────────┘│                       │
│                                      │                       │
│  Password:  ┌──────────────────────┐│                       │
│             │                      ││                       │
│             └──────────────────────┘│                       │
│                                      │                       │
│             ☐ Remember me           │                       │
│                                      │                       │
│             ┌──────────────────────┐│                       │
│             │  Sign In             ││                       │
│             └──────────────────────┘│                       │
│                                      │                       │
│             ┌──────────────────────┐│                       │
│             │ Forgot Password?     ││                       │
│             └──────────────────────┘│                       │
│                                      │                       │
│             Don't have an account?   │                       │
│             ┌──────────────────────┐│                       │
│             │  Create Account      ││                       │
│             └──────────────────────┘│                       │
│                    │                       │
│                    └─────────────────┘                       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

### 3. SIGNUP PAGE (/auth/signup)

```
┌─────────────────────────────────────────────────────────────┐
│                       SurvAi Logo                            │
│                                                               │
│                  ┌─────────────────┐                         │
│                  │  Create Account │                         │
│                  │                 │                         │
│  Email:    ┌──────────────────────┐│                         │
│            │                      ││                         │
│            └──────────────────────┘│                         │
│                                     │                         │
│  Password: ┌──────────────────────┐│                         │
│            │                      ││                         │
│            │ Strength: ▓▓▓░░░░░░░ ││                         │
│            └──────────────────────┘│                         │
│                                     │                         │
│  Confirm:  ┌──────────────────────┐│                         │
│            │                      ││                         │
│            └──────────────────────┘│                         │
│                                     │                         │
│  Language: ┌──────────────┐        │                         │
│            │ English ▼    │        │                         │
│            └──────────────┘        │                         │
│                                     │                         │
│  ☐ I agree to Terms of Service    │                         │
│                                     │                         │
│  ┌──────────────────────┐          │                         │
│  │  Create Account      │          │                         │
│  └──────────────────────┘          │                         │
│                                     │                         │
│  Already have account?              │                         │
│  ┌──────────────────────┐          │                         │
│  │  Sign In             │          │                         │
│  └──────────────────────┘          │                         │
│                  │                 │                         │
│                  └─────────────────┘                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

### 4. DASHBOARD PAGE (/dashboard)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  SurvAi Logo  [Dashboard]  [Surveys]  [Responses]  [Settings] [U▼]      │
├──────────────────┬───────────────────────────────────────────────────────┤
│                  │                                                        │
│  ◈ Dashboard    │  📊 Welcome back, John!                               │
│  ◈ My Surveys   │                                                        │
│  ◈ Responses    │  ┌─────────────────┐  ┌─────────────────┐            │
│  ◈ Settings     │  │ Active Surveys  │  │ Total Responses │            │
│  ◈ Help         │  │        5        │  │       1,234      │            │
│  ◈ Logout       │  └─────────────────┘  └─────────────────┘            │
│                  │                                                        │
│                  │  ┌─────────────────┐  ┌─────────────────┐            │
│                  │  │ Avg Completion  │  │ Completion Rate │            │
│                  │  │     4m 32s      │  │      78%         │            │
│                  │  └─────────────────┘  └─────────────────┘            │
│                  │                                                        │
│                  │  Recent Activity                                      │
│                  │  ┌────────────────────────────────────────────────┐   │
│                  │  │ Survey "Customer Feedback" - 42 responses     │   │
│                  │  │ 2 hours ago                                   │   │
│                  │  ├────────────────────────────────────────────────┤   │
│                  │  │ Survey "Product Survey" - 89 responses        │   │
│                  │  │ 5 hours ago                                   │   │
│                  │  ├────────────────────────────────────────────────┤   │
│                  │  │ New response on "Market Research"             │   │
│                  │  │ 8 hours ago                                   │   │
│                  │  └────────────────────────────────────────────────┘   │
│                  │                                                        │
└──────────────────┴───────────────────────────────────────────────────────┘
```

---

### 5. MY SURVEYS PAGE (/surveys)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  SurvAi Logo  [Dashboard]  [Surveys]  [Responses]  [Settings] [U▼]      │
├──────────────────┬───────────────────────────────────────────────────────┤
│                  │                                                        │
│  ◈ Dashboard    │  My Surveys                                           │
│  ◈ My Surveys   │  ┌──────────────────────────────────────────────────┐ │
│  ◈ Responses    │  │ [+ Create Survey]  [AI Generate]  [Import]      │ │
│  ◈ Settings     │  └──────────────────────────────────────────────────┘ │
│  ◈ Help         │                                                        │
│  ◈ Logout       │  Filters: [Status ▼] [Sort: Newest ▼]  🔍 Search     │
│                  │                                                        │
│                  │  ┌──────────────────────────────────────────────────┐ │
│                  │  │ 📋 Customer Feedback Survey                     │ │
│                  │  │ Published • 42 responses • 5 days ago           │ │
│                  │  │ [View] [Edit] [Analytics] [Share] [More...]    │ │
│                  │  └──────────────────────────────────────────────────┘ │
│                  │                                                        │
│                  │  ┌──────────────────────────────────────────────────┐ │
│                  │  │ 📋 Product Feedback                             │ │
│                  │  │ Published • 156 responses • 2 days ago          │ │
│                  │  │ [View] [Edit] [Analytics] [Share] [More...]    │ │
│                  │  └──────────────────────────────────────────────────┘ │
│                  │                                                        │
│                  │  ┌──────────────────────────────────────────────────┐ │
│                  │  │ 📋 Employee Satisfaction Survey                 │ │
│                  │  │ Draft • 0 responses • Created yesterday         │ │
│                  │  │ [View] [Edit] [Publish] [Delete] [More...]     │ │
│                  │  └──────────────────────────────────────────────────┘ │
│                  │                                                        │
│                  │  [Previous] [Page 1 of 3] [Next]                     │
│                  │                                                        │
└──────────────────┴───────────────────────────────────────────────────────┘
```

---

### 6. SURVEY BUILDER PAGE (/surveys/create)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  SurvAi Logo  [Dashboard]  [Surveys]  [Responses]  [Settings] [U▼]      │
├──────────────────┬───────────────────────────────────────────────────────┤
│                  │                                                        │
│  ◈ Dashboard    │  Create Survey                                        │
│  ◈ My Surveys   │                                                        │
│  ◈ Responses    │  ┌────────────────────────────────────────────────┐   │
│  ◈ Settings     │  │ Survey Title:                                  │   │
│  ◈ Help         │  │ ┌──────────────────────────────────────────┐  │   │
│  ◈ Logout       │  │ │ Customer Feedback Survey               │  │   │
│                  │  │ └──────────────────────────────────────────┘  │   │
│                  │  │                                                 │   │
│                  │  │ Description:                                    │   │
│                  │  │ ┌──────────────────────────────────────────┐  │   │
│                  │  │ │ Help us improve by sharing your         │  │   │
│                  │  │ │ feedback about our products...          │  │   │
│                  │  │ └──────────────────────────────────────────┘  │   │
│                  │  │                                                 │   │
│                  │  │ Language: [English ▼]  Theme: [Default ▼]    │   │
│                  │  └────────────────────────────────────────────────┘   │
│                  │                                                        │
│                  │  Questions                                           │
│                  │  ┌────────────────────────────────────────────────┐   │
│                  │  │ Q1: Rate your overall experience             │   │
│                  │  │     Type: Rating Scale (1-5)                 │   │
│                  │  │     [Edit] [Delete] [↑↓ Reorder]             │   │
│                  │  ├────────────────────────────────────────────────┤   │
│                  │  │ Q2: What could we improve?                    │   │
│                  │  │     Type: Text (Long)                          │   │
│                  │  │     [Edit] [Delete] [↑↓ Reorder]             │   │
│                  │  ├────────────────────────────────────────────────┤   │
│                  │  │ [+ Add Question]                             │   │
│                  │  └────────────────────────────────────────────────┘   │
│                  │                                                        │
│                  │  [Preview]  [Save Draft]  [Publish]                  │
│                  │                                                        │
└──────────────────┴───────────────────────────────────────────────────────┘
```

---

### 7. AI SURVEY GENERATOR (/surveys/create/ai-generate)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  SurvAi Logo  [Dashboard]  [Surveys]  [Responses]  [Settings] [U▼]      │
├──────────────────┬───────────────────────────────────────────────────────┤
│                  │                                                        │
│  ◈ Dashboard    │  Generate Survey with AI                             │
│  ◈ My Surveys   │                                                        │
│  ◈ Responses    │  ┌────────────────────────────────────────────────┐   │
│  ◈ Settings     │  │ 🤖 Describe your survey topic:                │   │
│  ◈ Help         │  │                                                 │   │
│  ◈ Logout       │  │ ┌──────────────────────────────────────────┐  │   │
│                  │  │ │ I want to gather feedback from          │  │   │
│                  │  │ │ customers about their shopping          │  │   │
│                  │  │ │ experience at my retail store...        │  │   │
│                  │  │ └──────────────────────────────────────────┘  │   │
│                  │  │                                                 │   │
│                  │  │ Language: [English ▼]                          │   │
│                  │  │                                                 │   │
│                  │  │ ┌──────────────────────────────────────────┐  │   │
│                  │  │ │ ✨ Generate Survey with AI              │  │   │
│                  │  │ └──────────────────────────────────────────┘  │   │
│                  │  └────────────────────────────────────────────────┘   │
│                  │                                                        │
│                  │  ⏳ Generating... (2/5 steps)                        │
│                  │  ════════════════════ 40%                          │
│                  │                                                        │
│                  │  • Analyzing your request...                         │
│                  │  • Generating questions... ⟳                         │
│                  │  • Optimizing for best results...                    │
│                  │  • Finalizing...                                     │
│                  │                                                        │
└──────────────────┴───────────────────────────────────────────────────────┘
```

---

### 8. SURVEY ANALYTICS PAGE (/surveys/[id]/analytics)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  SurvAi Logo  [Dashboard]  [Surveys]  [Responses]  [Settings] [U▼]      │
├──────────────────┬───────────────────────────────────────────────────────┤
│                  │                                                        │
│  ◈ Dashboard    │  Customer Feedback Survey - Analytics                │
│  ◈ My Surveys   │  [Share] [Export] [Live Updates]                     │
│  ◈ Responses    │                                                        │
│  ◈ Settings     │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │
│  ◈ Help         │  │ Responses  │  │ Completion │  │ Avg Time   │     │
│  ◈ Logout       │  │     42     │  │    78%     │  │  4m 32s    │     │
│                  │  └────────────┘  └────────────┘  └────────────┘     │
│                  │                                                        │
│                  │  Sentiment Analysis                                  │
│                  │  ┌────────────────────────────────────────────────┐   │
│                  │  │                                                │   │
│                  │  │  Positive  ███████████████░░░░  60%           │   │
│                  │  │  Neutral   █████░░░░░░░░░░░░░░  25%           │   │
│                  │  │  Negative  ████░░░░░░░░░░░░░░░  15%           │   │
│                  │  │                                                │   │
│                  │  └────────────────────────────────────────────────┘   │
│                  │                                                        │
│                  │  Question Analytics                                  │
│                  │  ┌────────────────────────────────────────────────┐   │
│                  │  │ Q1: Rate your overall experience              │   │
│                  │  │ [Chart showing distribution]                  │   │
│                  │  │ Avg: 4.2/5.0                                  │   │
│                  │  └────────────────────────────────────────────────┘   │
│                  │                                                        │
│                  │  ┌────────────────────────────────────────────────┐   │
│                  │  │ Q2: What could we improve?                    │   │
│                  │  │ Key themes: Product quality, Service, Pricing│   │
│                  │  └────────────────────────────────────────────────┘   │
│                  │                                                        │
│                  │  [View All Responses]                               │
│                  │                                                        │
└──────────────────┴───────────────────────────────────────────────────────┘
```

---

### 9. PUBLIC SURVEY RESPONDER PAGE (/surveys/[id])

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           SurvAi                                         │
│                                                                           │
│                    Customer Feedback Survey                              │
│                    Help us improve!                                      │
│                                                                           │
│                   Progress: ▓▓▓▓▓░░░░░ 50% (2/4)                        │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                                                                    │ │
│  │ Question 1 of 4:                                                 │ │
│  │ How satisfied are you with our service?                          │ │
│  │                                                                    │ │
│  │  ○ Very Dissatisfied                                             │ │
│  │  ○ Dissatisfied                                                  │ │
│  │  ◉ Neutral                                                       │ │
│  │  ○ Satisfied                                                     │ │
│  │  ○ Very Satisfied                                                │ │
│  │                                                                    │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│              [Back]              [Next]                                  │
│                                                                           │
│  This is a secure and anonymous survey. Your privacy is protected.      │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 10. SETTINGS PAGE (/settings)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  SurvAi Logo  [Dashboard]  [Surveys]  [Responses]  [Settings] [U▼]      │
├──────────────────┬───────────────────────────────────────────────────────┤
│                  │                                                        │
│  ◈ Dashboard    │  Settings                                             │
│  ◈ My Surveys   │  ┌────────────────────┐                               │
│  ◈ Responses    │  │ ◈ Profile          │                               │
│  ◈ Settings     │  │ ◈ Account          │                               │
│  ◈ Help         │  │ ◈ Billing          │                               │
│  ◈ Logout       │  │ ◈ Notifications    │                               │
│                  │  │ ◈ Privacy          │                               │
│                  │  │ ◈ Integrations     │                               │
│                  │  └────────────────────┘                               │
│                  │                                                        │
│                  │  Profile Settings                                     │
│                  │  ┌────────────────────────────────────────────────┐   │
│                  │  │ [Profile Picture]                              │   │
│                  │  │                                                 │   │
│                  │  │ First Name: [___________________]              │   │
│                  │  │ Last Name:  [___________________]              │   │
│                  │  │ Email:      [___________________] ✓ Verified  │   │
│                  │  │ Language:   [English ▼]                        │   │
│                  │  │ Timezone:   [UTC (GMT+0) ▼]                   │   │
│                  │  │                                                 │   │
│                  │  │ ┌──────────────────────────────────────────┐  │   │
│                  │  │ │ Save Changes                             │  │   │
│                  │  │ └──────────────────────────────────────────┘  │   │
│                  │  └────────────────────────────────────────────────┘   │
│                  │                                                        │
└──────────────────┴───────────────────────────────────────────────────────┘
```

---

## Mobile App (React Native) - Screen Structure

### Navigation Stack

```
RootNavigator
├── AuthStack
│   ├── LoginScreen
│   ├── SignupScreen
│   └── ForgotPasswordScreen
│
└── AppStack
    ├── BottomTabNavigator
    │   ├── DashboardScreen
    │   ├── SurveysScreen
    │   ├── AnalyticsScreen
    │   └── ProfileScreen
    │
    └── Modal Screens
        ├── SurveyDetailModal
        ├── CreateSurveyModal
        ├── SettingsModal
        └── SurveyResponderModal
```

---

### Mobile Screens (Mockups)

#### 1. Mobile Login Screen

```
┌─────────────────────────────┐
│                             │
│         SurvAi              │
│         Logo                │
│                             │
│    Welcome Back             │
│                             │
│  ┌─────────────────────┐   │
│  │ Email               │   │
│  │ user@example.com    │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ Password            │   │
│  │ •••••••••           │   │
│  └─────────────────────┘   │
│                             │
│  ☐ Remember me              │
│                             │
│  ┌─────────────────────┐   │
│  │ Sign In             │   │
│  └─────────────────────┘   │
│                             │
│ < Forgot Password?          │
│ < Create Account            │
│                             │
└─────────────────────────────┘
```

---

#### 2. Mobile Dashboard Screen

```
┌─────────────────────────────┐
│ ☰  Home              👤      │
├─────────────────────────────┤
│ Welcome, John!              │
│                             │
│ ┌──────────┐  ┌──────────┐ │
│ │ Active   │  │ Total    │ │
│ │ Surveys  │  │ Responses│ │
│ │    5     │  │  1,234   │ │
│ └──────────┘  └──────────┘ │
│                             │
│ Quick Stats                 │
│ ┌─────────────────────────┐ │
│ │ Completion Rate  78%    │ │
│ │ Avg Time         4m 32s │ │
│ └─────────────────────────┘ │
│                             │
│ Recent Surveys              │
│ ┌─────────────────────────┐ │
│ │ Customer Feedback ✓     │ │
│ │ 42 responses • 2d ago   │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Product Survey ✓        │ │
│ │ 89 responses • 5d ago   │ │
│ └─────────────────────────┘ │
│                             │
├─────────────────────────────┤
│ [Home] [Surveys] [Analytics]│
│ [Profile]                   │
└─────────────────────────────┘
```

---

#### 3. Mobile Surveys List

```
┌─────────────────────────────┐
│ < My Surveys            ⋮   │
├─────────────────────────────┤
│  ⊕ Create              🔍    │
├─────────────────────────────┤
│ Filters: Active ▼       ↕    │
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │ 📋 Customer Feedback    │ │
│ │ 42 responses • Active   │ │
│ │ [View] [Share] [More]   │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 📋 Product Survey       │ │
│ │ 89 responses • Active   │ │
│ │ [View] [Share] [More]   │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 📋 Employee Satisfaction│ │
│ │ 0 responses • Draft     │ │
│ │ [View] [Edit] [Delete]  │ │
│ └─────────────────────────┘ │
│                             │
├─────────────────────────────┤
│ [Home] [Surveys] [Analytics]│
│ [Profile]                   │
└─────────────────────────────┘
```

---

#### 4. Mobile Survey Response Form

```
┌─────────────────────────────┐
│ < Customer Feedback     ✓    │
├─────────────────────────────┤
│ Progress: ▓▓▓░░░░░░  (1/4)  │
├─────────────────────────────┤
│                             │
│ How satisfied are you with  │
│ our service?                │
│                             │
│ ○ Very Dissatisfied         │
│ ○ Dissatisfied              │
│ ◉ Neutral                   │
│ ○ Satisfied                 │
│ ○ Very Satisfied            │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│      [Back]  [Next]         │
│                             │
├─────────────────────────────┤
│ Question 1 of 4             │
└─────────────────────────────┘
```

---

#### 5. Mobile Analytics

```
┌─────────────────────────────┐
│ < Analytics             📊   │
├─────────────────────────────┤
│ Customer Feedback Survey    │
│                             │
│ ┌──────────┐  ┌──────────┐ │
│ │Responses │  │Completion│ │
│ │   42     │  │   78%    │ │
│ └──────────┘  └──────────┘ │
│                             │
│ Sentiment                   │
│ Positive   ███  60%         │
│ Neutral    ██   25%         │
│ Negative   ░    15%         │
│                             │
│ Question 1: How satisfied   │
│ Rating Distribution         │
│ ★★★★★ (5) ▓▓▓▓  25%        │
│ ★★★★☆ (4) ▓▓▓▓▓ 35%        │
│ ★★★☆☆ (3) ▓▓▓   20%        │
│ ★★☆☆☆ (2) ▓     10%        │
│ ★☆☆☆☆ (1) ░      5%        │
│                             │
│ [View More Questions]       │
│                             │
├─────────────────────────────┤
│ [Home] [Surveys] [Analytics]│
│ [Profile]                   │
└─────────────────────────────┘
```

---

## Component Hierarchy

### Web Application Components

```
<RootLayout>
  <Header>
    <Logo />
    <Navigation />
    <UserMenu />
  </Header>

  <MainContent>
    <AuthLayout> OR <DashboardLayout>
      {pageContent}
    </AuthLayout>
  </MainContent>

  <Footer />
</RootLayout>
```

### Dashboard Components

```
<DashboardLayout>
  <Sidebar>
    <NavItem />
    <NavItem />
    <NavItem />
    <UserProfile />
    <LogoutButton />
  </Sidebar>

  <MainArea>
    <Header />
    <PageContent>
      {children}
    </PageContent>
  </MainArea>
</DashboardLayout>
```

### Survey Builder Components

```
<SurveyBuilder>
  <SurveyHeader>
    <TitleInput />
    <DescriptionInput />
    <MetadataForm />
  </SurveyHeader>

  <QuestionsSection>
    <QuestionList>
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
    </QuestionList>
    <AddQuestionButton />
  </QuestionsSection>

  <QuestionEditor>
    <QuestionTypeSelector />
    <QuestionText />
    <OptionsManager />
    <ValidationRules />
  </QuestionEditor>

  <PreviewPanel />

  <ActionButtons>
    <SaveDraftButton />
    <PublishButton />
  </ActionButtons>
</SurveyBuilder>
```

### Analytics Components

```
<AnalyticsDashboard>
  <StatisticsCards>
    <StatCard label="Responses" value={42} />
    <StatCard label="Completion Rate" value="78%" />
    <StatCard label="Avg Time" value="4m 32s" />
  </StatisticsCards>

  <SentimentChart data={sentimentData} />

  <QuestionAnalytics>
    <QuestionCard />
    <QuestionCard />
  </QuestionAnalytics>

  <ResponseTimeline data={timelineData} />

  <ExportButtons />
</AnalyticsDashboard>
```

---

## UI Component Library (Shadcn/UI based)

```
Components to Create:
├── Button
├── Card
├── Modal / Dialog
├── Input
├── Textarea
├── Select / Dropdown
├── Radio Group
├── Checkbox
├── Tabs
├── Progress Bar
├── Alert
├── Toast / Notification
├── Loading Spinner
├── Chart Components
│   ├── PieChart
│   ├── BarChart
│   ├── LineChart
│   └── Table
├── Form Components
│   ├── FormField
│   ├── FormLabel
│   ├── FormError
│   └── FormInput
├── Navigation
│   ├── Header
│   ├── Sidebar
│   ├── Breadcrumb
│   └── Pagination
└── Special Components
    ├── SurveyPreview
    ├── ResponseCard
    ├── AnalyticsWidget
    └── ShareModal
```

---

## Page Route Map

### Public Routes (No Auth Required)
```
GET  /                          Home Page
GET  /surveys/{id}              Public Survey Responder
GET  /surveys/{id}/success      Thank You Page
```

### Auth Routes (Auth Required)
```
GET  /dashboard                 Main Dashboard
GET  /surveys                   My Surveys List
GET  /surveys/create            Survey Builder
GET  /surveys/create/ai-generate AI Generator
GET  /surveys/{id}              Survey Details
GET  /surveys/{id}/edit         Survey Editor
GET  /surveys/{id}/analytics    Survey Analytics
GET  /responses                 All Responses
GET  /responses/{id}            Response Detail
GET  /settings                  Settings
GET  /settings/profile          Profile Settings
GET  /settings/account          Account Settings
GET  /settings/billing          Billing Settings
```

---

## Data Flow Diagram

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌──────────────────────────────┐
│   Frontend Layer             │
│  (React Components)          │
│  - Pages                     │
│  - Components                │
│  - Hooks                     │
└──────────┬───────────────────┘
           │
           │ API Calls
           ▼
┌──────────────────────────────┐
│   API Client                 │
│  (Axios with Interceptors)   │
│  - Authentication            │
│  - Error Handling            │
│  - Token Management          │
└──────────┬───────────────────┘
           │
           │ HTTP/REST
           ▼
┌──────────────────────────────┐
│   Backend API                │
│  (FastAPI)                   │
│  - Authentication            │
│  - Business Logic            │
│  - Data Validation           │
└──────────┬───────────────────┘
           │
           ├─────────┬──────────┬─────────┐
           ▼         ▼          ▼         ▼
      ┌────────┐┌──────┐┌──────┐┌──────┐
      │Database││Redis ││S3    ││APIs  │
      │(PgSQL) ││Cache ││Files ││(OpenAI,
      └────────┘└──────┘└──────┘ etc)  │
                                 └──────┘
```

---

## State Management Flow

```
┌──────────────────┐
│  User Logs In    │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│  AuthContext                 │
│  - user (User object)        │
│  - isAuthenticated (boolean) │
│  - isLoading (boolean)       │
│  - error (string | null)     │
│  - login()                   │
│  - logout()                  │
│  - register()                │
└────────┬─────────────────────┘
         │ Provides
         ▼
┌──────────────────────────────┐
│  App Components              │
│  - Conditional Rendering     │
│  - Route Protection          │
│  - User Info Display         │
└──────────────────────────────┘
```

---

This is the complete skeleton and structure of the SurvAi application!
