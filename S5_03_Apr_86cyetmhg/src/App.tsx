import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import AddEditRecipePage from "./pages/AddEditRecipePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
        <Route path="/add" element={<AddEditRecipePage />} />
        <Route path="/edit/:id" element={<AddEditRecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
