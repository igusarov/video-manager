import { Video } from './video.interface';
import { getCategories } from './categories';
import { getAuthors } from './authors';

export const getVideos = (): Promise<Video[]> => {
  return Promise.all([getCategories(), getAuthors()])
    .then(([categories, authors]) => {
    return authors.reduce<Video[]>((acc, author) => {

      const videos = author.videos.map((video) => ({
        id: video.id,
        name: video.name,
        author: author.name,
        categories: video.catIds.map((catId) => {
          const category =  categories.find((cat) => cat.id === catId);
          return category ? category.name : '';
        }).filter(Boolean)
      }));

      return [
        ...acc,
        ...videos,
      ];
    }, []);
  });
};
