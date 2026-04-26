import React, { useState, useEffect } from 'react';
import EmployeeCalculator from '../services/EmployeeCalculator';

const EmployeeForm = ({ employees, setEmployees, loading, setLoading, setError }) => {
  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    jabatan: '',
    gajiPokok: '',
    lembur: '',
    tunjangan: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [externalData, setExternalData] = useState([]);

  // Class OOP untuk kalkulasi gaji
  const calculator = new EmployeeCalculator();

  // Fetch data eksternal dari JSONPlaceholder
  useEffect(() => {
    fetchExternalData();
  }, []);

  const fetchExternalData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      
      // Ambil 5 data pertama sebagai contoh karyawan eksternal
      setExternalData(data.slice(0, 5).map(user => ({
        id: user.id,
        nama: user.name,
        email: user.email
      })));
    } catch (error) {
      setError('Gagal mengambil data eksternal: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const totalGaji = calculator.hitungGajiTotal(
      parseInt(formData.gajiPokok),
      parseInt(formData.lembur),
      parseInt(formData.tunjangan)
    );

    const employeeData = {
      ...formData,
      totalGaji,
      tanggal: new Date().toLocaleDateString('id-ID')
    };

    if (isEdit) {
      // Update
      setEmployees(employees.map(emp => 
        emp.id === formData.id ? employeeData : emp
      ));
      setIsEdit(false);
    } else {
      // Create
      employeeData.id = Date.now();
      setEmployees([employeeData, ...employees]);
    }

    setFormData({
      id: '',
      nama: '',
      jabatan: '',
      gajiPokok: '',
      lembur: '',
      tunjangan: ''
    });
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setFormData({
      id: '',
      nama: '',
      jabatan: '',
      gajiPokok: '',
      lembur: '',
      tunjangan: ''
    });
  };

  return (
    <div className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {isEdit ? '✏️ Edit Karyawan' : '➕ Tambah Karyawan'}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Nama Lengkap"
          className="form-control"
          value={formData.nama}
          onChange={(e) => setFormData({...formData, nama: e.target.value})}
          required
        />
        
        <input
          type="text"
          placeholder="Jabatan"
          className="form-control"
          value={formData.jabatan}
          onChange={(e) => setFormData({...formData, jabatan: e.target.value})}
          required
        />
        
        <input
          type="number"
          placeholder="Gaji Pokok (Rp)"
          className="form-control"
          value={formData.gajiPokok}
          onChange={(e) => setFormData({...formData, gajiPokok: e.target.value})}
          required
        />
        
        <input
          type="number"
          placeholder="Jam Lembur"
          className="form-control"
          value={formData.lembur}
          onChange={(e) => setFormData({...formData, lembur: e.target.value})}
          required
        />
        
        <input
          type="number"
          placeholder="Tunjangan (Rp)"
          className="form-control"
          value={formData.tunjangan}
          onChange={(e) => setFormData({...formData, tunjangan: e.target.value})}
          required
        />

        <div className="md:col-span-2 flex gap-3">
          <button type="submit" className="btn-primary flex-1">
            {isEdit ? 'Update Data' : 'Tambah Karyawan'}
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Data Eksternal */}
      {externalData.length > 0 && (
        <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            📡 Data Karyawan dari API Eksternal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {externalData.map((emp) => (
              <div key={emp.id} className="p-4 bg-white rounded-xl shadow-sm">
                <h4 className="font-medium">{emp.nama}</h4>
                <p className="text-sm text-gray-600">{emp.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeForm;