import React, { useEffect, useState } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import { VideosTable } from './components/videos-table/videos-table';
import { getVideos, removeVideoById } from './services/videos';
import { Video } from './services/video.interface';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog';
import { EditVideoModal } from './components/edit-video-modal/edit-video-modal';

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [confirmDialogIsShown, setConfirmDialogIsShown] = useState(false);
  const [editVideoIsShown, setEditVideoIsShown] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const fetchVideos = () => {
    getVideos().then(handleVideosResponse);
  };

  const handleVideosResponse = (videos: Video[]) => {
    setVideos(videos);
  };

  const handleClickEdit = (video: Video) => {
    setEditVideoIsShown(true);
    setSelectedVideo(video);
  };

  const handleClickDelete = (video: Video) => {
    setConfirmDialogIsShown(true);
    setSelectedVideo(video);
  };

  const handleRemoveVideoAccept = async () => {
    try {
      selectedVideo && await removeVideoById(selectedVideo.id);
    } catch (e) {
      console.error(e);
    }
    setConfirmDialogIsShown(false);
    setSelectedVideo(null);
    fetchVideos();
  };

  const handleRemoveVideoDismiss = () => {
    setConfirmDialogIsShown(false);
    setSelectedVideo(null);
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
      <EditVideoModal
        isShown={editVideoIsShown}
        video={selectedVideo}
        onDismiss={() => {}}
      />
    </>
  );
};

export default App;
