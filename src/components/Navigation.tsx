import React from "react";
import { Chapter } from "../App";
import { LANGUAGES, LanguageCode } from "../config";
import { useNavigate } from "react-router-dom";
import { TRANSLATIONS } from "../translations.ts";

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

  const t = TRANSLATIONS[currentLanguage];

  // Filtrer les chapitres par langue
  const filteredChapters = chapters.filter((chap) => chap.id.endsWith(currentLanguage));
  const currentIndex = filteredChapters.findIndex((c) => c.id === currentChapter.id);

  // Aller au chapitre précédent
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newChapter = filteredChapters[currentIndex - 1];
      onChapterChange(newChapter);
      navigate(`/Aventale/chapters/${newChapter.id.slice(0, -2)}/${currentLanguage}`);
      window.scrollTo(0, 0);
    }
  };

  // Aller au chapitre suivant
  const handleNext = () => {
    if (currentIndex < filteredChapters.length - 1) {
      const newChapter = filteredChapters[currentIndex + 1];
      onChapterChange(newChapter);
      navigate(`/Aventale/chapters/${newChapter.id.slice(0, -2)}/${currentLanguage}`);
      window.scrollTo(0, 0);
    }
  };

  // Changer de chapitre via le menu déroulant
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChapter = chapters.find((c) => c.id === event.target.value);
    if (selectedChapter) {
      onChapterChange(selectedChapter);
      navigate(`/Aventale/chapters/${selectedChapter.id.slice(0, -2)}/${currentLanguage}`);
    }
  };

  // Changer de langue et mettre à jour l'URL + recharger ChapterPage
  const handleLanguageSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value as LanguageCode;
    onLanguageChange(newLanguage);
  
    const newLanguageChapters = chapters.filter((c) => c.id.endsWith(newLanguage));
    let newChapter = newLanguageChapters.length > 0 ? newLanguageChapters[0] : currentChapter;
  
    onChapterChange(newChapter);
    navigate(`/Aventale/chapters/${newChapter.id.slice(0, -2)}/${newLanguage}`);
  };  

  // Retour à l'accueil
  const handleHomeClick = () => {
    navigate("/Aventale");
  };

  return (
    <div className="navigation">
      <div>
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          {t.previous}
        </button>
        <select value={currentChapter.id} onChange={handleSelectChange}>
          {filteredChapters.map((chapter) => (
            <option 
              key={chapter.id} 
              value={chapter.id}
            >
              {chapter.name}
            </option>
          ))}
        </select>
        <button onClick={handleNext}>
          {t.next}
        </button>
      </div>

      <div>
        <button onClick={handleHomeClick}>🏠︎</button>
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
