# Azure DevOps Field Validation Guide

## CRITICAL Field Validation Requirements

### Work Item Field Mapping

#### System Fields (Always Required)
- `System.Title` - Work item title (required, max 255 chars)
- `System.State` - Current state (New/Active/Resolved/Closed)
- `System.WorkItemType` - Type (Bug/User Story/Epic/Task)
- `System.Description` - Main description content (HTML formatted)

#### Microsoft VSTS Fields (Type-Specific)
- `Microsoft.VSTS.Common.AcceptanceCriteria` - Acceptance criteria (User Stories only)
- `Microsoft.VSTS.Common.Severity` - Bug severity (Bugs only)
- `Microsoft.VSTS.Common.Priority` - Business priority (1-4 scale)
- `Microsoft.VSTS.Scheduling.StoryPoints` - Story points (User Stories)
- `Microsoft.VSTS.Scheduling.OriginalEstimate` - Original time estimate (hours)

### Field Validation Rules

#### Bug Work Items - Required Fields
```bash
# All fields are REQUIRED for Bug work items
az boards work-item create \
  --title "Fix: [Specific issue description]" \
  --type "Bug" \
  --fields \
    "System.State=Active" \
    "System.Description=<strong>Problem:</strong><br/>[Issue description]<br/><br/><strong>Impact:</strong><br/>[Business impact]<br/><br/><strong>Expected Behavior:</strong><br/>[What should happen]<br/><br/><strong>Actual Behavior:</strong><br/>[What happens instead]<br/><br/><strong>Frequency:</strong><br/>[Always/Sometimes/Rarely]" \
    "Microsoft.VSTS.Common.Severity=2 - High" \
    "Microsoft.VSTS.Common.Priority=1"
```

#### User Story Work Items - Required Fields
```bash
# All fields are REQUIRED for User Story work items
az boards work-item create \
  --title "[User Story Title]" \
  --type "User Story" \
  --fields \
    "System.State=Active" \
    "System.Description=<strong>User Story:</strong><br/>As a [user type], I want [goal] so that [benefit]<br/><br/><strong>Description:</strong><br/>[Detailed description of the feature]" \
    "Microsoft.VSTS.Common.AcceptanceCriteria=<strong>Acceptance Criteria:</strong><br/>• ✅ [Criteria 1]<br/>• ❌ [Criteria 2]<br/><br/><strong>Definition of Done:</strong><br/>• ✅ [Done item 1]<br/>• ❌ [Done item 2]" \
    "Microsoft.VSTS.Scheduling.StoryPoints=5" \
    "Microsoft.VSTS.Scheduling.OriginalEstimate=8"
```

### HTML Formatting Validation

#### Required HTML Elements
- `<strong>` for bold text (NOT **bold**)
- `<br/>` for line breaks (NOT \n)
- Proper section separation with `<br/><br/>`
- Visual checkboxes: ✅ ❌ ⚠️ (NOT [ ] [x])

#### CORRECT HTML Formatting Example
```html
<strong>Problem:</strong><br/>
The onboarding assistant gets stuck at step 2 after user provides tool information.<br/><br/>

<strong>Impact:</strong><br/>
• Users cannot complete onboarding process<br/>
• Platform adoption blocked<br/>
• Customer frustration with setup experience<br/><br/>

<strong>Expected Behavior:</strong><br/>
Flow should progress from step 2 to step 3 automatically.<br/><br/>

<strong>Actual Behavior:</strong><br/>
Flow remains stuck at step 2, showing tool information repeatedly.
```

#### INCORRECT Formatting (NEVER USE)
```markdown
**Problem:**
The onboarding assistant gets stuck.

**Impact:**
- Users cannot complete onboarding
- Platform adoption blocked

## Expected Behavior
Flow should progress automatically.
```

### Visual Status Indicators

#### Acceptance Criteria Status
Use visual indicators instead of text:
- ✅ = Completed/Implemented/Approved
- ❌ = Incomplete/Missing/Failed  
- ⚠️ = In Progress/Warning/Needs Attention

#### Example with Visual Indicators
```html
<strong>Acceptance Criteria:</strong><br/>
✅ Admin UI allows selection of DevOps tools<br/>
✅ Configuration validation works correctly<br/>
❌ Migration support from current configuration<br/>
⚠️ Performance optimization for large teams<br/><br/>

<strong>Definition of Done:</strong><br/>
✅ Code reviewed and tested<br/>
✅ Documentation updated<br/>
❌ Human approval obtained<br/>
❌ Performance benchmarks met
```

### Field Validation Commands

#### Check Required Fields Exist
```bash
# Validate Bug work item fields
az boards work-item show --id 4820 --query "fields.'System.Description'"
az boards work-item show --id 4820 --query "fields.'Microsoft.VSTS.Common.Severity'"
az boards work-item show --id 4820 --query "fields.'Microsoft.VSTS.Common.Priority'"

# Validate User Story work item fields  
az boards work-item show --id 4821 --query "fields.'Microsoft.VSTS.Common.AcceptanceCriteria'"
az boards work-item show --id 4821 --query "fields.'Microsoft.VSTS.Scheduling.StoryPoints'"
```

#### Update Fields with Validation
```bash
# Update with proper validation
az boards work-item update --id 4820 --fields \
  "Microsoft.VSTS.Common.AcceptanceCriteria=<strong>Acceptance Criteria:</strong><br/>✅ Issue identified and root cause analyzed<br/>✅ Fix implemented with proper state tracking<br/>✅ Testing completed on API endpoints<br/>❌ Human approval for deployment<br/><br/><strong>Definition of Done:</strong><br/>✅ Code reviewed<br/>✅ Unit tests passing<br/>✅ Integration tests passing<br/>❌ Documentation updated<br/>❌ Deployed to production"
```

### Common Field Validation Errors

#### Error: Field Not Found
```
ERROR: TF51535: Cannot find field Microsoft.VSTS.Common.ReproSteps.
```
**Solution**: This field doesn't exist. Use `System.Description` instead.

#### Error: Invalid State Value
```
ERROR: The field 'State' contains the value 'Active' that is not in the list of supported values.
```
**Solution**: Check valid states for work item type. Use default "New" for creation.

#### Error: Required Field Missing
```
ERROR: Field 'System.Title' is required.
```
**Solution**: Always include title in work item creation.

### State Management Validation

#### Valid State Transitions
```
New → Active → Resolved → Closed
```

#### State Update Validation
```bash
# Verify current state before update
current_state=$(az boards work-item show --id 4820 --query "fields.'System.State'" --output tsv)
echo "Current state: $current_state"

# Update state with validation
if [ "$current_state" = "New" ]; then
    az boards work-item update --id 4820 --fields "System.State=Active"
elif [ "$current_state" = "Active" ]; then
    az boards work-item update --id 4820 --fields "System.State=Resolved"
fi
```

### Parent-Child Relationship Validation

#### Validate Relationship Before Creation
```bash
# Check if parent exists
parent_exists=$(az boards work-item show --id 4819 --query "id" --output tsv 2>/dev/null)
if [ -n "$parent_exists" ]; then
    echo "Parent work item 4819 exists"
    # Create child relationship
    az boards work-item relation add \
      --id 4820 \
      --relation-type "System.LinkTypes.Hierarchy-Reverse" \
      --target-id 4819
else
    echo "ERROR: Parent work item 4819 does not exist"
fi
```

### HTML Formatting Validation Script

#### Validation Function
```bash
validate_html_formatting() {
    local content="$1"
    
    # Check for markdown violations
    if echo "$content" | grep -q '\*\*.*\*\*'; then
        echo "ERROR: Found markdown formatting (**text**). Use <strong>text</strong>"
        return 1
    fi
    
    if echo "$content" | grep -q '^#.*'; then
        echo "ERROR: Found markdown headers (#). Use <strong>Header</strong><br/>"
        return 1
    fi
    
    if echo "$content" | grep -q '^-.*' && ! echo "$content" | grep -q '<br/>'; then
        echo "ERROR: Found markdown lists without <br/> tags"
        return 1
    fi
    
    echo "HTML formatting validation passed"
    return 0
}

# Usage
validate_html_formatting "$work_item_description"
```

### Compliance Checklist

#### Before Work Item Creation
- [ ] Title follows naming convention
- [ ] HTML formatting validated
- [ ] All required fields identified
- [ ] Visual indicators used (✅❌⚠️)
- [ ] State set correctly

#### After Work Item Creation
- [ ] Work item ID captured
- [ ] Fields populated correctly
- [ ] State is valid
- [ ] Parent-child links created if needed
- [ ] Field validation commands run

### Integration with CLAUDE.md

This validation guide ensures:
1. **Field completeness** - All required fields populated
2. **Format compliance** - HTML formatting enforced
3. **State management** - Proper state transitions
4. **Visual consistency** - Standard status indicators
5. **Error prevention** - Common mistakes avoided

All agents must validate fields before and after work item operations to ensure Azure DevOps compliance.