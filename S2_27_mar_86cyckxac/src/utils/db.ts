const DB_NAME = "LoginAppDB";
const STORE_NAME = "users";

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "email" }); // email as primary key
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error opening database");
  });
};

// ✅ Add or Update User in IndexedDB
export const addUser = async (user: { email: string; password: string }) => {
  const db = await openDB();
  
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    
    const getRequest = store.get(user.email);
    
    getRequest.onsuccess = () => {
      if (getRequest.result) {
        reject("User already exists"); // Prevent overwriting existing users
      } else {
        const addRequest = store.put(user);
        addRequest.onsuccess = () => resolve();
        addRequest.onerror = () => reject("Error adding user");
      }
    };

    getRequest.onerror = () => reject("Error checking user existence");
  });
};

// ✅ Get User by Email
export const getUser = async (email: string): Promise<{ email: string; password: string } | undefined> => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(email);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error fetching user");
  });
};
