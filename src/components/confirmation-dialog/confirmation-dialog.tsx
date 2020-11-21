import React from 'react';
import { ConfirmationDialogProps } from './confirmation-dialog.interface';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ onAccept, onDismiss, isOpen, title, description }) => {
  return (
    <Dialog
      maxWidth="xs"
      open={isOpen}
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
}

