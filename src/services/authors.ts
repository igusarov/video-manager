import { Author } from './author.interface';

export const getAuthors = (): Promise<Author[]> => {
  return fetch(`${process.env.REACT_APP_API}/authors`).then((response) => (response.json() as unknown) as Author[]);
};

export const patchAuthorById = async (id: number, data: Partial<Author>): Promise<Author> => {
  const response = await fetch(
    `${process.env.REACT_APP_API}/authors/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  return (response.json() as unknown) as Author;
};
