from sqlalchemy import Column, Integer, String, Boolean, DateTime
from .database import Base

# Task Object model (task id, task title, task due date, task status)
class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    done = Column(Boolean, default=False)
    due_date = Column(DateTime(timezone=True), nullable=True)