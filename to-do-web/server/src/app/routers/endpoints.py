from fastapi import APIRouter, Depends, HTTPException
from .. import crud, schemas
from ..dependencies import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/tasks", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task)

@router.get("/tasks", response_model=list[schemas.TaskResponse])
def get_all_tasks(db: Session = Depends(get_db)):
    return crud.get_all_tasks(db)

@router.get("/tasks/{task_id}", response_model=schemas.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return task

@router.put("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    task = crud.update_task(db, task_id, task)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return task

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.delete_task(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return "Task deleted successfully"