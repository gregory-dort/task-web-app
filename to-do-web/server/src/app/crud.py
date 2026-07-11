from sqlalchemy.orm import Session
from .models import Task
from .schemas import TaskCreate, TaskUpdate, TaskResponse

def create_task(db: Session, task: TaskCreate):
    db_task = Task(title=task.title, due_date=task.due_date)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_all_tasks(db: Session):
    return db.query(Task).all()

def get_task(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()

def update_task(db: Session, task_id: int, task_data: TaskUpdate):
    task = db.query(Task).filter(Task.id == task_id).first()

    if task is None:
        return None
    
    updated_tasks = task_data.model_dump(exclude_unset=True)

    for key, value in updated_tasks.items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)
    return task
   
def delete_task(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()

    if task is None:
        return False
    
    db.delete(task)
    db.commit()
    return True
    


