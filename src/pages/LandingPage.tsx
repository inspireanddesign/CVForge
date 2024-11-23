import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';

export default function LandingPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
    </motion.main>
  );
}