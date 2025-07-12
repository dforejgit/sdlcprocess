# User Story Standards and Documentation Guide

## User Story Requirements

### Standard User Story Format

#### Template Structure
```
As a [user type]
I want [goal/desire]
So that [benefit/value]
```

#### Example User Stories
```
As a platform administrator
I want to configure DevOps tool integrations
So that teams can seamlessly connect their existing workflows

As a developer
I want AI-powered code generation that follows our team's patterns
So that I can maintain consistency while increasing productivity

As a project manager
I want visibility into AI agent performance and usage
So that I can optimize team workflows and measure ROI
```

### Azure DevOps User Story Fields

#### Required Fields for User Stories
```bash
az boards work-item create \
  --title "[Clear, descriptive title]" \
  --type "User Story" \
  --fields \
    "System.State=Active" \
    "System.Description=<strong>User Story:</strong><br/>As a [user], I want [goal] so that [benefit]<br/><br/><strong>Description:</strong><br/>[Detailed description]" \
    "Microsoft.VSTS.Common.AcceptanceCriteria=<strong>Acceptance Criteria:</strong><br/>• ✅ [Criterion 1]<br/>• ❌ [Criterion 2]<br/><br/><strong>Definition of Done:</strong><br/>• ✅ [Done item 1]<br/>• ❌ [Done item 2]" \
    "Microsoft.VSTS.Scheduling.StoryPoints=5" \
    "Microsoft.VSTS.Scheduling.OriginalEstimate=8" \
    "Microsoft.VSTS.Common.Priority=2"
```

### Field Definitions and Requirements

#### System.Description
Contains the user story and detailed description using HTML formatting:

```html
<strong>User Story:</strong><br/>
As a platform administrator, I want to configure DevOps tool integrations so that teams can seamlessly connect their existing workflows.<br/><br/>

<strong>Description:</strong><br/>
The platform needs an admin interface that allows configuration of multiple DevOps tools including Azure DevOps, GitHub, Jira, and Bitbucket. This will enable teams to maintain their existing processes while leveraging AI-powered development features.<br/><br/>

<strong>Business Value:</strong><br/>
• Reduces onboarding friction for new teams<br/>
• Maintains existing team workflows<br/>
• Increases platform adoption rate<br/>
• Enables gradual migration strategies
```

#### Microsoft.VSTS.Common.AcceptanceCriteria
Contains both acceptance criteria AND definition of done with visual indicators:

```html
<strong>Acceptance Criteria:</strong><br/>
✅ Admin UI displays available DevOps tool options<br/>
✅ Configuration validation prevents invalid tool combinations<br/>
❌ Settings persist across user sessions<br/>
❌ Integration testing validates connectivity<br/>
⚠️ Migration support from existing configurations<br/><br/>

<strong>Definition of Done:</strong><br/>
✅ Code reviewed and approved<br/>
✅ Unit tests written and passing<br/>
❌ Integration tests passing<br/>
❌ Documentation updated<br/>
❌ User acceptance testing completed<br/>
❌ Performance benchmarks met<br/>
❌ Accessibility compliance verified (WCAG 2.1 AA)<br/>
❌ Security review completed<br/>
❌ Human approval obtained for deployment
```

### Estimation Guidelines

#### Story Points (Microsoft.VSTS.Scheduling.StoryPoints)
- **1 Point**: Very small change (< 2 hours)
- **2 Points**: Small feature (2-4 hours)
- **3 Points**: Medium feature (4-8 hours)
- **5 Points**: Large feature (1-2 days)
- **8 Points**: Very large feature (2-3 days)
- **13 Points**: Epic-level work (needs breakdown)

#### Original Estimate (Hours for Human Implementation)
Based on traditional development without AI assistance:
- Include design, development, testing, documentation
- Use historical data for similar features
- Account for integration complexity
- Add buffer for unknown unknowns

#### Agentic Estimate (AI-Powered Implementation)
Separate estimate for AI agent implementation:
- Use decimals for sub-hour estimates (0.5 = 30 min, 0.25 = 15 min)
- Factor in AI code generation capabilities
- Consider pattern learning and automation
- Account for human review and approval time

### Visual Status Indicators

#### Standard Status Symbols
- ✅ **Completed/Implemented/Approved**
- ❌ **Incomplete/Missing/Failed**
- ⚠️ **In Progress/Warning/Needs Attention**
- 🔄 **In Review/Pending**
- 🚫 **Blocked/Cannot Proceed**

#### Usage in Acceptance Criteria
```html
<strong>Acceptance Criteria:</strong><br/>
✅ Feature requirement clearly defined<br/>
✅ Technical approach documented<br/>
🔄 UI mockups created and reviewed<br/>
❌ API endpoints implemented<br/>
❌ Database schema updated<br/>
⚠️ Performance impact assessed<br/>
🚫 Third-party integration pending approval
```

### HTML Formatting Requirements

#### CORRECT HTML Format
```html
<strong>Section Header:</strong><br/>
Content with proper line breaks and formatting.<br/><br/>

<strong>Bullet Points:</strong><br/>
• First bullet point<br/>
• Second bullet point<br/>
• Third bullet point<br/><br/>

<strong>Status Items:</strong><br/>
✅ Completed item<br/>
❌ Incomplete item<br/>
⚠️ Warning item
```

#### INCORRECT Markdown Format (NEVER USE)
```markdown
**Section Header:**
Content without proper formatting.

## Header
- First bullet point
- Second bullet point

[x] Completed item
[ ] Incomplete item
```

### User Story Categories

#### Feature Stories
Stories that add new functionality:
```html
<strong>User Story:</strong><br/>
As a developer, I want AI-powered code generation that follows our coding standards so that I can maintain consistency while increasing productivity.
```

#### Enhancement Stories
Stories that improve existing functionality:
```html
<strong>User Story:</strong><br/>
As a platform user, I want faster response times from AI agents so that my development workflow is not interrupted.
```

#### Technical Stories
Stories for technical improvements:
```html
<strong>User Story:</strong><br/>
As a platform administrator, I want improved monitoring and alerting so that I can proactively address performance issues.
```

#### Integration Stories
Stories for connecting external systems:
```html
<strong>User Story:</strong><br/>
As a team lead, I want Slack notifications for PR approvals so that the team stays informed of development progress.
```

### Acceptance Criteria Guidelines

#### SMART Criteria
Each acceptance criterion should be:
- **Specific**: Clear and unambiguous
- **Measurable**: Can be verified/tested
- **Achievable**: Technically feasible
- **Relevant**: Related to user story goal
- **Time-bound**: Can be completed in sprint

#### Examples of Good Acceptance Criteria
```html
✅ Admin UI loads within 2 seconds on standard hardware<br/>
✅ Configuration changes are validated before saving<br/>
✅ Error messages provide clear guidance for resolution<br/>
✅ All form fields have proper accessibility labels<br/>
✅ Changes are logged for audit purposes
```

#### Examples of Poor Acceptance Criteria
```
❌ System should be fast
❌ UI should look good
❌ Integration should work
❌ Users should be happy
❌ Code should be clean
```

### Definition of Done Standards

#### Standard Definition of Done Items
```html
<strong>Definition of Done:</strong><br/>
✅ Code reviewed by senior developer<br/>
✅ Unit tests written and passing (>90% coverage)<br/>
✅ Integration tests passing<br/>
✅ Documentation updated (user and technical)<br/>
✅ Accessibility compliance verified (WCAG 2.1 AA)<br/>
✅ Security review completed<br/>
✅ Performance benchmarks met<br/>
✅ User acceptance testing completed<br/>
✅ Database migrations tested<br/>
✅ Deployment scripts updated<br/>
✅ Monitoring and alerting configured<br/>
❌ Human approval obtained for production deployment
```

### Parent-Child Relationships

#### Epic to User Story Relationship
```bash
# Create Epic first
epic_id=$(az boards work-item create \
  --title "Epic: DevOps Tool Integration Platform" \
  --type "Epic" \
  --fields "System.State=Active" \
  --query "id" --output tsv)

# Create User Story as child
story_id=$(az boards work-item create \
  --title "Configure Azure DevOps Integration" \
  --type "User Story" \
  --fields "System.State=Active" \
  --query "id" --output tsv)

# Link child to parent
az boards work-item relation add \
  --id $story_id \
  --relation-type "System.LinkTypes.Hierarchy-Reverse" \
  --target-id $epic_id
```

### Quality Validation

#### User Story Quality Checklist
- [ ] Title is clear and descriptive
- [ ] User story follows "As a...I want...So that..." format
- [ ] Description provides sufficient detail
- [ ] Acceptance criteria are specific and measurable
- [ ] Definition of done is comprehensive
- [ ] Visual status indicators used correctly
- [ ] HTML formatting is correct
- [ ] Story points estimated appropriately
- [ ] Priority assigned based on business value

#### Review Questions
1. **Is the user clearly identified?** (As a [specific user type])
2. **Is the goal/desire specific?** (I want [specific functionality])
3. **Is the benefit/value clear?** (So that [clear business value])
4. **Can acceptance criteria be tested?** (Specific, measurable criteria)
5. **Is the scope appropriate?** (Can be completed in 1-2 sprints)

### Integration with CLAUDE.md

This standards guide ensures:
1. **Consistent user story format** across all work items
2. **Proper HTML formatting** for Azure DevOps compatibility
3. **Complete field population** with all required information
4. **Visual status tracking** with standard indicators
5. **Quality validation** through comprehensive checklists

All agents must follow these standards when creating or updating user story work items to maintain project consistency and quality.