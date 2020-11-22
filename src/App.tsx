import React, { useCallback, useEffect, useState } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import { VideosTable } from './components/videos-table/videos-table';
import * as videosService from './services/videos';
import { Video } from './services/video.interface';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog';
import { EditVideoModal } from './components/edit-video-modal/edit-video-modal';
import { VideoDraft } from './components/video-form/video-form.interface';

enum ModalType {
  None = 'None',
  EditVideo = 'EditVideo',
  AddVideo = 'AddVideo',
  DeleteVideoConfirmation = 'DeleteVideoConfirmation'
}

const App: React.FC = () => {
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

  const handleRemoveVideoAccept = useCallback(async () => {
    try {
      selectedVideo && await videosService.removeVideoById(selectedVideo.id);
    } catch (e) {
      console.error(e);
    }
    setShownModal(ModalType.None);
    fetchVideos();
  }, [selectedVideo, fetchVideos]);

  const handleRemoveVideoDismiss = useCallback(() => {
    setShownModal(ModalType.None);
  }, []);

  const handleEditVideoDismiss = useCallback(() => {
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
        isShown={shownModal === ModalType.DeleteVideoConfirmation}
        title={'Video deletion'}
        description={'Do you want to delete the video?'}
        onAccept={handleRemoveVideoAccept}
        onDismiss={handleRemoveVideoDismiss}
      />
      <EditVideoModal
        isShown={shownModal === ModalType.EditVideo}
        video={selectedVideo}
        onDismiss={handleEditVideoDismiss}
        onSubmit={handleEditVideoSubmit}
      />
    </>
  );
};

export default App;
