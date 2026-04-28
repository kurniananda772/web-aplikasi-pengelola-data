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
              <th>Produk</th>
              <th>Pelanggan</th>
              <th>Harga</th>
              <th>Jumlah</th>
              <th>Total</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="font-medium">{sale.namaProduk}</td>
                <td>{sale.namaPelanggan}</td>
                <td>
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(sale.hargaSatuan || 0)}
                </td>
                <td>{sale.jumlah || 0}</td>
                <td className="font-bold text-green-600">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(sale.totalPenjualan || 0)}
                </td>
                <td>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onEdit(sale)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sale.id)}
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