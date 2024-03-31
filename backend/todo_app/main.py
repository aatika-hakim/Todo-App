from fastapi import FastAPI, Depends, HTTPException
from contextlib import asynccontextmanager
from sqlmodel import SQLModel, Field, Session, select, create_engine
from typing import Annotated, Optional
from todo_app import settings


app: FastAPI = FastAPI()

class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    content: str = Field(index=True)


# only needed for psycopg 3
# Replacing postgresql with postgresql+psycopg2
connection_string = str(settings.DATABASE_URL).replace(
    "postgresql", "postgresql+psycopg"
)


engine = create_engine(
    connection_string, connect_args={"sslmode": "require"}, pool_recycle=300, echo=True
)
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating tables..")
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

def get_session():
    with Session(engine) as session:
        yield session


@app.get("/")
def read_main():
    return {"Response": "Todo App"}


@app.post("/todos/", response_model=Todo)
def create_todo(todo: Todo, session: Annotated[Session, Depends(get_session)]):
    print(f"Added Todo {todo}")
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


@app.get("/todos/", response_model=list[Todo])
def read_todos(session: Annotated[Session, Depends(get_session)]):
    todos = session.exec(select(Todo)).all()
    return todos


@app.get("/todos/{todo_id}", response_model=Todo)
def read_single_todo(todo_id: int, session: Annotated[Session, Depends(get_session)]):
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    with Session(engine) as session:
        todo = session.get(Todo, todo_id)
        if not todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        session.delete(todo)
        session.commit()
        return {"200 OK": "Todo Deleted Successfully"}


@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, todo: Todo):
    with Session(engine) as session:
        db_todo = session.get(Todo, todo_id)
        if not db_todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        todo_data = todo.model_dump(exclude_unset=True)
        db_todo.sqlmodel_update(todo_data)
        session.add(db_todo)
        session.commit()
        session.refresh(db_todo)
        return db_todo