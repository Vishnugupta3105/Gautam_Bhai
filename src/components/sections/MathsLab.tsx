import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface MathProblem {
  id: number
  title: string
  description: string
  latex: string
  solution: string
  roasts: string[]
  praises: string[]
}

const mathProblems: MathProblem[] = [
  {
    id: 1,
    title: "Calculus Challenge",
    description: "Find the derivative of the following function:",
    latex: "f(x) = \\int_{0}^{x} \\frac{\\sin(t)}{t} dt",
    solution: "sin(x)/x",
    roasts: [
      "You made Euler cry.",
      "Even a calculator would do better.",
      "This is like kindergarten math for Gautam.",
    ],
    praises: [
      "Respect! You're getting closer to Gautam's level.",
      "Not bad! Keep practicing and you might catch up to Gautam in a few decades.",
      "Impressive! But Gautam solved this in his sleep.",
    ]
  },
  {
    id: 2,
    title: "Linear Algebra Puzzle",
    description: "Find the eigenvalues of the following matrix:",
    latex: "A = \\begin{pmatrix} 2 & -1 \\\\ -1 & 2 \\end{pmatrix}",
    solution: "1,3",
    roasts: [
      "The matrix is disappointed in your answer.",
      "Even a computer would solve this faster.",
      "Gautam's cat could solve this.",
    ],
    praises: [
      "Well done! You're starting to think like Gautam.",
      "Not bad! Only 1000 more problems to go before you reach Gautam's level.",
      "Good job! But Gautam solved this while eating breakfast.",
    ]
  },
  {
    id: 3,
    title: "Number Theory Problem",
    description: "Find the smallest positive integer x such that:",
    latex: "x \\equiv 2 \\pmod{3}, \\quad x \\equiv 3 \\pmod{5}, \\quad x \\equiv 2 \\pmod{7}",
    solution: "23",
    roasts: [
      "The numbers are laughing at your solution.",
      "Even a calculator would be embarrassed.",
      "This is like counting for Gautam.",
    ],
    praises: [
      "Excellent! You're showing promise.",
      "Well done! Only 999 more problems to go.",
      "Good work! But Gautam solved this in his head.",
    ]
  }
]

const MathsLab = () => {
  const [currentProblem, setCurrentProblem] = useState<MathProblem>(mathProblems[0])
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [showFeedback, setShowFeedback] = useState<boolean>(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [feedback, setFeedback] = useState<string>('')

  const handleSubmit = () => {
    const isAnswerCorrect = userAnswer.trim().toLowerCase() === currentProblem.solution.toLowerCase()
    setIsCorrect(isAnswerCorrect)
    
    if (isAnswerCorrect) {
      const randomPraise = currentProblem.praises[Math.floor(Math.random() * currentProblem.praises.length)]
      setFeedback(randomPraise)
    } else {
      const randomRoast = currentProblem.roasts[Math.floor(Math.random() * currentProblem.roasts.length)]
      setFeedback(randomRoast)
    }
    
    setShowFeedback(true)
  }

  const handleNextProblem = () => {
    const currentIndex = mathProblems.findIndex(p => p.id === currentProblem.id)
    const nextIndex = (currentIndex + 1) % mathProblems.length
    setCurrentProblem(mathProblems[nextIndex])
    setUserAnswer('')
    setShowFeedback(false)
    setIsCorrect(null)
  }

  return (
    <section id="maths-lab" className="section-container">
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
              🧮
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Maths Lab</span>
            </h2>
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-5xl"
            >
              📐
            </motion.div>
          </div>
          <p className="text-2xl md:text-3xl text-light/80 mb-8">
            Where Numbers Bow to Gautam&apos;s Genius
          </p>
          <div className="flex items-center justify-center gap-8 text-4xl">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/4"
            >
              🔢
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
                Problem {currentProblem.id + 1}: {currentProblem.title}
              </h3>
              <div className="text-xl font-mono bg-dark/50 px-4 py-2 rounded-lg border border-primary/20">
                Difficulty: {['Easy', 'Medium', 'Hard'][currentProblem.id % 3]}
              </div>
            </div>
            <p className="text-lg text-light/90 mb-6">{currentProblem.description}</p>
            <div className="p-6 bg-dark/50 rounded-xl border border-primary/20 mb-6">
              <BlockMath math={currentProblem.latex} />
            </div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="input-primary text-xl font-mono text-center"
              placeholder="Enter your answer..."
            />
          </div>

          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="btn-primary shine-effect text-xl px-8 py-4"
              disabled={!userAnswer.trim()}
            >
              Check Answer
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextProblem}
              className="btn-secondary shine-effect text-xl px-8 py-4"
            >
              Next Problem
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {showFeedback && (
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
                  {isCorrect ? '🎯' : '🧮'}
                </motion.div>
                <h3 className={`text-3xl font-bold mb-4 ${
                  isCorrect ? 'text-accent-emerald' : 'text-accent-amber'
                }`}>
                  {isCorrect ? 'Brilliant!' : 'Almost There!'}
                </h3>
                <p className="text-xl text-light/90 mb-4">{feedback}</p>
                {!isCorrect && (
                  <div className="mt-4 p-4 bg-dark/50 rounded-lg border border-accent-amber/20">
                    <p className="text-lg text-light/80">
                      <span className="text-accent-amber font-bold">Solution:</span> {currentProblem.solution}
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

export default MathsLab 