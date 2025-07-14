# Multi-Platform Work Item Management

## Overview

The Agentic SDLC Platform provides comprehensive multi-platform work item management, supporting Azure DevOps (ADO), Jira, or both platforms simultaneously based on end user project selection and configuration. This document outlines the complete implementation of dynamic tool selection and cross-platform integration capabilities.

## Table of Contents

1. [Dynamic Tool Selection](#dynamic-tool-selection)
2. [Platform Configuration](#platform-configuration) 
3. [Cross-Platform PR Linking](#cross-platform-pr-linking)
4. [Status Lifecycle Management](#status-lifecycle-management)
5. [Work Item Standards](#work-item-standards)
6. [Implementation Examples](#implementation-examples)
7. [Troubleshooting](#troubleshooting)

## Dynamic Tool Selection

### Configuration Methods

The platform supports multiple methods for selecting work item management tools:

#### 1. Admin Process Configuration
- Set during platform onboarding via admin console
- Tenant-level configuration stored in `.claude/tenant-config.yml`
- Persistent across all sessions for the tenant

#### 2. Project-Level Settings
- Configured per project in tenant settings
- Overrides tenant-level configuration
- Allows different projects to use different tools

#### 3. NLP User Selection
- User can specify preferences using natural language at any time during session
- Real-time tool switching based on user commands
- Examples:
  - "Use Jira for this project"
  - "Switch to Azure DevOps for work items"
  - "I prefer Jira over ADO"
  - "Configure both Jira and ADO"
  - "Let's work with Azure DevOps boards"

#### 4. Runtime Detection
- System can auto-detect based on user commands and context
- Intelligent parsing of existing work item references
- Automatic configuration based on repository context

### Supported Configurations

| Configuration | Description | Use Case |
|---------------|-------------|----------|
| `ado` | Azure DevOps only | Traditional enterprise environments |
| `jira` | Jira only | Agile-focused teams, startups |
| `both` | Dual integration with cross-platform linking | Migration scenarios, hybrid teams |
| `auto` | Dynamic selection based on user input | Flexible environments, consulting |

## Platform Configuration

### Configuration File Structure

```yaml
# .claude/tenant-config.yml
tenant:
  id: "policy2control"
  work_item_provider: "both"  # ado, jira, both, auto
  
platforms:
  ado:
    organization: "https://dev.azure.com/NorthHighland"
    project: "agentic-sdlc-platform"
    default_area: "agentic-sdlc-platform"
    default_iteration: "agentic-sdlc-platform"
    
  jira:
    instance: "https://agentic-sdlc.atlassian.net"
    project_key: "ASP"
    default_issue_type: "Story"
    
settings:
  branch_naming: "multi_platform"  # single, multi_platform
  cross_linking: true
  status_sync: true
```

### Environment Variables

```bash
# ADO Configuration
export ADO_ORGANIZATION='https://dev.azure.com/NorthHighland'
export ADO_PROJECT='agentic-sdlc-platform'

# Jira Configuration  
export JIRA_BASE_URL='https://agentic-sdlc.atlassian.net'
export JIRA_PROJECT_KEY='ASP'
export JIRA_USERNAME='user@example.com'
export JIRA_API_TOKEN='your-api-token'

# Multi-platform settings
export WORK_ITEM_PROVIDER='both'  # ado, jira, both, auto
```

## Cross-Platform PR Linking

### PR Linking Requirements

**MANDATORY**: All PRs must be linked to work items regardless of platform combination.

#### ADO Work Item Linking
```bash
# Link PR to ADO work item
az repos pr work-item add --id <PR_ID> --work-items <WORK_ITEM_ID>

# Verify linking
az repos pr show --id <PR_ID> --query relations
```

#### Jira Issue Linking
```bash
# Add PR comment to Jira issue
curl -X POST "https://agentic-sdlc.atlassian.net/rest/api/3/issue/$JIRA_ISSUE_KEY/comment" \
  -u "$JIRA_USERNAME:$JIRA_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "body": {
      "type": "doc",
      "version": 1,
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text", 
              "text": "🔗 PULL REQUEST LINKED: PR #1059 in Azure DevOps"
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Platform: Azure DevOps (dev.azure.com/NorthHighland)"
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Status: Active (awaiting human review)"
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Cross-Platform Linking: ADO Work Item AB#4827 also linked to same PR"
            }
          ]
        }
      ]
    }
  }'
```

#### Cross-Platform Linking
For dual configuration (`both`), PRs must be linked to work items in both platforms:

1. Create work items in both ADO and Jira
2. Link PR to ADO work item using Azure DevOps CLI
3. Add PR comment to Jira issue using REST API
4. Update both work items with cross-platform references

### Platform Independence

The system supports PRs from any platform linking to any work item system:

| PR Platform | Work Item Platform | Linking Method |
|-------------|-------------------|----------------|
| Azure DevOps | ADO | Native linking via `az repos pr work-item add` |
| Azure DevOps | Jira | API comment with PR details |
| GitHub | ADO | PR description with `AB#1234` syntax |
| GitHub | Jira | API comment with PR details |
| BitBucket | ADO | PR description with `AB#1234` syntax |
| BitBucket | Jira | API comment with PR details |

## Status Lifecycle Management

### Status Mapping

| Stage | ADO Status | Jira Status | Description |
|-------|------------|-------------|-------------|
| Creation | New | To Do | Initial work item creation |
| Work Start | Active | In Progress | Implementation begins |
| PR Created | Resolved | IN PR REVIEW | PR submitted for review |
| Completed | Closed | Done | Human approved and merged |

### Status Synchronization

When using dual configuration (`both`), status changes are synchronized across platforms:

```bash
# Update ADO work item
az boards work-item update --id 4827 --state "Resolved"

# Update Jira issue  
curl -X POST "https://agentic-sdlc.atlassian.net/rest/api/3/issue/ASP-1/transitions" \
  -u "$JIRA_USERNAME:$JIRA_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"transition": {"id": "2"}}'  # Transition to "IN PR REVIEW"
```

### Automated Status Updates

The platform provides automated status updates through hooks and triggers:

1. **Work Item Creation**: Automatically set to Active/In Progress
2. **PR Creation**: Transition to Resolved/IN PR REVIEW  
3. **PR Merge**: Transition to Closed/Done
4. **Cross-Platform Sync**: Keep both platforms synchronized

## Work Item Standards

### ADO Work Item Requirements

```bash
az boards work-item create \
  --title "Title" \
  --type "User Story" \
  --state "Active" \
  --fields \
    "System.Description=<strong>User Story:</strong><br/>As a developer...<br/><br/><strong>Description:</strong><br/>Details..." \
    "Microsoft.VSTS.Common.AcceptanceCriteria=<strong>Acceptance Criteria:</strong><br/>✅ Criteria 1<br/>❌ Criteria 2<br/><br/><strong>Definition of Done:</strong><br/>✅ Code reviewed<br/>❌ Tests passing"
```

### Jira Story Requirements

All Jira stories must match ADO quality standards:

**Required Sections:**
1. **User Story**: Clear "As a [role], I want [goal] so that [benefit]" format
2. **Description**: Detailed technical description and business context
3. **Acceptance Criteria**: Bulleted list with visual symbols (✅ completed, ❌ incomplete)
4. **Definition of Done**: Standard completion checklist
5. **Technical Implementation**: Technical approach and architecture details
6. **Business Value**: Clear business impact and stakeholder benefits

**Atlassian Document Format Example:**
```json
{
  "type": "doc",
  "version": 1,
  "content": [
    {
      "type": "heading",
      "attrs": {"level": 3},
      "content": [{"type": "text", "text": "User Story"}]
    },
    {
      "type": "paragraph", 
      "content": [{"type": "text", "text": "As a developer, I want multi-platform work item management so that I can use my preferred tools."}]
    },
    {
      "type": "heading",
      "attrs": {"level": 3},
      "content": [{"type": "text", "text": "Acceptance Criteria"}]
    },
    {
      "type": "bulletList",
      "content": [
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [{"type": "text", "text": "✅ Dynamic tool selection implemented"}]
            }
          ]
        }
      ]
    }
  ]
}
```

### Branch Naming Conventions

**Multi-Platform Format:**
- ADO only: `feature/4827-description`
- Jira only: `feature/ASP-1-description`  
- Both: `feature/4827-ASP-1-description`

**Legacy Single-Platform Format:**
- `feature/<work-item-id>-description`

### Visual Symbol Standards

**Completion Status Symbols:**
- ✅ = Completed/Implemented/Approved
- ❌ = Incomplete/Missing/Failed
- ⚠️ = In Progress/Warning/Needs Attention
- 🔗 = Linked/Connected/Cross-Referenced

**Platform Indicators:**
- 🅰️ = Azure DevOps
- 🅹️ = Jira
- 🅶️ = GitHub
- 🅱️ = BitBucket

## Implementation Examples

### Example 1: Dual Platform Work Item Creation

```bash
# 1. Create ADO work item
ado_id=$(az boards work-item create \
  --title "Implement Multi-Platform Support" \
  --type "User Story" \
  --state "Active" \
  --fields "System.Description=<strong>User Story:</strong><br/>As a developer..." \
  --query id --output tsv)

# 2. Create Jira issue
jira_key=$(curl -X POST "https://agentic-sdlc.atlassian.net/rest/api/3/issue" \
  -u "$JIRA_USERNAME:$JIRA_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d @jira_issue_payload.json | jq -r '.key')

# 3. Cross-link work items
az boards work-item update --id $ado_id --fields \
  "System.Description=Original description<br/><br/><strong>🔗 LINKED JIRA ISSUE: $jira_key</strong><br/>https://agentic-sdlc.atlassian.net/browse/$jira_key"

# 4. Create branch with both IDs
git checkout -b "feature/${ado_id}-${jira_key}-multi-platform-support"
```

### Example 2: Cross-Platform PR Creation

```bash
# 1. Create PR linking both work items
az repos pr create \
  --title "Feature: Multi-Platform Work Item Management" \
  --description "$(cat <<'EOF'
<strong>🤖 Multi-Platform Integration PR</strong><br/><br/>

<strong>Work Items:</strong><br/>
• 🅰️ ADO Work Item: AB#4827<br/>
• 🅹️ Jira Issue: ASP-1<br/><br/>

<strong>Implementation:</strong><br/>
• ✅ Dynamic tool selection<br/>
• ✅ Cross-platform PR linking<br/>
• ✅ Status synchronization<br/><br/>

<strong>Resolves:</strong> AB#4827<br/><br/>

🤖 Generated with [Claude Code](https://claude.ai/code)
EOF
)"

# 2. Link PR to ADO work item
pr_id=$(az repos pr list --status active --source-branch feature/${ado_id}-${jira_key}-multi-platform-support --query '[0].pullRequestId' --output tsv)
az repos pr work-item add --id $pr_id --work-items $ado_id

# 3. Add PR comment to Jira issue
curl -X POST "https://agentic-sdlc.atlassian.net/rest/api/3/issue/$jira_key/comment" \
  -u "$JIRA_USERNAME:$JIRA_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d @pr_link_comment.json
```

### Example 3: NLP-Based Tool Selection

```javascript
// Context detection for user preferences
function detectWorkItemPreference(userInput) {
  const patterns = {
    jira: /\b(jira|atlassian|use jira|prefer jira)\b/i,
    ado: /\b(ado|azure devops|devops|use ado|prefer ado)\b/i,
    both: /\b(both|dual|cross-platform|integrate both)\b/i
  };
  
  for (const [platform, pattern] of Object.entries(patterns)) {
    if (pattern.test(userInput)) {
      return platform;
    }
  }
  
  return 'auto'; // Default to auto-detection
}

// Example usage
const userInput = "Let's use Jira for this project";
const preference = detectWorkItemPreference(userInput); // Returns 'jira'
```

## Troubleshooting

### Common Issues

#### 1. Work Item Creation Failures

**Issue**: Work item creation fails with authentication errors

**Solutions**:
- Verify environment variables are set correctly
- Check API token validity
- Confirm organization/instance URLs are accessible

#### 2. Cross-Platform Linking Issues

**Issue**: Links not appearing in both platforms

**Solutions**:
- Verify both platforms are configured
- Check API permissions for both ADO and Jira
- Ensure proper field formatting (HTML vs. Atlassian Document Format)

#### 3. Status Synchronization Problems

**Issue**: Status changes not synchronized across platforms

**Solutions**:
- Verify status mapping configuration
- Check transition permissions in both platforms
- Ensure proper transition IDs are used

### Debugging Commands

```bash
# Test ADO connectivity
az boards work-item list --top 1

# Test Jira connectivity  
curl -X GET "https://agentic-sdlc.atlassian.net/rest/api/3/myself" \
  -u "$JIRA_USERNAME:$JIRA_API_TOKEN"

# Verify work item linking
az repos pr show --id <PR_ID> --query relations

# Check Jira issue status
curl -X GET "https://agentic-sdlc.atlassian.net/rest/api/3/issue/ASP-1" \
  -u "$JIRA_USERNAME:$JIRA_API_TOKEN" | jq '.fields.status'
```

### Performance Optimization

1. **Batch Operations**: When creating multiple work items, use batch APIs where available
2. **Caching**: Cache platform configurations to avoid repeated API calls
3. **Parallel Processing**: Execute cross-platform operations in parallel when possible
4. **Error Handling**: Implement robust retry logic for API failures

## Related Documentation

- [ADO_COMPREHENSIVE.md](ADO_COMPREHENSIVE.md) - Complete Azure DevOps integration guide
- [JIRA_INTEGRATION.md](JIRA_INTEGRATION.md) - Jira-specific implementation details
- [QUALITY_STANDARDS.md](../../../development/workflows/QUALITY_STANDARDS.md) - Workflow compliance requirements

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Implementation Status**: ✅ Operational and Tested  
**Test Case**: ASP-1 ↔ AB#4827 ↔ PR#1059 cross-platform linking verified