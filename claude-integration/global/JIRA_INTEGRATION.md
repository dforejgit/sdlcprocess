# Jira Integration Guide for Agentic SDLC Platform

## Overview

This guide provides comprehensive instructions for using Jira as an alternative to Azure DevOps for work item management in the Agentic SDLC Platform. The integration supports all major work item types and follows the same workflow patterns as ADO.

## Prerequisites

### Jira Instance Requirements
- **Jira Cloud**: Recommended for new implementations
- **Jira Server/Data Center**: Supported for enterprise environments
- **Admin Access**: Required for project configuration and custom fields setup
- **API Access**: Enabled for your Jira instance

### Authentication Setup

#### For Jira Cloud (Recommended)
1. **Create API Token**:
   - Navigate to https://id.atlassian.com/manage-profile/security/api-tokens
   - Click "Create API token"
   - Provide a descriptive label (e.g., "Agentic SDLC Platform")
   - Copy and securely store the generated token

2. **Token Security Notes (2025 Updates)**:
   - API tokens created after December 15, 2024 expire in one year
   - Tokens created before this date will expire between March 14-May 12, 2026
   - Use scoped tokens for enhanced security
   - Enable two-factor authentication for additional security

#### For Jira Server/Data Center
1. **Create Personal Access Token**:
   - Log into Jira and click your profile picture
   - Navigate to "Personal Access Tokens" or "API Keys" in settings
   - Click "Create Token"
   - Set appropriate permissions and expiration
   - Copy and securely store the generated token

## Environment Configuration

### Required Environment Variables

```bash
# Jira Configuration
JIRA_BASE_URL=https://your-domain.atlassian.net  # or your server URL
JIRA_USERNAME=your-email@domain.com              # For Cloud
JIRA_API_TOKEN=your-api-token-here               # For both Cloud and Server
JIRA_PROJECT_KEY=PROJ                            # Your project key

# Optional: Default configurations
JIRA_DEFAULT_ISSUE_TYPE=Story                    # Default issue type
JIRA_DEFAULT_PRIORITY=Medium                     # Default priority
JIRA_BOARD_ID=123                               # Agile board ID (if using)
```

### Platform Integration

Add to your `.env` file or platform configuration:

```bash
# Work Item Management
WORK_ITEM_PROVIDER=jira                         # Options: ado, jira
JIRA_BASE_URL=${JIRA_BASE_URL}
JIRA_USERNAME=${JIRA_USERNAME}
JIRA_API_TOKEN=${JIRA_API_TOKEN}
JIRA_PROJECT_KEY=${JIRA_PROJECT_KEY}
```

## Jira API Reference

### Base API Endpoints

| Operation | Endpoint | Method |
|-----------|----------|---------|
| Create Issue | `/rest/api/3/issue` | POST |
| Get Issue | `/rest/api/3/issue/{issueIdOrKey}` | GET |
| Update Issue | `/rest/api/3/issue/{issueIdOrKey}` | PUT |
| Get Metadata | `/rest/api/3/issue/createmeta` | GET |
| Search Issues | `/rest/api/3/search` | GET/POST |
| Add Comment | `/rest/api/3/issue/{issueIdOrKey}/comment` | POST |
| Get Transitions | `/rest/api/3/issue/{issueIdOrKey}/transitions` | GET |
| Transition Issue | `/rest/api/3/issue/{issueIdOrKey}/transitions` | POST |

### Authentication Header

```bash
# Basic Auth (Base64 encoded username:token)
Authorization: Basic <base64-encoded-credentials>

# Example for curl
curl -X GET \
  -H "Authorization: Basic $(echo -n 'email@domain.com:api-token' | base64)" \
  https://your-domain.atlassian.net/rest/api/3/issue/PROJ-123
```

## Work Item Creation

### Create User Story

```bash
curl -X POST \
  -H "Authorization: Basic $(echo -n '${JIRA_USERNAME}:${JIRA_API_TOKEN}' | base64)" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  "${JIRA_BASE_URL}/rest/api/3/issue" \
  -d '{
    "fields": {
      "project": {
        "key": "PROJ"
      },
      "summary": "Implement customer onboarding API",
      "description": {
        "type": "doc",
        "version": 1,
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "As a customer, I want to complete onboarding through an API so that I can automate the process."
              }
            ]
          }
        ]
      },
      "issuetype": {
        "name": "Story"
      },
      "priority": {
        "name": "High"
      },
      "labels": ["api", "onboarding", "automation"],
      "customfield_10020": 8,
      "customfield_10016": 5.5
    }
  }'
```

### Create Bug Report

```bash
curl -X POST \
  -H "Authorization: Basic $(echo -n '${JIRA_USERNAME}:${JIRA_API_TOKEN}' | base64)" \
  -H "Content-Type: application/json" \
  "${JIRA_BASE_URL}/rest/api/3/issue" \
  -d '{
    "fields": {
      "project": {
        "key": "PROJ"
      },
      "summary": "Fix: Authentication service returns 500 error",
      "description": {
        "type": "doc",
        "version": 1,
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "Authentication service fails with 500 error when processing invalid tokens."
              }
            ]
          },
          {
            "type": "heading",
            "attrs": { "level": 3 },
            "content": [
              {
                "type": "text",
                "text": "Steps to Reproduce"
              }
            ]
          },
          {
            "type": "orderedList",
            "content": [
              {
                "type": "listItem",
                "content": [
                  {
                    "type": "paragraph",
                    "content": [
                      {
                        "type": "text",
                        "text": "Send request with invalid token"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "listItem",
                "content": [
                  {
                    "type": "paragraph",
                    "content": [
                      {
                        "type": "text",
                        "text": "Observe 500 error response"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      "issuetype": {
        "name": "Bug"
      },
      "priority": {
        "name": "High"
      },
      "customfield_10024": {
        "value": "1 - Critical"
      }
    }
  }'
```

### Create Task

```bash
curl -X POST \
  -H "Authorization: Basic $(echo -n '${JIRA_USERNAME}:${JIRA_API_TOKEN}' | base64)" \
  -H "Content-Type: application/json" \
  "${JIRA_BASE_URL}/rest/api/3/issue" \
  -d '{
    "fields": {
      "project": {
        "key": "PROJ"
      },
      "summary": "Update API documentation for onboarding endpoints",
      "description": {
        "type": "doc",
        "version": 1,
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "Update the API documentation to reflect new onboarding endpoints and authentication requirements."
              }
            ]
          }
        ]
      },
      "issuetype": {
        "name": "Task"
      },
      "priority": {
        "name": "Medium"
      },
      "labels": ["documentation", "api"]
    }
  }'
```

## Work Item Field Mapping

### ADO to Jira Field Mapping

| ADO Field | Jira Field | Type | Notes |
|-----------|------------|------|-------|
| `System.Title` | `summary` | String | Required field |
| `System.Description` | `description` | Atlassian Document Format | Rich text content |
| `System.State` | `status` | Transition-based | Use transitions API |
| `System.AssignedTo` | `assignee` | User object | `{"id": "user-id"}` |
| `System.WorkItemType` | `issuetype` | Object | `{"name": "Story"}` |
| `Microsoft.VSTS.Common.Priority` | `priority` | Object | `{"name": "High"}` |
| `Microsoft.VSTS.Scheduling.StoryPoints` | `customfield_10020` | Number | Default Story Points field |
| `Microsoft.VSTS.Scheduling.OriginalEstimate` | `customfield_10021` | Number | Custom field for estimates |
| `Microsoft.VSTS.Common.AcceptanceCriteria` | `customfield_10022` | Text | Custom field required |
| `System.Tags` | `labels` | Array | String array |

### Custom Field Discovery

Find your custom field IDs:

```bash
# Get all fields
curl -X GET \
  -H "Authorization: Basic $(echo -n '${JIRA_USERNAME}:${JIRA_API_TOKEN}' | base64)" \
  "${JIRA_BASE_URL}/rest/api/3/field"

# Get create metadata for specific project
curl -X GET \
  -H "Authorization: Basic $(echo -n '${JIRA_USERNAME}:${JIRA_API_TOKEN}' | base64)" \
  "${JIRA_BASE_URL}/rest/api/3/issue/createmeta?projectKeys=PROJ&expand=projects.issuetypes.fields"
```

## Work Item State Management

### Get Available Transitions

```bash
curl -X GET \
  -H "Authorization: Basic $(echo -n '${JIRA_USERNAME}:${JIRA_API_TOKEN}' | base64)" \
  "${JIRA_BASE_URL}/rest/api/3/issue/PROJ-123/transitions"
```

### Transition Work Item

```bash
# Move to "In Progress"
curl -X POST \
  -H "Authorization: Basic $(echo -n '${JIRA_USERNAME}:${JIRA_API_TOKEN}' | base64)" \
  -H "Content-Type: application/json" \
  "${JIRA_BASE_URL}/rest/api/3/issue/PROJ-123/transitions" \
  -d '{
    "transition": {
      "id": "21"
    },
    "fields": {
      "assignee": {
        "id": "user-id"
      }
    }
  }'

# Move to "Done"
curl -X POST \
  -H "Authorization: Basic $(echo -n '${JIRA_USERNAME}:${JIRA_API_TOKEN}' | base64)" \
  -H "Content-Type: application/json" \
  "${JIRA_BASE_URL}/rest/api/3/issue/PROJ-123/transitions" \
  -d '{
    "transition": {
      "id": "31"
    }
  }'
```

### State Mapping

| ADO State | Jira Status | Transition ID (typical) |
|-----------|-------------|-------------------------|
| New | To Do | 11 |
| Active | In Progress | 21 |
| Resolved | In Review | 31 |
| Closed | Done | 41 |

## Integration with Platform Workflow

### Work Item First Policy Implementation

Create a work item before any code changes:

```bash
#!/bin/bash
# create-jira-work-item.sh

SUMMARY="$1"
DESCRIPTION="$2"
ISSUE_TYPE="${3:-Story}"

JIRA_RESPONSE=$(curl -s -X POST \
  -H "Authorization: Basic $(echo -n '${JIRA_USERNAME}:${JIRA_API_TOKEN}' | base64)" \
  -H "Content-Type: application/json" \
  "${JIRA_BASE_URL}/rest/api/3/issue" \
  -d "{
    \"fields\": {
      \"project\": {
        \"key\": \"${JIRA_PROJECT_KEY}\"
      },
      \"summary\": \"${SUMMARY}\",
      \"description\": {
        \"type\": \"doc\",
        \"version\": 1,
        \"content\": [
          {
            \"type\": \"paragraph\",
            \"content\": [
              {
                \"type\": \"text\",
                \"text\": \"${DESCRIPTION}\"
              }
            ]
          }
        ]
      },
      \"issuetype\": {
        \"name\": \"${ISSUE_TYPE}\"
      },
      \"priority\": {
        \"name\": \"Medium\"
      }
    }
  }")

# Extract issue key
ISSUE_KEY=$(echo "$JIRA_RESPONSE" | jq -r '.key')
echo "Created work item: $ISSUE_KEY"

# Create branch with work item ID
git checkout -b "feature/${ISSUE_KEY}-$(echo "$SUMMARY" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')"
```

### Branch Naming Convention

```bash
# Standard format
feature/PROJ-123-implement-customer-api
bugfix/PROJ-124-fix-authentication-error
hotfix/PROJ-125-security-patch

# Use Jira issue key instead of ADO work item ID
```

### PR Integration

Link pull requests to Jira issues:

```bash
# In PR description or commit message
Implements PROJ-123: Add customer onboarding API

# Jira will automatically detect and link the PR
```

## Platform Configuration Updates

### Update Platform Services

1. **Tenant Management Service** - Add Jira configuration fields
2. **Admin Dashboard** - Support Jira project selection
3. **Claude Code Enterprise** - Update work item creation to use Jira API
4. **Onboarding Agent** - Configure for Jira work item creation

### Service Configuration

```yaml
# kubernetes/local/jira-integration-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: jira-integration-config
  namespace: agentic-local
data:
  WORK_ITEM_PROVIDER: "jira"
  JIRA_BASE_URL: "https://your-domain.atlassian.net"
  JIRA_PROJECT_KEY: "PROJ"
  JIRA_DEFAULT_ISSUE_TYPE: "Story"
  JIRA_DEFAULT_PRIORITY: "Medium"

---
apiVersion: v1
kind: Secret
metadata:
  name: jira-credentials
  namespace: agentic-local
type: Opaque
data:
  JIRA_USERNAME: <base64-encoded-username>
  JIRA_API_TOKEN: <base64-encoded-api-token>
```

## Development Workflow with Jira

### 1. Create Jira Issue

```bash
# Using curl or platform API
curl -X POST \
  -H "Authorization: Basic $(echo -n '${JIRA_USERNAME}:${JIRA_API_TOKEN}' | base64)" \
  -H "Content-Type: application/json" \
  "${JIRA_BASE_URL}/rest/api/3/issue" \
  -d '{...}'
```

### 2. Create Feature Branch

```bash
git checkout -b feature/PROJ-123-new-feature
```

### 3. Implement Changes

```bash
# Make your changes
git add .
git commit -m "PROJ-123: Implement new feature"
```

### 4. Create Pull Request

```bash
# Link to Jira issue in PR description
git push origin feature/PROJ-123-new-feature

# PR title: PROJ-123: Implement new feature
# PR description: Implements PROJ-123 - detailed description
```

### 5. Update Jira Issue

```bash
# Transition to "In Review"
curl -X POST \
  -H "Authorization: Basic $(echo -n '${JIRA_USERNAME}:${JIRA_API_TOKEN}' | base64)" \
  -H "Content-Type: application/json" \
  "${JIRA_BASE_URL}/rest/api/3/issue/PROJ-123/transitions" \
  -d '{
    "transition": {
      "id": "31"
    }
  }'
```

### 6. Complete Work Item

```bash
# After PR merge, transition to "Done"
curl -X POST \
  -H "Authorization: Basic $(echo -n '${JIRA_USERNAME}:${JIRA_API_TOKEN}' | base64)" \
  -H "Content-Type: application/json" \
  "${JIRA_BASE_URL}/rest/api/3/issue/PROJ-123/transitions" \
  -d '{
    "transition": {
      "id": "41"
    }
  }'
```

## Best Practices

### Security
- Use API tokens with minimal required scopes
- Rotate tokens regularly (especially before 2025 expiration dates)
- Store credentials securely (Kubernetes secrets, vault)
- Enable two-factor authentication on Jira accounts

### Work Item Management
- Follow consistent naming conventions for issues
- Use labels and components for categorization
- Maintain clear acceptance criteria in descriptions
- Link related issues using Jira's relationship features

### Integration
- Implement retry logic for API calls
- Handle rate limiting appropriately
- Cache metadata to reduce API calls
- Use webhooks for real-time updates where possible

### Documentation
- Document custom field mappings for your instance
- Maintain workflow state diagrams
- Keep API token management procedures updated
- Train team on Jira-specific workflows

## Troubleshooting

### Common Issues

#### Authentication Failures
```bash
# Test authentication
curl -X GET \
  -H "Authorization: Basic $(echo -n '${JIRA_USERNAME}:${JIRA_API_TOKEN}' | base64)" \
  "${JIRA_BASE_URL}/rest/api/3/myself"
```

#### Field Validation Errors
- Use create metadata API to discover required fields
- Validate custom field IDs for your instance
- Check field permissions and configurations

#### Transition Failures
- Get available transitions before attempting to change status
- Verify user permissions for transition
- Check workflow conditions and validators

### Rate Limiting

Jira Cloud has rate limits:
- **REST API**: 10 requests per second per IP
- **Bulk operations**: Lower limits apply

Implement exponential backoff and respect rate limit headers.

## Migration from ADO

### Planning Migration
1. **Field Mapping**: Create comprehensive field mapping document
2. **Workflow Analysis**: Map ADO states to Jira workflows
3. **Custom Fields**: Set up equivalent custom fields in Jira
4. **Data Migration**: Plan for historical data migration if needed
5. **Training**: Prepare team training materials

### Parallel Operation
- Run both systems during transition period
- Update platform to support both providers
- Gradually migrate teams to Jira
- Maintain consistency in work item IDs and references

## Conclusion

This integration guide provides complete instructions for using Jira as an alternative to Azure DevOps in the Agentic SDLC Platform. The REST API provides full functionality equivalent to ADO operations, with the added benefits of Jira's advanced project management features and integrations.

Key advantages of Jira integration:
- Rich project management features
- Advanced reporting and dashboards
- Extensive marketplace of add-ons
- Better integration with development tools
- Flexible workflow customization
- Strong agile/scrum support

Follow this guide to implement a complete Jira integration that maintains all platform functionality while providing enhanced project management capabilities.