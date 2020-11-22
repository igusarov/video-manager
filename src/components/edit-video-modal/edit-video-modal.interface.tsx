import { Video, VideoDraft } from '../../services/video.interface';

export interface EditVideoModalProps {
  video?: Video | null;
  isShown: boolean;
  onDismiss: () => void;
  onSubmit: (video: VideoDraft) => void;
}
