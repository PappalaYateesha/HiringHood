import React, { useMemo } from "react";
import { List } from "@mui/material";
import TodoItem from "./TodoItem";
import { Todo } from "../redux/todoSlice";
import useFilteredTasks from "../hooks/useFilterestasks";


interface TodoListProps {
  tasks: Todo[];
  filter: string;
  priority: string;
  searchQuery: string;
  tag: string;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  filter,
  priority,
  tag,
  searchQuery,
  onDelete,
}) => {

const filteredTasks = useFilteredTasks({ tasks, filter, priority, tag, searchQuery });


  return (
    <List sx={{ width: "100%" }}>
      {filteredTasks.map((task) => (
        <TodoItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </List>
  );
};

export default TodoList;
