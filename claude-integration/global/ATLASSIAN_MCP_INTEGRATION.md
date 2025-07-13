# Atlassian Official MCP Server Integration Guide

## Overview

Atlassian has released an official Remote MCP (Model Context Protocol) Server that provides secure, OAuth-authenticated access to Jira and Confluence from Claude and other AI tools. This is the recommended approach for enterprise Jira integration.

## Official Atlassian Remote MCP Server

### Key Benefits
- **Official Support**: Maintained and supported by Atlassian
- **Enterprise Security**: OAuth authentication with granular permission controls
- **No Local Setup**: Remote server hosted by Atlassian (no local installation required)
- **Rate Limits**: Generous rate limits based on your Atlassian plan
- **Compliance**: Respects all existing Atlassian permission controls

### Server Details
- **Server URL**: `https://mcp.atlassian.com/v1/sse`
- **Authentication**: OAuth (no API tokens needed)
- **Supported Services**: Jira Cloud, Confluence Cloud
- **Current Status**: Beta (available to all Atlassian Cloud customers)

## Your Atlassian Instance Configuration

### Instance Details
- **URL**: https://agentic-sdlc.atlassian.net
- **Email**: proth1@gmail.com
- **Workspace**: agentic-sdlc

### Rate Limits (Based on Plan)
- **Free Plan**: 500 calls/hour
- **Standard Plan**: 1,000 calls/hour
- **Premium/Enterprise**: 1,000 calls/hour + 20 per user (up to 10,000/hour)

## Setup Instructions

### Option 1: Claude.ai Integration (Recommended)

1. **Access Claude Settings**:
   ```
   Go to: https://claude.ai/settings/integrations
   ```

2. **Add MCP Integration**:
   - Click "Add integration"
   - Enter Server URL: `https://mcp.atlassian.com/v1/sse`
   - Click "Connect"

3. **Authorize Atlassian Access**:
   - You'll be redirected to Atlassian OAuth
   - Log in with: `proth1@gmail.com`
   - Select your workspace: `agentic-sdlc`
   - Grant permissions for Jira and Confluence access

4. **Verify Connection**:
   - Return to Claude
   - Test with: "Show me my recent Jira tickets"

### Option 2: Claude Code/Desktop Integration

For Claude Code (Claude Desktop), add to your configuration:

```json
{
  "mcpServers": {
    "atlassian-official": {
      "command": "npx",
      "args": [
        "@anthropic-ai/mcp-client",
        "https://mcp.atlassian.com/v1/sse"
      ],
      "env": {
        "ATLASSIAN_DOMAIN": "agentic-sdlc.atlassian.net",
        "ATLASSIAN_EMAIL": "proth1@gmail.com"
      }
    }
  }
}
```

**Note**: OAuth setup required through browser on first connection.

## Capabilities

### Jira Operations
- **Search Issues**: Find tickets by JQL, assignee, status, etc.
- **Create Issues**: Create stories, bugs, tasks, epics
- **Update Issues**: Modify fields, add comments, change status
- **Transitions**: Move tickets through workflow states
- **View Details**: Get complete ticket information

### Confluence Operations
- **Search Pages**: Find documentation by content or title
- **Read Content**: Access page content and attachments
- **Navigate Spaces**: Browse through Confluence spaces
- **View Page Tree**: Understand documentation structure

## Integration with Agentic SDLC Platform

### Work Item First Policy Support

The official MCP server fully supports our Work Item First Policy:

```javascript
// Enhanced Pre-Task Hook Integration with Atlassian MCP
const jiraTicket = await atlassianMcp.createIssue({
    project: 'AGENTIC',
    issueType: 'Story',
    summary: 'Implement customer onboarding API',
    description: 'As a customer, I want to complete onboarding through an API...'
});

// Create branch with Jira issue key
const branchName = `feature/${jiraTicket.key}-implement-customer-api`;
```

### Environment Configuration

Update your platform configuration:

```bash
# Platform Environment Variables
WORK_ITEM_PROVIDER=atlassian-mcp
ATLASSIAN_DOMAIN=agentic-sdlc.atlassian.net
ATLASSIAN_EMAIL=proth1@gmail.com

# MCP Server Configuration
MCP_SERVER_URL=https://mcp.atlassian.com/v1/sse
MCP_AUTHENTICATION=oauth
```

### Claude Code Integration

Update your `.claude/config.json`:

```json
{
  "workItemProvider": "atlassian-mcp",
  "atlassian": {
    "domain": "agentic-sdlc.atlassian.net",
    "email": "proth1@gmail.com",
    "mcpServerUrl": "https://mcp.atlassian.com/v1/sse"
  },
  "hooks": {
    "preTask": {
      "jiraIntegration": true,
      "workItemCreation": "automatic"
    }
  }
}
```

## Common Use Cases

### 1. Development Workflow
```
"Create a Jira ticket for implementing user authentication, 
then show me related tickets and start development"
```

### 2. Sprint Planning
```
"Show me all tickets in current sprint, 
group by assignee and priority"
```

### 3. Code Review Integration
```
"Find the Jira ticket for AGENTIC-123 and add a comment 
about the PR being ready for review"
```

### 4. Documentation Access
```
"Find the API documentation in Confluence for 
the authentication service"
```

## Security and Compliance

### OAuth Authentication
- **No API Tokens**: Uses secure OAuth flow
- **Permission Inheritance**: Respects all Atlassian permissions
- **Session Management**: Automatic token refresh
- **Revocation**: Can be revoked in Atlassian settings

### Enterprise Security
- **Audit Logs**: All MCP operations logged in Atlassian
- **IP Restrictions**: Honors Atlassian IP allowlists
- **2FA Support**: Works with two-factor authentication
- **SSO Integration**: Supports SAML/SCIM if configured

### Current Limitations
- **Not HIPAA/FedRAMP**: Not suitable for regulated environments
- **Cloud Only**: Atlassian Cloud instances only
- **Beta Features**: Some features may be unstable

## Troubleshooting

### Connection Issues
1. **Verify Claude Plan**: Requires Claude Team or Enterprise
2. **Check Atlassian Permissions**: Ensure you have access to the workspace
3. **OAuth Refresh**: Re-authorize if connection fails
4. **Rate Limits**: Monitor usage against plan limits

### Permission Errors
- **Project Access**: Verify you have access to specific Jira projects
- **Space Access**: Confirm Confluence space permissions
- **Admin Rights**: Some operations require admin privileges

### Performance Optimization
- **Batch Operations**: Group multiple requests when possible
- **Cache Results**: Store frequently accessed data locally
- **Monitor Rate Limits**: Track usage to avoid throttling

## Comparison: Official MCP vs Custom API

| Feature | Official MCP Server | Custom API Integration |
|---------|-------------------|----------------------|
| **Setup Complexity** | ✅ Simple OAuth | ❌ Complex API setup |
| **Security** | ✅ Enterprise OAuth | ⚠️ API token management |
| **Maintenance** | ✅ Atlassian managed | ❌ Self-maintained |
| **Rate Limits** | ✅ Generous (1K-10K/hour) | ⚠️ Standard API limits |
| **Support** | ✅ Official Atlassian | ❌ Community only |
| **Compliance** | ✅ Inherits Atlassian | ⚠️ Custom implementation |

## Migration from Custom API

If migrating from our custom Jira API integration:

1. **Backup Configuration**: Save current API settings
2. **Test MCP Server**: Verify functionality with test instance
3. **Update Platform Code**: Switch to MCP protocol
4. **Migrate Work Items**: No data migration needed
5. **Update Documentation**: Replace API examples with MCP usage

## Conclusion

The official Atlassian MCP Server provides the most secure, supported, and feature-rich integration with Jira and Confluence. It's the recommended approach for the Agentic SDLC Platform, offering enterprise-grade security with minimal setup complexity.

### Next Steps
1. Set up OAuth connection in Claude.ai
2. Test basic Jira operations
3. Configure platform integration
4. Update development workflows
5. Train team on new capabilities

---

**Status**: ✅ Ready for Implementation
**Last Updated**: 2025-01-12
**Official Documentation**: https://community.atlassian.com/forums/Atlassian-Platform-articles/Using-the-Atlassian-Remote-MCP-Server-beta/ba-p/3005104