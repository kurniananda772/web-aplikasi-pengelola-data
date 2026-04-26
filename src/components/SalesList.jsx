import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const SalesList = ({ sales, setSales, loading, setError, onEdit }) => {
  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      setSales(sales.filter(s => s.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="card p-12 text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">📋 Daftar Penjualan</h2>
        <p className="text-sm text-gray-600">Total: {sales.length} transaksi</p>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left">Produk</th>
              <th className="px-6 py-4 text-left">Pelanggan</th>
              <th className="px-6 py-4 text-right">Harga</th>
              <th className="px-6 py-4 text-center">Jumlah</th>
              <th className="px-6 py-4 text-right">Total</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium">{sale.namaProduk}</td>
                <td className="px-6 py-4">{sale.namaPelanggan}</td>
                <td className="px-6 py-4 text-right">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(sale.hargaSatuan || 0)}
                </td>
                <td className="px-6 py-4 text-center">{sale.jumlah || 0}</td>
                <td className="px-6 py-4 text-right font-bold text-green-600">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(sale.totalPenjualan || 0)}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onEdit(sale)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sale.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sales.length === 0 && (
        <div className="p-12 text-center text-gray-500">
          <p className="text-xl">Belum ada data penjualan</p>
          <p className="mt-2">Silakan tambah penjualan melalui form di atas</p>
        </div>
      )}
    </div>
  );
};

export default SalesList;