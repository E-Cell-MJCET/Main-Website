import React from 'react';

// Define the types for the JSON data
type VolunteerContent = {
  title: string;
  description: string;
};

interface VolunteerProps {
  volunteerItems: VolunteerContent[]; // Array of featured items (title and description)
}

const VolunteerExperience: React.FC<VolunteerProps> = ({ volunteerItems }) => {
  return (
    <div className="bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-semibold text-gray-900">Volunteer Experience</h2>
        {volunteerItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {volunteerItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl"
              >
                <h3 className="mb-4 text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="mb-6 text-gray-600">{item.description}</p>
                <a
                  href="#"
                  className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-center text-gray-500">No featured content available.</p>
        )}
      </div>
    </div>
  );
};

export default VolunteerExperience;
