import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'Home', to: 'landing' },
  { name: 'DSA Dojo', to: 'dsa-dojo' },
  { name: 'Maths Lab', to: 'maths-lab' },
  { name: 'Roast Master', to: 'roast-master' },
  { name: 'GautamBot', to: 'gautam-bot' },
  { name: 'Wishes', to: 'birthday-wishes' },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="landing"
              spy={true}
              smooth={true}
              duration={500}
              className="text-2xl font-bold text-primary cursor-pointer"
            >
              🎂 GJ
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.to}
                    spy={true}
                    smooth={true}
                    duration={500}
                    className="text-light hover:text-primary px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors"
                    activeClass="text-primary"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-light hover:text-primary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark/95 backdrop-blur-md">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="text-light hover:text-primary block px-3 py-2 rounded-md text-base font-medium cursor-pointer transition-colors"
                  activeClass="text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar 