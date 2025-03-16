"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Trash2, DollarSign, Link2 } from "lucide-react";
import Image from 'next/image';

// Define types for the data structure
type Product = {
  name: string;
  description: string;
  features: string;
  price: string;
  imageUrl: string;
  productLink: string;
};

type Service = {
  name: string;
  description: string;
  specialties: string;
  pricing: string;
  imageUrl: string;
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
    { name: "", description: "", features: "", price: "", imageUrl: "", productLink: "" }
  ]);
  
  const [services, setServices] = useState<Service[]>([
    { name: "", description: "", specialties: "", pricing: "", imageUrl: "" }
  ]);

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

  // Add a new product
  const handleAddProduct = () => {
    setProducts([...products, { name: "", description: "", features: "", price: "", imageUrl: "", productLink: "" }]);
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
    setServices([...services, { name: "", description: "", specialties: "", pricing: "", imageUrl: "" }]);
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

  // Handle next button click
  const handleNext = () => {
    // Filter out completely empty product entries
    const validProducts = products.filter(
      product => product.name || product.description || product.features || 
                 product.price || product.imageUrl || product.productLink
    );
    
    // Filter out completely empty service entries
    const validServices = services.filter(
      service => service.name || service.description || service.specialties || 
                 service.pricing || service.imageUrl
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-emerald-50 to-teal-100 p-4">
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
              <input
                type="text"
                placeholder="Image URL (optional)"
                value={product.imageUrl}
                onChange={(e) => handleProductChange(index, "imageUrl", e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
          ))}
          <button
            onClick={handleAddProduct}
            className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white hover:bg-emerald-600"
          >
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
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  value={service.imageUrl}
                  onChange={(e) => handleServiceChange(index, "imageUrl", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                />
              </div>
            </div>
          ))}
          <button
            onClick={handleAddService}
            className="rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white hover:bg-teal-600"
          >
            Add Another Service
          </button>
        </div>
        {/* Preview Section */}
        {(products.some(p => p.name || p.description) || services.some(s => s.name || s.description)) && (
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Preview</h3>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              {/* Products Preview */}
              {products.some(p => p.name || p.description) && (
                <div className="mb-6">
                  <h4 className="mb-3 text-lg font-medium text-emerald-700">Products</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {products.filter(p => p.name || p.description).map((product, index) => (
                      <div key={`preview-product-${index}`} className="flex flex-col rounded-lg bg-white p-4 shadow-md">
                        {product.imageUrl && (
                          <div className="mb-3 h-40 w-full overflow-hidden rounded-lg bg-gray-200">
                            <Image 
                              width={500}
                              height={500}
                              src={product.imageUrl} 
                              alt={product.name || "Product"} 
                              className="size-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=Product+Image";
                              }}
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
                        {service.imageUrl && (
                          <div className="mb-3 h-40 w-full overflow-hidden rounded-lg bg-gray-200">
                            <Image
                              width={500}
                              height={500} 
                              src={service.imageUrl} 
                              alt={service.name || "Service"} 
                              className="size-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=Service+Image";
                              }}
                            />
                          </div>
                        )}
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
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white hover:bg-teal-600"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step13Welcome;