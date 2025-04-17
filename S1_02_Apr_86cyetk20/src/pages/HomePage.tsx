import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, IconButton, Button, TextField, Avatar } from "@mui/material";
import { Add as AddIcon, ArrowForwardIos as ArrowIcon } from "@mui/icons-material";
import { setSearchQuery, filteredContacts } from "../store/contactsSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(filteredContacts);
  const searchQuery = useSelector((state: RootState) => state.contacts.searchQuery);

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
        Contacts
      </Typography>

      {/* 🔹 Search Input */}
      <TextField
        label="Search Contacts"
        fullWidth
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        sx={{ mb: 2 }}
      />

      {/* 🔹 Add Contact Button */}
      <Button
        variant="contained"
        fullWidth
        startIcon={<AddIcon />}
        component={Link}
        to="/add-contact"
        sx={{ mb: 2 }}
      >
        Add Contact
      </Button>

      {/* 🔹 Contacts List */}
      {contacts.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
          No contacts found.
        </Typography>
      ) : (
        contacts.map((contact) => (
          <Card
            key={contact.id}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              mb: 1,
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
            component={Link}
            to={`/contact/${contact.id}`}
          >
            {/* 🔹 Profile Image / Initials */}
            <Avatar
              src={contact.image || ""}
              sx={{ width: 50, height: 50, mr: 2 }}
            >
              {!contact.image && contact.name[0].toUpperCase()}
            </Avatar>

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{contact.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {contact.phone}
              </Typography>
            </CardContent>

            <IconButton>
              <ArrowIcon />
            </IconButton>
          </Card>
        ))
      )}
    </Box>
  );
};

export default HomePage;
