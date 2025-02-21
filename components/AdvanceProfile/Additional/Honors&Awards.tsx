import Image from 'next/image';
import React from 'react';

// Define types for the data structure
type Honors = {
  title: string;
  description: string;
  image: string;
};

type Awards = {
  title: string;
  description: string;
  image: string;
};

type HonorsAwardsInfo = {
  Honors: Honors[];
  Awards: Awards[];
};

// Define props type for the component
interface HonorsAwardsProps {
  HonorsAwards_info: HonorsAwardsInfo;
}

const HonorsAwards: React.FC<HonorsAwardsProps> = ({ HonorsAwards_info }) => {
  const { Honors = [], Awards = [] } = HonorsAwards_info || {};
  console.log("honor",HonorsAwards_info)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12">
      {/* Licenses Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-4xl font-bold text-blue-800">Honors</h2>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {Honors.map((Honor, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  width={500}
                  height={300}
                  src={Honor.image}
                  alt={Honor.title}
                  className="h-48 w-full object-cover"
                />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-gray-900">{Honor.title}</h3>
              <p className="mt-4 text-gray-600">{Honor.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Certifications Section */}
      <section>
        <h2 className="mb-8 text-center text-4xl font-bold text-green-800">Awards</h2>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {Awards.map((Award, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  width={500}
                  height={300}
                  src={Award.image}
                  alt={Award.title}
                  className="h-48 w-full object-cover"
                />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-gray-900">{Award.title}</h3>
              <p className="mt-4 text-gray-600">{Award.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HonorsAwards;