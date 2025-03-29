"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Trash2, DollarSign, Link2, Upload, X } from "lucide-react";
import Image from 'next/image';

// Define types for the data structure
type Product = {
  name: string;
  description: string;
  features: string;
  price: string;
  image: string; // Will store image as base64 string
  productLink: string;
};

type Service = {
  name: string;
  description: string;
  specialties: string;
  pricing: string;
};

const Step13Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  // State for products and services
  const [products, setProducts] = useState<Product[]>([
    { name: "", description: "", features: "", price: "", image: "", productLink: "" }
  ]);
  
  const [services, setServices] = useState<Service[]>([
    { name: "", description: "", specialties: "", pricing: "" }
  ]);

  // References to file inputs for products
  const productFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      const savedProducts = localStorage.getItem(`${sessionId}_products`);
      const savedServices = localStorage.getItem(`${sessionId}_services`);
      
      if (savedProducts && savedProducts !== "[]") {
        setProducts(JSON.parse(savedProducts));
      }
      
      if (savedServices && savedServices !== "[]") {
        setServices(JSON.parse(savedServices));
      }
    }
  }, []);

  // Update file input refs when arrays change
  useEffect(() => {
    productFileInputRefs.current = productFileInputRefs.current.slice(0, products.length);
  }, [products.length]);

  // Add a new product
  const handleAddProduct = () => {
    setProducts([...products, { name: "", description: "", features: "", price: "", image: "", productLink: "" }]);
  };

  // Update a product
  const handleProductChange = (index: number, field: keyof Product, value: string) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
  };

  // Remove a product
  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };
  
  // Add a new service
  const handleAddService = () => {
    setServices([...services, { name: "", description: "", specialties: "", pricing: "" }]);
  };

  // Update a service
  const handleServiceChange = (index: number, field: keyof Service, value: string) => {
    const updatedServices = services.map((service, i) =>
      i === index ? { ...service, [field]: value } : service
    );
    setServices(updatedServices);
  };

  // Remove a service
  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  // Convert file to base64 string
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle product image upload
  const handleProductImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is an image
      if (!file.type.match('image.*')) {
        alert('Please select an image file');
        
        return;
      }
      
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should not exceed 2MB');
        
        return;
      }
      
      try {
        const base64Image = await convertToBase64(file);
        handleProductChange(index, "image", base64Image);
      } catch (error) {
        console.error('Error converting product image:', error);
        alert('Failed to process image');
      }
    }
  };

  // Trigger product file input click
  const triggerProductFileInput = (index: number) => {
    if (productFileInputRefs.current[index]) {
      productFileInputRefs.current[index]?.click();
    }
  };

  // Clear product image
  const clearProductImage = (index: number) => {
    handleProductChange(index, "image", "");
    // Reset file input
    if (productFileInputRefs.current[index]) {
      productFileInputRefs.current[index]!.value = "";
    }
  };

  // Handle next button click
  const handleNext = () => {
    // Filter out completely empty product entries
    const validProducts = products.filter(
      product => product.name || product.description || product.features || 
                 product.price || product.image || product.productLink
    );
    
    // Filter out completely empty service entries
    const validServices = services.filter(
      service => service.name || service.description || service.specialties || 
                 service.pricing
    );
    
    console.log("Products:", validProducts);
    console.log("Services:", validServices);
    
    // Save to localStorage
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      localStorage.setItem(`${sessionId}_products`, JSON.stringify(validProducts));
      localStorage.setItem(`${sessionId}_services`, JSON.stringify(validServices));
    }
    
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Products & Services
        </h2>
        {/* Products Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">Your Products</h3>
          <p className="mb-4 text-gray-600">Showcase products you`ve created or been involved in developing.</p>
          {products.map((product, index) => (
            <div key={`product-${index}`} className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, "name", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                />
                <button 
                  type="button"
                  onClick={() => handleRemoveProduct(index)} 
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label="Remove product"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <textarea
                placeholder="Brief description of your product"
                value={product.description}
                onChange={(e) => handleProductChange(index, "description", e.target.value)}
                className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                rows={2}
              />
              <textarea
                placeholder="Key features or highlights (separate with commas)"
                value={product.features}
                onChange={(e) => handleProductChange(index, "features", e.target.value)}
                className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                rows={2}
              />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <DollarSign size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Price (optional)"
                    value={product.price}
                    onChange={(e) => handleProductChange(index, "price", e.target.value)}
                    className="mb-2 w-full rounded-lg border border-gray-300 p-3 pl-10"
                  />
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Link2 size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Product Link (optional)"
                    value={product.productLink}
                    onChange={(e) => handleProductChange(index, "productLink", e.target.value)}
                    className="mb-2 w-full rounded-lg border border-gray-300 p-3 pl-10"
                  />
                </div>
              </div>
              {/* Product Image Input Section */}
              <div className="mb-2 mt-3">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Image (Optional)
                </label>
                {/* Product Image Preview */}
                {product.image ? (
                  <div className="mt-3 rounded-lg border border-gray-200 p-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">Image Preview</h4>
                      <button 
                        type="button"
                        onClick={() => clearProductImage(index)}
                        className="rounded p-1 text-red-500 hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="mt-2 flex justify-center overflow-hidden rounded-lg">
                      <Image  
                        width={500}
                        height={500} 
                        src={product.image} 
                        alt={product.name || "Product image"} 
                        className="max-h-48 object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  /* No Image Placeholder - Clickable Upload Area */
                  <div 
                    className="mt-3 flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                    onClick={() => triggerProductFileInput(index)}
                  >
                    <Upload size={36} className="mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Click to upload product image</p>
                    <p className="mt-1 text-xs text-gray-400">Max size: 2MB</p>
                  </div>
                )}
                {/* Hidden file input for product */}
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => {
                    productFileInputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleProductImageUpload(index, e)}
                  className="hidden"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProduct}
            className="flex items-center rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white hover:bg-emerald-600"
          >
            <Trash2 size={20} className="mr-2" />
            Add Another Product
          </button>
        </div>
        {/* Services Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">Your Services</h3>
          <p className="mb-4 text-gray-600">Describe professional services you offer or specialize in.</p>
          {services.map((service, index) => (
            <div key={`service-${index}`} className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={service.name}
                  onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                />
                <button 
                  type="button"
                  onClick={() => handleRemoveService(index)} 
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label="Remove service"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <textarea
                placeholder="Description of your service and what clients can expect"
                value={service.description}
                onChange={(e) => handleServiceChange(index, "description", e.target.value)}
                className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                rows={3}
              />
              <textarea
                placeholder="Areas of specialization or expertise (separate with commas)"
                value={service.specialties}
                onChange={(e) => handleServiceChange(index, "specialties", e.target.value)}
                className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                rows={2}
              />
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSign size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Pricing/Rate (optional)"
                  value={service.pricing}
                  onChange={(e) => handleServiceChange(index, "pricing", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3 pl-10"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddService}
            className="flex items-center rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white hover:bg-teal-600"
          >
            <Trash2 size={20} className="mr-2" />
            Add Another Service
          </button>
        </div>
        {/* Preview Section */}
        {(products.some(p => p.name || p.description || p.image) || services.some(s => s.name || s.description)) && (
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Preview</h3>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              {/* Products Preview */}
              {products.some(p => p.name || p.description || p.image) && (
                <div className="mb-6">
                  <h4 className="mb-3 text-lg font-medium text-emerald-700">Products</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {products.filter(p => p.name || p.description || p.image).map((product, index) => (
                      <div key={`preview-product-${index}`} className="flex flex-col rounded-lg bg-white p-4 shadow-md">
                        {product.image && (
                          <div className="mb-3 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200">
                            <Image
                              width={500}
                              height={500} 
                              src={product.image} 
                              alt={product.name || "Product"} 
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        )}
                        <h5 className="mb-2 text-lg font-semibold text-gray-800">{product.name || "Untitled Product"}</h5>
                        {product.description && (
                          <p className="mb-2 text-sm text-gray-600">{product.description}</p>
                        )}
                        {product.features && (
                          <div className="mb-2">
                            <span className="text-xs font-medium text-gray-500">Features:</span>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {product.features.split(',').map((feature, i) => (
                                <span key={i} className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                                  {feature.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="mt-auto flex justify-between pt-2">
                          {product.price && (
                            <span className="font-medium text-emerald-600">{product.price}</span>
                          )}
                          {product.productLink && (
                            <a href={product.productLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-500 hover:text-blue-700">
                              View Product
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Services Preview */}
              {services.some(s => s.name || s.description) && (
                <div>
                  <h4 className="mb-3 text-lg font-medium text-teal-700">Services</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {services.filter(s => s.name || s.description).map((service, index) => (
                      <div key={`preview-service-${index}`} className="flex flex-col rounded-lg bg-white p-4 shadow-md">
                        <h5 className="mb-2 text-lg font-semibold text-gray-800">{service.name || "Untitled Service"}</h5>
                        {service.description && (
                          <p className="mb-2 text-sm text-gray-600">{service.description}</p>
                        )}
                        {service.specialties && (
                          <div className="mb-2">
                            <span className="text-xs font-medium text-gray-500">Specialties:</span>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {service.specialties.split(',').map((specialty, i) => (
                                <span key={i} className="rounded-full bg-teal-100 px-2 py-1 text-xs text-teal-700">
                                  {specialty.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {service.pricing && (
                          <div className="mt-auto pt-2">
                            <span className="font-medium text-teal-600">{service.pricing}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrevious}
            className="rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-400"
            type="button"
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white hover:bg-teal-600"
            type="button"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step13Welcome;