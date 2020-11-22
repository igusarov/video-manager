import React, { useCallback, useEffect, useState } from 'react';
import { AppBar, Button, Container, createStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { VideosTable } from './components/videos-table/videos-table';
import * as videosService from './services/videos';
import { Video, VideoDraft } from './services/video.interface';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog';
import { EditVideoModal } from './components/edit-video-modal/edit-video-modal';
import { makeStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';

enum ModalType {
  None = 'None',
  EditVideo = 'EditVideo',
  AddVideo = 'AddVideo',
  DeleteVideoConfirmation = 'DeleteVideoConfirmation'
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    addButton: {
      backgroundColor: lightGreen[700],
    },
  }),
);

const descById = (a: Video, b: Video) => b.id - a.id;

const App: React.FC = () => {
  const classes = useStyles();

  const [videos, setVideos] = useState<Video[]>([]);
  const [shownModal, setShownModal] = useState(ModalType.None);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const fetchVideos = useCallback(() => {
    videosService.getVideos().then(handleVideosResponse);
  }, []);

  const handleVideosResponse = (videos: Video[]) => {
    setVideos(videos);
  };

  const handleClickEdit = (video: Video) => {
    setShownModal(ModalType.EditVideo);
    setSelectedVideo(video);
  };

  const handleClickDelete = (video: Video) => {
    setShownModal(ModalType.DeleteVideoConfirmation);
    setSelectedVideo(video);
  };

  const handleClickAdd = () => {
    setShownModal(ModalType.AddVideo);
  };

  const handleRemoveVideoAccept = useCallback(async () => {
    try {
      selectedVideo && await videosService.removeVideoById(selectedVideo.id);
    } catch (e) {
      console.error(e);
    }
    setShownModal(ModalType.None);
    fetchVideos();
  }, [selectedVideo, fetchVideos]);

  const handleModalDismiss = useCallback(() => {
    setShownModal(ModalType.None);
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
    setShownModal(ModalType.None);
    await fetchVideos();
  }, [fetchVideos, selectedVideo]);

  const handleAddVideoSubmit = useCallback(async (video: VideoDraft) => {
    try {
      await videosService.addVideo(video);
    } catch (e) {
      console.error(e);
    }
    setShownModal(ModalType.None);
    await fetchVideos();
  }, [fetchVideos]);

  useEffect(() => fetchVideos(), [fetchVideos]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}>
            Video Manager
          </Typography>
          <Button
            onClick={handleClickAdd}
            color="primary"
            variant="contained"
            className={classes.addButton}>
            Add video
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <VideosTable
          videos={[...videos].sort(descById)}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
        />
      </Container>
      <ConfirmationDialog
        isShown={shownModal === ModalType.DeleteVideoConfirmation}
        title={'Video deletion'}
        description={'Do you want to delete the video?'}
        onAccept={handleRemoveVideoAccept}
        onDismiss={handleModalDismiss}
      />
      <EditVideoModal
        isShown={shownModal === ModalType.EditVideo}
        video={selectedVideo}
        onDismiss={handleModalDismiss}
        onSubmit={handleEditVideoSubmit}
      />
      <EditVideoModal
        isShown={shownModal === ModalType.AddVideo}
        onDismiss={handleModalDismiss}
        onSubmit={handleAddVideoSubmit}
      />
    </>
  );
};

export default App;
