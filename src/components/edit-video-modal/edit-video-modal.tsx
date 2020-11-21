import React from 'react';
import { EditVideoModalProps } from './edit-video-modal.interface';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { VideoForm } from '../video-form/video-form';
import { VideoDraft } from '../video-form/video-form.interface';

export const EditVideoModal: React.FC<EditVideoModalProps> = ({ isShown, onDismiss, video }) => {

  const handleChange = (video: VideoDraft) => {
    console.log('submit video', video)
  };

  return (
    <Dialog open={isShown} onClose={onDismiss} aria-labelledby="form-dialog-title">
      <DialogTitle>Save video</DialogTitle>
      <DialogContent>
        <VideoForm video={video} onChange={handleChange}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDismiss} color="primary">
          Cancel
        </Button>
        <Button onClick={onDismiss} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
