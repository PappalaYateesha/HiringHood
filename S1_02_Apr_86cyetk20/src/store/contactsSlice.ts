import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email : string;
  address: string;
  image?: string; 
}

interface ContactsState {
  contacts: Contact[];
  searchQuery: string;
}


const loadContactsFromLocalStorage = (): Contact[] => {
  try {
    const storedContacts = localStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : [];
  } catch (error) {
    console.error("Error loading contacts from localStorage:", error);
    return [];
  }
};

const saveContactsToLocalStorage = (contacts: Contact[]) => {
  try {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  } catch (error) {
    console.error("Error saving contacts to localStorage:", error);
  }
};

// 🔹 Initial State
const initialState: ContactsState = {
  contacts: loadContactsFromLocalStorage(),
  searchQuery: "",
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, "id">>) => {
      const { name, phone, email, address, image } = action.payload;

      if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        return;
      }

      const isDuplicate = state.contacts.some((c) => c.phone === phone || c.email === email);
      if (isDuplicate) {
        alert("A contact with this phone number or email already exists!");
        return;
      }

      // ✅ Store image if provided
      const newContact: Contact = { id: Date.now().toString(), name, phone, email, address, image };
      state.contacts.push(newContact);
      state.contacts.sort((a, b) => a.name.localeCompare(b.name));

      saveContactsToLocalStorage(state.contacts);
    },

    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
      saveContactsToLocalStorage(state.contacts);
    },

    updateContact: (state, action: PayloadAction<Contact>) => {
      const { id, name, phone, email, address, image } = action.payload;

      if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        return;
      }

      const isDuplicate = state.contacts.some(
        (c) => (c.phone === phone || c.email === email) && c.id !== id
      );
      if (isDuplicate) {
        alert("A contact with this phone number or email already exists!");
        return;
      }

      const index = state.contacts.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.contacts[index] = { id, name, phone, email, address, image }; // ✅ Update image
        state.contacts.sort((a, b) => a.name.localeCompare(b.name));
        saveContactsToLocalStorage(state.contacts);
      }
    },

    // 🔹 Search Contacts
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  selectors: {
    filteredContacts: (state: ContactsState) => {
      const query = state.searchQuery.toLowerCase();
      return state.contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(query) ||
          contact.phone.includes(query) ||
          contact.email.toLowerCase().includes(query)
      );
    },
  },
});

export const { addContact, deleteContact, updateContact, setSearchQuery } = contactsSlice.actions;
export const { filteredContacts } = contactsSlice.selectors;
export default contactsSlice.reducer;
