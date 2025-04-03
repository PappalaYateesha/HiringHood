import React, { useCallback, useMemo, useState } from "react";
import { List } from "@mui/material";
import TodoItem from "./TodoItem";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  filter: string;
  searchQuery: string;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, setTasks, filter, searchQuery }) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleToggle = useCallback((id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }, [setTasks]);

  const handleEditClick = (id: number, text: string) => {
    setEditingTaskId(id);
    setEditText(text);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value);
  };

  const handleEditSubmit = () => {
    if (editText.trim() !== "") {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === editingTaskId ? { ...task, text: editText } : task))
      );
    }
    setEditingTaskId(null);
  };

  const handleDelete = useCallback((id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, [setTasks]);

  const filteredTasks = useMemo(
    () =>
      tasks
        .filter((task) => {
          if (filter === "Complete") return task.completed;
          if (filter === "Incomplete") return !task.completed;
          return true;
        })
        .filter((task) => task.text.toLowerCase().includes(searchQuery.toLowerCase())),
    [tasks, filter, searchQuery]
  );

  return (
    <List sx={{ width: "100%" }}>
      {filteredTasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={handleToggle}
          onEditClick={handleEditClick}
          onEditChange={handleEditChange}
          onEditSubmit={handleEditSubmit}
          onDelete={handleDelete}
          isEditing={editingTaskId === task.id}
          editText={editText}
        />
      ))}
    </List>
  );
};

export default TodoList;
