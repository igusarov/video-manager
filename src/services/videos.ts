import { Video } from './video.interface';
import { getCategories } from './categories';
import { getAuthors, patchAuthorById } from './authors';

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

export const removeVideoById = async (id: number): Promise<void> => {
  const authors = await getAuthors() || [];
  const author = authors.find((item) => item.videos.some((item) => item.id === id));
  if (!author) {
    throw new Error('Author not found');
  }
  const updatedVideos = author.videos.filter((item) => item.id !== id);
  await patchAuthorById(author.id, {videos: updatedVideos});
};
