# Azure DevOps Comprehensive Guide

## Overview
This module contains all Azure DevOps (ADO) related requirements, standards, and workflows for the Agentic SDLC Platform. This comprehensive guide ensures 100% traceability and professional work item management.

## Table of Contents
1. [Core ADO Work Item Management](#core-ado-work-item-management)
2. [Work Item Creation Standards](#work-item-creation-standards)
3. [Field Validation and Formatting](#field-validation-and-formatting)
4. [PR Creation and Linking](#pr-creation-and-linking)
5. [Branch Naming Conventions](#branch-naming-conventions)
6. [Bug Work Item Requirements](#bug-work-item-requirements)
7. [State Management and Workflows](#state-management-and-workflows)
8. [Visual Symbol Standards](#visual-symbol-standards)
9. [CLI Commands and Examples](#cli-commands-and-examples)
10. [Workflow Compliance](#workflow-compliance)
11. [Jira Integration Alternative](#jira-integration-alternative)

## Core ADO Work Item Management

### CRITICAL: Tenant-Aware Branch Naming Convention
**Feature branches MUST include tenant context and work item ID:**

**Multi-Tenant Format:**
```
{tenant-prefix}/feature/<work-item-id>-<description>
```

**Tenant Prefixes:**
- `njspirit/feature/2782-authentication-fix`
- `policy2control/feature/3456-governance-framework`
- `ai-testing/feature/1234-context-optimization`
- `research/feature/5678-multi-agent-state`

**Single-Tenant Legacy Format (Backward Compatible):**
```
feature/<work-item-id>-<description>
```

**Examples:**
- ✅ CORRECT: `njspirit/feature/2782-fix-authentication`
- ✅ CORRECT: `policy2control/feature/2842-reorganize-scripts`
- ✅ LEGACY: `feature/2782-fix-authentication` (single-tenant mode)
- ❌ AVOID: `feature/fix-authentication` (missing work item ID)
- ❌ AVOID: `fix-authentication` (missing prefix and work item ID)

**Configuration**: Tenant prefix determined by `.claude/tenant-config.yml`

### MANDATORY Development Workflow with Critical Thinking Integration
**ABSOLUTE REQUIREMENT for ALL code changes:**

1. **Create ADO Work Item FIRST** - Always create work item before any code changes
2. **Execute Pre-Development Critical Thinking** - Run Phase 1 analysis (4 techniques)
3. **Create Branch** - Use tenant-aware work item ID in branch name
4. **Implement Changes** - Follow all technical standards and use todo lists
5. **Execute Post-Development Critical Thinking** - Run Phase 3 analysis (3 techniques)
6. **Mandatory PR Verification Protocol** - Execute comprehensive 15-point checklist
7. **Create Pull Request** - Link to work item with comprehensive descriptions
8. **MANDATORY STOP** - Wait for explicit human approval before merge
9. **Human Approval Required** - Human reviews and explicitly approves
10. **Merge & Update** - Only after approval, merge and update work item

**Enhanced Verification Checklist**:
1. All files relate to single work item ✓
2. No opportunistic scope creep ✓
3. Critical thinking analysis completed ✓
4. Risk assessment below threshold ✓
5. Mermaid visualizations used appropriately ✓
6. Context efficiency maintained ✓
7. Tenant isolation respected ✓
8. Security requirements validated ✓
9. ADO commands verified ✓
10. Testing standards met ✓
11. Accessibility compliance ✓
12. Documentation updated ✓
13. Dependencies security-validated ✓
14. Performance impact assessed ✓
15. Compliance requirements met ✓

**CRITICAL RULES:**
- **Work Item First**: NEVER create PR without work item
- **Human Approval**: NEVER merge without explicit human approval  
- **Task Completion**: NOT complete until human approval AND merge
- **Branch Hygiene**: Create clean branches from main (max 5 files per PR)
- **Single Logical Change**: NEVER mix unrelated changes in same PR
- **MANDATORY STOP**: NEVER use auto-merge, auto-complete, or delete-source-branch flags
- **PR STATUS CHECK**: ALWAYS verify PR remains "active" status awaiting human review

## Work Item Creation Standards

### ADO Work Item Management

**CRITICAL TIMING**: Work items must NOT be marked complete until human approval received.

**Work Item State Management:**
1. **At Creation**: Set `System.State=Active` (NEVER leave as default "New")
2. **At PR Creation**: Update to "In Review" with waiting for approval comment
3. **After Human Approval & Merge**: Update to "Done" with completion comment

**State Field Requirements:**
- **ALWAYS set System.State="Active"** when creating work items
- **Default "New" state indicates incomplete creation** - avoid this
- **Use proper state progression**: Active → In Review → Done

**PR Configuration:**
- **CRITICAL**: NEVER use `--delete-source-branch` flag (causes auto-merge)
- **CRITICAL**: NEVER use auto-complete or auto-merge flags
- Fine-grained PRs only (1 logical change, max 5 files)
- Link all PRs to work items
- **MANDATORY**: PR must remain "active" status awaiting human approval

**MANDATORY USER STORY REQUIREMENTS:**
- **Acceptance Criteria**: Required with HTML formatting (`<br/>` tags for line breaks)
- **Definition of Done**: Required standard completion checklist  
- **HTML Format**: Use `<strong>` for bold, `- [ ] Item<br/>` for checkboxes
- **Priority**: Leave blank/null (Product Owner will set)
- **Original Estimate**: Hours estimate for human implementation
- **Agentic Estimate**: Hours estimate for Agent work (use decimals: 0.5 = 30min, 0.25 = 15min)
- **Parent-Child**: Use two-step process (create item, then add relationship via relations API)

**CRITICAL ADO FIELD SEPARATION**:
- **System.Description**: Contains ONLY the description text (User Story, Description sections)
- **Microsoft.VSTS.Common.AcceptanceCriteria**: Contains acceptance criteria AND Definition of Done
- **NEVER combine these fields** - They are separate fields in ADO
- **Both fields require HTML formatting** - Use `<br/>` for line breaks, `<strong>` for bold

## Field Validation and Formatting

### CRITICAL: Work Item Acceptance Criteria Visual Formatting

**MANDATORY**: Use visual symbols ✅ and ❌ instead of brackets for acceptance criteria:

**CORRECT Visual Format:**
```bash
az boards work-item update --id 4753 --fields \
"Microsoft.VSTS.Common.AcceptanceCriteria=<strong>Acceptance Criteria:</strong><br/>✅ Admin UI allows selection of DevOps tools for work items<br/>✅ Configuration validation ensures tool combinations are compatible<br/>❌ Migration support from current ADO-only configuration<br/><br/><strong>Definition of Done:</strong><br/>✅ Code reviewed and tested<br/>✅ Documentation updated<br/>❌ Human approval obtained"
```

**INCORRECT Bracket Format (DO NOT USE):**
```bash
# This uses outdated bracket placeholders
"Microsoft.VSTS.Common.AcceptanceCriteria=<strong>Acceptance Criteria:</strong><br/>[x] Admin UI allows selection<br/>[ ] Migration support"
```

**Visual Symbol Standards:**
- ✅ = Completed/Implemented/Approved
- ❌ = Incomplete/Missing/Failed
- ⚠️ = In Progress/Warning/Needs Attention

**Example - CORRECT Field Usage:**
```bash
# ALWAYS include System.State="Active" when creating work items
az boards work-item create \
  --title "Your work item title" \
  --type "User Story" \
  --state "Active" \
  --fields \
    "System.Description=<strong>User Story:</strong><br/>As a developer...<br/><br/><strong>Description:</strong><br/>This feature will..." \
    "Microsoft.VSTS.Common.AcceptanceCriteria=<strong>Acceptance Criteria:</strong><br/>- [ ] Criteria 1<br/>- [ ] Criteria 2<br/><br/><strong>Definition of Done:</strong><br/>- [ ] Code reviewed<br/>- [ ] Tests passing<br/>" \
    "Microsoft.VSTS.Scheduling.StoryPoints=5" \
    "Microsoft.VSTS.Scheduling.OriginalEstimate=8" \
    "Microsoft.VSTS.Scheduling.RemainingWork=2.5"
```

**CRITICAL**: Azure DevOps uses HTML, NOT markdown. System.Parent field is read-only.

### CRITICAL: Azure DevOps PR Comment Formatting

**MANDATORY**: All PR comments and work item updates must use proper Azure DevOps HTML formatting to ensure readability.

**Azure DevOps Comment Formatting Requirements:**
- **Line Breaks**: Use `<br/>` instead of `\n` for line breaks
- **Bold Text**: Use `<strong>Bold Text</strong>` instead of `**Bold Text**`
- **Headers**: Use `<strong>Header Text</strong><br/>` instead of `# Header`
- **Lists**: Use `• Item<br/>` or `- Item<br/>` with explicit line breaks
- **Code Blocks**: Use `<code>code here</code>` for inline code
- **Sections**: Separate sections with `<br/><br/>` for proper spacing

**Example - CORRECT Azure DevOps Comment Format:**
```bash
# When posting PR comments via az repos pr create or commenting
comment_text="<strong>🤖 DevOps Configuration PR Review Agent - Final Report</strong><br/><br/>
<strong>Review Completed:</strong> ✅ APPROVED (Score: 91.7/100)<br/><br/>
<strong>Comprehensive Review Summary:</strong><br/>
• <strong>Work Item Integration:</strong> ✅ PR properly linked to work item #4753<br/>
• <strong>Acceptance Criteria:</strong> 6/9 criteria fully implemented (67% completion)<br/>
• <strong>Definition of Done:</strong> 7/9 items completed (78% completion)<br/>
• <strong>Code Quality:</strong> ✅ Excellent (strong adapter pattern, type safety)<br/>
• <strong>Security:</strong> ✅ Secure (AES-256-GCM encryption, tenant isolation)<br/><br/>
<strong>Key Achievements Verified:</strong><br/>
✅ <strong>Bitbucket support added</strong> as specifically requested<br/>
✅ <strong>Multi-tool configuration system</strong> with ADO, GitHub, Jira, Bitbucket<br/>
✅ <strong>Admin UI interface</strong> for visual tool configuration"

az repos pr create --title "Title" --description "$comment_text"
```

**Example - INCORRECT Markdown Format (DO NOT USE):**
```bash
# This will display as concatenated text without line breaks
comment_text="# DevOps Configuration PR Review
**Review Completed:** ✅ APPROVED
## Summary
- Work Item Integration: ✅ PR properly linked
- Code Quality: ✅ Excellent"
```

**Why This Matters:**
- Markdown formatting gets stripped by Azure DevOps and displays as concatenated text
- HTML formatting ensures proper visual separation and readability
- Professional appearance for stakeholder communication
- Consistent formatting across all automated comments

## PR Creation and Linking

### CRITICAL: PR Work Item Linking Requirements

**MANDATORY**: All PRs must be linked to work items using Azure DevOps syntax in PR descriptions.

**Work Item Linking Syntax:**
- `AB#1234` - Links to work item #1234
- `Resolves: AB#1234` - Links and resolves work item #1234
- `Fixes: AB#1234` - Links and fixes work item #1234
- `Closes: AB#1234` - Links and closes work item #1234

**MANDATORY PR Description Format:**
```bash
az repos pr create --title "Fix: Description" --description "$(cat <<'EOF'
<strong>🤖 Bug Fix PR - Title</strong><br/><br/>

<strong>Problem Resolved:</strong><br/>
Description using proper HTML formatting with <br/> tags.<br/><br/>

<strong>Solution Implementation:</strong><br/>
• Bullet point with <br/> at end<br/>
• Another bullet point<br/><br/>

<strong>Testing Completed:</strong><br/>
• ✅ Tests passing<br/>
• ✅ Code reviewed<br/><br/>

<strong>Resolves:</strong> AB#1234<br/><br/>

🤖 Generated with [Claude Code](https://claude.ai/code)<br/><br/>

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**HTML Formatting Violations to Avoid:**
- ❌ Using `**bold**` instead of `<strong>bold</strong>`
- ❌ Using `\n` instead of `<br/>`
- ❌ Using markdown headers `# Header` instead of `<strong>Header</strong><br/>`
- ❌ Using markdown lists without `<br/>` tags
- ❌ Forgetting work item linking with `AB#` syntax

### CRITICAL: PR Creation Protocol (Prevent Auto-Merge Violations)

**ABSOLUTE REQUIREMENT**: Following PR creation, Agent MUST verify PR remains open awaiting human approval.

**Mandatory PR Creation Process:**
1. **Create PR**: Use basic `az repos pr create` command with title and description ONLY
2. **Verify PR Status**: Immediately check `az repos pr show --id <PR_ID>` 
3. **Confirm Open Status**: Verify `"status": "active"` and `"mergeStatus": null`
4. **Human Approval Check**: If `"mergeStatus": "succeeded"` detected, IMMEDIATELY report violation
5. **Stop and Wait**: Provide PR URL to human and STOP all automation until explicit approval

**FORBIDDEN Actions:**
- **NEVER** use `--delete-source-branch` flag (causes auto-complete)
- **NEVER** use any auto-merge or auto-complete options
- **NEVER** programmatically approve or merge PRs
- **NEVER** use merge commands after PR creation

**Violation Detection:**
If PR shows `"mergeStatus": "succeeded"` immediately after creation:
1. **STOP all automation**
2. **Report critical workflow violation**
3. **Create bug work item for investigation**
4. **Wait for human intervention**

**Required PR Creation Command Format:**
```bash
# CORRECT - Basic PR creation only
az repos pr create --title "Title" --description "Description" --source-branch feature/xxx --target-branch main

# FORBIDDEN - Contains auto-merge triggers
az repos pr create --title "Title" --description "Description" --delete-source-branch true
```

## Branch Naming Conventions

### CRITICAL: Branch Hygiene and Repository Cleanliness

**ABSOLUTE REQUIREMENT**: Maintain a clean repository with systematic branch management to prevent branch proliferation chaos.

**Branch Lifecycle Management:**

1. **Branch Creation Standards**
   - **ALWAYS** create branches from latest main branch
   - **NEVER** create branches from other feature branches
   - **MANDATORY** work item ID in branch name: `feature/XXXX-description`
   - **Maximum branch lifespan**: 72 hours from creation to merge or deletion

2. **Branch Cleanup Protocol** 
   - **IMMEDIATELY** delete merged branches after PR completion
   - **DAILY** audit for stale branches older than 3 days
   - **WEEKLY** comprehensive branch cleanup including:
     - Delete all merged branches (local and remote)
     - Identify orphaned branches without work items
     - Consolidate duplicate work into single PR
     - Remove worktree branches that are no longer needed

3. **Branch Naming Violations Prevention**
   - ❌ **FORBIDDEN**: Multiple branches for same work item (e.g., `feature/4623-v1`, `feature/4623-v2`, `feature/4623-clean`)
   - ❌ **FORBIDDEN**: Branches without work item IDs
   - ❌ **FORBIDDEN**: Long-lived feature branches (>1 week)
   - ❌ **FORBIDDEN**: Branches with unclear purpose or scope

4. **Repository State Monitoring**
   - **Branch count limit**: Maximum 20 active feature branches at any time
   - **Automatic cleanup triggers**: >50 local branches requires immediate cleanup
   - **Weekly branch audits**: Identify and address branch accumulation patterns
   - **Worktree management**: Clean up unused git worktrees monthly

5. **Branch Proliferation Prevention Rules**
   - **One branch per work item**: Never create multiple branches for same work item
   - **No abandoned branches**: Every branch must lead to PR or deletion within 72 hours
   - **No scope creep branches**: Don't create additional branches to fix issues in existing branch
   - **Clean slate policy**: Start each work item with fresh branch from main

6. **Emergency Branch Cleanup Protocol**
   ```bash
   # When branch count exceeds 50:
   # 1. Delete all merged branches
   git branch --merged main | grep -v main | xargs git branch -d
   
   # 2. Delete branches without corresponding remote
   git remote prune origin
   
   # 3. List candidates for deletion (manual review required)
   git for-each-ref --format='%(refname:short) %(committerdate)' refs/heads/ | sort -k2
   
   # 4. Clean up git worktrees
   git worktree prune
   ```

7. **Quality Gates for Branch Management**
   - **Pre-work**: Always check current branch count before starting new work
   - **During work**: Monitor for branch naming compliance and scope adherence  
   - **Post-merge**: IMMEDIATELY delete merged branch and verify cleanup
   - **Periodic audit**: Weekly review of all active branches for staleness

**Enforcement**: Violation of branch hygiene requirements triggers immediate cleanup protocol and process review.

### CRITICAL: Fine-Grained PR Requirements

**ABSOLUTE RULE**: Each PR must contain ONLY changes related to a single logical task or work item.

**PR Scope Control:**
1. **One Work Item = One PR** - Never mix changes for multiple work items
2. **Stay Focused** - If you notice unrelated issues, create separate work items
3. **No Opportunistic Changes** - Don't add "while I'm here" improvements
4. **Maximum 5 Files** - Unless logically necessary for the single change
5. **Clear PR Title** - Must describe the ONE thing being changed

**Examples:**
- ✅ GOOD: PR for "Add K8s documentation" contains ONLY K8s docs
- ❌ BAD: PR for "Add K8s documentation" also includes md2docs improvements
- ✅ GOOD: Create separate PRs for each unrelated improvement
- ❌ BAD: Bundle multiple improvements because "they're small"

**If You Find Unrelated Issues:**
1. **STOP** - Don't include in current PR
2. **Create New Work Item** - Document the issue properly
3. **Stay Focused** - Complete current task first
4. **Return Later** - Address new issue in separate PR

**PR Validation Checklist:**
- [ ] All changes relate to single work item?
- [ ] No opportunistic improvements included?
- [ ] PR title describes ONE specific change?
- [ ] File count reasonable for the change?
- [ ] Would reverting this PR affect only ONE feature?

## Bug Work Item Requirements

### MANDATORY BUG WORK ITEM REQUIREMENTS:
- **Title**: MUST start with "Fix: " followed by concise issue description
- **Description**: REQUIRED sections: Problem, Impact, Expected vs Actual Behavior, Frequency
- **Repro Steps**: REQUIRED with Prerequisites, numbered Steps, Result, and Expected outcome
- **System Info**: REQUIRED including Environment, Build/Version, Browser, OS, Timestamp
- **Severity**: 1-4 scale (1=Critical/security, 2=High/no workaround, 3=Medium, 4=Low)
- **Priority**: Business impact based 1-4 scale
- **State**: MUST set System.State="Active" when creating

**Bug Work Item Field Requirements:**
```bash
# MANDATORY fields for Bug work items
az boards work-item create \
  --title "Fix: [Specific issue description]" \
  --type "Bug" \
  --state "Active" \
  --fields \
    "System.Description=<strong>Problem:</strong><br/>[What is broken]<br/><br/><strong>Impact:</strong><br/>[Business impact]<br/><br/><strong>Expected Behavior:</strong><br/>[What should happen]<br/><br/><strong>Actual Behavior:</strong><br/>[What happens]<br/><br/><strong>Frequency:</strong><br/>[Always/Sometimes/Rarely]" \
    "Microsoft.VSTS.Common.ReproSteps=<strong>Prerequisites:</strong><br/>• [Required setup]<br/><br/><strong>Steps to Reproduce:</strong><br/>1. [Step 1]<br/>2. [Step 2]<br/><br/><strong>Result:</strong><br/>[What happens]<br/><br/><strong>Expected:</strong><br/>[What should happen]" \
    "Microsoft.VSTS.Common.SystemInfo=<strong>Environment:</strong> [Prod/Staging/Dev]<br/><strong>Build/Version:</strong> [x.y.z]<br/><strong>Browser:</strong> [Details]<br/><strong>OS:</strong> [Details]<br/><strong>Timestamp:</strong> [When discovered]<br/><strong>Additional Context:</strong><br/>• [Other relevant info]" \
    "Microsoft.VSTS.Common.Severity=1 - Critical" \
    "Microsoft.VSTS.Common.Priority=1"
```

**CRITICAL**: Bug work items require detailed information for the next Human or Agent to resolve.

## State Management and Workflows

### Work Item First Policy

**ABSOLUTE RULE**: NEVER create PR without ADO work item first. This ensures 100% traceability.

**Workflow for ANY code change:**
1. Create ADO work item first (Bug/User Story/Task)
2. Create branch with work item ID in name
3. Implement changes 
4. Create PR linked to work item
5. Wait for human approval
6. Update work item after merge

**Branch Hygiene Requirements:**
- Create clean branches from main (no dirty working directory)
- Maximum 5 files per PR unless justified
- Include work item ID in branch name
- Single logical change per PR

### MANDATORY Workflow Completion Summary
**REQUIREMENT**: Upon completing any task following the development workflow, Claude MUST provide this standardized summary format:

```
## ✅ Workflow Compliance Complete

**1. ✅ Create ADO Work Item FIRST** - [Details of work item created]
**2. ✅ Create Branch** - [Branch name with work item ID]
**3. ✅ Implement Changes** - [Summary of changes implemented]
**4. ✅ Execute Mandatory PR Verification** - MANDATORY_VERIFICATION_PROTOCOL.md completed
**5. ✅ Create Pull Request** - [PR number and linking details]
**6. ⏳ MANDATORY STOP** - Now waiting for explicit human approval before merge

## 🛑 MANDATORY STOP - Human Approval Required

The PR #[NUMBER] is now **active** and awaiting your review and approval. Following the strict workflow requirements:

- **Work Item**: #[ID] created and linked
- **Branch**: [branch-name] with proper naming
- **PR Status**: Active (#[NUMBER]) - **NOT** auto-merged or auto-completed
- **Work Item Link**: Properly linked with work item
- **Human Approval**: **REQUIRED** before merge

## Summary of [Task Description]

**Problem Solved**: [Brief description of what was fixed/implemented]
**Implementation**: [High-level technical approach]
**Performance**: [Any performance impacts or improvements]
**Quality**: [Quality assurance measures taken]

PR URL: [Link to PR]

The solution is ready for your review and testing!
```

## Visual Symbol Standards

### Visual Symbol Standards:
- ✅ = Completed/Implemented/Approved
- ❌ = Incomplete/Missing/Failed
- ⚠️ = In Progress/Warning/Needs Attention

**MANDATORY**: Use visual symbols ✅ and ❌ for acceptance criteria and definition of done throughout all ADO work items and PR descriptions.

## CLI Commands and Examples

### Azure DevOps Integration
The project uses Azure DevOps for:
- Work item tracking and project management
- CI/CD pipelines for automated testing and deployment
- Release management and version control
- Analytics and reporting dashboards

**Note**: ADO CLI commands require proper configuration with organization URL, project name, and authentication tokens.

### Common ADO CLI Commands

**Work Item Creation:**
```bash
# Create User Story
az boards work-item create \
  --title "User Story Title" \
  --type "User Story" \
  --state "Active" \
  --fields \
    "System.Description=<strong>User Story:</strong><br/>As a [persona], I want [goal] so that [benefit].<br/><br/><strong>Description:</strong><br/>Detailed description..." \
    "Microsoft.VSTS.Common.AcceptanceCriteria=<strong>Acceptance Criteria:</strong><br/>✅ Criteria 1<br/>❌ Criteria 2<br/><br/><strong>Definition of Done:</strong><br/>✅ Code reviewed<br/>❌ Tests passing"
```

**Work Item Updates:**
```bash
# Update work item state
az boards work-item update --id 1234 --state "In Review"

# Add comments
az boards work-item comment add --id 1234 --text "Work completed and ready for review"
```

**PR Creation:**
```bash
# Create PR with work item linking
az repos pr create \
  --title "Feature: Description" \
  --description "$(cat <<'EOF'
<strong>🤖 Feature Implementation</strong><br/><br/>
<strong>Resolves:</strong> AB#1234<br/><br/>
<strong>Changes:</strong><br/>
• Feature implementation<br/>
• Tests added<br/>
• Documentation updated<br/><br/>
🤖 Generated with [Claude Code](https://claude.ai/code)
EOF
)"
```

## Workflow Compliance

### Azure DevOps Tasks
**When creating work items, managing ADO, or following project workflows:**
- Apply: ADO_INTEGRATION.md - Azure DevOps CLI and workflows
- Apply: ADO_FIELD_VALIDATION.md - CRITICAL field validation requirements
- Apply: USER_STORY_STANDARDS.md - User story documentation standards

## Jira Integration Alternative

### JIRA INTEGRATION - OPERATIONAL:
✅ **FULLY IMPLEMENTED AND TESTED** - Complete Jira integration alternatives to Azure DevOps:

**✅ Option 1: Official Atlassian MCP Server (For Claude.ai Web Interface)**
- **Status**: ✅ Configured and OAuth authenticated with `agentic-sdlc.atlassian.net`
- **Enterprise Security**: OAuth authentication with Atlassian's official MCP server
- **Server URL**: `https://mcp.atlassian.com/v1/sse`
- **Instance**: `agentic-sdlc.atlassian.net` (OAuth setup complete)
- **Authentication**: OAuth (no API tokens required)
- **Usage**: Create Jira issues directly through Claude.ai web interface
- **Rate Limits**: 1K-10K calls/hour based on plan
- **Support**: Official Atlassian support and maintenance
- **Documentation**: See `ATLASSIAN_MCP_INTEGRATION.md` for complete setup guide

**✅ Option 2: Direct API Integration (For Claude Code CLI - OPERATIONAL)**
- **Status**: ✅ Fully operational with successful issue creation (ASP-1 created and verified)
- **Configuration**: Jira credentials saved in `~/.jira_config`
- **Instance**: `agentic-sdlc.atlassian.net` with project key `ASP`
- **Authentication**: API token authentication (secure, tested, working)
- **CLI Tool**: `scripts/jira/jira-work-item.sh` - fully functional work item management
- **Proven Capability**: Successfully created ASP-1 "Implement Atlassian MCP Integration for Agentic SDLC Platform"
- **Full API Support**: Complete REST API integration for creating stories, bugs, tasks, epics
- **Field Mapping**: Comprehensive mapping from ADO fields to Jira fields with custom field discovery
- **Atlassian Document Format**: Rich text content support in descriptions and comments
- **Documentation**: See `JIRA_INTEGRATION.md` for setup and usage guide

**🔧 Quick Start Commands (API Integration)**:
```bash
# Setup (one-time)
./scripts/jira/jira-work-item.sh setup

# Create work items
./scripts/jira/jira-work-item.sh create story "Your story title" "Description"
./scripts/jira/jira-work-item.sh create bug "Bug title" "Bug description"

# Manage existing items
./scripts/jira/jira-work-item.sh show ASP-1
./scripts/jira/jira-work-item.sh transition ASP-1 "In Progress"
./scripts/jira/jira-work-item.sh comment ASP-1 "Work completed"
./scripts/jira/jira-work-item.sh list
```

**✅ Verified Operational Features (Both Options)**:
- **Branch Integration**: Work Item First Policy with Jira issue keys (`feature/ASP-1-description`)
- **PR Integration**: Automatic linking between PRs and Jira issues (ASP-1 linked to PR #1059)
- **Work Item Creation**: Proven successful creation in agentic-sdlc project
- **Workflow Compliance**: Full support for platform development workflows
- **Project Integration**: Active in agentic-sdlc.atlassian.net with ASP project key

## MANDATORY JIRA STORY REQUIREMENTS

**CRITICAL**: All Jira stories MUST match ADO quality standards with comprehensive documentation.

### Jira Story Structure Standards

**MANDATORY STORY FIELDS**:
- **Summary**: Concise, action-oriented title following pattern: "Verb + Object + Context"
- **Description**: REQUIRED comprehensive structure using Atlassian Document Format
- **Issue Type**: Story, Bug, Task, Epic, or Subtask
- **Priority**: Set appropriately (Critical, High, Medium, Low)
- **Assignee**: Assigned team member
- **Status Lifecycle**: To Do → In Progress → In Review → Done

### Jira Description Format Requirements

**MANDATORY STRUCTURE** (using Atlassian Document Format):
```json
{
  "type": "doc",
  "version": 1,
  "content": [
    {"type": "heading", "content": [{"type": "text", "text": "User Story"}]},
    {"type": "paragraph", "content": [{"type": "text", "text": "As a [persona], I want [goal] so that [benefit]."}]},
    
    {"type": "heading", "content": [{"type": "text", "text": "Description"}]},
    {"type": "paragraph", "content": [{"type": "text", "text": "Detailed description of implementation..."}]},
    
    {"type": "heading", "content": [{"type": "text", "text": "Acceptance Criteria"}]},
    {"type": "bulletList", "content": [
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "✅ Criteria 1 description"}]}]},
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "✅ Criteria 2 description"}]}]}
    ]},
    
    {"type": "heading", "content": [{"type": "text", "text": "Definition of Done"}]},
    {"type": "bulletList", "content": [
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "✅ Code reviewed and tested"}]}]},
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "✅ Documentation updated"}]}]},
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "❌ Human approval obtained"}]}]}
    ]},
    
    {"type": "heading", "content": [{"type": "text", "text": "Technical Implementation"}]},
    {"type": "bulletList", "content": [
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Implementation detail 1"}]}]},
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Implementation detail 2"}]}]}
    ]},
    
    {"type": "heading", "content": [{"type": "text", "text": "Business Value"}]},
    {"type": "bulletList", "content": [
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Business benefit 1"}]}]},
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Business benefit 2"}]}]}
    ]}
  ]
}
```

### Jira Status Lifecycle Management

**MANDATORY STATUS TRANSITIONS**:
1. **Creation**: Set to "To Do" (default)
2. **Work Start**: Transition to "In Progress" when implementation begins
3. **PR Creation**: Transition to "In Review" when PR submitted
4. **PR Merge**: Transition to "Done" after successful merge and human approval

**Status Transition Commands**:
```bash
# Start work
./scripts/jira/jira-work-item.sh transition ASP-123 "In Progress"

# Submit for review
./scripts/jira/jira-work-item.sh transition ASP-123 "In Review"

# Complete after merge
./scripts/jira/jira-work-item.sh transition ASP-123 "Done"
```

### Jira Visual Symbol Standards

**MANDATORY**: Use visual symbols ✅ and ❌ for acceptance criteria and definition of done:
- ✅ = Completed/Implemented/Approved
- ❌ = Incomplete/Missing/Failed  
- ⚠️ = In Progress/Warning/Needs Attention

### Jira Work Item Linking Requirements

**MANDATORY PR LINKING**:
- **Branch Naming**: `feature/ASP-123-description`
- **PR Description**: Must include links to both Jira issue and ADO work item
- **PR Comments**: Automated linking using issue keys (ASP-123)
- **Status Updates**: Automatic status progression through workflow

**Example Jira-ADO-PR Linking**:
```markdown
🔗 **Jira Issue**: [ASP-123 - Story Title](https://agentic-sdlc.atlassian.net/browse/ASP-123)
🔗 **ADO Work Item**: [#4827](https://dev.azure.com/NorthHighland/agentic-sdlc-platform/_workitems/edit/4827)
🔗 **Pull Request**: #1059 - Implementation ready for review
```

---

**Related References**:
- See ADO_INTEGRATION.md for complete CLI usage and parent-child relationship creation
- See ADO_FIELD_VALIDATION.md for complete field validation requirements
- See USER_STORY_STANDARDS.md for user story documentation standards
- See QUALITY_STANDARDS.md for complete branch hygiene and PR requirements

**Last Updated**: January 2025
**Version**: 1.0.0
**Scope**: Comprehensive ADO workflow management for Agentic SDLC Platform