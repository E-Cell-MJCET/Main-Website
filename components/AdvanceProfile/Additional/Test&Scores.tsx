import React from 'react';

// Define the types for the JSON data
type TestScoresContent = {
  title: string;
  score: string;
  description: string;
};

interface TestScoreProps {
  TestScores: TestScoresContent[]; // Array of featured items (title and description)
}

const TestScores: React.FC<TestScoreProps> = ({ TestScores }) => {
  console.log("testscores", TestScores)

  return (
    <div className="bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-semibold text-gray-900">Test Scores</h2>
        {TestScores.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TestScores.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl"
              >
                <h3 className="mb-4 text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="mb-6 text-gray-600">{item.score}</p>
                <p className="mb-6 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-center text-gray-500">No Test Score content available.</p>
        )}
      </div>
    </div>
  );
};

export default TestScores;
