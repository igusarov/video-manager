import React, { useCallback, useState } from 'react';
import { EditVideoModalProps } from './edit-video-modal.interface';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { VideoForm } from '../video-form/video-form';
import { VideoDraft } from '../../services/video.interface';

const Component: React.FC<EditVideoModalProps> = ({ isShown, onDismiss, video, onSubmit }) => {
  const [videoDraft, setVideoDraft] = useState<VideoDraft | null>(null);

  const handleChange = useCallback((video: VideoDraft) => {
    setVideoDraft(video);
  }, []);

  const handleSubmit = () => {
    if (videoDraft) {
      onSubmit(videoDraft);
    }
  };

  return (
    <Dialog open={isShown} onClose={onDismiss} aria-labelledby="form-dialog-title">
      <DialogTitle>{video ? 'Save' : 'Add'} video</DialogTitle>
      <DialogContent>
        <VideoForm video={video} onChange={handleChange}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDismiss} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {video ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const EditVideoModal = React.memo(Component);
