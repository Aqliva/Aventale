import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { LanguageCode } from '../config';
import { Chapter } from "../App";
import Navigation from "./Navigation";
import ImageContainer from "./ImageContainer";
import chapterData from "../data/chapterData";

function ChapterPage() {
  const { id, lang } = useParams<{ id: string; lang: string }>();
  const [currentChapter, setCurrentChapter] = useState<Chapter>(chapterData.find(chap => chap.id === id + (lang || "fr")) || chapterData[0]);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("fr");

  // Mettre à jour currentLanguage à chaque fois que l'URL change
  useEffect(() => {
    if (lang) {
      setCurrentLanguage(lang as LanguageCode);  // met à jour le language
      setCurrentChapter(chapterData.find(chap => chap.id === id + lang) || chapterData[0]);
    }
  }, [lang]);  // Écoute le changement de 'lang' dans l'URL

  const handleChapterChange = (newChapter: Chapter) => {
    setCurrentChapter(newChapter);
    const newUrl = `/Aventale/chapters/${newChapter.id.slice(0, -2)}/${currentLanguage}`;
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
      <ImageContainer images={currentChapter.images} />
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
