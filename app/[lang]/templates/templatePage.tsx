'use client';
import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const templates = [
  {
    id: 'test-001',
    name: 'Test 001',
    description: 'Template moderne et professionnel avec barre latérale personnalisable',
    color: 'bg-gray-50',
  }
];

export default function Templates() {
    // const router = useRouter();

  // const selectTemplate = (templateId: string) => {
  //   router.push(`/create?template=${templateId}`);
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-16"
    >
      {/* Rest of your Templates component content */}
    </motion.div>
  );
}