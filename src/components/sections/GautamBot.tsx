import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const botResponses = [
  "Mera birthday hai, mai kyu answer karu? 😎",
  "Birthday boy ko disturb mat karo! 🎂",
  "Aaj to party ka din hai, serious questions kal puchna! 🎉",
  "Mai to bas cake kha raha hu, baad mein baat karenge! 🍰",
  "DSA questions? Birthday ke baad solve karenge! 💻",
  "Maths? Aaj to celebration ka din hai! 📚",
  "Roast? Birthday boy ko roast nahi karte! 😤",
  "Mai to bas wishes collect kar raha hu, baad mein baat karenge! 🎁",
  "Aaj to special day hai, kal se normal mode on! 🎈",
  "Birthday boy busy hai, cake cutting ke baad milte hain! 🎂",
  "Mai to bas dance kar raha hu, baad mein baat karenge! 💃",
  "Aaj to party mode on hai, kal se coding mode on! 🚀",
  "Birthday boy ko rest chahiye, kal se active rahenge! 😴",
  "Mai to bas gifts collect kar raha hu, baad mein baat karenge! 🎁",
  "Aaj to celebration ka din hai, kal se serious mode on! 🎉"
]

const specialResponses: { [key: string]: string } = {
  'hello': "Hello! Birthday boy ko wish karo pehle! 🎂",
  'hi': "Hi! Cake ka piece leke aao pehle! 🍰",
  'how are you': "Birthday boy hoon, ekdum mast! 😎",
  'happy birthday': "Thank you! Ab cake ka piece le jao! 🎂",
  'dsa': "Aaj to party ka din hai, kal se DSA! 💻",
  'algorithm': "Birthday ke baad algorithms discuss karenge! 🚀",
  'math': "Aaj to celebration ka din hai, kal se maths! 📚",
  'roast': "Birthday boy ko roast nahi karte! 😤",
  'coding': "Aaj to cake cutting ka din hai, kal se coding! 💻",
  'party': "Party to chal rahi hai, aao join karo! 🎉",
  'gift': "Gifts to mil rahe hain, aap bhi kuch lao! 🎁",
  'cake': "Cake to bahut tasty hai, ek piece le jao! 🍰",
  'dance': "Dance floor pe milte hain! 💃",
  'music': "DJ bhaiya, volume thoda kam karo! 🎵",
  'food': "Food counter pe milte hain! 🍽️"
}

export const GautamBot = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Check for special responses
    for (const [key, response] of Object.entries(specialResponses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }

    // If no special response, return a random response
    return botResponses[Math.floor(Math.random() * botResponses.length)]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input.trim()),
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
  }

  return (
    <section id="gautam-bot" className="section-container bg-dark/50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          🤖 GautamBot – Chat Like the Legend
        </motion.h2>

        <motion.div
          className="card h-[600px] flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.isUser
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-dark-lighter text-light rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-dark-lighter text-light rounded-lg rounded-bl-none p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="input-primary flex-1"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="btn-primary whitespace-nowrap"
              >
                Send
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default GautamBot 