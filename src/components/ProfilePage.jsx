import React, { useState } from 'react';
import { FaBookmark } from 'react-icons/fa'

const ProfilePage = () => {
    // Example profiles data
    const profiles = [
        {
            name: "Annisa",
            university: "IPB University (Bogor Agricultural University)",
            expertise: ["Data Mining", "Skyline Query", "Data Management"],
            image: "https://via.placeholder.com/150",
            articles: [
                {
                    title: "Spatial decision tree model for garlic land suitability evaluation",
                    authors: "A Nurhakim, SS Isma, Annisa, A Sobri",
                    journal: "IAES International Journal of Artificial Intelligence 10 (1), 66",
                    citedBy: 34,
                    year: 2021,
                },
                {
                    title: "Sequential pattern mining on library transaction data",
                    authors: "BS Setiyawan, MF Hiday, A Agusman, H Marthana",
                    journal: "International Symposium on Information Technology 1, 1-4",
                    citedBy: 26,
                    year: 2016,
                },
                {
                    title: "Area Skyline Query for Selecting Good Locations in a Map",
                    authors: "Annisa, A Zamzam, Y Morimoto",
                    journal: "Journal of Information Processing 24 (6), 946-955",
                    citedBy: 25,
                    year: 2016,
                },
            ],
        },
        {
            name: "Dean Apriana Ramadhan",
            university: "IPB University (Bogor Agricultural University)",
            expertise: ["Machine Learning", "Artificial Intelligence"],
            image: "https://via.placeholder.com/150",
            articles: [
                {
                    title: "Spatial decision tree model for garlic land suitability evaluation",
                    authors: "A Nurhakim, SS Isma, Annisa, A Sobri",
                    journal: "IAES International Journal of Artificial Intelligence 10 (1), 66",
                    citedBy: 34,
                    year: 2021,
                },
                {
                    title: "Spatial decision tree model for garlic land suitability evaluation",
                    authors: "A Nurhakim, SS Isma, Annisa, A Sobri",
                    journal: "IAES International Journal of Artificial Intelligence 10 (1), 66",
                    citedBy: 34,
                    year: 2021,
                },
                {
                    title: "Spatial decision tree model for garlic land suitability evaluation",
                    authors: "A Nurhakim, SS Isma, Annisa, A Sobri",
                    journal: "IAES International Journal of Artificial Intelligence 10 (1), 66",
                    citedBy: 34,
                    year: 2021,
                },
                {
                    title: "Spatial decision tree model for garlic land suitability evaluation",
                    authors: "A Nurhakim, SS Isma, Annisa, A Sobri",
                    journal: "IAES International Journal of Artificial Intelligence 10 (1), 66",
                    citedBy: 34,
                    year: 2021,
                },
            ],
        },
        {
            name: "Dean Apriana Ramadhan",
            university: "IPB University (Bogor Agricultural University)",
            expertise: ["Machine Learning", "Artificial Intelligence"],
            image: "https://via.placeholder.com/150",
            articles: [
                {
                    title: "Spatial decision tree model for garlic land suitability evaluation",
                    authors: "A Nurhakim, SS Isma, Annisa, A Sobri",
                    journal: "IAES International Journal of Artificial Intelligence 10 (1), 66",
                    citedBy: 34,
                    year: 2021,
                },
                {
                    title: "Sequential pattern mining on library transaction data",
                    authors: "BS Setiyawan, MF Hiday, A Agusman, H Marthana",
                    journal: "International Symposium on Information Technology 1, 1-4",
                    citedBy: 26,
                    year: 2016,
                },
                {
                    title: "Area Skyline Query for Selecting Good Locations in a Map",
                    authors: "Annisa, A Zamzam, Y Morimoto",
                    journal: "Journal of Information Processing 24 (6), 946-955",
                    citedBy: 25,
                    year: 2016,
                },
            ],
        },
    ];

    // State to track how many profiles to show initially
    const [showMoreProfiles, setShowMoreProfiles] = useState(false);

    // State to track which profiles' articles are expanded
    const [expandedProfiles, setExpandedProfiles] = useState({});

    // Determine profiles to display based on the showMoreProfiles state
    const profilesToShow = showMoreProfiles ? profiles : profiles.slice(0, 2);

    const toggleShowMoreArticles = (index) => {
        setExpandedProfiles({
            ...expandedProfiles,
            [index]: !expandedProfiles[index],
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {profilesToShow.map((profile, index) => (
                <div key={index} className="flex space-x-8">
                    {/* Profile Section */}
                    <div className="w-1/3">
                        <img
                            className="w-16 h-16 rounded-full mb-4"
                            src={profile.image}
                            alt="Profile"
                        />
                        <h2 className="text-lg font-semibold">{profile.name}</h2>
                        <p>{profile.university}</p>
                        <div className="text-sm space-x-2 mt-2">
                            {profile.expertise.map((item, idx) => (
                                <span key={idx}>{item}</span>
                            ))}
                        </div>
                    </div>

                    {/* Articles Section */}
                    <div className="w-2/3">
                        <h3 className="text-xl font-semibold mb-4">
                            Research by {profile.name}
                        </h3>
                        
                        <div className="space-y-6">
                            {profile.articles
                                .slice(0, expandedProfiles[index] ? profile.articles.length : 3)
                                .map((article, idx) => (
                                    <div key={idx} className="border-b pb-4">
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:underline flex justify-between"
                                        >
                                            {article.title}
                                            <FaBookmark className="text-gray-500 hover:text-blue-500 cursor-pointer" size={24} />
                                        </a>
                                        <p>{article.authors}</p>
                                        <p>{article.journal}</p>
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>{article.citedBy} citations</span>
                                            <span>{article.year}</span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {/* Show More Articles button */}
                        {profile.articles.length > 3 && (
                            <button
                                onClick={() => toggleShowMoreArticles(index)}
                                className="mt-4 text-blue-500 hover:underline"
                            >
                                {expandedProfiles[index] ? "Show Less" : "Show More"}
                            </button>
                        )}
                    </div>
                </div>
            ))}
            {/* Show More Profiles button */}
            {!showMoreProfiles && profiles.length > 2 && (
                <button
                    onClick={() => setShowMoreProfiles(true)}
                    className="mt-4 text-blue-500 hover:underline"
                >
                    Show More Profiles
                </button>
            )}
        </div>
    );
};

export default ProfilePage;
