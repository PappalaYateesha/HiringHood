import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addContact, updateContact } from "../store/contactsSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button, Typography, Snackbar, Alert, Avatar, IconButton, Paper } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useState } from "react";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  image: Yup.mixed(),
});

const AddEditContact = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const contact = contacts.find((c) => c.id === id);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [imagePreview, setImagePreview] = useState(contact?.image || "/default-avatar.png");

  const initialValues = {
    name: contact?.name || "",
    phone: contact?.phone || "",
    email: contact?.email || "",
    address: contact?.address || "",
    image: contact?.image || "",
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("image", reader.result);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: typeof initialValues) => {
    const isDuplicate = contacts.some(
      (c) => (c.phone === values.phone || c.email === values.email) && c.id !== id
    );

    if (isDuplicate) {
      setOpenSnackbar(true);
      return;
    }

    if (contact) {
      dispatch(updateContact({ id: contact.id, ...values }));
    } else {
      dispatch(addContact(values));
    }

    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
          {contact ? "Edit Contact" : "Add Contact"}
        </Typography>

        <Formik initialValues={initialValues} validationSchema={ContactSchema} onSubmit={handleSubmit}>
          {({ errors, touched, setFieldValue }) => (
            <Form>
              {/* 🔹 Profile Image Upload */}
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Avatar src={imagePreview} sx={{ width: 100, height: 100, mx: "auto", mb: 1 }} />
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageUpload(e, setFieldValue)}
                />
                <label htmlFor="image-upload">
                  <IconButton color="primary" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>

              <Field
                as={TextField}
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />

              <Field
                as={TextField}
                label="Phone"
                name="phone"
                fullWidth
                margin="normal"
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              />

              <Field
                as={TextField}
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />

              <Field
                as={TextField}
                label="Address"
                name="address"
                fullWidth
                margin="normal"
                error={touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, py: 1, fontSize: "16px", fontWeight: "bold" }}
              >
                {contact ? "Update Contact" : "Add Contact"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>

      {/* Snackbar for duplicate contact warning */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning">
          A contact with this phone number or email already exists!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddEditContact;
