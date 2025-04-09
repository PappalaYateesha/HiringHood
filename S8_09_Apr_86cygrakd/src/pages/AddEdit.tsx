
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, TextField, Button, MenuItem, Typography,Autocomplete } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { addTodo,updateTodo } from "../redux/todoSlice";

const AddEditTask: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todo.todos);

  const isEdit = Boolean(id);
  const existingTask = todos.find((t) => t.id === Number(id));

  const formik = useFormik({
    initialValues: {
      title: existingTask?.title || "",
      description: existingTask?.description || "",
      dueDate: existingTask?.dueDate || "",
      priority: existingTask?.priority || "Medium",
      status: existingTask?.status || "To Do",
      tags:existingTask?.tags || [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      dueDate: Yup.string().required("Due date is required"),
    }),
    onSubmit: (values) => {
      const newTask = {
        ...values,
        id: isEdit ? existingTask!.id : Date.now(),
      };
      if (isEdit) {
        dispatch(updateTodo(newTask));
      } else {
        dispatch(addTodo(newTask));
      }
      
      navigate("/");
    },
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        {isEdit ? "Edit Task" : "Add Task"}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField fullWidth margin="normal" label="Title" {...formik.getFieldProps("title")} />
        <TextField fullWidth margin="normal" label="Description" {...formik.getFieldProps("description")} />
        <TextField fullWidth margin="normal" type="date" label="Due Date" {...formik.getFieldProps("dueDate")} InputLabelProps={{ shrink: true }} />
        <TextField select fullWidth margin="normal" label="Priority" {...formik.getFieldProps("priority")}>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <TextField select fullWidth margin="normal" label="Status" {...formik.getFieldProps("status")}>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </TextField>
        <Autocomplete
  multiple
  freeSolo
  options={[]}
  value={formik.values.tags}
  onChange={(_, value) => formik.setFieldValue("tags", value)}
  renderInput={(params) => (
    <TextField
      {...params}
      variant="outlined"
      label="Tags (optional)"
      margin="normal"
    />
  )}
/>

        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          {isEdit ? "Update" : "Add"}
        </Button>
      </form>
    </Container>
  );
};

export default AddEditTask;
