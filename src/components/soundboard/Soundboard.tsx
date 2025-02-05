'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { SOUNDS, CATEGORY_LABELS, type SoundCategory } from './sound-config'
import { Volume2, VolumeX, Loader2, Square } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Soundboard() {
  const [currentSound, setCurrentSound] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<SoundCategory | 'all'>('all')
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const categories = ['all', ...new Set(SOUNDS.map(s => s.category))] as const

  const filteredSounds = SOUNDS.filter(sound => 
    activeCategory === 'all' || sound.category === activeCategory
  )

  const stopCurrentSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const playSound = async (soundId: string, start: number, end: number | null) => {
    if (isLoading) return
    const sound = SOUNDS.find(s => s.id === soundId)
    if (!sound) return

    try {
      setIsLoading(true)
      stopCurrentSound()
      setCurrentSound(null)
      await new Promise(resolve => setTimeout(resolve, 50))
      setCurrentSound(sound.file)

      await new Promise((resolve, reject) => {
        if (!audioRef.current) return reject()
        const handleCanPlay = () => {
          audioRef.current?.removeEventListener('canplay', handleCanPlay)
          resolve(true)
        }
        const handleError = (e: Event) => {
          audioRef.current?.removeEventListener('error', handleError)
          reject(e)
        }
        audioRef.current.addEventListener('canplay', handleCanPlay)
        audioRef.current.addEventListener('error', handleError)
      })

      if (audioRef.current) {
        audioRef.current.currentTime = start
        await audioRef.current.play()

        if (end !== null) {
          const duration = end - start
          timeoutRef.current = setTimeout(() => {
            stopCurrentSound()
          }, duration * 1000)
        }
      }
    } catch (error) {
      console.error('Playback failed:', error)
      stopCurrentSound()
      setCurrentSound(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSoundClick = async (soundId: string, start: number, end: number | null) => {
    const isPlaying = currentSound === SOUNDS.find(s => s.id === soundId)?.file

    if (isPlaying) {
      stopCurrentSound()
      setCurrentSound(null)
      return
    }

    await playSound(soundId, start, end)
  }

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="sticky top-4 z-10 bg-background/80 backdrop-blur-lg p-4 rounded-lg border border-border/50 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Soundboard</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'secondary'}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'font-medium',
                activeCategory === category && 'ring-2 ring-primary/50'
              )}
            >
              {category === 'all' ? '🎮' : CATEGORY_LABELS[category]}
              <span className="ml-2 text-xs capitalize">{category}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Sound Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {filteredSounds.map(sound => (
          <div 
            key={sound.id} 
            className="group relative aspect-square"
          >
            <div className="absolute -top-1 -right-1 z-10">
              <span className="inline-block text-sm">
                {CATEGORY_LABELS[sound.category]}
              </span>
            </div>
            
            {sound.timestamps.map(timestamp => {
              const isCurrentlyPlaying = currentSound === sound.file
              
              return (
                <div key={timestamp.id} className="relative h-full">
                  <Button
                    variant={isCurrentlyPlaying ? "default" : "secondary"}
                    onClick={() => handleSoundClick(sound.id, timestamp.start, timestamp.end)}
                    className={cn(
                      "w-full h-full aspect-square relative group hover:ring-2 hover:ring-primary/50 transition-all duration-300",
                      !sound.image && "p-6 text-4xl",
                      sound.image && "p-0 overflow-hidden",
                      isCurrentlyPlaying && "bg-primary hover:bg-primary"
                    )}
                    disabled={isLoading}
                    title={sound.name}
                  >
                    {isLoading && currentSound === sound.file ? (
                      <Loader2 className="w-12 h-12 animate-spin" />
                    ) : isCurrentlyPlaying ? (
                      <Square className="w-12 h-12" />
                    ) : sound.image ? (
                      <div className="relative w-full h-full p-4">
                        <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-border">
                          <Image
                            src={sound.image}
                            alt={sound.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-4xl">{sound.icon}</span>
                    )}
                  </Button>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-secondary/90 backdrop-blur-sm text-secondary-foreground px-3 py-1.5 rounded-full">
                    {sound.name}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <audio
        ref={audioRef}
        src={currentSound ?? undefined}
        className="hidden"
        preload="auto"
      />
    </div>
  )
} 