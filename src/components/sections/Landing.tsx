import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'

const Landing = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
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

    // Party popper class
    class Popper {
      x: number = 0
      y: number = 0
      size: number = 0
      color: string = ''
      speed: number = 0
      angle: number = 0
      rotationSpeed: number = 0
      opacity: number = 1
      type: 'confetti' | 'sparkle' = 'confetti'

      constructor() {
        if (!canvas) return
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 20
        this.size = 4 + Math.random() * 4
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`
        this.speed = 2 + Math.random() * 3
        this.angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 3
        this.rotationSpeed = (Math.random() - 0.5) * 0.2
        this.type = Math.random() > 0.5 ? 'confetti' : 'sparkle'
      }

      update() {
        if (!canvas) return
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed + 0.5 // Add gravity
        this.angle += this.rotationSpeed
        this.opacity -= 0.005

        if (this.y > canvas.height || this.opacity <= 0) {
          this.y = canvas.height + 20
          this.x = Math.random() * canvas.width
          this.opacity = 1
          this.angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 3
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.globalAlpha = this.opacity

        if (this.type === 'confetti') {
          ctx.fillStyle = this.color
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
        } else {
          // Draw sparkle
          ctx.beginPath()
          ctx.moveTo(0, -this.size)
          ctx.lineTo(this.size / 2, 0)
          ctx.lineTo(0, this.size)
          ctx.lineTo(-this.size / 2, 0)
          ctx.closePath()
          ctx.fillStyle = this.color
          ctx.fill()
        }

        ctx.restore()
      }
    }

    // Create poppers
    const poppers: Popper[] = Array.from({ length: 50 }, () => new Popper())

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      poppers.forEach(popper => {
        popper.update()
        popper.draw(ctx)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <section id="landing" className="section-container relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-dark via-dark-lighter to-dark">
      {/* Background canvas for party poppers */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-transparent to-dark/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Enhanced Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 0.8, 
              type: "spring",
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative"
          >
            <div className="gradient-border p-1 rounded-full shadow-glow-lg relative">
              {/* Floating particles around the image */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-primary/30"
                    style={{
                      left: `${50 + 45 * Math.cos(i * Math.PI / 4)}%`,
                      top: `${50 + 45 * Math.sin(i * Math.PI / 4)}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>

              <div className="relative w-72 h-72 rounded-full overflow-hidden">
                <img
                  src="/images/gautam-profile.jpg"
                  alt="Gautam Jain"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
              </div>
            </div>

            {/* Enhanced decorative elements */}
            <motion.div
              className="absolute -top-12 -right-12 text-7xl"
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
                y: [0, -15, 0]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear",
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              🎈
            </motion.div>
            <motion.div
              className="absolute -bottom-12 -left-12 text-7xl"
              animate={{ 
                rotate: -360,
                scale: [1, 1.2, 1],
                y: [0, -15, 0]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear",
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }
              }}
            >
              🎈
            </motion.div>
            <motion.div
              className="absolute top-1/4 -right-16 text-6xl"
              animate={{ 
                rotate: [0, 15, 0, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              🎯
            </motion.div>
            <motion.div
              className="absolute bottom-1/4 -left-16 text-6xl"
              animate={{ 
                rotate: [0, -15, 0, 15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              🧮
            </motion.div>
            <motion.div
              className="absolute -top-8 left-1/4 text-6xl"
              animate={{ 
                rotate: [0, 15, 0, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.2
              }}
            >
              💻
            </motion.div>
            <motion.div
              className="absolute -bottom-8 right-1/4 text-6xl"
              animate={{ 
                rotate: [0, -15, 0, 15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.7
              }}
            >
              🔥
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="gradient-text animate-gradient-x">Happy Birthday</span>
                <br />
                <span className="text-light drop-shadow-glow">Gautam Jain</span>
              </h1>

              <p className="text-3xl md:text-4xl text-light/90 space-y-3 font-medium">
                <span className="block animate-float">DSA King 👑</span>
                <span className="block animate-float" style={{ animationDelay: '0.2s' }}>Maths Genius 🧮</span>
                <span className="block animate-float" style={{ animationDelay: '0.4s' }}>Roast Legend 🔥</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="dsa-dojo"
                    spy={true}
                    smooth={true}
                    duration={500}
                    className="btn-primary shine-effect text-xl px-8 py-4"
                  >
                    Enter the Dojo
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 text-8xl opacity-20"
          animate={{ 
            rotate: 360, 
            scale: [1, 1.2, 1],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear",
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          🎂
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 right-1/4 text-8xl opacity-20"
          animate={{ 
            rotate: -360, 
            scale: [1, 1.2, 1],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear",
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }
          }}
        >
          🎁
        </motion.div>
      </div>
    </section>
  )
}

export default Landing 