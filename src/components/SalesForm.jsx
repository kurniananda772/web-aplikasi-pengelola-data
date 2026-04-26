import React, { useState, useEffect } from 'react';
import SalesCalculator from '../services/SalesCalculator';

const SalesForm = ({ sales, setSales, loading, setLoading, setError, onEdit }) => {
  const [formData, setFormData] = useState({
    id: '',
    namaProduk: '',
    namaPelanggan: '',
    hargaSatuan: '',
    jumlah: '',
    diskonPersen: '',
    tanggal: new Date().toISOString().split('T')[0]
  });
  const [isEdit, setIsEdit] = useState(false);
  const [externalData, setExternalData] = useState([]);

  // Class OOP untuk kalkulasi penjualan
  const calculator = new SalesCalculator();

  // Listen untuk edit dari parent component
  useEffect(() => {
    if (onEdit && typeof onEdit === 'object' && onEdit.id) {
      setFormData({
        id: onEdit.id || '',
        namaProduk: onEdit.namaProduk || '',
        namaPelanggan: onEdit.namaPelanggan || '',
        hargaSatuan: onEdit.hargaSatuan || '',
        jumlah: onEdit.jumlah || '',
        diskonPersen: onEdit.diskonPersen || '',
        tanggal: onEdit.tanggal || new Date().toISOString().split('T')[0]
      });
      setIsEdit(true);
    }
  }, [onEdit]);

  // Fetch data eksternal dari JSONPlaceholder
  const fetchExternalData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      
      // Ambil 5 data pertama sebagai contoh penjualan eksternal
      setExternalData(data.slice(0, 5).map(user => ({
        id: user.id,
        namaPelanggan: user.name,
        email: user.email
      })));
    } catch (error) {
      setError('Gagal mengambil data eksternal: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchExternalData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const totalPenjualan = calculator.hitungTotalPenjualan(
      parseInt(formData.hargaSatuan),
      parseInt(formData.jumlah),
      parseInt(formData.diskonPersen || 0)
    );

    const salesData = {
      ...formData,
      totalPenjualan,
      subtotal: parseInt(formData.hargaSatuan) * parseInt(formData.jumlah)
    };

    if (isEdit) {
      // Update
      setSales(sales.map(s => 
        s.id === formData.id ? salesData : s
      ));
      setIsEdit(false);
    } else {
      // Create
      salesData.id = Date.now();
      setSales([salesData, ...sales]);
    }

    setFormData({
      id: '',
      namaProduk: '',
      namaPelanggan: '',
      hargaSatuan: '',
      jumlah: '',
      diskonPersen: '',
      tanggal: new Date().toISOString().split('T')[0]
    });
  };

  const handleCancel = () => {
    setIsEdit(false);
    setFormData({
      id: '',
      namaProduk: '',
      namaPelanggan: '',
      hargaSatuan: '',
      jumlah: '',
      diskonPersen: '',
      tanggal: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? '✏️ Edit Penjualan' : '➕ Tambah Penjualan'}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nama Produk"
          className="form-control"
          value={formData.namaProduk}
          onChange={(e) => setFormData({...formData, namaProduk: e.target.value})}
          required
        />
        
        <input
          type="text"
          placeholder="Nama Pelanggan"
          className="form-control"
          value={formData.namaPelanggan}
          onChange={(e) => setFormData({...formData, namaPelanggan: e.target.value})}
          required
        />
        
        <input
          type="number"
          placeholder="Harga Satuan (Rp)"
          className="form-control"
          value={formData.hargaSatuan}
          onChange={(e) => setFormData({...formData, hargaSatuan: e.target.value})}
          required
        />
        
        <input
          type="number"
          placeholder="Jumlah"
          className="form-control"
          value={formData.jumlah}
          onChange={(e) => setFormData({...formData, jumlah: e.target.value})}
          required
        />
        
        <input
          type="number"
          placeholder="Diskon (%) - Opsional"
          className="form-control"
          value={formData.diskonPersen}
          onChange={(e) => setFormData({...formData, diskonPersen: e.target.value})}
        />
        
        <input
          type="date"
          className="form-control"
          value={formData.tanggal}
          onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
          required
        />

        <div className="md:col-span-2 flex gap-2">
          <button type="submit" className="btn-primary flex-1">
            {isEdit ? '💾 Simpan Perubahan' : '➕ Tambah Data'}
          </button>
          
          {isEdit && (
            <button 
              type="button" 
              onClick={handleCancel}
              className="btn-secondary px-4"
            >
              ❌ Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SalesForm;