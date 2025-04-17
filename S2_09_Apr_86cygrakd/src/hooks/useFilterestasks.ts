import { useMemo } from "react";
import { Todo } from "../redux/todoSlice";

interface FilterParams {
  tasks: Todo[];
  filter: string;
  priority: string;
  tag: string;
  searchQuery: string;
}

const useFilteredTasks = ({ tasks, filter, priority, tag, searchQuery }: FilterParams): Todo[] => {
  return useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = filter === "All" || task.status === filter;
      const matchesPriority = priority === "All" || task.priority === priority;
      const matchesTag = tag === "All" || (task.tags?.includes(tag));
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesPriority && matchesTag && matchesSearch;
    });
  }, [tasks, filter, priority, tag, searchQuery]);
};

export default useFilteredTasks;
