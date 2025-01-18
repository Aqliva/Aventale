import { useState } from 'react'
import Navigation from "./components/Navigation";
import ImageContainer from "./components/ImageContainer";
import chapterData from "./data/chapterData.tsx";
import { LanguageCode } from './config';

export interface Chapter {
  id: string;
  name: string;
  images: {
    [key in LanguageCode]: { src: string; alt: string }[];
  };
}

function App() {
  const [currentChapter, setCurrentChapter] = useState<Chapter>(chapterData[0]);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("fr");

  const handleChapterChange = (chapter: Chapter) => {
    setCurrentChapter(chapter);
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

export default App;
