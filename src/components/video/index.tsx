import Video from '@api.video/nodejs-client/lib/model/Video';
import React, { FC, useRef, useState } from 'react';
import Footer from '../footer';
import Sidebar from '../sidebar';
import styles from './videos.module.css';
import ApiVideoPlayer, { ControlName } from '@api.video/react-player';
import { screen } from 'electron';

export interface IvideosProps {
  video: Video;
  mutate: () => void;
}

const VideoComponent: FC<IvideosProps> = ({ video, mutate }): JSX.Element => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);

  const { videoId } = video;

  const videoRef = useRef<ApiVideoPlayer>(null);

  const togglePlayback = () => {
    if (playing) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setPlaying(!playing);
  };

  const handleVideoPress = () => {
    setShowControls(!showControls);
    if (showControls && !playing) {
      videoRef.current?.play();
      setPlaying(true);
    }
  };

  const height = window.screen.availHeight - 50;

  // Array of available control button names
  const controlButtons: ControlName[] = [
    'play',
    'mute',
    'volume',
    'progress',
    'current-time',
    'duration',
    'fullscreen'
  ];

  return (
    <>
      {video && (
        <div className={styles.video} id={videoId} onClick={handleVideoPress}>
          <ApiVideoPlayer
            video={{ id: videoId }}
            videoStyleObjectFit={'cover'}
            ref={videoRef}
            style={{
              width: screen.width,
              height: height,
              scrollSnapAlign: 'start',
              border: 0,
            }}
            autoplay
            loop
            controls={showControls ? controlButtons : []}
            onClick={togglePlayback}
          />
          <Footer video={video} />
          <Sidebar video={video} mutate={mutate} />
        </div>
      )}
    </>
  );
};

export default VideoComponent;
