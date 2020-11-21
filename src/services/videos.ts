import { Video } from './video.interface';
import { getCategories } from './categories';
import { getAuthors, patchAuthorById } from './authors';
import { AuthorVideo } from './author.interface';
import { Category } from './category.interface';

const convertToAuthorVideo = (video: Video, categories: Category[]): AuthorVideo => ({
  id: video.id,
  name: video.name,
  catIds: video.categories
    .map((catName) => categories.find((category) => category.name === catName)?.id || 0)
    .filter(Boolean)
});

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

export const saveVideoById = async (id: number, video: Video): Promise<void> => {
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()]);
  const author = authors.find((item) => item.videos.some((item) => item.id === id));
  if (!author) {
    throw new Error('Author not found');
  }
  const isAuthorChanged = author.name !== video.author;
  const convertedVideo = convertToAuthorVideo(video, categories);

  if (isAuthorChanged) {
    const updatedVideosForPrevAuthor = author.videos.filter((item) => item.id !== id);
    const newAuthor = authors.find((item) => item.name === video.author);
    if (!newAuthor) {
      throw new Error('New author not found');
    }
    const updatedVideosForNewAuthor = [...newAuthor.videos, convertedVideo];
    await patchAuthorById(author.id, {videos: updatedVideosForPrevAuthor});
    await patchAuthorById(newAuthor.id, {videos: updatedVideosForNewAuthor})
  } else {
    const updatedVideos = author.videos.map((item) => item.id === id ? convertedVideo : item);
    await patchAuthorById(author.id, {videos: updatedVideos});
  }
};
