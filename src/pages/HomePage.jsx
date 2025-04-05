import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import ResultTabs from '../components/ResultTabs';
import * as XLSX from 'xlsx';

const HomePage = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [dosenData, setDosenData] = useState([]);
  const [thesisData, setThesisData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const loadExcelData = async () => {
      try {
        const dosenResponse = await fetch('/sistemrekomendasidosenpembimbing/hasil_mhs.xlsx');
        const dosenArrayBuffer = await dosenResponse.arrayBuffer();
        const dosenWorkbook = XLSX.read(new Uint8Array(dosenArrayBuffer), { type: 'array' });
        const dosenJson = XLSX.utils.sheet_to_json(dosenWorkbook.Sheets[dosenWorkbook.SheetNames[0]]);
        
        const thesisResponse = await fetch('/sistemrekomendasidosenpembimbing/hasil_rekomendasi.xlsx');
        const thesisArrayBuffer = await thesisResponse.arrayBuffer();
        const thesisWorkbook = XLSX.read(new Uint8Array(thesisArrayBuffer), { type: 'array' });
        const thesisJson = XLSX.utils.sheet_to_json(thesisWorkbook.Sheets[thesisWorkbook.SheetNames[0]]);

        setDosenData(dosenJson);
        setThesisData(thesisJson);
        setDataLoaded(true);
        
        console.log('Dosen data loaded:', dosenJson);
        console.log('Thesis data loaded:', thesisJson);
      } catch (err) {
        console.error('Error loading Excel files:', err);
        setError(`Gagal memuat data: ${err.message}`);
      } 
    };

    loadExcelData();
  }, []);

  const formatDosenData = (names, links) => {
    const nameArr = names?.split(';').map(name => name.trim()) || [];
    const linkArr = links?.split(';').map(link => link.trim()) || [];
    
    return nameArr.map((name, i) => ({
      id: `${name}-${i}`,
      name: name,
      repo: linkArr[i] || '#'
    }));
  };

  const handleSearch = (nim) => {
    if (!dataLoaded) {
      setError("Data belum siap, silakan coba lagi nanti.");
      return;
    }

    setError(null);

    try {
      const normalizedNim = nim.trim().toUpperCase();
      
      const studentDosen = dosenData.find(item => 
        item.Nim?.trim().toUpperCase() === normalizedNim
      );

      const studentTheses = thesisData.filter(item =>
        item.Nim?.trim().toUpperCase() === normalizedNim
      );

      if (!studentDosen && studentTheses.length === 0) {
        setError(`NIM ${nim} tidak ditemukan. Silakan periksa kembali.`);
        setResults(null);
        return;
      }

      const processedTheses = studentTheses.map(thesis => {
        const lecturer = thesis.Nama?.trim() || 'Dosen Tidak Diketahui';
        const courses = thesis.Silabus_Mata_Kuliah?.split(';').map(c => c.trim()).filter(c => c) || [];
        
        const titles = thesis.Title?.split(';')
          .map(t => t.trim())
          .filter(t => t && t !== '-') || [];

        return {
          id: `${lecturer}-${Date.now()}`,
          lecturer,
          titles,
          courses
        };
      });

      console.log('Processed theses:', processedTheses);

      setResults({
        SIS: studentDosen ? formatDosenData(studentDosen.Nama_kSIS, studentDosen.Repo_KSIS) : [],
        SMV: studentDosen ? formatDosenData(studentDosen.Nama_kSMV, studentDosen.Repo_kSMV) : [],
        Rsky: studentDosen ? formatDosenData(studentDosen.Nama_krSky, studentDosen.Repo_krSky) : [],
        thesisRecommendations: processedTheses
      });
    } catch (err) {
      console.error('Error processing search:', err);
      setError("Terjadi kesalahan saat memproses data.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Header />
      
      {!dataLoaded ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        </div>
      ) : (
        <>
          <SearchForm onSearch={handleSearch} disabled={!dataLoaded} />

          {/* Tampilkan error jika NIM tidak ditemukan */}
          {error && (
            <div className="mt-6 p-6 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <h3 className="font-bold text-red-800">Error</h3>
              <p className="text-red-700">{error}</p>
              {dosenData.length > 0 && (
                <div className="mt-4 p-4 bg-white rounded border border-red-100">
                  <p className="font-medium">Contoh NIM yang valid:</p>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    {dosenData.slice(0, 3).map((item, i) => (
                      <li key={i}>{item.Nim}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tampilkan hasil pencarian jika tersedia */}
          {results && !error && <ResultTabs results={results} />}
        </>
      )}
    </div>
  );
};

export default HomePage;
