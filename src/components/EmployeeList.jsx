import React, { useEffect, useState } from 'react';

// Jika Anda sudah memiliki file api di '../services/api', Anda bisa menggunakan fungsi di sana.
// Untuk kemudahan contoh, saya akan melakukan fetch langsung di sini.
// import { getEmployees } from '../services/api'; 

const EmployeeList = () => {
  // 1. STATE UNTUK MENYIMPAN DATA DARI API
  // Awalnya, data_pelanggan kosong
  const [data_pelanggan, setDataPelanggan] = useState([]);

  // 2. USEEFFECT UNTUK MENGAMBIL DATA SAAT KOMPONEN DIMUAT
  useEffect(() => {
    // Fungsi untuk mengambil data dari API sungguhan
    const fetchApiData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari API');
        }
        const api_json = await response.ok ? await response.json() : [];
        
        // Simpan data API sungguhan ke state
        setDataPelanggan(api_json);
        console.log('Data dari API berhasil diambil:', api_json);
      } catch (error) {
        console.error('Error saat fetch data API:', error);
      }
    };

    fetchApiData();
  }, []); // Array kosong berarti ini hanya jalan sekali saat page load

  // 3. LOGIKA UNTUK MENAMPILKAN DATA (MAPPING)
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-800">
        <span>📋</span> Data Pelanggan dari API (JSONPlaceholder)
      </h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Iterasi data sungguhan yang sudah disimpan di 'data_pelanggan' */}
        {data_pelanggan.map((pelanggan) => (
          <div key={pelanggan.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-4">
              
              {/* Avatar dengan inisial nama sungguhan */}
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-inner">
                {pelanggan.name.charAt(0)}
              </div>
              
              <div>
                {/* Nama pelanggan sungguhan dari API */}
                <h2 className="font-bold text-slate-800 leading-tight text-lg">
                  {pelanggan.name}
                </h2>
                {/* Email sungguhan dari API */}
                <p className="text-sm text-slate-500 italic">
                  {pelanggan.email}
                </p>
              </div>
            </div>
            
            {/* ID Pelanggan dari API */}
            <div className="text-xs text-slate-400 mb-6 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center gap-2">
                <span>🆔 ID: {pelanggan.id}</span>
                <span>•</span>
                <span>👤 Username: {pelanggan.username}</span>
            </div>

            <button className="w-full py-2.5 px-4 bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 rounded-xl font-medium text-sm transition-all duration-200">
              👇 Klik pilih {pelanggan.name}
            </button>
          </div>
        ))}

        {/* Jika data masih dimuat, tampilkan Loading */}
        {data_pelanggan.length === 0 && (
          <div className="lg:col-span-3 text-center text-slate-400 py-10">
            {/* Anda bisa menggunakan LoadingSpinner.jsx Anda di sini */}
            Memuat data...
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;