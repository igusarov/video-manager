import React, { useEffect, useState } from 'react';
import { VideoFormProps } from './video-form.interface';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Input,
  createStyles,
  Theme,
  FormControlLabel, Checkbox,
} from '@material-ui/core';
import { Category } from '../../services/category.interface';
import { Author } from '../../services/author.interface';
import { getCategories } from '../../services/categories';
import { getAuthors } from '../../services/authors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginBottom: theme.spacing(1),
      display: 'block',
    },
  }),
);

export const VideoForm: React.FC<VideoFormProps> = ({ video, onChange }) => {
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [availableAuthors, setAvailableAuthors] = useState<Author[]>([]);
  const [author, setAuthor] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [categories, setCategories] = useState<{[key: string]: boolean}>({});

  const classes = useStyles();

  useEffect(function syncStateWithVideo() {
    if (!video) {
      return;
    }
    setName(video.name);
    setAuthor(video.author);
    setCategories(video.categories.reduce((acc, category) => ({
      ...acc,
      [category]: true,
    }), {}));
  }, [video]);

  useEffect(function fetchData() {
    Promise.all([getCategories(), getAuthors()]).then(([categories, authors]) => {
      setAvailableCategories(categories);
      setAvailableAuthors(authors);
    });
  }, []);

  useEffect(function handleFormChange() {
    onChange({
      author,
      name,
      categories: Object.keys(categories),
    })
  }, [author, name, categories, onChange]);

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName(event.target.value as string);
  };

  const handleAuthorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAuthor(event.target.value as string);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategories({
      ...categories,
      [event.target.name]: event.target.checked,
    })
  };

  return (
    <form noValidate autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel>Name</InputLabel>
        <Input
          fullWidth
          value={name}
          onChange={handleNameChange}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Authors</InputLabel>
        <Select
          fullWidth
          value={author}
          onChange={handleAuthorChange}
        >
          {availableAuthors.map((author) => (
            <MenuItem
              value={author.name}
              key={author.id}>
              {author.name}
            </MenuItem>))}
        </Select>
      </FormControl>
      {availableCategories.map((category) => (
        <FormControlLabel
          key={category.id}
          control={
            <Checkbox
              checked={categories[category.name] || false}
              onChange={handleCategoryChange}
              name={category.name}
              color="primary"
            />
          }
          label={category.name}
        />))}
    </form>
  );
};
