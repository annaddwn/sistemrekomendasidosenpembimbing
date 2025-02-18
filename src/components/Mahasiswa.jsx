import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const Mahasiswa = () => {
    const [nim, setNim] = useState('');
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [error, setError] = useState('');

    const readExcel = async (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const workbook = XLSX.read(bufferArray, { type: 'buffer' });
                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                resolve(jsonData);
            };

            fileReader.onerror = (error) => reject(error);
        });
    };

    const handleSearch = async () => {
        const trimmedNim = nim.trim();
        if (!trimmedNim) {
            setError('NIM tidak boleh kosong');
            return;
        }

        try {
            const response1 = await fetch('/data.xlsx');
            const fileBlob1 = await response1.blob();
            const excelData1 = await readExcel(fileBlob1);
            const filteredData1 = excelData1.filter((row) => row.Nim === trimmedNim);

            const response2 = await fetch('/data2.xlsx');
            const fileBlob2 = await response2.blob();
            const excelData2 = await readExcel(fileBlob2);
            const filteredData2 = excelData2.filter((row) => row.Nim === trimmedNim);

            if (filteredData1.length === 0 && filteredData2.length === 0) {
                setError('Data tidak ditemukan untuk NIM tersebut.');
                setData1([]);
                setData2([]);
            } else {
                setError('');
                setData1(filteredData1);
                setData2(filteredData2);
            }
        } catch (err) {
            setError('Gagal membaca file Excel.');
            console.error(err);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const renderTable = (data, isSecondTable = false) => {
        if (data.length === 0) return null;

        return (
            <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden">
                <h2 className="text-xl font-bold bg-indigo-200 text-indigo-800 p-4 border-b">
                    {isSecondTable ? 'Hasil Rekomendasi 2' : 'Hasil Rekomendasi 1'}
                </h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-indigo-50 text-indigo-800">
                            {!isSecondTable && <th className="p-3 text-left border-b">Nama</th>}
                            {!isSecondTable && <th className="p-3 text-left border-b">Title</th>}
                            {!isSecondTable && <th className="p-3 text-left border-b">Mata Kuliah</th>}
                            {isSecondTable && <th className="p-3 text-left border-b">Nama</th>}
                            {isSecondTable && <th className="p-3 text-left border-b">Keyword</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => {
                            const titles = !isSecondTable ? row.Title.split(',').map((title) => title.trim()) : [];
                            const silabus = !isSecondTable ? row.Silabus_Mata_Kuliah.split(',').map((s) => s.trim()) : [];
                            const rekDosen = isSecondTable ? row.RekDosen.split(';').map((dosen) => dosen.trim()) : [];
                            const keywordSil = isSecondTable ? row.keyword_sil.split(',').map((s) => s.trim()) : [];

                            return (
                                <tr key={index} className="border-b">
                                    {!isSecondTable && <td className="p-3">{row.Nama}</td>}
                                    {!isSecondTable && (
                                        <td className="p-3">
                                            <table className="w-full border-collapse">
                                                <tbody>
                                                    {titles.map((title, idx) => (
                                                        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                                            <td className="p-2">{title}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    )}
                                    {!isSecondTable && (
                                        <td className="p-3">
                                            <table className="w-full border-collapse">
                                                <tbody>
                                                    {silabus.map((s, idx) => (
                                                        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                                            <td className="p-2">{s}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    )}
                                    {isSecondTable && (
                                        <td className="p-3">
                                            <table className="w-full border-collapse">
                                                <tbody>
                                                    {rekDosen.map((dosen, idx) => (
                                                        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                                            <td className="p-2">{dosen}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    )}
                                    {isSecondTable && (
                                        <td className="p-3">
                                            <table className="w-full border-collapse">
                                                <tbody>
                                                    {keywordSil.map((s, idx) => (
                                                        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                                            <td className="p-2">{s}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-blue-100 p-6 font-inter">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Rekomendasi Dosen dan Tugas Akhir Alumni</h1>

            <div className="flex items-center mb-6 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Masukkan NIM"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    onClick={handleSearch}
                    className="p-3 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-500 transition-all"
                >
                    Search
                </button>
            </div>

            {error && <p className="text-red-400 font-semibold mb-4">{error}</p>}

            <div className="flex flex-col md:flex-row w-full max-w-6xl justify-between gap-6">
                {renderTable(data1)}
                {renderTable(data2, true)}
            </div>
        </div>
    );
};

export default Mahasiswa;
