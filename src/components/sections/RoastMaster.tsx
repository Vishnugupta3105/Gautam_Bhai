import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const roasts = [
  "You still use bubble sort? That's cute.",
  "Recursion scares you? Gautam eats it for breakfast.",
  "Your code is like a maze - even a GPS would get lost.",
  "I've seen better algorithms in a kindergarten math class.",
  "Your solution is so slow, it makes a snail look like Usain Bolt.",
  "Even a calculator would be embarrassed by your math skills.",
  "Your code is like a horror movie - full of bugs and no one wants to watch it.",
  "Gautam's cat could write better code than you.",
  "Your debugging skills are like finding a needle in a haystack... blindfolded.",
  "I've seen better problem-solving in a game of tic-tac-toe.",
  "Your code is so messy, even a garbage collector would give up.",
  "Gautam solves harder problems while brushing his teeth.",
  "Your algorithm is like a broken GPS - it takes the longest route possible.",
  "Even a computer would facepalm at your solution.",
  "Your code is like a bad joke - it doesn't work and no one laughs.",
  "Gautam's brain processes faster than your code runs.",
  "Your solution is like a maze - even a mouse would get lost.",
  "I've seen better optimization in a snail race.",
  "Your code is like a puzzle - no one wants to solve it.",
  "Gautam's coffee break is longer than your algorithm's runtime.",
]

const RoastMaster = () => {
  const [currentRoast, setCurrentRoast] = useState<string>('')
  const [isRoasting, setIsRoasting] = useState<boolean>(false)
  const [roastCount, setRoastCount] = useState<number>(0)

  const handleRoast = () => {
    setIsRoasting(true)
    setRoastCount(prev => prev + 1)
    
    // Get a random roast that's different from the current one
    let newRoast
    do {
      newRoast = roasts[Math.floor(Math.random() * roasts.length)]
    } while (newRoast === currentRoast && roasts.length > 1)
    
    setCurrentRoast(newRoast)
  }

  return (
    <section id="roast-master" className="section-container">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-5xl"
            >
              🔥
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Roast Master</span>
            </h2>
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-5xl"
            >
              💀
            </motion.div>
          </div>
          <p className="text-2xl md:text-3xl text-light/80 mb-8">
            Enter at Your Own Risk - Gautam&apos;s Roasting Ground
          </p>
          <div className="flex items-center justify-center gap-8 text-4xl">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/4"
            >
              😈
            </motion.div>
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute right-1/4"
            >
              ⚡
            </motion.div>
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/3"
            >
              🤡
            </motion.div>
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute right-1/3"
            >
              🎯
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="card-glow mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold gradient-text">
                Roast Count: {roastCount}
              </h3>
              <div className="text-xl font-mono bg-dark/50 px-4 py-2 rounded-lg border border-primary/20">
                Level: {Math.floor(roastCount / 5) + 1}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {currentRoast ? (
                <motion.div
                  key={currentRoast}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  className="p-8 bg-dark/50 rounded-xl border border-accent-amber/20 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="text-6xl mb-4"
                  >
                    {['🔥', '💀', '⚡', '😈', '🤡'][Math.floor(Math.random() * 5)]}
                  </motion.div>
                  <p className="text-2xl md:text-3xl font-bold text-accent-amber mb-4">
                    {currentRoast}
                  </p>
                  <div className="text-light/60 text-lg">
                    Roast #{roastCount} • Level {Math.floor(roastCount / 5) + 1}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 bg-dark/50 rounded-xl border border-primary/20 text-center"
                >
                  <p className="text-xl text-light/80">
                    Click the button below to get roasted! 🔥
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRoast}
              className="btn-primary shine-effect text-xl px-8 py-4 relative overflow-hidden group"
              disabled={isRoasting}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-accent-amber/20 to-accent-red/20"
                initial={{ x: '-100%' }}
                animate={{ x: isRoasting ? '100%' : '-100%' }}
                transition={{ duration: 0.5, repeat: isRoasting ? Infinity : 0 }}
              />
              <span className="relative z-10">
                {isRoasting ? 'Roasting...' : 'Roast Me!'}
              </span>
            </motion.button>
          </div>

          {roastCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <p className="text-light/60">
                You&apos;ve been roasted {roastCount} times! {roastCount >= 10 ? '🔥 You&apos;re a true warrior!' : 'Keep going!'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default RoastMaster 