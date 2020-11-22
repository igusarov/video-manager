import React, { useCallback, useEffect, useState } from 'react';
import { VideosTable } from './components/videos-table/videos-table';
import * as videosService from './services/videos';
import { Video, VideoDraft } from './services/video.interface';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog';
import { EditVideoModal } from './components/edit-video-modal/edit-video-modal';
import { AppContainer } from './components/app-container/app-container';

enum ModalType {
  None = 'None',
  EditVideo = 'EditVideo',
  AddVideo = 'AddVideo',
  DeleteVideoConfirmation = 'DeleteVideoConfirmation'
}

const descById = (a: Video, b: Video) => b.id - a.id;

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
      <AppContainer onClickAddButton={handleClickAdd}>
        <VideosTable
          videos={[...videos].sort(descById)}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
        />
      </AppContainer>
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
