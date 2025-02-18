import React from "react";
import { Chapter } from "../App";
import { LANGUAGES, LanguageCode } from "../config";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  currentChapter: Chapter;
  chapters: Chapter[];
  onChapterChange: (chapter: Chapter) => void;
  currentLanguage: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentChapter,
  chapters,
  onChapterChange,
  currentLanguage,
  onLanguageChange,
}) => {
  const navigate = useNavigate();

  const currentIndex = chapters.findIndex((c) => c.id === currentChapter.id);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onChapterChange(chapters[currentIndex - 1]);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (currentIndex < chapters.length - 1) {
      onChapterChange(chapters[currentIndex + 1]);
      window.scrollTo(0, 0);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChapter = chapters.find((c) => c.id === event.target.value);
    if (selectedChapter) onChapterChange(selectedChapter);
  };

  const handleLanguageSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(event.target.value as LanguageCode);
  };

  const handleHomeClick = () => {
    navigate("/Aventale");
  };

  return (
    <div className="navigation">
      <div>
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Précédent
        </button>
        <select value={currentChapter.id} onChange={handleSelectChange}>
          {chapters.map((chapter) => (
            <option 
              key={chapter.id} 
              value={chapter.id}
              disabled={chapter.id === "4" || chapter.id === "5"}
            >
              {chapter.name}
            </option>
          ))}
        </select>
        <button onClick={handleNext} disabled={currentIndex === chapters.length - 3}>
          Suivant
        </button>
      </div>

      <div>
        <button onClick={handleHomeClick}>
          🏠︎
        </button>
        <select value={currentLanguage} onChange={handleLanguageSelectChange}>
          {Object.entries(LANGUAGES).map(([langCode, langName]) => (
            <option key={langCode} value={langCode}>
              {langName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Navigation;
