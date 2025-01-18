import { LANGUAGES, LanguageCode } from "../config"; // Importer la configuration des langues
import { Chapter } from "../App";

const generateChapterImages = (
  chapterId: string,
  chapterName: string,
  startIndex: number,
  endIndex: number,
  languages: LanguageCode[],
  extraImages: { indexAfter: number; extraIndex: string }[] = []
): Chapter => {
  // Tableau pour stocker les images de chaque langue
  const allImages: { [key: string]: { src: string; alt: string }[] } = {};

  // Génération des images pour chaque langue
  languages.forEach((language) => {
    const images = Array.from({ length: endIndex - startIndex + 1 }, (_, i) => {
      const currentIndex = startIndex + i;
      return {
        src: `/Aventale/chapters/chapter-${chapterId}/${language}/Plan de travail ${currentIndex}.jpg`,
        alt: `${chapterName} Image ${currentIndex} (${language})`,
      };
    });

    // Ajout des images supplémentaires
    extraImages.forEach(({ indexAfter, extraIndex }) => {
      const insertionIndex = images.findIndex((img) =>
        img.src.includes(`Plan de travail ${indexAfter}.jpg`)
      );
      if (insertionIndex !== -1) {
        images.splice(insertionIndex + 1, 0, {
          src: `/Aventale/chapters/chapter-${chapterId}/${language}/Plan de travail ${extraIndex}.jpg`,
          alt: `${chapterName} Image ${extraIndex} (${language})`,
        });
      } else {
        console.error(
          `Image insertion failed: could not find image after which to insert ${extraIndex}`
        );
      }
    });

    allImages[language] = images;
  });

  // Retourner un chapitre avec toutes les versions des images
  return {
    id: chapterId,
    name: chapterName,
    images: allImages as {
      fr: { src: string; alt: string }[];
      en: { src: string; alt: string }[];
      zh: { src: string; alt: string }[];
    },
  };
};

const chapterData: Chapter[] = [
  generateChapterImages("1", "Chapitre 1", 1, 16, Object.keys(LANGUAGES) as LanguageCode[], 
    [
      { indexAfter: 3, extraIndex: "3 copie" }
    ]),
  generateChapterImages("2", "Chapitre 2", 16, 23, Object.keys(LANGUAGES) as LanguageCode[]),
  generateChapterImages("3", "Chapitre 3", 24, 37, Object.keys(LANGUAGES) as LanguageCode[]),
];

export default chapterData;
