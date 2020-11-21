import { Video } from '../../services/video.interface';

export interface VideosTableProps {
  videos: Video[];
  onClickEdit: (video: Video) => void,
  onClickDelete: (video: Video) => void,
}
