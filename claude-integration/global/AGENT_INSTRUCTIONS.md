# Agent Code Generation Requirements

## Core Principles

### Production-Only Code
- **Never generate placeholder code** - All code must be fully functional
- **No "TODO" comments** - Implement complete functionality immediately
- **No stub implementations** - Every function must have complete logic
- **No skeleton code** - All components must be production-ready

### Code Quality Standards
- **Type safety first** - Use TypeScript strictly, avoid `any` types
- **Error handling required** - Every function must handle potential errors
- **Security by design** - Never expose sensitive data or create vulnerabilities
- **Performance optimized** - Consider performance implications in all implementations

## Implementation Requirements

### Function Implementation
```typescript
// ❌ BAD: Placeholder implementation
function processData(data: any): any {
  // TODO: Implement data processing logic
  return data;
}

// ✅ GOOD: Complete implementation
function processUserData(userData: UserData): ProcessedUserData {
  try {
    validateUserData(userData);
    
    const processedData: ProcessedUserData = {
      id: userData.id,
      fullName: `${userData.firstName} ${userData.lastName}`.trim(),
      email: userData.email.toLowerCase(),
      isActive: userData.status === 'active',
      lastLoginDate: userData.lastLogin ? new Date(userData.lastLogin) : null,
      permissions: mapUserPermissions(userData.roles),
    };
    
    return processedData;
  } catch (error) {
    logger.error('Failed to process user data', { userId: userData.id, error });
    throw new UserDataProcessingError(`Unable to process user data: ${error.message}`);
  }
}
```

### Component Implementation
```typescript
// ❌ BAD: Incomplete component
const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      {/* TODO: Add user information */}
      <p>{user.name}</p>
    </div>
  );
};

// ✅ GOOD: Complete component with all requirements
const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onEdit, 
  onDelete, 
  isLoading = false,
  className = '' 
}) => {
  const { t } = useTranslation();
  const { logUserAction } = useAuditLogger();
  
  const handleEdit = useCallback(() => {
    logUserAction('user_edit_initiated', { userId: user.id });
    onEdit(user.id);
  }, [user.id, onEdit, logUserAction]);
  
  const handleDelete = useCallback(() => {
    if (window.confirm(t('confirmDelete', { name: user.fullName }))) {
      logUserAction('user_delete_initiated', { userId: user.id });
      onDelete(user.id);
    }
  }, [user.id, user.fullName, onDelete, logUserAction, t]);
  
  if (isLoading) {
    return <UserCardSkeleton />;
  }
  
  return (
    <Card 
      className={cn('user-card', className)}
      role="article"
      aria-labelledby={`user-${user.id}-name`}
    >
      <CardHeader>
        <Avatar
          src={user.avatar}
          alt={t('userAvatar', { name: user.fullName })}
          fallback={user.initials}
        />
        <div>
          <h3 id={`user-${user.id}-name`} className="user-name">
            {user.fullName}
          </h3>
          <p className="user-email">{user.email}</p>
          <StatusBadge status={user.status} />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="user-details">
          <div className="detail-item">
            <span className="label">{t('lastLogin')}:</span>
            <span className="value">
              {user.lastLoginDate 
                ? formatDate(user.lastLoginDate) 
                : t('neverLoggedIn')
              }
            </span>
          </div>
          <div className="detail-item">
            <span className="label">{t('role')}:</span>
            <span className="value">{t(`roles.${user.role}`)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardActions>
        <Button
          variant="outline"
          onClick={handleEdit}
          disabled={!user.canEdit}
          aria-label={t('editUser', { name: user.fullName })}
        >
          <EditIcon aria-hidden="true" />
          {t('edit')}
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={!user.canDelete}
          aria-label={t('deleteUser', { name: user.fullName })}
        >
          <DeleteIcon aria-hidden="true" />
          {t('delete')}
        </Button>
      </CardActions>
    </Card>
  );
};
```

### Error Handling Requirements
```typescript
// ❌ BAD: No error handling
async function fetchUserData(userId: string) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

// ✅ GOOD: Comprehensive error handling
async function fetchUserData(userId: string): Promise<UserData> {
  if (!userId || typeof userId !== 'string') {
    throw new ValidationError('User ID is required and must be a string');
  }
  
  try {
    const response = await fetch(`/api/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new UserNotFoundError(`User with ID ${userId} not found`);
      }
      if (response.status === 401) {
        throw new UnauthorizedError('Authentication required');
      }
      if (response.status === 403) {
        throw new ForbiddenError('Insufficient permissions to access user data');
      }
      
      throw new APIError(
        `Failed to fetch user data: ${response.status} ${response.statusText}`,
        response.status
      );
    }
    
    const userData = await response.json();
    
    // Validate response structure
    if (!isValidUserData(userData)) {
      throw new DataValidationError('Received invalid user data structure');
    }
    
    return userData;
    
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new TimeoutError('Request timed out while fetching user data');
    }
    
    if (error instanceof TypeError) {
      throw new NetworkError('Network error occurred while fetching user data');
    }
    
    // Re-throw known errors
    if (error instanceof AppError) {
      throw error;
    }
    
    // Handle unexpected errors
    logger.error('Unexpected error fetching user data', { userId, error });
    throw new UnknownError('An unexpected error occurred while fetching user data');
  }
}
```

### Security Requirements
```typescript
// ❌ BAD: Security vulnerabilities
function renderUserContent(content: string) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

// ✅ GOOD: Secure implementation
function renderUserContent(content: string) {
  // Sanitize content before rendering
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  });
  
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}

// Even better: Use a safe markdown renderer
function renderUserContent(content: string) {
  return (
    <ReactMarkdown
      components={safeMarkdownComponents}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
    >
      {content}
    </ReactMarkdown>
  );
}
```

## Testing Requirements

### Unit Tests Required
Every generated function and component must include:
- Unit tests with 100% code coverage
- Edge case testing
- Error condition testing
- Performance benchmarks where applicable

```typescript
describe('processUserData', () => {
  it('should process valid user data correctly', () => {
    const input: UserData = {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'JOHN.DOE@EXAMPLE.COM',
      status: 'active',
      lastLogin: '2023-01-01T00:00:00Z',
      roles: ['user', 'admin'],
    };
    
    const result = processUserData(input);
    
    expect(result).toEqual({
      id: '123',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      isActive: true,
      lastLoginDate: new Date('2023-01-01T00:00:00Z'),
      permissions: ['read', 'write', 'admin'],
    });
  });
  
  it('should handle missing last login', () => {
    const input: UserData = {
      id: '123',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      status: 'active',
      lastLogin: null,
      roles: ['user'],
    };
    
    const result = processUserData(input);
    expect(result.lastLoginDate).toBeNull();
  });
  
  it('should throw error for invalid data', () => {
    const invalidInput = { id: '123' }; // Missing required fields
    
    expect(() => processUserData(invalidInput as UserData))
      .toThrow(UserDataProcessingError);
  });
});
```

## Documentation Requirements

Every generated piece of code must include:
- Clear JSDoc comments
- Type definitions
- Usage examples
- Error handling documentation

```typescript
/**
 * Processes raw user data into a standardized format for the application.
 * 
 * @param userData - Raw user data from the API
 * @returns Processed user data with normalized fields
 * @throws {UserDataProcessingError} When user data is invalid or processing fails
 * 
 * @example
 * ```typescript
 * const rawUser = await fetchUserFromAPI('123');
 * const processedUser = processUserData(rawUser);
 * console.log(processedUser.fullName); // "John Doe"
 * ```
 */
function processUserData(userData: UserData): ProcessedUserData {
  // Implementation here...
}
```

## Forbidden Patterns

### Never Use These Patterns
```typescript
// ❌ NEVER: Placeholder functions
function doSomething() {
  throw new Error('Not implemented');
}

// ❌ NEVER: Any types without justification
function process(data: any): any {
  return data;
}

// ❌ NEVER: Silent error suppression
try {
  riskyOperation();
} catch {
  // Ignore errors
}

// ❌ NEVER: Hardcoded sensitive data
const API_KEY = 'sk-1234567890abcdef';

// ❌ NEVER: Unsafe operations
eval(userInput);
innerHTML = userContent;
```

## Code Review Checklist

Before considering any generated code complete:
- [ ] All functions have complete implementations
- [ ] Error handling is comprehensive
- [ ] Types are properly defined and used
- [ ] Security considerations are addressed
- [ ] Performance is optimized
- [ ] Tests achieve 100% coverage
- [ ] Documentation is complete
- [ ] Accessibility requirements are met (for UI components)
- [ ] No placeholder or TODO comments remain