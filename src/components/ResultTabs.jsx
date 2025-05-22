import { useState } from 'react';
import RecommendationCard from './RecommendationCard';


const categoryDescriptions = {
  SIS: {
    title: "Skyband Inverse Skyband View (SIS)",
    description: [
      "Syarat Hasil SIS:",
      "1. Mahasiswa harus termasuk dalam skyband/terbaik berdasarkan prestasi akademik",
      "2. Dosen juga harus termasuk dalam skyband/terbaik berdasarkan rata-rata lama bimgbingan, index scholar, dan banyaknya mahasiswa bimbingan",
      "",
      "Penyebab Tidak Ada Hasil:",
      "1. Tidak ada dosen terbaik yang menarik bagi mahasiswa",
      "2. Mahasiswa tersebut tidak memenuhi kriteria skyband/terbaik",
    ].join('\n')
  },
  SMV: {
    title: "Skyband Mutual View (SMV)",
    description: [
      "Syarat Hasil SMV:",
      "1. Mahasiswa tertarik pada dosen tersebut",
      "2. Dosen harus termasuk dalam skyband/terbaik berdasarkan rata-rata lama bimgbingan, index scholar, dan banyaknya mahasiswa bimbingan",
      "3. Dosen juga tertarik pada mahasiswa (Hubungan timbal balik)", 
    ].join('\n')
  },
  Rsky: {
    title: "Kueri Reciprocal Skyband (Rsky)",
    description: [
      "Syarat Hasil Rsky:",
      "1. Mahasiswa tertarik pada dosen tersebut",
      "2. Dosen harus termasuk dalam skyband/terbaik berdasarkan rata-rata lama bimgbingan, index scholar, dan banyaknya mahasiswa bimbingan",
    ].join('\n')
  }
};


const ResultTabs = ({ results = {} }) => {
  const [activeTab, setActiveTab] = useState('SIS');

  const tabs = [
    { id: 'SIS', label: 'Dosen SIS' },
    { id: 'SMV', label: 'Dosen SMV' },
    { id: 'Rsky', label: 'Dosen Rsky' },
    { id: 'thesisRecommendations', label: 'Rekomendasi TA' },
  ];

  const isEmpty = (tabId) => {
    return !(results?.[tabId]?.length > 0);
  };


  return (
    <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium text-sm focus:outline-none transition-colors relative ${
              activeTab === tab.id
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.label}
            {isEmpty(tab.id) && tab.id !== 'thesisRecommendations' && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
      
      <div className="p-6">
        {categoryDescriptions[activeTab] && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start">
            <div>
              <h3 className="text-lg font-semibold text-blue-800">{categoryDescriptions[activeTab].title}</h3>
              <p className="text-blue-700 mt-1 whitespace-pre-line">{categoryDescriptions[activeTab].description}</p>
            </div>
          </div>
        )}

        {activeTab !== 'thesisRecommendations' ? (
          <div className="grid md:grid-cols-2 gap-6">
            {results?.[activeTab]?.map((lecturer, index) => (
              <RecommendationCard 
                key={`${activeTab}-${index}`}
                type="lecturer"
                name={lecturer.name}
                repo={lecturer.repo}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Rekomendasi Tugas Akhir</h3>
              <p className="text-green-700 mt-1">Berikut adalah rekomendasi judul tugas akhir terdahulu</p>
            </div>

            <div className="space-y-6">
              {results?.thesisRecommendations?.map((recommendation, recIndex) => (
                <div key={`rec-${recIndex}`} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      {recIndex + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{recommendation.lecturer}</h3>
                  </div>
                  
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Rekomendasi Judul Tugas Akhir:</h4>
                    <div className="space-y-3">
                      {recommendation.titles?.map((title, titleIndex) => (
                        <div key={`title-${titleIndex}`} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="font-medium text-gray-800">{title}</p>
                        </div>
                      ))}
                    </div>
                    
                    <h4 className="text-sm font-medium text-gray-500 mb-2 mt-4">Mata Kuliah Terkait:</h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.courses?.map((course, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{course}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultTabs;