import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ChapterPage from "./components/ChapterPage";

export interface Chapter {
  id: string;
  name: string;
  images: { src: string; alt: string }[];
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Aventale" element={<HomePage />} />
        <Route path="/Aventale/chapters/:id/:lang" element={<ChapterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
