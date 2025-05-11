declare module './components/Navbar' {
  const Navbar: React.FC
  export default Navbar
}

declare module './components/sections/Landing' {
  const Landing: React.FC
  export default Landing
}

declare module './components/sections/DsaDojo' {
  const DsaDojo: React.FC
  export default DsaDojo
}

declare module './components/sections/MathsLab' {
  const MathsLab: React.FC
  export default MathsLab
}

declare module './components/sections/RoastMaster' {
  const RoastMaster: React.FC
  export default RoastMaster
}

declare module './components/sections/GautamBot' {
  const GautamBot: React.FC
  export default GautamBot
}

declare module './components/sections/BirthdayWishes' {
  const BirthdayWishes: React.FC
  export default BirthdayWishes
}

declare module './components/sections/BrainMode' {
  interface BrainModeProps {
    isActive: boolean
    onToggle: () => void
  }
  const BrainMode: React.FC<BrainModeProps>
  export default BrainMode
} 