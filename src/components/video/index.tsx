import { LegacyRef } from 'react';
import Video from '@api.video/nodejs-client/lib/model/Video'
import React, { FC, useRef, useState } from 'react'
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
  const videoRef = useRef<ApiVideoPlayerRef>(null)

  const onVideoPress = () => {
    if (playing) {
      pause()
    } else {
      play()
    }
  }

  const pause = () => {
    if (videoRef.current && !!(videoRef.current as IMyApiVideoPlayer).pause && typeof (videoRef.current as IMyApiVideoPlayer).pause === 'function') {
      (videoRef.current as IMyApiVideoPlayer).pause()
      setPlaying(false)
    } else {
      console.error('Invalid player object')
    }
  }

  const play = () => {
    videoRef.current?.play()
    setPlaying(true)
  }

  const toggleMute = () => {
    setMuted(!muted)
    videoRef.current?.setMuted(!muted)
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
          ref={videoRef as ApiVideoPlayerRef}
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
          pause={pause}
          play={play}
        />
      )}
    </>
  )
}

export default VideoComponent;
