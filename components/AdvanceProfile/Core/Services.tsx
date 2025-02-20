import React from 'react';

interface CTA {
  text: string;
}

interface ServicesProps {
  servicesInfo: {
    title: string;
    description: string;
    ctas: CTA[];
  };
}

const Services: React.FC<ServicesProps> = ({ servicesInfo }) => {
  if (!servicesInfo) return null; // Handle case when servicesInfo is undefined
  
  const { title, description, ctas } = servicesInfo;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black px-4 py-16">
      <div className="container mx-auto">
        <h1 className="px-4 py-0 text-5xl text-white">Services</h1>
        {/* Header Section */}
        <h2 className="mb-8 text-center text-4xl font-bold text-white">{title}</h2>
        {/* Description */}
        <p className="mb-12 text-center text-lg text-gray-300">{description}</p>
        {/* Call-to-Action Section */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {ctas.map((cta, index) => (
            <button
              key={index}
              className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
            >
              {cta.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
