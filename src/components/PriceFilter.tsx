import React from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '../utils/currency';

interface PriceFilterProps {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  min?: number;
  max?: number;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  priceRange,
  onPriceChange,
  min = 0,
  max = 30000
}) => {
  const handleMinChange = (value: number) => {
    if (value <= priceRange[1]) {
      onPriceChange([value, priceRange[1]]);
    }
  };

  const handleMaxChange = (value: number) => {
    if (value >= priceRange[0]) {
      onPriceChange([priceRange[0], value]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Price Range
      </h3>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            value={priceRange[0]}
            onChange={(e) => handleMinChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <input
            type="range"
            min={min}
            max={max}
            value={priceRange[1]}
            onChange={(e) => handleMaxChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider absolute top-0"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Min:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {formatPrice(priceRange[0])}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Max:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {formatPrice(priceRange[1])}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceFilter;