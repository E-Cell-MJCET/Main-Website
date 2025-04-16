import React from 'react';
import { motion } from 'framer-motion'; // Import framer-motion for animations

interface ContactInfo {
  email?: string;
  phone?: string;
  countryCode?: string;
  countryDialCode?: string;
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  contact_info: ContactInfo;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose,contact_info }) => {
  if (!isOpen) return null;
  const { email, phone } = contact_info;
  const phoneURL = `tel:+91${phone}`;
  const mailURL = `mailto:${email}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg rounded-lg bg-gradient-to-r from-purple-800 via-blue-800 to-teal-700 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
        initial={{ opacity: 0, scale: 0.8 }} // Initial state for animation
        animate={{ opacity: 1, scale: 1 }} // Final state for animation
        exit={{ opacity: 0, scale: 0.8 }} // State when the popup closes
        transition={{ duration: 0.3 }} // Duration of the animation
      >
        <h2 className="mb-4 text-2xl font-semibold text-gray-100">Contact Information</h2>
        <div className="space-y-4">
          {/* Email Section */}
          <div>
            <p className="font-medium text-gray-400">Email:</p>
            <p className="text-blue-500">
              <a href={mailURL} className="hover:underline">
                {email}
              </a>
            </p>
          </div>
          {/* Phone Number Section */}
          <div>
            <p className="font-medium text-gray-400">Phone:</p>
            <p className="text-blue-500">
              <a href={phoneURL} className="hover:underline">
                {phone}
              </a>
            </p>
          </div>
        </div>
        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Popup;
