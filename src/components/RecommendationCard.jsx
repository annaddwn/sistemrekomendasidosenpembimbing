import React from 'react';

const RecommendationCard = ({ type, name, repo, title, lecturer, relatedCourses }) => {
  const isEmptyLecturer = type === 'lecturer' && (!name || name === '');

  // Komponen untuk Empty State
  const EmptyState = () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <svg 
        className="w-14 h-14 text-gray-400 mb-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-700 mb-2">
        Tidak ada data dosen
      </h3>
      <p className="text-sm text-gray-500 max-w-xs">
        Belum tersedia rekomendasi dosen untuk kategori ini
      </p>
    </div>
  );

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
    <div className={`
      bg-white rounded-lg shadow-md border border-gray-200
      transition-all duration-200 overflow-hidden flex
      ${isEmptyLecturer ? 'justify-center items-center h-64 w-full' : 'flex-col h-full'}
    `}>
      {isEmptyLecturer ? <EmptyState /> : (type === 'lecturer' ? <LecturerCard /> : <ThesisCard />)}
    </div>
  );
};

export default RecommendationCard;
