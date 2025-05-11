import { motion } from 'framer-motion'

interface Wish {
  id: number
  name: string
  message: string
  avatar?: string
}

const wishes: Wish[] = [
  {
    id: 1,
    name: "DSA Buddy",
    message: "Happy Birthday to the guy who makes complex algorithms look like child's play! 🎉",
    avatar: "👨‍💻"
  },
  {
    id: 2,
    name: "Math Genius",
    message: "Another year of making Euler proud! Happy Birthday! 🎂",
    avatar: "🧮"
  },
  {
    id: 3,
    name: "Code Master",
    message: "To the person who can debug with their eyes closed. Happy Birthday! 🎈",
    avatar: "💻"
  },
  {
    id: 4,
    name: "Problem Solver",
    message: "Happy Birthday to the guy who turns coffee into code! ☕",
    avatar: "⚡"
  },
  {
    id: 5,
    name: "Algorithm Wizard",
    message: "May your birthday be as optimized as your code! 🎊",
    avatar: "✨"
  },
  {
    id: 6,
    name: "Math Whiz",
    message: "Happy Birthday to the human calculator! 🎯",
    avatar: "🎯"
  }
]

const BirthdayWishes = () => {
  return (
    <section id="birthday-wishes" className="section-container bg-dark/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          🎁 Birthday Wishes
        </motion.h2>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card h-full flex flex-col hover:shadow-glow transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl">{wish.avatar}</div>
                  <h3 className="text-xl font-semibold gradient-text">{wish.name}</h3>
                </div>
                <p className="text-light/80 flex-1">{wish.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BirthdayWishes 