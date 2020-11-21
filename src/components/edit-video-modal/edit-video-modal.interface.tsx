import { Video } from '../../services/video.interface';
import { VideoDraft } from '../video-form/video-form.interface';

export interface EditVideoModalProps {
  video?: Video | null;
  isShown: boolean;
  onDismiss: () => void;
  onSubmit: (video: VideoDraft) => void;
}
