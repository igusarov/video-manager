import React from 'react';
import { ConfirmationDialogProps } from './confirmation-dialog.interface';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const Component: React.FC<ConfirmationDialogProps> = ({ onAccept, onDismiss, isShown, title, description }) => {
  return (
    <Dialog
      maxWidth="xs"
      open={isShown}
      onClose={onDismiss}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onDismiss} color="primary">
          Cancel
        </Button>
        <Button onClick={onAccept} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export const ConfirmationDialog = React.memo(Component);

