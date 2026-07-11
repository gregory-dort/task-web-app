from .database import SessionLocal
from sqlalchemy.orm import Session

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
