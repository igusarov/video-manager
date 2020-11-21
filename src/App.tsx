import React, { useEffect, useState } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import { VideosTable } from './components/videos-table/videos-table';
import { getVideos, removeVideoById } from './services/videos';
import { Video } from './services/video.interface';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog';

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [confirmDialogIsShown, setConfirmDialogIsShown] = useState(false);
  const [videoToRemove, setVideoToRemove] = useState<Video | null>(null);

  const fetchVideos = () => {
    getVideos().then(handleVideosResponse);
  };

  const handleVideosResponse = (videos: Video[]) => {
    setVideos(videos);
  };

  const handleClickEdit = (video: Video) => {
    console.log(video);
  };

  const handleClickDelete = (video: Video) => {
    setConfirmDialogIsShown(true);
    setVideoToRemove(video);
  };

  const handleRemoveVideoAccept = async () => {
    try {
      videoToRemove && await removeVideoById(videoToRemove.id);
    } catch (e) {
      console.error(e);
    }
    setConfirmDialogIsShown(false);
    setVideoToRemove(null);
    fetchVideos();
  };

  const handleRemoveVideoDismiss = () => {
    console.log('cancel removing video', videoToRemove);
    setConfirmDialogIsShown(false);
    setVideoToRemove(null);
  };

  useEffect(fetchVideos, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Video Manager</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <VideosTable
          videos={videos}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
        />
      </Container>
      <ConfirmationDialog
        isOpen={confirmDialogIsShown}
        title={'Video deletion'}
        description={'Do you want to delete the video?'}
        onAccept={handleRemoveVideoAccept}
        onDismiss={handleRemoveVideoDismiss}
      />
    </>
  );
};

export default App;
