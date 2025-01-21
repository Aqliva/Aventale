import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageCode } from './config';
import HomePage from "./components/HomePage";
import ChapterPage from "./components/ChapterPage";

export interface Chapter {
  id: string;
  name: string;
  images: {
    [key in LanguageCode]: { src: string; alt: string }[];
  };
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Aventale" element={<HomePage />} />
        <Route path="/Aventale/chapters/:id" element={<ChapterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
