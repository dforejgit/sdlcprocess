# Azure DevOps Integration Guide

## Work Item and PR Linking Requirements

### CRITICAL: Work Item Linking Syntax

**MANDATORY**: All PRs must be linked to work items using Azure DevOps linking syntax.

#### PR Description Linking
Include work item references in PR descriptions using these formats:
- `AB#1234` - Links to work item #1234
- `Resolves: AB#1234` - Links and resolves work item #1234
- `Fixes: AB#1234` - Links and fixes work item #1234
- `Closes: AB#1234` - Links and closes work item #1234

#### Commit Message Linking
Include work item references in commit messages:
```bash
git commit -m "Fix onboarding flow progression

Resolves AB#4820"
```

#### Multiple Work Items
Link multiple work items if needed:
```
Resolves: AB#1234, AB#5678
```

### PR Creation with Work Item Linking

**CORRECT PR Creation with Work Item Linking:**
```bash
az repos pr create \
  --title "Fix: Onboarding flow stuck at step 2" \
  --description "$(cat <<'EOF'
<strong>Problem Resolved:</strong><br/>
Fixed critical bug where onboarding assistant gets stuck at step 2.<br/><br/>

<strong>Solution:</strong><br/>
Added proper state tracking for flow progression.<br/><br/>

<strong>Testing:</strong><br/>
• ✅ API endpoint testing confirms proper flow<br/>
• ✅ Backend logic validates step transitions<br/><br/>

<strong>Resolves:</strong> AB#4820<br/><br/>

🤖 Generated with [Claude Code](https://claude.ai/code)<br/><br/>

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)" \
  --source-branch feature/4820-description \
  --target-branch main
```

### Work Item State Management

#### Work Item Lifecycle
1. **Creation**: `System.State=New` (default)
2. **Development Start**: Update to `Active`
3. **PR Creation**: Update to `Resolved` 
4. **After Merge**: Update to `Closed`

#### State Update Commands
```bash
# Start work
az boards work-item update --id 4820 --fields "System.State=Active"

# PR created
az boards work-item update --id 4820 --fields "System.State=Resolved" \
  --discussion "PR #1058 created and awaiting review"

# After merge
az boards work-item update --id 4820 --fields "System.State=Closed" \
  --discussion "PR #1058 merged successfully. Issue resolved."
```

### Azure DevOps HTML Formatting Requirements

**CRITICAL**: All PR descriptions and work item updates must use HTML formatting, NOT markdown.

#### Correct HTML Formatting
```html
<strong>Bold Text</strong><br/>
<br/>
• Bullet point<br/>
• Another point<br/>
<br/>
<strong>Section Header:</strong><br/>
Content with proper line breaks.<br/>
```

#### INCORRECT Markdown Formatting (DO NOT USE)
```markdown
**Bold Text**

- Bullet point
- Another point

## Section Header
Content without proper formatting.
```

### Work Item Creation with Proper Fields

#### Bug Work Items
```bash
az boards work-item create \
  --title "Fix: Specific issue description" \
  --type "Bug" \
  --fields \
    "System.State=Active" \
    "System.Description=<strong>Problem:</strong><br/>Description of the issue<br/><br/><strong>Impact:</strong><br/>Business impact<br/><br/><strong>Expected Behavior:</strong><br/>What should happen<br/><br/><strong>Actual Behavior:</strong><br/>What actually happens" \
    "Microsoft.VSTS.Common.Severity=2 - High" \
    "Microsoft.VSTS.Common.Priority=1"
```

#### User Story Work Items
```bash
az boards work-item create \
  --title "User Story Title" \
  --type "User Story" \
  --fields \
    "System.State=Active" \
    "System.Description=<strong>User Story:</strong><br/>As a [user], I want [goal] so that [benefit]<br/><br/><strong>Description:</strong><br/>Detailed description" \
    "Microsoft.VSTS.Common.AcceptanceCriteria=<strong>Acceptance Criteria:</strong><br/>• ✅ Criteria 1<br/>• ❌ Criteria 2<br/><br/><strong>Definition of Done:</strong><br/>• ✅ Code reviewed<br/>• ❌ Tests passing" \
    "Microsoft.VSTS.Scheduling.StoryPoints=5"
```

### Parent-Child Relationships

#### Creating Parent-Child Links
```bash
# Step 1: Create parent epic/feature
parent_id=$(az boards work-item create \
  --title "Epic: Major Feature" \
  --type "Epic" \
  --fields "System.State=Active" \
  --query "id" --output tsv)

# Step 2: Create child user story
child_id=$(az boards work-item create \
  --title "User Story: Specific Feature" \
  --type "User Story" \
  --fields "System.State=Active" \
  --query "id" --output tsv)

# Step 3: Link child to parent
az boards work-item relation add \
  --id $child_id \
  --relation-type "System.LinkTypes.Hierarchy-Reverse" \
  --target-id $parent_id
```

### PR Comment Integration

#### Automated PR Comments with HTML Formatting
```bash
comment_text="<strong>🤖 AI Agent Analysis Complete</strong><br/><br/>
<strong>Review Status:</strong> ✅ APPROVED<br/><br/>
<strong>Key Findings:</strong><br/>
• <strong>Code Quality:</strong> ✅ Excellent<br/>
• <strong>Security:</strong> ✅ No issues found<br/>
• <strong>Performance:</strong> ✅ Optimized<br/><br/>
<strong>Recommendation:</strong> Ready for merge<br/><br/>
<strong>Work Item:</strong> AB#4820"

az repos pr update --id 1058 --description "$comment_text"
```

### Compliance Checklist

#### Before Creating PR
- [ ] Work item created first
- [ ] Branch name includes work item ID
- [ ] Code changes align with work item scope
- [ ] Testing completed

#### PR Creation Requirements
- [ ] Title is descriptive and includes work item context
- [ ] Description uses proper HTML formatting
- [ ] Work item linked with AB# syntax
- [ ] All changes documented
- [ ] PR scope is focused (single logical change)

#### After PR Creation
- [ ] Work item state updated to "Resolved"
- [ ] PR status verified as "active" 
- [ ] No auto-merge flags used
- [ ] Human approval required before merge

### Error Prevention

#### Common Mistakes to Avoid
1. **Using markdown instead of HTML** in PR descriptions
2. **Forgetting work item linking** with AB# syntax
3. **Creating PR before work item** (violates Work Item First Policy)
4. **Using auto-merge flags** (prevents human approval)
5. **Mixed scope PRs** (multiple unrelated changes)

#### Validation Commands
```bash
# Verify work item exists
az boards work-item show --id 4820

# Verify PR is properly linked
az repos pr show --id 1058 | grep -i "4820"

# Verify PR status is active
az repos pr show --id 1058 --query "status"
```

## Integration with CLAUDE.md

This file is referenced in CLAUDE.md and provides the detailed ADO integration requirements that agents must follow. All agents must:

1. **Create work items first** before any code changes
2. **Use proper HTML formatting** in all ADO communications  
3. **Link PRs to work items** using AB# syntax
4. **Follow state management** lifecycle properly
5. **Maintain branch hygiene** with work item IDs in branch names

Failure to follow these requirements results in process violations that must be corrected immediately.