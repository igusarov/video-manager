import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { VideosTableProps } from './videos-table.interface';

export const VideosTable: React.FC<VideosTableProps> = ({ videos, onClickEdit, onClickDelete }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: '40px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Video Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.id}>
              <TableCell component="th" scope="row">
                {video.name}
              </TableCell>
              <TableCell>{video.author}</TableCell>
              <TableCell>{video.categories.join(', ')}</TableCell>
              <TableCell>
                <Button
                  onClick={() => onClickEdit(video)}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onClickDelete(video)}
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
