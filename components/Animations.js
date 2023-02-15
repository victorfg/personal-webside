import { usePresence, motion } from "framer-motion";

const transitionEaseInOut = { ease: "easeInOut", duration: 0.4 }

export const ListItem = ({children}) => {
  const [isPresent, safeToRemove] = usePresence()

  const animations = {
    layout: true,
    initial: 'out',
    style: {
      position: isPresent ? 'static' : 'absolute'
    },
    animate: isPresent ? 'in' : 'out',
    whileTap: 'tapped',
    variants: {
      in: { scaleY: 1, opacity: 1 },
      out: { scaleY: 0, opacity: 0, zIndex: -1 },
      tapped: { scale: 0.98, opacity: 0.5, transition: { duration: 2.5 } }
    },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition:transitionEaseInOut
  }

  return (
    <motion.h2 {...animations}>
      {children}
    </motion.h2>
  )
}