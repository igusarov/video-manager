import { Video } from '../../services/video.interface';

export interface EditVideoModalProps {
  video: Video | null;
  isShown: boolean;
  onDismiss: () => void;
}
