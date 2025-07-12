# Coding Standards

## Frontend Development Standards

### TypeScript Standards
- **Strict mode enabled** - All TypeScript configurations must use strict mode
- **No `any` types** - Use proper type definitions or `unknown` with type guards
- **Explicit return types** - All functions must have explicit return type annotations
- **Interface over type** - Prefer interfaces for object shapes, types for unions/primitives

```typescript
// ✅ GOOD: Proper TypeScript usage
interface UserData {
  readonly id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: UserStatus;
  permissions: readonly Permission[];
}

function processUser(userData: UserData): ProcessedUser {
  return {
    id: userData.id,
    fullName: `${userData.firstName} ${userData.lastName}`,
    email: userData.email.toLowerCase(),
    isActive: userData.status === UserStatus.Active,
    permissionLevel: calculatePermissionLevel(userData.permissions),
  };
}

// ❌ BAD: Loose typing
function processUser(userData: any): any {
  return {
    fullName: userData.firstName + ' ' + userData.lastName,
    // ... other properties
  };
}
```

### React Component Standards
- **Functional components only** - No class components
- **Hooks for state management** - Use useState, useEffect, custom hooks
- **Props interfaces** - All components must have typed props interfaces
- **Default props** - Use default parameters, not defaultProps

```typescript
// ✅ GOOD: Modern React component
interface UserCardProps {
  user: User;
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
  isLoading?: boolean;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  isLoading = false,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();
  
  const handleToggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);
  
  const handleEdit = useCallback(() => {
    onEdit?.(user.id);
  }, [onEdit, user.id]);
  
  if (isLoading) {
    return <UserCardSkeleton className={className} />;
  }
  
  return (
    <Card className={cn('user-card', className, { expanded: isExpanded })}>
      {/* Component implementation */}
    </Card>
  );
};
```

### State Management
- **Context for global state** - Use React Context for application-wide state
- **Local state for component state** - Use useState for component-specific state
- **Custom hooks for logic** - Extract complex logic into custom hooks

```typescript
// ✅ GOOD: Custom hook for user management
function useUserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedUsers = await userService.fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);
  
  const updateUser = useCallback(async (userId: string, updates: Partial<User>) => {
    try {
      const updatedUser = await userService.updateUser(userId, updates);
      setUsers(prev => prev.map(user => 
        user.id === userId ? updatedUser : user
      ));
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      throw err;
    }
  }, []);
  
  return {
    users,
    loading,
    error,
    fetchUsers,
    updateUser,
  };
}
```

## Backend Development Standards

### Python/FastAPI Standards
- **Python 3.11+** - Use latest stable Python version
- **Pydantic models** - Use Pydantic for data validation and serialization
- **Type hints** - Use type hints for all function signatures
- **Async/await** - Use async functions for I/O operations

```python
# ✅ GOOD: Modern FastAPI endpoint
from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/users", tags=["users"])

class CreateUserRequest(BaseModel):
    email: EmailStr
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: str = Field(..., min_length=2, max_length=50)
    permissions: List[str] = Field(..., min_items=1)
    
    class Config:
        schema_extra = {
            "example": {
                "email": "user@example.com",
                "first_name": "John",
                "last_name": "Doe",
                "permissions": ["read", "write"]
            }
        }

class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    first_name: str
    last_name: str
    status: str
    created_at: datetime
    updated_at: datetime

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: uuid.UUID,
    user_service: UserService = Depends(get_user_service),
    current_user: User = Depends(get_current_user)
) -> UserResponse:
    user = await user_service.get_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {user_id} not found"
        )
    return UserResponse.from_orm(user)

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    request: CreateUserRequest,
    user_service: UserService = Depends(get_user_service),
    current_user: User = Depends(require_admin)
) -> UserResponse:
    user = await user_service.create(request)
    return UserResponse.from_orm(user)

# ❌ BAD: No type hints, no validation
def create_user(data):
    # No validation, no type safety
    return {"id": str(uuid.uuid4()), "name": data["name"]}
```

### Database Standards
- **SQLAlchemy 2.0+** - Use modern SQLAlchemy with async support
- **Alembic migrations** - Use Alembic for database migrations
- **Connection pooling** - Configure async connection pooling
- **Transactions** - Use proper transaction management

```python
# ✅ GOOD: SQLAlchemy model
from sqlalchemy import Column, String, DateTime, Enum, Table, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from datetime import datetime
import uuid
import enum

class UserStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"

class User(Base):
    __tablename__ = "users"
    
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String(50), nullable=False)
    last_name: Mapped[str] = mapped_column(String(50), nullable=False)
    status: Mapped[UserStatus] = mapped_column(
        Enum(UserStatus), nullable=False, default=UserStatus.ACTIVE
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    
    # Relationships
    roles: Mapped[List["Role"]] = relationship(
        secondary="user_roles", back_populates="users", lazy="selectin"
    )
```

## Code Organization

### File Structure
```
src/
├── api/                 # API endpoints
│   ├── v1/             # API version 1
│   └── dependencies.py # Dependency injection
├── core/               # Core business logic
│   ├── config.py      # Configuration
│   └── security.py    # Security utilities
├── models/            # Database models
├── schemas/           # Pydantic schemas
├── services/          # Business logic services
├── repositories/      # Data access layer
└── utils/             # Utility functions
```

### Naming Conventions
- **Files**: snake_case for Python files
- **Variables**: snake_case for variables and functions
- **Constants**: SCREAMING_SNAKE_CASE for constants
- **Classes**: PascalCase for classes

```python
# ✅ GOOD: Naming conventions
API_BASE_URL = "https://api.example.com"
MAX_RETRY_ATTEMPTS = 3

class UserService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository
    
    async def get_user_by_email(self, email: str) -> Optional[User]:
        return await self.user_repository.find_by_email(email)

def calculate_permission_level(permissions: List[Permission]) -> int:
    # Implementation
    pass
```

## Error Handling Standards

### API Error Handling
```python
# ✅ GOOD: Comprehensive error handling
from fastapi import HTTPException, status
from typing import Optional, Dict, Any
import logging

logger = logging.getLogger(__name__)

class AppError(Exception):
    """Base application error"""
    def __init__(
        self,
        message: str,
        code: str,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        details: Optional[Dict[str, Any]] = None
    ):
        self.message = message
        self.code = code
        self.status_code = status_code
        self.details = details or {}
        super().__init__(message)

class UserNotFoundError(AppError):
    def __init__(self, user_id: str):
        super().__init__(
            message=f"User {user_id} not found",
            code="USER_NOT_FOUND",
            status_code=status.HTTP_404_NOT_FOUND
        )

class ValidationError(AppError):
    def __init__(self, message: str, field_errors: Dict[str, str]):
        super().__init__(
            message=message,
            code="VALIDATION_ERROR",
            status_code=status.HTTP_400_BAD_REQUEST,
            details={"field_errors": field_errors}
        )

# Global error handler
@app.exception_handler(AppError)
async def app_error_handler(request: Request, exc: AppError):
    logger.error(f"Application error: {exc.code} - {exc.message}", extra={"details": exc.details})
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.code,
                "message": exc.message,
                "details": exc.details,
                "timestamp": datetime.utcnow().isoformat()
            }
        }
    )

# Service with error handling
async def fetch_user(user_id: str) -> User:
    try:
        user = await user_repository.get(user_id)
        if not user:
            raise UserNotFoundError(user_id)
        return user
    except DatabaseError as e:
        logger.error(f"Database error fetching user {user_id}", exc_info=True)
        raise AppError(
            message="Failed to fetch user",
            code="DATABASE_ERROR",
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE
        )
```

## Performance Standards

### API Performance
- **Async operations** - Use async/await for all I/O operations
- **Connection pooling** - Configure database connection pools
- **Caching** - Use Redis for caching frequently accessed data
- **Pagination** - Implement pagination for list endpoints

```python
# ✅ GOOD: Performance optimizations
from fastapi import Query
from typing import Optional
import asyncio
from functools import lru_cache

class UserService:
    def __init__(self, db: AsyncSession, cache: Redis):
        self.db = db
        self.cache = cache
    
    async def get_users(
        self,
        skip: int = Query(0, ge=0),
        limit: int = Query(100, ge=1, le=1000),
        status: Optional[UserStatus] = None
    ) -> PaginatedResponse[User]:
        # Build query
        query = select(User)
        if status:
            query = query.where(User.status == status)
        
        # Get total count and results in parallel
        count_query = select(func.count()).select_from(query.subquery())
        
        total, results = await asyncio.gather(
            self.db.scalar(count_query),
            self.db.scalars(query.offset(skip).limit(limit))
        )
        
        return PaginatedResponse(
            items=results.all(),
            total=total,
            skip=skip,
            limit=limit
        )
    
    @lru_cache(maxsize=1000)
    async def get_user_cached(self, user_id: str) -> Optional[User]:
        # Check cache first
        cached = await self.cache.get(f"user:{user_id}")
        if cached:
            return User.parse_raw(cached)
        
        # Fetch from database
        user = await self.db.get(User, user_id)
        if user:
            # Cache for 1 hour
            await self.cache.setex(
                f"user:{user_id}",
                3600,
                user.json()
            )
        
        return user
```

## Security Standards

### Input Validation
- **Never trust user input** - Validate and sanitize all inputs
- **Use parameterized queries** - SQLAlchemy handles this automatically
- **Escape output** - Use proper templating to prevent XSS
- **Rate limiting** - Implement API rate limiting

### Authentication & Authorization
- **JWT tokens** - Use secure JWT implementation
- **Role-based access** - Implement proper RBAC
- **API keys** - Secure API key management
- **HTTPS only** - All communications over HTTPS

```python
# ✅ GOOD: Security implementation
from fastapi import Security, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional

security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    def __init__(self, secret_key: str, algorithm: str = "HS256"):
        self.secret_key = secret_key
        self.algorithm = algorithm
    
    def create_access_token(
        self,
        subject: str,
        expires_delta: Optional[timedelta] = None
    ) -> str:
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        
        to_encode = {
            "exp": expire,
            "sub": subject,
            "iat": datetime.utcnow()
        }
        
        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
    
    async def verify_token(
        self,
        credentials: HTTPAuthorizationCredentials = Security(security)
    ) -> str:
        token = credentials.credentials
        try:
            payload = jwt.decode(
                token,
                self.secret_key,
                algorithms=[self.algorithm]
            )
            username: str = payload.get("sub")
            if username is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid authentication credentials",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            return username
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

# Dependency for protected routes
async def get_current_user(
    token: str = Depends(auth_service.verify_token),
    user_service: UserService = Depends(get_user_service)
) -> User:
    user = await user_service.get_by_username(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

# Role-based access control
def require_role(role: str):
    async def role_checker(
        current_user: User = Depends(get_current_user)
    ) -> User:
        if role not in [r.name for r in current_user.roles]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return current_user
    return role_checker
```