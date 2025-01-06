// EducationProps defines the JSON input structure
import Image from 'next/image';

// Interfaces and Types
interface Education {
  degree: string;
  field_of_study: string;
  institution_name: string;
  start_date: string;
  end_date: string | null;
  skills: string[];
  logo?: string;
}

interface EducationProps {
  educationData: Education[];
}

const AdvEducation: React.FC<EducationProps> = ({ educationData }) => {
  return (
    <div className="w-5/6 rounded-2xl bg-gray-200 p-6 md:w-2/3">
      <h1 className="mb-4 text-2xl font-bold">Education</h1>
      <div>
        {educationData.map((education, index) => (
          <div key={index} className="mb-8">
            {/* Institution Header */}
            <div className="mb-4 flex items-center">
              {education.logo && (
                <Image
                  src={education.logo}
                  alt={education.institution_name}
                  className="mr-4 rounded-md"
                  width={50}
                  height={50}
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{education.institution_name}</h2>
              </div>
            </div>
            {/* Degree, Field of Study, and Duration */}
            <div className="mb-4 ml-4">
              <h3 className="text-lg font-medium">
                {education.degree} - {education.field_of_study}
              </h3>
              <p className="text-gray-500">
                {education.start_date} - {education.end_date ? education.end_date : "Present"}
              </p>
              {/* Skills/Highlights */}
              {education.skills.length > 0 && (
                <ul className="list-disc pl-5 text-gray-600">
                  {education.skills.map((skill, skillIndex) => (
                    <li key={skillIndex}>{skill}</li>
                  ))}
                </ul>
              )}
            </div>
            {/* Separator for Multiple Entries */}
            {index < educationData.length - 1 && (
              <hr className="my-6 border-gray-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvEducation;
