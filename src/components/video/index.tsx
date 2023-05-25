import { LegacyRef } from 'react';
import Video from '@api.video/nodejs-client/lib/model/Video'
import React, { FC, RefObject, useEffect, useRef, useState } from 'react'
import Footer from '../footer'
import Sidebar from '../sidebar'
import styles from './videos.module.css'
import ApiVideoPlayer, { ApiVideoPlayerProps } from '@api.video/react-player'

interface IMyApiVideoPlayer extends ApiVideoPlayerProps {
  setMuted(value: boolean): void;
  pause(): void;
  play(): void;
}

type ApiVideoPlayerRef = LegacyRef<IMyApiVideoPlayer> | undefined;

export interface IvideosProps {
  video: Video | undefined
  mutate: () => void
}

const VideoComponent: FC<IvideosProps> = ({ video, mutate }): JSX.Element => {
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(false)
  const videoRef = useRef<RefObject<IMyApiVideoPlayer>>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.current?.play();
      } else {
        videoRef.current.current?.pause();
      }
      videoRef.current.current?.setMuted(muted)
    }
  }, [playing, muted])

  const onVideoPress = () => {
    setPlaying(!playing)
  }

  const toggleMute = () => {
    setMuted(!muted)
  }

  const onMute = (isMuted: boolean) => {
    setMuted(isMuted)
  }

  const height = window.screen.availHeight - 50

  return (
    <>
      {video && (
        <ApiVideoPlayer
          video={{ id: video.videoId }}
          videoStyleObjectFit={'cover'}
          ref={videoRef}
          style={{
            width: screen.width,
            height: height,
            scrollSnapAlign: 'start',
            border: 0
          }}
          autoplay
          chromeless={false}
          loop
          muted={false}
          onMuteChange={onMute}
          setMuted={setMuted}
          pause={videoRef.current?.current?.pause}
          play={videoRef.current?.current?.play}
        />
      )}
    </>
  )
}

export default VideoComponent;
