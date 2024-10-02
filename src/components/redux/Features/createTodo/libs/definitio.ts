export type geTodo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type ResponeTodo = {
  todos: geTodo[];
  total: number;
  skip: number;
  limit: number;
};

export type AddTodo = {
  id: number;
  todo: string;
  completed: false;
  userId: number;
};

export type completedTodo = {
  id: number;
  todo: string;
  completed: true;
  userId: number;
  isDeleted: true;
  deletedOn: string;
};

export type UpdateTodo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};
