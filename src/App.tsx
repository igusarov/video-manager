import React, { useCallback, useEffect, useState } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import { VideosTable } from './components/videos-table/videos-table';
import * as videosService from './services/videos';
import { Video } from './services/video.interface';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog';
import { EditVideoModal } from './components/edit-video-modal/edit-video-modal';
import { VideoDraft } from './components/video-form/video-form.interface';

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [confirmDialogIsShown, setConfirmDialogIsShown] = useState(false);
  const [editVideoIsShown, setEditVideoIsShown] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const fetchVideos = useCallback(() => {
    videosService.getVideos().then(handleVideosResponse);
  }, []);

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

  const handleRemoveVideoAccept = useCallback(async () => {
    try {
      selectedVideo && await videosService.removeVideoById(selectedVideo.id);
    } catch (e) {
      console.error(e);
    }
    setConfirmDialogIsShown(false);
    fetchVideos();
  }, [selectedVideo, fetchVideos]);

  const handleRemoveVideoDismiss = useCallback(() => {
    setConfirmDialogIsShown(false);
  }, []);

  const handleEditVideoDismiss = useCallback(() => {
    setEditVideoIsShown(false);
  }, []);

  const handleEditVideoSubmit = useCallback(async (video: VideoDraft) => {
    try {
      selectedVideo && await videosService.saveVideoById(
        selectedVideo.id,
        {
          ...video,
          id: selectedVideo.id,
        });
    } catch (e) {
      console.error(e);
    }
    setEditVideoIsShown(false);
    await fetchVideos();
  }, [fetchVideos, selectedVideo]);

  useEffect(() => fetchVideos(), [fetchVideos]);

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
        isShown={confirmDialogIsShown}
        title={'Video deletion'}
        description={'Do you want to delete the video?'}
        onAccept={handleRemoveVideoAccept}
        onDismiss={handleRemoveVideoDismiss}
      />
      <EditVideoModal
        isShown={editVideoIsShown}
        video={selectedVideo}
        onDismiss={handleEditVideoDismiss}
        onSubmit={handleEditVideoSubmit}
      />
    </>
  );
};

export default App;
