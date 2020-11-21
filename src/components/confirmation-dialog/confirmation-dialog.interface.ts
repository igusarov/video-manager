export interface ConfirmationDialogProps {
  title: string,
  description: string,
  isShown: boolean,
  onAccept: () => void,
  onDismiss: () => void,
}
