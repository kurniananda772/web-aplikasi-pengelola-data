// API Service untuk komunikasi dengan external API
class ApiService {
  constructor() {
    this.baseURL = 'https://jsonplaceholder.typicode.com';
  }

  // Async/Await untuk fetch data penjualan eksternal
  async getExternalSales() {
    try {
      const response = await fetch(`${this.baseURL}/users`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform data untuk kebutuhan aplikasi penjualan
      return data.slice(0, 10).map(user => ({
        id: user.id,
        namaProduk: 'Produk ' + user.company.name,
        namaPelanggan: user.name,
        email: user.email,
        hargaSatuan: Math.floor(Math.random() * 500000) + 50000, // Random harga
        jumlah: Math.floor(Math.random() * 10) + 1,
        diskonPersen: Math.floor(Math.random() * 15),
        tanggal: new Date().toISOString().split('T')[0]
      }));
    } catch (error) {
      console.error('Error fetching external data:', error);
      throw error;
    }
  }

  // Simulate POST untuk demo
  async createSales(salesData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      ...salesData,
      id: Date.now()
    };
  }

  // Simulate UPDATE
  async updateSales(id, salesData) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { ...salesData, id };
  }

  // Simulate DELETE
  async deleteSales(id) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, id };
  }
}

export default new ApiService();