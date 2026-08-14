from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID

class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=1, description="Name of the person inquiring")
    email: EmailStr = Field(..., description="Email address")
    business_name: str = Field(..., min_length=1, description="Business name")
    message: str = Field(..., min_length=1, description="Inquiry message")

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "business_name": "Doe Corp",
                "message": "I would like to know more about your services."
            }
        }
    }

class InquiryResponse(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    business_name: str
    message: str
    created_at: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "name": "John Doe",
                "email": "john@example.com",
                "business_name": "Doe Corp",
                "message": "I would like to know more about your services.",
                "created_at": "2023-10-27T10:00:00Z"
            }
        }
    }
