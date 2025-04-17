import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteContact } from "../store/contactsSlice";
import { Box, Typography, Button,  CardContent, Avatar, Divider, Paper } from "@mui/material";
import { Email, Phone, Home, Edit, Delete } from "@mui/icons-material";

const ContactDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!id) {
    return <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>Invalid Contact ID.</Typography>;
  }

  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find((c) => c.id === id)
  );

  if (!contact) {
    return <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>Contact not found.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", mt: 5, p: 2 }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3, textAlign: "center", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
        {/* 🔹 Profile Image */}
        <Avatar 
          src={contact.image || "/default-avatar.png"} 
          alt={contact.name} 
          sx={{ width: 110, height: 110, mx: "auto", mb: 2 }} 
        />

        {/* 🔹 Contact Name */}
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          {contact.name}
        </Typography>

        {/* 🔹 Contact Details */}
        <CardContent sx={{ textAlign: "left", mt: 2 }}>
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Phone sx={{ mr: 1, color: "primary.main" }} /> <strong>Phone:</strong> {contact.phone}
          </Typography>
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Email sx={{ mr: 1, color: "primary.main" }} /> <strong>Email:</strong> {contact.email}
          </Typography>
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
            <Home sx={{ mr: 1, color: "primary.main" }} /> <strong>Address:</strong> {contact.address}
          </Typography>
        </CardContent>

        <Divider sx={{ my: 2 }} />

        {/* 🔹 Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            sx={{ flex: 1, fontWeight: "bold" }}
            onClick={() => navigate(`/edit-contact/${id}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            sx={{ flex: 1, fontWeight: "bold" }}
            onClick={() => {
              dispatch(deleteContact(id));
              navigate("/");
            }}
          >
            Delete
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ContactDetails;
