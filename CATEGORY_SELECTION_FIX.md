# How to Add/Edit Questions in Each Category Section

## ✅ Issue Fixed

Previously, when you added or edited questions in a specific category section (Online UG, Online PG, Credit Transfer), they might end up in the "General" category instead. This has been fixed.

## How to Properly Add Questions to Each Section

### Step-by-Step Guide

**1. Navigate to the Scholarship Admin Panel**
- Go to `/admin/scholarship`
- Click on the "Exam Questions" tab

**2. Select a Category**
Click one of the category buttons at the top:
- 🔵 **Online UG** - For undergraduate online programs
- 🟣 **Online PG** - For postgraduate online programs  
- 🟢 **Credit Transfer** - For credit transfer programs
- ⚫ **General** - For general questions (fallback)

The selected button will highlight and show how many questions are in that category.

**3. Add a New Question**
Click the red "+ Add Question" button. The form will automatically:
- Pre-select the category you're currently viewing
- Set the order number based on existing questions in that category
- Open an edit modal

**4. Fill in the Question Details**
- **Question Text**: Enter your question
- **Category**: Should already be set to your selected category (you can change it if needed)
- **Options**: Add 2-6 multiple choice options
- **Mark Correct Answer**: Click the circle next to the correct option
- **Order**: Adjust display order if needed

**5. Save the Question**
Click "Save" button. The question will be saved to the selected category.

---

## How to Edit Questions in a Category

**1. Navigate to the Questions Tab**

**2. Select the Category** with questions you want to edit
Click on the category button showing the questions you want to modify

**3. Click the Edit Icon** (pencil ✏️) on any question card

**4. Edit the Details**
- Change question text
- Change the category if needed (click different category button)
- Modify options or mark different option as correct
- Update order

**5. Click Save**

---

## How to Delete Questions from a Category

**1. Select the Category** you want to delete from

**2. Click the Delete Icon** (trash 🗑️) on the question card

**3. Confirm Deletion** in the modal - this cannot be undone

---

## What's Different Now

### Before (Bug):
❌ Add question in "Online PG" tab → Question ended up in "General"  
❌ No validation that category was being set  
❌ Unclear which category a new question would go to  

### After (Fixed):
✅ Add question in "Online PG" tab → Question goes to "Online PG"  
✅ Add question in "Credit Transfer" tab → Question goes to "Credit Transfer"  
✅ Add question in "Online UG" tab → Question goes to "Online UG"  
✅ Category is explicitly validated before saving  
✅ Clear visual feedback of which category is selected  
✅ Error messages if category validation fails  

---

## Technical Details (What Was Fixed)

### Admin Panel (`src/app/admin/scholarship/page.tsx`)
- ✅ Improved `openNew()` function to explicitly set category to active category
- ✅ Enhanced `saveQuestion()` with category validation
- ✅ Better error messages for category issues

### API Endpoints (`src/app/api/admin/scholarship/questions/route.ts`)
- ✅ POST endpoint now validates category is one of: Online UG, Online PG, Credit Transfer, General
- ✅ Prevents invalid categories from being saved
- ✅ PUT endpoint also validates category on updates

---

## Tips & Best Practices

### ✅ DO:
1. ✅ Click on the category tab BEFORE adding a question
2. ✅ Verify the category button is highlighted when creating new question
3. ✅ Review the category name shown in the modal before saving
4. ✅ Use the category buttons to filter and view questions by category
5. ✅ Keep questions organized by switching between tabs

### ❌ DON'T:
1. ❌ Add questions without first selecting a category tab
2. ❌ Forget to mark correct answer before saving
3. ❌ Add empty option text
4. ❌ Delete questions without confirmation
5. ❌ Leave questions with order number 0

---

## Testing Your Changes

### To Verify Questions Are in the Right Category:

**Via Admin Panel:**
1. Go to `/admin/scholarship` → Questions Tab
2. Click each category button
3. Count should match: Online UG (10), Online PG (10), Credit Transfer (10)
4. Questions shown should be specific to that category

**Via Database:**
```javascript
// In MongoDB console or admin tool:
db.scholarshipquestions.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } }
])

// Expected output:
// { _id: "Online UG", count: 10 }
// { _id: "Online PG", count: 10 }
// { _id: "Credit Transfer", count: 10 }
```

**Via Student Exam:**
1. Student selects "Online UG" program
2. Takes exam
3. Questions should all be from "Online UG" category (not "General")

---

## Troubleshooting

**Problem**: Added a question but it went to "General"  
**Solution**: 
- Verify you clicked the category tab BEFORE clicking "Add Question"
- Check that the category button is highlighted in green/blue/purple
- Check the edit modal shows the correct category name

**Problem**: Category selector in edit modal shows "General" selected  
**Solution**: This is normal for old questions added before this fix. Just click the correct category button and save to move it.

**Problem**: Can't save question - error message about category  
**Solution**: Make sure you've selected a category using the category buttons in the edit modal.

---

## GitHub Changes

**Commit Hash**: 8c13fb0  
**Message**: "Fix category selection in scholarship question admin"  
**Changes**: 
- 3 files modified
- 71 insertions
- 7 deletions

**What Changed**:
- Admin form now pre-selects active category
- API validates category before saving
- Better error handling and user feedback

---

## Next Steps

After this fix, you can now:

1. **Add 10 more questions** to each category to increase variety
2. **Edit existing questions** to move them to correct categories
3. **Delete unwanted questions** from specific categories
4. **Test student exams** to verify they pull from correct category

---

**Status**: ✅ FIXED  
**Deployed**: Yes (pushed to origin/main)  
**Testing**: Ready to test via admin panel

---

**Questions or Issues?** 
Check the admin panel for detailed error messages when saving questions. The category must be explicitly selected using the category buttons in the form.
