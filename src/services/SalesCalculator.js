class SalesCalculator {
  /**
   * Menghitung total penjualan dengan memperhitungkan diskon
   * @param {number} hargaSatuan - Harga per unit
   * @param {number} jumlah - Jumlah unit yang terjual
   * @param {number} diskonPersen - Persentase diskon (0-100)
   * @returns {number} Total penjualan setelah diskon
   */
  hitungTotalPenjualan(hargaSatuan, jumlah, diskonPersen = 0) {
    const subtotal = hargaSatuan * jumlah;
    const diskonRp = (subtotal * diskonPersen) / 100;
    return subtotal - diskonRp;
  }

  /**
   * Menghitung besaran diskon dalam rupiah
   * @param {number} hargaSatuan - Harga per unit
   * @param {number} jumlah - Jumlah unit
   * @param {number} diskonPersen - Persentase diskon
   * @returns {number} Diskon dalam rupiah
   */
  hitungDiskonRp(hargaSatuan, jumlah, diskonPersen = 0) {
    const subtotal = hargaSatuan * jumlah;
    return (subtotal * diskonPersen) / 100;
  }

  /**
   * Menghitung subtotal sebelum diskon
   * @param {number} hargaSatuan - Harga per unit
   * @param {number} jumlah - Jumlah unit
   * @returns {number} Subtotal
   */
  hitungSubtotal(hargaSatuan, jumlah) {
    return hargaSatuan * jumlah;
  }
}

export default SalesCalculator;
