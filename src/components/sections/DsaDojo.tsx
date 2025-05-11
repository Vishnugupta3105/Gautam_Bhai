import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Challenge {
  id: number
  title: string
  description: string
  timeLimit: number
  solution: string
  roasts: string[]
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Binary Tree Level Order Traversal",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    timeLimit: 300, // 5 minutes
    solution: "[[3],[9,20],[15,7]]",
    roasts: [
      "Gautam solved this while brushing his teeth.",
      "Even ChatGPT needs help with this.",
      "This is like a warm-up for Gautam's morning coffee.",
    ]
  },
  {
    id: 2,
    title: "Dynamic Programming Challenge",
    description: "Given an array of integers nums and an integer target, return the number of ways to make up the target using numbers from nums. You may use each number an infinite number of times.",
    timeLimit: 600, // 10 minutes
    solution: "7",
    roasts: [
      "Gautam's brain processes this faster than his morning coffee.",
      "This is what Gautam dreams about at night.",
      "Even the compiler is intimidated by Gautam's solution.",
    ]
  },
  {
    id: 3,
    title: "Graph Theory Puzzle",
    description: "Given a directed graph, find the longest path between any two nodes. The path should not contain any cycles.",
    timeLimit: 900, // 15 minutes
    solution: "4",
    roasts: [
      "Gautam's solution is so elegant, it made the problem cry.",
      "This is like a kindergarten problem for Gautam.",
      "The graph is afraid of Gautam's solution.",
    ]
  }
]

const DsaDojo = () => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(challenges[0])
  const [timeLeft, setTimeLeft] = useState<number>(challenges[0].timeLimit)
  const [userSolution, setUserSolution] = useState<string>('')
  const [showRoast, setShowRoast] = useState<boolean>(false)
  const [currentRoast, setCurrentRoast] = useState<string>('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentChallenge])

  const handleTimeUp = () => {
    const randomRoast = currentChallenge.roasts[Math.floor(Math.random() * currentChallenge.roasts.length)]
    setCurrentRoast(randomRoast)
    setShowRoast(true)
    setIsCorrect(false)
  }

  const handleSubmit = () => {
    const isAnswerCorrect = userSolution.trim() === currentChallenge.solution
    setIsCorrect(isAnswerCorrect)
    
    if (!isAnswerCorrect) {
      const randomRoast = currentChallenge.roasts[Math.floor(Math.random() * currentChallenge.roasts.length)]
      setCurrentRoast(randomRoast)
      setShowRoast(true)
    }
  }

  const handleNextChallenge = () => {
    const currentIndex = challenges.findIndex(c => c.id === currentChallenge.id)
    const nextIndex = (currentIndex + 1) % challenges.length
    setCurrentChallenge(challenges[nextIndex])
    setTimeLeft(challenges[nextIndex].timeLimit)
    setUserSolution('')
    setShowRoast(false)
    setIsCorrect(null)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <section id="dsa-dojo" className="section-container">
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
              👑
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">DSA Dojo</span>
            </h2>
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-5xl"
            >
              ⚔️
            </motion.div>
          </div>
          <p className="text-2xl md:text-3xl text-light/80 mb-8">
            Only the Brave Enter Gautam&apos;s Realm
          </p>
          <div className="flex items-center justify-center gap-8 text-4xl">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/4"
            >
              💻
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
              🎯
            </motion.div>
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute right-1/3"
            >
              🧠
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="card-glow mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold gradient-text">
                Challenge {currentChallenge.id + 1}: {currentChallenge.title}
              </h3>
              <div className="text-xl font-mono bg-dark/50 px-4 py-2 rounded-lg border border-primary/20">
                Time: {timeLeft}s
              </div>
            </div>
            <p className="text-lg text-light/90 mb-6">{currentChallenge.description}</p>
            <textarea
              value={userSolution}
              onChange={(e) => setUserSolution(e.target.value)}
              className="input-primary h-32 font-mono text-lg"
              placeholder="Write your solution here..."
            />
          </div>

          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="btn-primary shine-effect text-xl px-8 py-4"
              disabled={!userSolution.trim()}
            >
              Submit Solution
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextChallenge}
              className="btn-secondary shine-effect text-xl px-8 py-4"
            >
              Next Challenge
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {showRoast && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className={`mt-8 p-6 rounded-xl text-center ${
                  isCorrect 
                    ? 'bg-accent-emerald/20 border border-accent-emerald/30' 
                    : 'bg-accent-amber/20 border border-accent-amber/30'
                }`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="text-6xl mb-4"
                >
                  {isCorrect ? '🎉' : '💪'}
                </motion.div>
                <h3 className={`text-3xl font-bold mb-4 ${
                  isCorrect ? 'text-accent-emerald' : 'text-accent-amber'
                }`}>
                  {isCorrect ? 'Excellent!' : 'Keep Trying!'}
                </h3>
                <p className="text-xl text-light/90 mb-4">{currentRoast}</p>
                {!isCorrect && (
                  <div className="mt-4 p-4 bg-dark/50 rounded-lg border border-accent-amber/20">
                    <p className="text-lg text-light/80">
                      <span className="text-accent-amber font-bold">Hint:</span> {currentChallenge.roasts[Math.floor(Math.random() * currentChallenge.roasts.length)]}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default DsaDojo 