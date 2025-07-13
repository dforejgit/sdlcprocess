# LLM Agentic Coding Assistant - Master Superset Platform

## Revolutionary Dynamic Context Loading System

**BREAKTHROUGH**: This system implements revolutionary **Dynamic Context Loading** that reduces context window usage by 80-90% through intelligent, task-based instruction loading. This enables unlimited conversation length and unprecedented efficiency.

### Intelligence-Driven Context Management
- **Task Classification**: AI analyzes current task to determine relevant instruction categories
- **Progressive Loading**: Load additional context as task scope expands
- **Token Budget Management**: Precise control over context window usage
- **Anti-Hallucination**: Deterministic context selection eliminates randomness
- **Parallel Task Isolation**: Complete context isolation between concurrent sessions

### Context Loading Modes

#### Legacy Mode (Static Loading)
```yaml
mode: "static"
context_usage: "20-30% at startup (~100k tokens)"
performance: "slow startup, limited conversation length"
use_case: "backward compatibility only"
```

#### Dynamic Mode (Recommended)
```yaml
mode: "dynamic"
context_usage: "<5% at startup, <25% peak"
performance: "fast startup, unlimited conversation length"
use_case: "all new implementations"
```

### Dynamic Context Loader Configuration
```javascript
// .claude/context-loader.js
const ContextLoader = {
  development: {
    keywords: ['code', 'implement', 'develop', 'refactor'],
    priority: 'high',
    instructions: ['CODING_STANDARDS.md', 'TESTING_FRAMEWORK.md']
  },
  security: {
    keywords: ['dependency', 'vulnerability', 'security'],
    priority: 'critical',
    instructions: ['DEPENDENCY_SECURITY.md', 'CI_PIPELINE_SECURITY.md']
  },
  visualization: {
    keywords: ['mermaid', 'diagram', 'chart', 'executive'],
    priority: 'medium',
    instructions: ['MERMAID_VISUALIZATION_STANDARDS.md']
  }
};
```

## Available Instructions (Dynamically Loaded)

### Core Global Instructions (Always Available)
@claude-integration/global/CORE_PRINCIPLES.md
@claude-integration/global/AGENT_INSTRUCTIONS.md
@claude-integration/global/TRUST_VIOLATION_PREVENTION.md
@claude-integration/global/CONTINUOUS_LEARNING.md
@claude-integration/global/LESSONS_LEARNED.md
@claude-integration/global/MANDATORY_VERIFICATION_PROTOCOL.md
@claude-integration/global/CRITICAL_THINKING_FRAMEWORK.md
@claude-integration/global/MERMAID_VISUALIZATION_STANDARDS.md

### Development Instructions (Loaded on Code Tasks)
@claude-integration/global/CODING_STANDARDS.md
@development/testing/TESTING_FRAMEWORK.md
@development/workflows/QUALITY_STANDARDS.md
@development/workflows/GIT_MEMORY_CONTINUITY.md
@claude-integration/global/CONTINUOUS_LEARNING.md
@claude-integration/global/LESSONS_LEARNED.md

### Security Instructions (Loaded on Security Tasks)
@claude-integration/global/DEPENDENCY_SECURITY.md
@claude-integration/global/CI_PIPELINE_SECURITY.md
@operations/devops/DEVSECOPS_AI_FRAMEWORK.md

### Multi-Platform Work Item Management (Loaded on Work Item Tasks)
@claude-integration/global/MULTI_PLATFORM_WORK_ITEM_MANAGEMENT.md
@claude-integration/global/JIRA_INTEGRATION.md
@claude-integration/global/ATLASSIAN_MCP_INTEGRATION.md
@.claude/modules/workflows/ADO_COMPREHENSIVE.md

### Infrastructure Instructions (Loaded on DevOps Tasks)
@operations/devops/DOCKER_CONTAINERIZATION.md
@user-experience/accessibility/ACCESSIBILITY.md

### Project-Specific Instructions (Tenant-Aware Loading)
@claude-integration/project-specific/TECH_STACK.md
@claude-integration/project-specific/UI_STANDARDS.md
@claude-integration/project-specific/ADO_INTEGRATION.md
@operations/azure-devops/ADO_FIELD_VALIDATION.md
@operations/azure-devops/ADO_COMMAND_REFERENCE.md
@user-experience/user-stories/USER_STORY_STANDARDS.md

### Advanced Context Management
@claude-integration/global/CONTEXT_MANAGEMENT.md
@claude-integration/global/CONTEXT_TEMPLATES.md
@claude-integration/global/CONTEXT_EFFICIENCY_RESEARCH.md

### Claude Code Agent Pipeline System
@claude-integration/global/claude-code-pipeline-strategy.md
@platform/ai-agents/pipeline-orchestration/README.md  # 8-agent system implementation

### Advanced Memory Management System (AMMS)
@.claude/memory/context/active.md         # Current task context (auto-loaded)
@.claude/memory/patterns/successful/*.md  # Successful patterns (contextually loaded)
@.claude/memory/decisions/recent.md       # Recent architectural decisions
@.claude/memory/templates/              # Context templates for common workflows
@.claude/memory/analytics/              # Performance and usage analytics

### Intelligent Hooks (Automatic Execution)
@.claude/hooks/intelligent-context-loader.js  # Dynamic context loading
@.claude/hooks/enhanced-pre-task.js           # Critical thinking pre-analysis
@.claude/hooks/enhanced-post-task.js          # Post-implementation verification
@.claude/hooks/token-estimator.js             # Context budget management
@.claude/hooks/error-handler.js               # Executes on error occurrence
@.claude/context-loader.md                    # Context loading documentation
@.claude/context-monitor.md                   # Performance monitoring

### Multi-Tenant Architecture Support
@.claude/tenant-config.yml               # Tenant-specific configurations
@.claude/access-control.yml              # Multi-tenant access control
@.claude/sharing-permissions.yml         # Cross-tenant sharing rules

## Core Instructions (Always Apply)

These principles apply to all tasks and sessions:

### TRUST
The Agent must never make up information. If the Agent does not know something or is not certain of anything, it must stop and report this lack of information or certainty. The Agent is not allowed to write anything that is not factual and must have evidence and explainability behind all its actions and statements.

Every library the Agent uses when writing code must be checked and double-checked to ensure it is the legitimate, original library intended for trustworthy production use.

### CRITICAL: Trust Violation Prevention & Self-Improvement

**MANDATORY**: Before making ANY claims about implementation, completion, or features, the Agent MUST:

1. **Execute Mandatory PR Verification Protocol** (see MANDATORY_VERIFICATION_PROTOCOL.md)
   - Execute comprehensive pre-PR verification checklist
   - Verify all files relate to single work item
   - Validate implementation exists before stating it does
   - Check acceptance criteria are actually met
   - Run validation scripts when available

2. **Critical Thinking Framework Integration** (see CRITICAL_THINKING_FRAMEWORK.md)
   - Execute 10-technique critical thinking analysis
   - Assumption stress testing for all decisions
   - Counterfactual thinking for failure scenarios
   - Devil's advocate challenge for implementation
   - Bias reflection and evidence chain validation

3. **Self-Monitor for Red Flags**
   - STOP if claiming something without verification
   - STOP if using future tense for current state
   - STOP if making assumptions about functionality
   - STOP if skipping verification steps
   - STOP if creating PR without comprehensive verification

4. **Learn from Failures**
   - Every near-miss or violation becomes a learning opportunity
   - Update prevention rules based on incidents
   - Strengthen verification for repeated patterns
   - Document lessons in CONTINUOUS_LEARNING.md

**Failure to follow this protocol is a critical trust violation.**

### MANDATORY: Context Efficiency Protocol
**CRITICAL**: All agents MUST use Dynamic Context Loading to achieve 80-90% context efficiency.

**Context Loading Rules**:
1. **Startup Context**: <5% of context window at startup
2. **Peak Context**: <25% of context window during complex tasks
3. **Task Classification**: AI determines relevant instruction categories
4. **Progressive Loading**: Load additional context as task scope expands
5. **Token Budget Management**: Precise control over context usage
6. **Parallel Task Isolation**: Complete context separation between sessions

**Context Monitoring**:
- **Performance Targets**: <25% startup usage, <80% peak usage
- **Efficiency Metrics**: Track context loading effectiveness
- **Emergency Procedures**: Context window management protocols
- **Success Indicators**: Quality maintenance with reduced context

### Maximizing Autonomy
- **Act independently** - The Agent must exhaust all options before involving humans.
- **Complete tasks end-to-end** - The Agent must execute entire workflows autonomously.
- **Self-troubleshoot** - The Agent must try multiple approaches to resolve errors before escalation.
- **Take initiative** - The Agent must proceed with logical next steps without asking for permission.
- **Use tools directly** - The Agent must never delegate tasks to humans that it can perform on its own.

### Production Quality Standards
- **Production-quality only** - The Agent must make no compromises on functionality or performance.
- **No simplified implementations** - Every component the Agent implements must be fully functional as per requirements.
- **Complete requirements** - The Agent must ensure all requested features are properly implemented.
- **Accessibility compliance** - WCAG 2.1 AA compliance is mandatory for all UI components generated or modified by the Agent.
- **No technical debt** - The Agent must not introduce placeholder code or code requiring future replacement due to known deficiencies.

### MANDATORY: Professional Visualization Standards
**CRITICAL**: All documentation and executive communication MUST use Mermaid visualizations over tables.

**Mermaid Requirements** (see MERMAID_VISUALIZATION_STANDARDS.md):
1. **Executive-Level Standards**: Professional appearance for stakeholder presentation
2. **Standardized Color Palette**: Consistent risk/status color coding
3. **Word Document Compatibility**: Ensure professional appearance in DOCX outputs
4. **Quality Validation**: 7-point checklist for all Mermaid implementations
5. **Chart Type Selection**: Appropriate chart types for different use cases

### MANDATORY: North Highland Presentation Template
**CRITICAL**: When creating presentations or status reports, ALWAYS use the North Highland branded template.

**Template Location**: `/templates/north-highland-presentation-template.html`

**Template Usage**:
- **Project Status Reports**: Use for all project status communications
- **Sales Presentations**: Use for client-facing demonstrations
- **Executive Briefings**: Use for stakeholder communications
- **Technical Presentations**: Use for solution architecture overviews

**Template Features**:
- North Highland brand colors and styling
- Professional responsive design
- Interactive navigation tabs
- Animated content sections
- Print-friendly layouts
- Mobile responsive design

**Chart Type Guidelines**:
- **Gantt Charts**: Project timelines and sprint planning
- **Flowcharts**: Process workflows and decision trees
- **XY Charts**: Performance metrics and trend analysis
- **Quadrant Charts**: Risk assessment and prioritization matrices
- **Sequence Diagrams**: System interactions and API flows

**Color Standards**:
```mermaid
%%{init: {'theme':'base', 'themeVariables': { 
  'primaryColor': '#2E8B57',      // Success/Complete - Forest Green
  'primaryTextColor': '#FFFFFF',   // White text
  'primaryBorderColor': '#1F5F3F', // Darker green border
  'lineColor': '#4A90E2',         // Process flow - Steel Blue
  'sectionBkgColor': '#F8F9FA',   // Background - Light Gray
  'altSectionBkgColor': '#E9ECEF', // Alternate background
  'gridColor': '#DEE2E6',         // Grid lines
  'tertiaryColor': '#FFF3CD',     // Warning/In Progress - Light Yellow
  'quaternaryColor': '#F8D7DA'    // Error/Blocked - Light Red
}}}%%
```

### CRITICAL: Dependency Security Requirements
**MANDATORY**: When adding ANY open source dependencies or configuring CI pipelines, the Agent MUST:

1. **Apply Dependency Security Practices** (see DEPENDENCY_SECURITY.md)
   - Verify package legitimacy and signatures
   - Use exact version pinning (no ranges)
   - Check for typosquatting attempts
   - Run vulnerability scans before installation

2. **Implement CI Security Gates** (see CI_PIPELINE_SECURITY.md)
   - Configure automated vulnerability scanning
   - Set up license compliance checks
   - Enforce build failures for critical vulnerabilities
   - Implement supply chain security controls

### CRITICAL: Multi-Tenant Security Framework
**MANDATORY**: All operations must respect tenant isolation and access controls.

**Tenant Isolation Requirements**:
1. **Data Isolation**: Complete separation of tenant data and contexts
2. **Access Control**: Enforce tenant-specific permissions and sharing rules
3. **Resource Isolation**: Dedicated resources per tenant configuration
4. **Security Boundaries**: Cryptographic separation between tenants
5. **Audit Trails**: Comprehensive logging for compliance and security

**Sharing Controls**:
- **Strict Isolation**: No cross-tenant access (enterprise/confidential)
- **Selective Sharing**: Permission-based pattern sharing (standard)
- **Public Sharing**: Open collaboration for research projects
- **Granular Permissions**: Feature-level access control
**Failure to follow these security protocols compromises the entire platform's security posture.**

### MANDATORY: Advanced Critical Thinking Integration
**CRITICAL**: All development tasks MUST integrate the 10-technique Critical Thinking Framework.

**Phase 1 - Pre-Development Analysis**:
1. **Assumption Stress Test**: Validate all core assumptions that could lead to failure
2. **Bias Reflection Check**: Identify emotional, political, or cognitive biases
3. **Evidence Chain Validation**: Verify all supporting data and assumptions
4. **Signal vs Noise Calibration**: Focus on strategic priorities vs distractions

**Phase 2 - Implementation Analysis**:
1. **Systems Thinking**: Understand interconnections and dependencies
2. **Root Cause Analysis**: Identify fundamental causes vs symptoms
3. **Cost-Benefit Evaluation**: Comprehensive trade-off analysis

**Phase 3 - Post-Development Analysis**:
1. **Counterfactual Thinking**: Explore "what if" scenarios and preparedness
2. **Devil's Advocate Challenge**: Systematically challenge decisions
3. **Status Quo Reversal**: Question fundamental approaches and assumptions

**Risk Assessment Matrix**:
- **Risk Score Calculation**: Weighted average across all techniques
- **Decision Thresholds**: 
  - Score >8.0: Block PR creation until risks mitigated
  - Score 6.0-8.0: Proceed with extensive review
  - Score <6.0: Standard review process
- **Continuous Learning**: Track decision outcomes and improve models

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

**See QUALITY_STANDARDS.md for complete workflow details and validation**

## Work Item First Policy

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

**See QUALITY_STANDARDS.md for complete branch hygiene and PR requirements**

## Context-Driven Instruction Application

All instructions are now automatically loaded via @imports above. Claude Code has immediate access to all guidance. Apply the relevant instructions based on task context:

### Development Tasks
**When performing code development, implementation, or refactoring:**
- Apply: CODING_STANDARDS.md - Frontend/Backend coding standards
- Apply: TESTING_FRAMEWORK.md - Comprehensive testing strategy and TDD
- Apply: AGENT_INSTRUCTIONS.md - Code generation requirements
- Apply: TECH_STACK.md - Technology-specific guidelines
- Apply: DEPENDENCY_SECURITY.md - When adding any dependencies or packages
- Apply: CI_PIPELINE_SECURITY.md - When configuring build pipelines

### UI/Frontend Tasks
**When working on user interface, components, or frontend features:**
- Apply: ACCESSIBILITY.md - WCAG 2.1 AA compliance requirements
- Apply: UI_STANDARDS.md - Project UI/UX requirements
- Apply: CODING_STANDARDS.md - Python/FastAPI standards

### Azure DevOps Tasks
**When creating work items, managing ADO, or following project workflows:**
- Apply: ADO_INTEGRATION.md - Azure DevOps CLI and workflows
- Apply: ADO_FIELD_VALIDATION.md - CRITICAL field validation requirements
- Apply: USER_STORY_STANDARDS.md - User story documentation standards

### DevOps/AI Operations Tasks
**When working on infrastructure, deployment, AI systems, or operations:**
- Apply: DEVSECOPS_AI_FRAMEWORK.md - Complete DevSecOps for AI guide

### Infrastructure and Containerization Tasks
**When working with Docker, containers, or build processes:**
- Apply: DOCKER_CONTAINERIZATION.md - Docker best practices and standards
- Apply: DEVSECOPS_AI_FRAMEWORK.md - DevSecOps integration
- Apply: QUALITY_STANDARDS.md - Build and deployment quality

### Git/Version Control Tasks
**When committing code, managing branches, or handling version control:**
- Apply: GIT_MEMORY_CONTINUITY.md - Inter-session memory and git standards

### Quality Assurance Tasks
**When reviewing code, ensuring quality, or following development workflow:**
- Apply: QUALITY_STANDARDS.md - Development workflow and PR requirements

## Implementation Notes

**Enhanced on 2025-06-13**: Converted from manual instruction loading to Claude Code's native @import syntax. All 13 instruction files are now automatically imported at startup, providing immediate access to all guidance without manual file reading. This aligns with Claude Code's memory management best practices and improves performance.

**Enhanced on 2025-06-18**: Added critical instruction compliance requirements based on production lessons learned:
- Work Item First Policy for 100% traceability
- Enhanced Fine-Grained PR Requirements with Branch Hygiene
- Azure DevOps parent-child relationship guidance
- QA Test Automation Framework for instruction validation

**Enhanced on 2025-06-18**: Added enhanced workflow compliance protocol after Work Item First Policy violation:
- Mandatory pre-action compliance checking
- Process requirements verification alongside technical requirements  
- Enhanced violation prevention with specific failure patterns documented
- Self-interruption protocol for process compliance verification

**Enhanced on 2025-06-18**: Implemented Advanced Memory Management System (AMMS):
- Dynamic context-aware memory system
- Learning-based pattern storage and evolution
- Architectural decision tracking with outcome validation
- Error learning and prevention mechanisms
- Automated hooks for pre-task, post-task, and error handling
- Full integration with existing CLAUDE.md instruction system

---

**Platform Status**: ✅ Production Ready - Master Superset Complete
**Version:** 2.0.0 - Master Superset Edition
**Implementation Date:** January 2025
**Last Updated:** January 2025
**Maintainer:** Claude-Powered SDLC Process Team
**Usage:** Universal instruction set for Claude-powered development workflows