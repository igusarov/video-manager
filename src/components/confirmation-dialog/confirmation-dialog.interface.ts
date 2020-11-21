export interface ConfirmationDialogProps {
  title: string,
  description: string,
  isOpen: boolean,
  onAccept: () => void,
  onDismiss: () => void,
}
