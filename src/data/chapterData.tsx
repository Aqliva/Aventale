import { Chapter } from "../App";
import { LanguageCode } from "../config";

const generateChapterImages = (
  chapterId: string,
  chapterName: string,
  startIndex: number,
  endIndex: number,
  language: LanguageCode,
  version: number,
  extraImages: { indexAfter: string; extraIndex: string }[] = []
): Chapter => {
  // Tableau pour stocker les images de chaque langue
  const allImages: { src: string; alt: string }[] = [];

  // Génération des images pour chaque langue
  const images = Array.from({ length: endIndex - startIndex + 1 }, (_, i) => {
    const currentIndex = startIndex + i;
    return {
      src: version == 0 ? 
        `/Aventale/chapters/chapter-${chapterId}/${language}/Plan de travail ${currentIndex}.jpg` :
        `/Aventale/chapters/chapter-${chapterId}/${language}/CLEAN_CHAPITRE1_${currentIndex.toString().padStart(2, '0')}.jpg`,
      alt: ``,
    };
  });

  // Ajout des images de base
  allImages.push(...images);

  // Ajout des images supplémentaires
  extraImages.forEach(({ indexAfter, extraIndex }) => {
    const insertionIndex = images.findIndex((img) =>
      img.src.includes(version == 0 ? `Plan de travail ${indexAfter}.jpg` : `CLEAN_CHAPITRE1_${indexAfter.toString().padStart(2, '0')}.jpg`)
    );
    if (insertionIndex !== -1 || indexAfter === "-1") {
      const newImage = {
        src: version == 0 ? 
          `/Aventale/chapters/chapter-${chapterId}/${language}/Plan de travail ${extraIndex}.jpg` :
          `/Aventale/chapters/chapter-${chapterId}/${language}/CLEAN_CHAPITRE1_${extraIndex}.jpg`,
        alt: ``,
      };
      allImages.splice(insertionIndex + 1, 0, newImage);
      images.splice(insertionIndex + 1, 0, newImage);
    } else {
      console.error(
        `Image insertion failed: could not find image after which to insert ${extraIndex}`
      );
    }
  });

  console.log(allImages);

  // Retourner un chapitre avec toutes les versions des images
  return {
    id: chapterId+language,
    name: chapterName,
    images: allImages,
  };
};

const chapterData: Chapter[] = [
  generateChapterImages("0", "Chapter 0", 1, 20, "en", 1),
  generateChapterImages("1", "Chapitre 1", 1, 11, "fr", 0,
    [
      { indexAfter: "3", extraIndex: "3 copie" },
      { indexAfter: "11", extraIndex: "12B" },
    ]),
  generateChapterImages("1", "Chapter 1: The call", 20, 112, "en", 1,
    [
      { indexAfter: "27", extraIndex: "27B" },
    ]),
  generateChapterImages("2", "Chapitre 2", 13, 15, "fr", 0,
    [
      { indexAfter: "-1", extraIndex: "12C" },
      { indexAfter: "15", extraIndex: "16B" },
      { indexAfter: "16B", extraIndex: "16C" },
      { indexAfter: "16C", extraIndex: "17B" },
      { indexAfter: "17B", extraIndex: "17C" },
    ]),
  generateChapterImages("2", "Chapter 2: The chosen one", 1, 61, "en", 1),
  generateChapterImages("3", "Chapitre 3", 18, 21, "fr", 0),
  generateChapterImages("3", "Chapter 3: Legacy", 1, 61, "en", 1),
  generateChapterImages("4", "Chapitre 4", 23, 37, "fr", 0,
    [
      { indexAfter: "-1", extraIndex: "22B" },
      { indexAfter: "23", extraIndex: "24B" },
      { indexAfter: "27", extraIndex: "28B" }
    ]),
  generateChapterImages("5", "Chapitre 5", 30, 37, "fr", 0,
    [
      { indexAfter: "-1", extraIndex: "29B" }
    ]),
];

export default chapterData;
