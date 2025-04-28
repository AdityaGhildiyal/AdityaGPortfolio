"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Loader } from "lucide-react"

interface OptimizedVideoProps {
  src: string
  poster: string
  title?: string
}

export default function OptimizedVideo({ src, poster, title }: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Only load the video when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Handle video events
  const handlePlay = () => {
    if (!videoLoaded) {
      // If video isn't loaded yet, set the source now
      if (videoRef.current) {
        videoRef.current.src = src
        videoRef.current.load()
      }
    }

    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleLoadedData = () => {
    setVideoLoaded(true)
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
  }

  return (
    <div
      className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 relative overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {title && (
        <div className="absolute top-2 left-2 z-10 bg-slate-900/80 px-2 py-1 rounded text-xs text-slate-300">
          {title}
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={poster}
        preload="none"
        onLoadedData={handleLoadedData}
        onEnded={handleVideoEnd}
      >
        {/* Video source is set dynamically when play is clicked */}
        {videoLoaded && <source src={src} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>

      <div
        className={`absolute inset-0 flex items-center justify-center bg-slate-900/50 transition-opacity duration-300 ${
          isPlaying ? "opacity-0" : "opacity-100"
        } ${showControls || !isPlaying ? "group-hover:opacity-100" : "group-hover:opacity-50"}`}
      >
        {!isPlaying ? (
          <button
            onClick={handlePlay}
            className="w-16 h-16 rounded-full bg-emerald-500/80 flex items-center justify-center hover:bg-emerald-500 transition-colors"
            aria-label="Play video"
          >
            {!videoLoaded && isLoaded ? (
              <Loader className="w-8 h-8 text-white animate-spin" />
            ) : (
              <Play className="w-8 h-8 text-white" fill="white" />
            )}
          </button>
        ) : (
          <button
            onClick={handlePause}
            className={`w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center hover:bg-slate-800 transition-colors opacity-0 group-hover:opacity-100`}
            aria-label="Pause video"
          >
            <Pause className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
    </div>
  )
}
