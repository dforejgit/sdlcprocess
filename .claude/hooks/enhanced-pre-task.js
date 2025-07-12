/**
 * Enhanced Pre-Task Hook - Context-Aware Instruction Loading
 * Integrates Context Detection Engine, Instruction Orchestrator, and Learning Engine
 */

const ContextDetectionEngine = require('../engines/context-detection');
const InstructionOrchestrator = require('../engines/instruction-orchestrator');
const LearningEngine = require('../engines/learning-engine');

// Initialize engines
const contextEngine = new ContextDetectionEngine();
const orchestrator = new InstructionOrchestrator();
const learningEngine = new LearningEngine();

/**
 * Enhanced pre-task hook with context-aware instruction loading
 * @param {Object} request - User request with text, files, work item data
 * @returns {Object} Enhanced execution context with optimized instructions
 */
async function enhancedPreTaskHook(request) {
  const startTime = Date.now();
  
  try {
    console.log('🚀 Enhanced Pre-Task Analysis Starting...');
    console.log(`📝 Request: ${(request.text || '').substring(0, 100)}...`);
    console.log(`📁 Files: ${request.files?.length || 0} files`);
    console.log(`🎯 Work Item: ${request.workItem?.id || 'N/A'}`);
    
    // Step 1: Detect context using multi-dimensional analysis
    console.log('🔍 Step 1: Context Detection...');
    const baseContext = await contextEngine.detectContext(
      request,
      request.files || [],
      request.workItem
    );
    
    console.log(`📊 Context Detected:`);
    console.log(`   Primary Domain: ${baseContext.primaryDomain}`);
    console.log(`   Domains: ${baseContext.domains.map(d => `${d.domain}(${d.score.toFixed(2)})`).join(', ')}`);
    console.log(`   Persona: ${baseContext.persona}`);
    console.log(`   Complexity: ${baseContext.complexity}`);
    console.log(`   Risk Level: ${baseContext.riskLevel} (${baseContext.riskScore.toFixed(2)})`);
    console.log(`   Confidence: ${(baseContext.confidence * 100).toFixed(1)}%`);
    
    // Step 2: Apply learning optimizations
    console.log('🧠 Step 2: Learning Optimization...');
    const optimizedContext = await learningEngine.getOptimizedContext(baseContext);
    
    if (optimizedContext.suggestedPersona && optimizedContext.suggestedPersona !== baseContext.persona) {
      console.log(`🔄 Learning Adjustment: Persona ${baseContext.persona} → ${optimizedContext.suggestedPersona}`);
      console.log(`   Confidence: ${(optimizedContext.personaConfidence * 100).toFixed(1)}%`);
    }
    
    // Step 3: Orchestrate optimal instruction set
    console.log('📚 Step 3: Instruction Orchestration...');
    const instructionSet = await orchestrator.orchestrateInstructions(optimizedContext);
    
    console.log(`📋 Instructions Loaded:`);
    console.log(`   Total: ${instructionSet.instructions.length} instructions`);
    console.log(`   Core: ${instructionSet.instructions.filter(i => i.type === 'core').length}`);
    console.log(`   Persona: ${instructionSet.instructions.filter(i => i.type === 'persona').length}`);
    console.log(`   Domain: ${instructionSet.instructions.filter(i => i.type === 'domain').length}`);
    console.log(`   Risk: ${instructionSet.instructions.filter(i => i.type === 'risk').length}`);
    
    if (instructionSet.metadata.truncated) {
      console.warn(`⚠️  Instruction set truncated from ${instructionSet.metadata.originalCount} to ${instructionSet.instructions.length}`);
    }
    
    // Step 4: Workflow compliance validation
    console.log('✅ Step 4: Workflow Validation...');
    const workflowValidation = await validateWorkflowCompliance(request, optimizedContext);
    
    if (!workflowValidation.compliant) {
      console.error(`❌ WORKFLOW VIOLATION: ${workflowValidation.reason}`);
      return {
        proceed: false,
        reason: workflowValidation.reason,
        violation: workflowValidation.violation,
        context: optimizedContext,
        executionTime: Date.now() - startTime
      };
    }
    
    // Step 5: Risk assessment and decision
    console.log('⚖️  Step 5: Risk Assessment...');
    const riskDecision = evaluateRiskDecision(optimizedContext, instructionSet);
    
    if (!riskDecision.proceed) {
      console.warn(`🛑 RISK STOP: ${riskDecision.reason}`);
      return {
        proceed: false,
        reason: riskDecision.reason,
        riskFactors: riskDecision.factors,
        context: optimizedContext,
        instructionSet,
        executionTime: Date.now() - startTime
      };
    }
    
    // Step 6: Prepare execution context
    const executionContext = {
      // Original request
      request,
      
      // Context analysis
      context: optimizedContext,
      contextConfidence: baseContext.confidence,
      learningAdjustments: optimizedContext.patternRecommendations || [],
      
      // Instruction set
      instructions: instructionSet.instructions.map(inst => inst.path),
      instructionMetadata: instructionSet.metadata,
      
      // Execution parameters
      persona: optimizedContext.suggestedPersona || optimizedContext.persona,
      techniques: instructionSet.metadata.techniques || [],
      expertise: instructionSet.metadata.expertise || [],
      priority: instructionSet.metadata.priority || 'balanced',
      
      // Risk management
      riskLevel: optimizedContext.riskLevel,
      riskScore: optimizedContext.riskScore,
      riskMitigation: riskDecision.mitigation,
      
      // Performance metrics
      analysisTime: Date.now() - startTime,
      instructionCount: instructionSet.instructions.length,
      optimizationRatio: instructionSet.instructions.length / 25, // vs max possible
      
      // Tracking
      sessionId: generateSessionId(),
      timestamp: new Date().toISOString()
    };
    
    console.log('✅ Enhanced Pre-Task Analysis Complete');
    console.log(`⚡ Analysis Time: ${executionContext.analysisTime}ms`);
    console.log(`🎯 Ready for specialized execution as ${executionContext.persona}`);
    console.log(`📈 Context Window Efficiency: ${(executionContext.optimizationRatio * 100).toFixed(1)}%`);
    
    return {
      proceed: true,
      reason: 'Enhanced context analysis complete - optimized for execution',
      context: executionContext,
      recommendation: riskDecision.recommendation
    };
    
  } catch (error) {
    console.error('❌ Error in enhanced pre-task hook:', error);
    
    // Fallback to basic execution
    return {
      proceed: true,
      reason: 'Fallback to basic execution due to analysis error',
      error: error.message,
      fallback: true,
      context: {
        persona: 'fullstack_developer',
        instructions: ['claude-integration/global/CORE_PRINCIPLES.md', 'claude-integration/global/CODING_STANDARDS.md'],
        riskLevel: 'medium',
        executionTime: Date.now() - startTime
      }
    };
  }
}

/**
 * Validate workflow compliance based on context and request
 */
async function validateWorkflowCompliance(request, context) {
  // Work Item First Policy
  if (context.primaryDomain === 'development' && !request.workItem?.id) {
    return {
      compliant: false,
      reason: 'Work Item First Policy violation - create ADO work item before code changes',
      violation: 'missing_work_item',
      requiredAction: 'Create work item using az boards work-item create'
    };
  }
  
  // High-risk tasks require additional validation
  if (context.riskLevel === 'high' && !request.riskAcknowledged) {
    return {
      compliant: false,
      reason: 'High-risk task requires explicit risk acknowledgment',
      violation: 'risk_not_acknowledged',
      requiredAction: 'Acknowledge risk factors and mitigation strategy'
    };
  }
  
  // Security-critical tasks require security review
  if (context.domains.some(d => d.domain === 'security') && context.riskScore > 5.0) {
    return {
      compliant: true, // Allow but flag for security review
      reason: 'Security-critical task flagged for additional review',
      warning: 'security_review_required',
      recommendedAction: 'Schedule security review before implementation'
    };
  }
  
  return {
    compliant: true,
    reason: 'Workflow compliance validated'
  };
}

/**
 * Evaluate risk decision based on context and instruction set
 */
function evaluateRiskDecision(context, instructionSet) {
  const riskScore = context.riskScore;
  const complexity = context.complexity;
  const confidence = context.confidence;
  
  // Critical risk thresholds
  if (riskScore >= 8.0) {
    return {
      proceed: false,
      reason: `Critical risk score ${riskScore.toFixed(2)} requires human review`,
      recommendation: 'stop_and_review',
      factors: context.metadata.riskFactors,
      mitigation: 'Require human approval before proceeding'
    };
  }
  
  // High risk with low confidence
  if (riskScore >= 6.0 && confidence < 0.6) {
    return {
      proceed: false,
      reason: `High risk (${riskScore.toFixed(2)}) with low confidence (${(confidence * 100).toFixed(1)}%)`,
      recommendation: 'improve_context_analysis',
      factors: ['risk_uncertainty', 'context_ambiguity'],
      mitigation: 'Gather additional context or request clarification'
    };
  }
  
  // High complexity with high risk
  if (complexity === 'high' && riskScore >= 5.0) {
    return {
      proceed: true,
      reason: 'High complexity and risk - proceed with extensive monitoring',
      recommendation: 'proceed_with_caution',
      factors: ['complexity_risk_combination'],
      mitigation: [
        'Implement comprehensive error handling',
        'Add extensive logging and monitoring',
        'Plan rollback procedures',
        'Schedule thorough testing'
      ]
    };
  }
  
  // Standard execution
  return {
    proceed: true,
    reason: 'Risk assessment complete - green light for execution',
    recommendation: 'proceed_normally',
    mitigation: instructionSet.metadata.priority === 'security-first' ? 
      ['Apply security-first principles throughout execution'] : []
  };
}

/**
 * Generate unique session ID for tracking
 */
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get orchestrator metrics for monitoring
 */
function getOrchestrationMetrics() {
  return {
    contextEngine: {
      // Add context engine metrics
    },
    orchestrator: orchestrator.getMetrics(),
    learningEngine: learningEngine.getAnalytics()
  };
}

module.exports = {
  enhancedPreTaskHook,
  validateWorkflowCompliance,
  evaluateRiskDecision,
  getOrchestrationMetrics
};