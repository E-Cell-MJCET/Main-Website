// ExperienceProps defines the JSON input structure
import Image from 'next/image';

// Interfaces and Types
interface Role {
  title: string;
  startDate: string;
  endDate: string | null;
  duration: string;
  responsibilities: string[];
}

interface Company {
  company_name: string;
  location: string;
  logo?: string;
  roles: Role[];
}

interface ExperienceProps {
  experienceData: Company[];
}

const AdvExperience: React.FC<ExperienceProps> = ({ experienceData }) => {
  return (
    <div className="w-5/6 rounded-2xl bg-gray-200 p-6 md:w-2/3">
      <h1 className="mb-4 text-2xl font-bold">Experience</h1>
      <div>
        {experienceData.map((company, index) => (
          <div key={index} className="mb-8">
            {/* Company Header */}
            <div className="mb-4 flex items-center">
              {company.logo && (
                <Image
                  src={company.logo}
                  alt={company.company_name}
                  className="mr-4 rounded-md"
                  width={50}
                  height={50}
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{company.company_name}</h2>
                <p className="text-gray-600">{company.location}</p>
              </div>
            </div>
            {/* Roles within the Company */}
            {company.roles.map((role, roleIndex) => (
              <div key={roleIndex} className="mb-4 ml-4">
                <h3 className="text-lg font-medium">{role.title}</h3>
                <p className="text-gray-500">
                  {role.startDate} - {role.endDate ? role.endDate : "Present"} (
                  {role.duration})
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  {role.responsibilities.map((task, taskIndex) => (
                    <li key={taskIndex}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
            {/* Separator for Multiple Companies */}
            {index < experienceData.length - 1 && (
              <hr className="my-6 border-gray-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvExperience;
