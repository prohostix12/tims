# Scholarship Program System - Setup & Administration Guide

## Overview

The scholarship program features a comprehensive system for managing student applications, conducting category-specific exams, and awarding vouchers based on performance.

## Key Features

✅ **Category-Based Question Banks**: Separate question pools for Online UG, Online PG, and Credit Transfer programs
✅ **Student Application Form**: Program-based selection with course filtering
✅ **Category-Specific Exams**: Each student takes questions from their selected program's question bank
✅ **Admin Management Panel**: Full CRUD operations for questions, configurations, and applications
✅ **Voucher System**: Automatic voucher generation based on exam scores
✅ **Score Tiers**: Configurable performance-based rewards

## Question Banking System

### Question Categories

| Category | Purpose | Typical Students |
|----------|---------|------------------|
| **Online UG** | Undergraduate distance learning | Students pursuing bachelor's degrees online |
| **Online PG** | Postgraduate distance learning | Students pursuing master's degrees online |
| **Credit Transfer** | Course/Degree migration | Dropouts, switchers, credit accumulation |
| **General** | Fallback category | When no category-specific questions exist |

### Current Question Bank Stats

- **Online UG**: 10 questions
- **Online PG**: 10 questions  
- **Credit Transfer**: 10 questions
- **Total**: 30 questions

## Seeding Questions

### Run the Seed Script

```bash
node seed-scholarship-questions.mjs
```

The script will:
1. Clear existing questions (use with caution)
2. Populate 10 Online UG questions
3. Populate 10 Online PG questions
4. Populate 10 Credit Transfer questions
5. Display a summary of the question bank

**Note**: This script uses `.env.local` for database connection. Ensure `MONGODB_URI` is set.

## Student Application Flow

```
1. Student visits scholarship page
2. Student fills form:
   - Name, Phone, Email
   - Selects Program (Online UG/PG, Credit Transfer)
   - Selects Course (filtered by program)
3. Form validates and submission:
   - API categorizes student by program selection
   - Pulls 5 random questions from matching category
   - Creates application record with questions
   - Returns token for exam access
4. Student receives exam link with token
5. Student takes exam:
   - Questions loaded from their category's bank
   - Options shuffled for each question
   - Submission scored automatically
   - Voucher generated if score meets threshold
```

## Admin Panel Management

### Access Admin Panel

Navigate to: `/admin/scholarship`

### Question Management Tab

**Add Question**:
1. Click "Add Question" button
2. Select category (Online UG, Online PG, Credit Transfer, General)
3. Enter question text
4. Add 2-6 multiple choice options
5. Mark the correct answer by clicking the circle
6. Set display order (optional)
7. Click "Save"

**Edit Question**:
1. Click edit icon (pencil) on any question card
2. Update question, category, or options
3. Click "Save"

**Delete Question**:
1. Click delete icon (trash) on any question card
2. Confirm deletion in modal

**Filter by Category**:
- Use colored category buttons at top to view questions in each bank
- Badge shows count of questions in each category

### Configuration Tab

**Score → Voucher Tiers**:
- Set minimum score thresholds (e.g., 60%, 75%, 90%)
- Assign voucher amounts for each tier
- Students receive the highest tier they qualify for

**Exam Settings**:
- Voucher Validity (days): How long voucher is valid (default: 90)
- Passing Score: Minimum % to pass (default: 50%)
- Questions per Exam: Number of questions in each exam (default: 5)

**Eligible Courses**:
- List courses available in scholarship program
- Add/remove courses from the dropdown list

### Applications Tab

**View Applicants**:
- See all student applications with:
  - Name, phone, email
  - Course and program selected
  - Exam status (Completed/Pending)
  - Score and voucher amount
  - Application date

**Delete Application**:
- Remove an application record (use with caution)

## API Endpoints

### Public Endpoints

**POST `/api/public/scholarship/apply`**
- Submit scholarship application
- Body: `{ name, phone, email, course, university }`
- Returns: `{ token, message }`

**GET `/api/public/scholarship/exam`**
- Fetch exam questions for student
- Query: `?token={studentToken}`
- Returns: `{ questions: [...], applicantName }`

**POST `/api/public/scholarship/submit`**
- Submit exam answers and get results
- Body: `{ token, answers: [{ questionId, selectedOption }] }`
- Returns: `{ score, voucherCode, voucherAmount, passed }`

### Admin Endpoints

**GET `/api/admin/scholarship/questions`**
- List all questions
- Query filters: `?category=Online%20UG`

**POST `/api/admin/scholarship/questions`**
- Create new question
- Body: `{ question, options, category, order, isActive }`

**PUT `/api/admin/scholarship/questions/{id}`**
- Update question
- Body: `{ question, options, category, order, isActive }`

**DELETE `/api/admin/scholarship/questions/{id}`**
- Delete question

**GET/POST/PUT `/api/admin/scholarship/config`**
- Get or update exam configuration

## Database Models

### ScholarshipQuestion
```typescript
{
  _id: ObjectId
  question: String        // Question text
  options: [{             // Multiple choice options
    text: String
    isCorrect: Boolean
  }]
  order: Number           // Display order
  isActive: Boolean       // Active/Inactive flag
  category: String        // 'Online UG' | 'Online PG' | 'Credit Transfer' | 'General'
  createdAt: Date
  updatedAt: Date
}
```

### ScholarshipApplication
```typescript
{
  _id: ObjectId
  name: String
  phone: String (unique)
  email: String (unique, lowercase)
  course: String
  university: String      // Actually stores program category
  token: String (unique)  // For exam access
  questionIds: ObjectId[] // References to ScholarshipQuestion
  examCompleted: Boolean
  score: Number           // Student's score
  totalQuestions: Number  // Total questions in exam
  voucherCode: String     // Generated voucher code
  voucherAmount: Number   // Voucher value in rupees
  voucherLabel: String    // Tier label (e.g., "Gold Scholar")
  voucherValidUntil: Date
  createdAt: Date
  updatedAt: Date
}
```

### ScholarshipConfig
```typescript
{
  _id: ObjectId
  passingScore: Number           // e.g., 50
  voucherValidityDays: Number    // e.g., 90
  totalQuestionsForScore: Number // e.g., 5
  tiers: [{
    label: String
    minScore: Number (%)
    amount: Number (₹)
  }]
  eligibleCourses: String[]
  createdAt: Date
  updatedAt: Date
}
```

## Common Tasks

### Add 10 More Questions to a Category

1. Edit `seed-scholarship-questions.mjs`
2. Add 10 new question objects to the appropriate array:
   - `onlineUGQuestions`
   - `onlinePGQuestions`
   - `creditTransferQuestions`
3. Update order numbers (11-20)
4. Run: `node seed-scholarship-questions.mjs`

### Change Exam Settings

1. Go to Admin Panel → Configuration Tab
2. Adjust:
   - Questions per Exam: Change from 5 to desired number
   - Passing Score: Change percentage threshold
   - Voucher Validity: Adjust days
3. Click "Save Configuration"

### Check Question Distribution

**Via MongoDB**:
```
db.scholarshipquestions.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } }
])
```

**Via Admin Panel**: Navigate to Questions tab and check the colored category buttons showing question counts.

## Troubleshooting

**Problem**: Student sees "Exam questions are not ready yet"
- **Cause**: No questions exist in their program category
- **Solution**: Add questions via admin panel or run seed script

**Problem**: Student submits form but doesn't receive exam link
- **Cause**: Duplicate phone/email
- **Solution**: Use different phone/email or admin can delete the previous application

**Problem**: Student's exam score doesn't match expected result
- **Cause**: Check if they selected correct options
- **Solution**: Review answers in applications tab, contact student if needed

**Problem**: Questions appear in wrong category
- **Cause**: During bulk import, categories might be mixed
- **Solution**: Edit each question in admin panel and select correct category

## Version History

- **v1.0** (Current): Category-based question banking with 30 seeded questions (10 per category)
  - Online UG questions focus on flexibility and working students
  - Online PG questions focus on career advancement
  - Credit Transfer questions focus on credit evaluation and eligibility

---

**Last Updated**: 2024
**Maintainer**: Admin Team
**Support**: Contact support@prohostix.com
