import React from 'react';

const RecommendationCard = ({ type, name, repo, title, lecturer, relatedCourses }) => {
  // Jika tipe lecturer dan name kosong, return null
  if (type === 'lecturer' && (!name || name.trim() === '')) {
    return null;
  }

  // Jika tipe thesis dan title kosong, return null
  if (type !== 'lecturer' && (!title || title.trim() === '')) {
    return null;
  }

  // Komponen untuk Lecturer Card
  const LecturerCard = () => (
    <div className="p-6 flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {name}
        </h3>
        <div className="flex items-center text-gray-600 mb-4">
          <span>Dosen Pembimbing</span>
        </div>
      </div>
      <a
        href={repo || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
      >
        Lihat Repository IPB
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );

  // Komponen untuk Thesis Card
  const ThesisCard = () => (
    <div className="p-6 flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-indigo-700 mb-2">
          {title}
        </h3>
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Dosen Pembimbing: {lecturer}</span>
        </div>
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Mata Kuliah Terkait:</h4>
          <div className="flex flex-wrap gap-2">
            {relatedCourses?.map((course, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 transition-all duration-200 overflow-hidden flex flex-col h-full">
      {type === 'lecturer' ? <LecturerCard /> : <ThesisCard />}
    </div>
  );
};

export default RecommendationCard;
