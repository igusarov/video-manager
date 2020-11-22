import { Video, VideoDraft } from '../../services/video.interface';

export interface VideoFormProps {
  onChange: (video: VideoDraft) => void;
  video?: Video | null;
}
