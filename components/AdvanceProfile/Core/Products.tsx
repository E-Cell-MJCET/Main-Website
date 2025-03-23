/* eslint-disable tailwindcss/migration-from-tailwind-2 */
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { getProductThemeStyles } from '../Themes/Product.theme';

// Match Step13 data structure exactly
type Product = {
  name: string;
  description: string;
  features: string;
  price: string;
  image: string; // Base64 or URL
  productLink: string;
};

// Updated props interface to include theme
interface ProductsProps {
  products: Product[];
  theme?: string; // Optional theme parameter
}

const Products: React.FC<ProductsProps> = ({ 
  products = [],
  theme = "Default" // Default theme if none provided
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Get theme styles
  const styles = getProductThemeStyles(theme);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };
  
  // Handler for opening/closing product detail
  const toggleProductDetail = (product: Product | null) => {
    setSelectedProduct(product);
  };
  
  return (
    <div className={`${styles.container} ${styles.backgroundGradient}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute left-1/4 top-20 size-64 rounded-full ${styles.decorativeElement1}`}></div>
        <div className={`absolute right-1/4 top-60 size-80 rounded-full ${styles.decorativeElement2}`}></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className={`mb-4 ${styles.mainHeading} text-4xl font-bold md:text-5xl`}>
            My Products
          </h2>
          {products.length > 0 ? (
            <p className={`mx-auto max-w-2xl ${styles.mainDescription}`}>
              Explore our collection of premium products and solutions designed to meet your needs.
            </p>
          ) : (
            <p className={`mx-auto max-w-2xl ${styles.mainDescription}`}>
              No products have been added yet.
            </p>
          )}
        </motion.div>
        {products.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex h-48 items-center justify-center rounded-lg ${styles.emptyContainer} text-center ${styles.emptyText}`}
          >
            <p>No products to display yet. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid ${styles.cardContainer}`}
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`group flex h-full flex-col overflow-hidden rounded-xl ${styles.card} shadow-xl backdrop-blur-sm transition-all duration-300`}
              >
                {/* Product Image */}
                <div className="relative h-52 overflow-hidden">
                  {product.image ? (
                    <>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className={`absolute inset-0 ${styles.cardImageOverlay} opacity-60`}></div>
                    </>
                  ) : (
                    <div className={`flex size-full items-center justify-center ${styles.cardPlaceholderBg}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`size-16 ${styles.cardPlaceholderIcon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                  {/* Price Tag */}
                  <div className={`absolute right-3 top-3 rounded-full ${styles.cardPriceTag} px-3 py-1 text-sm font-bold ${styles.cardPriceText} shadow-lg`}>
                    {product.price}
                  </div>
                </div>
                {/* Product Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className={`mb-2 text-xl font-bold ${styles.cardTitle} ${styles.cardTitleHover} md:text-2xl`}>
                    {product.name}
                  </h3>
                  <p className={`mb-4 line-clamp-2 flex-1 text-sm ${styles.cardDescription}`}>
                    {product.description}
                  </p>
                  {/* Action Buttons */}
                  <div className="mt-auto flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={() => toggleProductDetail(product)}
                      className={`rounded-lg ${styles.detailsButton} px-4 py-2 text-sm font-medium transition-colors ${styles.detailsButtonHover}`}
                    >
                      Details
                    </button>
                    <a
                      href={product.productLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center rounded-lg ${styles.purchaseButton} px-4 py-2 text-sm font-medium transition-all ${styles.purchaseButtonHover}`}
                    >
                      Purchase Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${styles.modalOverlay}`}
            onClick={() => toggleProductDetail(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-xl ${styles.modalContainer} shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={() => toggleProductDetail(null)}
                className={`absolute right-4 top-4 z-10 rounded-full ${styles.closeButton} p-2 ${styles.closeButtonHover}`}
                aria-label="Close details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex flex-col lg:flex-row">
                {/* Product Image */}
                <div className="relative h-64 w-full lg:h-auto lg:w-1/2">
                  {selectedProduct.image ? (
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className={`flex size-full items-center justify-center ${styles.modalPlaceholderBg}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`size-24 ${styles.modalPlaceholderIcon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Product Details */}
                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-2xl font-bold ${styles.modalTitle} md:text-3xl`}>
                      {selectedProduct.name}
                    </h3>
                    <span className={`rounded-lg ${styles.modalPrice} px-4 py-1 text-lg font-bold ${styles.modalPriceText}`}>
                      {selectedProduct.price}
                    </span>
                  </div>
                  <div className="mt-6">
                    <h4 className={`mb-2 text-sm font-semibold uppercase tracking-wider ${styles.modalSectionTitle}`}>Description</h4>
                    <p className={`mb-6 ${styles.modalDescription}`}>
                      {selectedProduct.description}
                    </p>
                    <h4 className={`mb-2 text-sm font-semibold uppercase tracking-wider ${styles.modalSectionTitle}`}>Features</h4>
                    <div className={`mb-6 rounded-lg ${styles.modalFeaturesBox} p-4`}>
                      <p className={`whitespace-pre-line ${styles.modalFeatures}`}>
                        {selectedProduct.features}
                      </p>
                    </div>
                    {/* Purchase Button */}
                    <a
                      href={selectedProduct.productLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-auto flex w-full items-center justify-center rounded-lg ${styles.modalPurchaseButton} px-6 py-3 font-bold transition-all ${styles.modalPurchaseButtonHover}`}
                    >
                      Purchase for {selectedProduct.price}
                      <svg className="ml-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;