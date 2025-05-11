import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import Landing from './components/sections/Landing'
import DsaDojo from './components/sections/DsaDojo'
import MathsLab from './components/sections/MathsLab'
import RoastMaster from './components/sections/RoastMaster'
import GautamBot from './components/sections/GautamBot'
import BirthdayWishes from './components/sections/BirthdayWishes'
import BrainMode from './components/sections/BrainMode'

function App() {
  const [isBrainMode, setIsBrainMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoading) return

    // Trigger confetti on load
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    return () => clearInterval(interval)
  }, [isLoading])

  // Prevent auto-scrolling on load
  useEffect(() => {
    // Reset scroll position to top
    window.scrollTo(0, 0)
    
    // Remove any hash from URL to prevent auto-scrolling
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-dark">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <main className="relative">
          <Landing />
          <DsaDojo />
          <MathsLab />
          <RoastMaster />
          <GautamBot />
          <BirthdayWishes />
          <BrainMode isActive={isBrainMode} onToggle={() => setIsBrainMode(!isBrainMode)} />
        </main>
      </AnimatePresence>

      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-dark z-50"
        >
          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-6xl mb-4"
            >
              🎂
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-light/80"
            >
              Loading Birthday Magic...
            </motion.p>
          </div>
        </motion.div>
      ) : (
        <motion.button
          className="fixed bottom-8 right-8 btn-primary z-50"
          onClick={() => setIsBrainMode(!isBrainMode)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {isBrainMode ? 'Exit Brain Mode' : 'Enter Brain Mode'}
        </motion.button>
      )}
    </div>
  )
}

export default App
