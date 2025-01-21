import { useState } from 'react'
import { useParams } from "react-router-dom";
import { LanguageCode } from '../config';
import { Chapter } from "../App";
import Navigation from "./Navigation";
import ImageContainer from "./ImageContainer";
import chapterData from "../data/chapterData";

function ChapterPage() {
  const { id } = useParams<{ id: string }>();
  const chapterIndex = id ? parseInt(id, 10) - 1 : 0;
  const [currentChapter, setCurrentChapter] = useState<Chapter>(chapterData[chapterIndex]);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("fr");

  const handleChapterChange = (newChapter: Chapter) => {
    setCurrentChapter(newChapter);

    // Met à jour l'URL dans la barre d'adresse pour refléter le changement de chapitre
    const newChapterIndex = chapterData.findIndex((chapter) => chapter.id === newChapter.id);
    const newUrl = `/Aventale/chapters/${newChapterIndex + 1}`;
    window.history.pushState({}, "", newUrl);
  };

  const handleLanguageChange = (language: LanguageCode) => {
    setCurrentLanguage(language);
  };

  return (
    <div>
      <Navigation
        currentChapter={currentChapter}
        chapters={chapterData}
        onChapterChange={handleChapterChange}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
      <ImageContainer images={currentChapter.images[currentLanguage]} />
      <Navigation
        currentChapter={currentChapter}
        chapters={chapterData}
        onChapterChange={handleChapterChange}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
}

export default ChapterPage;
