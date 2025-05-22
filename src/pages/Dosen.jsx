import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import clsx from "clsx";
import Header from '../components/HeaderDosen';

const TABS = ["Mahasiswa SIS", "Mahasiswa SMV", "Mahasiswa Rsky"];

const tabKeyMap = {
  "Mahasiswa SIS": "kSIS",
  "Mahasiswa SMV": "kSMV",
  "Mahasiswa Rsky": "krSky",
};

const categoryDescriptions = {
  "Mahasiswa SIS": {
    title: "Skyband Inverse Skyband View (SIS)",
    description: [
      "Syarat Hasil SIS:",
      "1. Dosen harus termasuk dalam skyband/terbaik berdasarkan  rata-rata lama bimbingan, index scholar, dan banyaknya mahasiswa bimbingan",
      "2. Mahasiswa juga harus termasuk dalam skyband/terbaik berdasarkan prestasi akademik",
      "",
      "Penyebab Tidak Ada Hasil:",
      "1. Tidak ada mahasiswa skyband yang menarik bagi dosen",
      "2. Dosen tidak memenuhi kriteria skyband/terbaik",
    ].join("\n"),
  },
  "Mahasiswa SMV": {
    title: "Skyband Mutual View (SMV)",
    description: [
      "Syarat Hasil SMV:",
      "1. Dosen tertarik pada mahasiswa tersebut",
      "2. Mahasiswa harus termasuk dalam skyband/terbaik berdasarkan prestasi akademik",
      "3. Mahasiswa juga tertarik pada dosen (Hubungan timbal balik)",
    ].join("\n"),
  },
  "Mahasiswa Rsky": {
    title: "Kueri Reciprocal Skyband (Rsky)",
    description: [
      "Syarat Hasil Rsky:",
      "1. Dosen tertarik pada mahasiswa tersebut",
      "2. Mahasiswa harus termasuk dalam skyband/terbaik berdasarkan prestasi akademik",
    ].join("\n"),
  },
};

export default function Dosen() {
  const [data, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Mahasiswa SIS");
  const [selectedMahasiswa, setSelectedMahasiswa] = useState("");

  useEffect(() => {
    fetch("hasil_rekomendasidosen.xlsx")
      .then((res) => res.arrayBuffer())
      .then((ab) => {
        const workbook = XLSX.read(ab, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
        if (jsonData.length > 0) {
          setSelectedMahasiswa(jsonData[0].Nama);
        }
      });
  }, []);

  const renderDescription = () => {
    const desc = categoryDescriptions[selectedTab];
    if (!desc) return "";

    return `${desc.title}\n\n${desc.description}`;
  };

  const selectedData = data.find((item) => item.Nama === selectedMahasiswa);
  const mahasiswaList = (selectedData?.[tabKeyMap[selectedTab]] || "")
  .split(";")
  .map((d) => d.trim())
  .filter((d) => d !== "");

  return (

    <div className="max-w-5xl mx-auto py-10 px-4">
    <Header/>
      {/* Dropdown Mahasiswa */}
      <div className="mb-6">
        <label htmlFor="mahasiswa" className="block mb-2 font-medium text-sm text-gray-700">
          Masukkan Nama:
        </label>
        <select
          id="mahasiswa"
          value={selectedMahasiswa}
          onChange={(e) => setSelectedMahasiswa(e.target.value)}
          className="w-full p-2 border rounded-md border-gray-300 shadow-sm"
        >
          {data.map((item, index) => (
            <option key={index} value={item.Nama}>
              {item.Nama}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={clsx(
              "py-2 px-4 font-medium text-sm border-b-2",
              selectedTab === tab
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-gray-600 hover:text-violet-600"
            )}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Deskripsi */}
      <div className="bg-blue-50 text-blue-800 p-4 rounded-lg whitespace-pre-line text-sm mb-6">
        {renderDescription()}
      </div>

      {/* Kartu Dosen */}
      {mahasiswaList.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
            {mahasiswaList.map((mahasiswa, idx) => (
            <div
                key={idx}
                className="p-4 bg-white rounded-lg shadow border border-gray-200"
            >
                <h3 className="font-semibold text-lg text-gray-800">{mahasiswa}</h3>
            </div>
            ))}
        </div>
        )}
    </div>
  );
}
