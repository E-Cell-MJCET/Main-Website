import Image from 'next/image';
import React from 'react';

// Define types for the data structure
type License = {
  title: string;
  description: string;
  image: string;
};

type Certification = {
  title: string;
  description: string;
  image: string;
};

type LicensesInfo = {
  licenses: License[];
  certifications: Certification[];
};

// Define props type for the component
interface LicencesCertificationsProps {
  Licenses_info: LicensesInfo;
}

const LicencesCertifications: React.FC<LicencesCertificationsProps> = ({ Licenses_info }) => {
  const { licenses, certifications } = Licenses_info;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12">
      {/* Licenses Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-4xl font-bold text-blue-800">Licenses</h2>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {licenses.map((license, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  width={500}
                  height={300}
                  src={license.image}
                  alt={license.title}
                  className="h-48 w-full object-cover"
                />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-gray-900">{license.title}</h3>
              <p className="mt-4 text-gray-600">{license.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Certifications Section */}
      <section>
        <h2 className="mb-8 text-center text-4xl font-bold text-green-800">Certifications</h2>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certification, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  width={500}
                  height={300}
                  src={certification.image}
                  alt={certification.title}
                  className="h-48 w-full object-cover"
                />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-gray-900">{certification.title}</h3>
              <p className="mt-4 text-gray-600">{certification.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LicencesCertifications;