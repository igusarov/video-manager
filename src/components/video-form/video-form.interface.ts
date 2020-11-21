import { Video } from '../../services/video.interface';

export type VideoDraft = Omit<Video, 'id'>;

export interface VideoFormProps {
  onChange: (video: Omit<Video, 'id'>) => void;
  video?: Video | null;
}
