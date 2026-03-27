import React from 'react';
import { motion } from 'motion/react';

interface PackageCardProps {
  name: string;
  description: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
}

export const PackageCard: React.FC<PackageCardProps> = ({ name, description, price, features, isFeatured }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={cn(
        "p-8 rounded-2xl border flex flex-col h-full transition-all",
        isFeatured ? "bg-brand-800 text-white border-brand-800 shadow-xl scale-105 z-10" : "bg-white text-brand-900 border-brand-200 shadow-sm"
      )}
    >
      <div className="mb-8">
        <h3 className="text-2xl font-serif mb-2">{name}</h3>
        <p className={cn("text-sm", isFeatured ? "text-brand-200" : "text-brand-600")}>{description}</p>
      </div>
      
      <div className="mb-8">
        <span className="text-4xl font-serif">{price}</span>
        <span className={cn("text-sm block mt-1", isFeatured ? "text-brand-300" : "text-brand-500")}>per person</span>
      </div>

      <ul className="space-y-4 mb-12 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start space-x-3 text-sm">
            <span className={cn("mt-1", isFeatured ? "text-brand-400" : "text-brand-500")}>•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={cn(
        "w-full py-3 rounded-full text-sm uppercase tracking-widest font-bold transition-all",
        isFeatured ? "bg-white text-brand-800 hover:bg-brand-50" : "bg-brand-800 text-white hover:bg-brand-900"
      )}>
        Choose Package
      </button>
    </motion.div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
