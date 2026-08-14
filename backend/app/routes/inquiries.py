import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, status
from ..models import InquiryCreate, InquiryResponse
from ..database import get_db

router = APIRouter(prefix="/api")

@router.post("/inquiries", response_model=InquiryResponse, status_code=status.HTTP_201_CREATED)
async def create_inquiry(inquiry: InquiryCreate):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")

    inquiry_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()

    inquiry_doc = inquiry.model_dump()
    inquiry_doc["id"] = inquiry_id
    inquiry_doc["created_at"] = created_at

    try:
        await db["inquiries"].insert_one(inquiry_doc)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Database error occurred while saving the inquiry")

    # Ensure we don't return the MongoDB _id
    return InquiryResponse(
        id=uuid.UUID(inquiry_id),
        name=inquiry.name,
        email=inquiry.email,
        business_name=inquiry.business_name,
        message=inquiry.message,
        created_at=created_at
    )
