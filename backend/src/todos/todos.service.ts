import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.interface';

@Injectable()
export class TodosService {
  private todosArray: Todo[] = [];
  private id = 1;

  create(createTodoDto: CreateTodoDto) {

    const { title } = createTodoDto;

    const existingTodo = this.todosArray.find(
      todo => todo.title === title
    );

    if (existingTodo) {
      throw new ConflictException('Todo title already exists');
    }

    const newTodo = {
      id: this.id,
      title: title,
      isCompleted: false
    };

    this.todosArray.push(newTodo);

    this.id++;
    return newTodo;
  }
  findAll() {
    return this.todosArray;
  }

  findOne(id: number) {
    const todo = this.todosArray.find(todo => todo.id === id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

 update(id: number, updateTodoDto: UpdateTodoDto) {
  const todo = this.todosArray.find(todo => todo.id === id);
  if (!todo) {
    throw new NotFoundException('Todo not found');
  }

  const { title, isCompleted } = updateTodoDto;

  if (title !== undefined) {
    const duplicate = this.todosArray.find(
      t => t.title === title && t.id !== id
    );

    if (duplicate) {
      throw new ConflictException('Todo title already exists');
    }

    todo.title = title;
  }

  if (isCompleted !== undefined) {
    todo.isCompleted = isCompleted;
  }

  return todo;
}

  remove(id: number) {
    const todo = this.todosArray.find(todo => todo.id === id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    this.todosArray = this.todosArray.filter(todo => todo.id !== id);
    return null;
  }
}
