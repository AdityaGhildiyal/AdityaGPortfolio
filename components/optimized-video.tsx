"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Loader, Maximize, Minimize, Volume2, VolumeX, AlertTriangle } from "lucide-react"

interface OptimizedVideoProps {
  src: string
  poster: string
  title?: string
  disabled?: boolean
}

export default function OptimizedVideo({ src, poster, title, disabled = false }: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Format time in MM:SS format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Only load the video when it comes into view
  useEffect(() => {
    if (disabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [disabled])

  // Update progress bar as video plays
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100)
    }

    video.addEventListener("timeupdate", updateProgress)

    return () => {
      video.removeEventListener("timeupdate", updateProgress)
    }
  }, [videoLoaded])

  // Handle video events
  const handlePlay = () => {
    if (disabled) return

    setIsLoading(true)
    setLoadError(false)

    // Clear any existing timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
    }

    // Set a timeout to show a message if loading takes too long
    const timeout = setTimeout(() => {
      if (!videoLoaded && isLoading) {
        setLoadError(true)
        setIsLoading(false)
      }
    }, 8000)

    setLoadingTimeout(timeout)

    if (!videoLoaded) {
      // If video isn't loaded yet, set the source now
      if (videoRef.current) {
        videoRef.current.src = src
        videoRef.current.load()
      }
    }

    if (videoRef.current) {
      const playPromise = videoRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            setIsLoading(false)
            if (loadingTimeout) clearTimeout(loadingTimeout)
          })
          .catch((error) => {
            console.error("Error playing video:", error)
            setIsLoading(false)
            setLoadError(true)
            if (loadingTimeout) clearTimeout(loadingTimeout)
          })
      }
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
    setIsLoading(false)
    if (loadingTimeout) clearTimeout(loadingTimeout)

    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !videoLoaded) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width

    videoRef.current.currentTime = pos * videoRef.current.duration
    setProgress(pos * 100)
  }

  const toggleFullScreen = () => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return

    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(!isMuted)
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullScreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange)
    }
  }, [])

  // If disabled, show the RAM consumption message
  if (disabled) {
    return (
      <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 relative overflow-hidden flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Video Disabled</h3>
          <p className="text-slate-300 text-sm">
            This video has been disabled to reduce RAM consumption and improve page performance. Please check other
            sections of the portfolio for available content.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
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

      {/* Video controls overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
          isPlaying && !showControls ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Center play/pause button - fixed alignment */}
        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="w-16 h-16 rounded-full bg-emerald-500/80 flex items-center justify-center hover:bg-emerald-500 transition-colors"
              aria-label="Play video"
            >
              {isLoading ? (
                <Loader className="w-8 h-8 text-white animate-spin" />
              ) : (
                <Play className="w-8 h-8 text-white" style={{ marginLeft: "3px" }} />
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

        {/* Bottom controls bar */}
        <div
          className={`px-4 py-2 ${isPlaying && !showControls ? "opacity-0" : "opacity-100"} group-hover:opacity-100 transition-opacity mt-auto`}
        >
          {/* Progress bar */}
          <div className="w-full h-1 bg-slate-600 rounded-full mb-2 cursor-pointer" onClick={handleProgressClick}>
            <div className="h-full bg-emerald-500 rounded-full relative" style={{ width: `${progress}%` }}>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100"></div>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isPlaying ? (
                <button onClick={handlePause} className="text-white hover:text-emerald-400" aria-label="Pause">
                  <Pause className="w-5 h-5" />
                </button>
              ) : (
                <button onClick={handlePlay} className="text-white hover:text-emerald-400" aria-label="Play">
                  <Play className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={toggleMute}
                className="text-white hover:text-emerald-400"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <span className="text-xs text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <button
              onClick={toggleFullScreen}
              className="text-white hover:text-emerald-400"
              aria-label={isFullScreen ? "Exit full screen" : "Full screen"}
            >
              {isFullScreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
          <div className="bg-slate-900/90 px-4 py-2 rounded-lg flex items-center">
            <Loader className="w-5 h-5 text-emerald-400 animate-spin mr-2" />
            <span className="text-sm text-white">Loading video...</span>
          </div>
        </div>
      )}

      {/* Error message */}
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="bg-slate-900/90 p-4 rounded-lg max-w-xs text-center">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <h4 className="text-white font-medium mb-1">Video Error</h4>
            <p className="text-sm text-slate-300">
              The video could not be loaded. This may be due to high memory usage or network issues.
            </p>
            <button
              onClick={() => setLoadError(false)}
              className="mt-3 px-4 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
