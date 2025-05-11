import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrainModeProps {
  isActive: boolean
  onToggle: () => void
}

const BrainMode = ({ isActive, onToggle }: BrainModeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false)

  useEffect(() => {
    if (!isActive) {
      setShowTimeoutMessage(false)
      return
    }

    // Show timeout message after 5 seconds
    const timeoutId = setTimeout(() => {
      setShowTimeoutMessage(true)
    }, 5000)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Matrix rain effect
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    const draw = () => {
      if (!canvas || !ctx) return

      // Add semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font
      ctx.fillStyle = '#0F0'
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = String.fromCharCode(0x30A0 + Math.random() * 96)
        
        // Draw the character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        // Reset drop to top when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move drop down
        drops[i]++
      }
    }

    // Animation loop
    const interval = setInterval(draw, 33) // ~30 FPS

    return () => {
      clearTimeout(timeoutId)
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isActive])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 pointer-events-none"
        >
          {/* Matrix canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              {!showTimeoutMessage ? (
                <>
                  <h2 className="text-4xl md:text-6xl font-bold text-green-500 mb-4 font-mono">
                    Welcome to Gautam's Brain
                  </h2>
                  <p className="text-xl text-green-400/80 font-mono">
                    Proceed with caution
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark/90 p-8 rounded-xl border border-red-500/30 max-w-lg mx-auto"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-4 font-mono">
                    Too Complex! 🤯
                  </h2>
                  <p className="text-xl text-red-400/80 font-mono mb-4">
                    Even Gautam's brain is too complex for mere mortals to understand!
                  </p>
                  <p className="text-lg text-red-300/60 font-mono">
                    Maybe stick to the DSA Dojo instead? 😅
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={onToggle}
            className="absolute top-8 right-8 text-green-500 hover:text-green-400 transition-colors font-mono"
          >
            [ Exit Brain Mode ]
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BrainMode 