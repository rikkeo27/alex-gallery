document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Tempurung Terra", img: "1.jpg", price: 450000 },
      { id: 2, name: "Sandar Raga", img: "2.jpg", price: 200000 },
      { id: 3, name: "Vas Arunika", img: "3.jpg", price: 500000 },
      { id: 4, name: "Wadah Estetika", img: "4.jpg", price: 150000 },
      { id: 5, name: "Pot Gerabah Ukuran Besar", img: "5.jpg", price: 400000 },
      { id: 6, name: "kendi", img: "6.jpg", price: 600000 },
      { id: 7, name: "Pot Klasik", img: "7.jpg", price: 150000 },
      { id: 8, name: "pot wajah pasangan", img: "8.jpg", price: 200000 },
      { id: 9, name: "pot wajah", img: "9.jpg", price: 200000 },
      { id: 10, name: "Pot Gerabah Klasik", img: "10.jpg", price: 500000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barangnya sudah ada, cek apakah barang beda atau sama dengan yg ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price; // diperbaiki dari Item.price menjadi item.price
            return item; // diperbaiki dari Item menjadi item
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau di-remove berdasarkan id-nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem && cartItem.quantity > 1) {
        // telusuri satu-satu
        this.items = this.items.map((item) => {
          // jika bukan barang yang di-klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else {
        // jika quantity-nya 1 atau kurang, hapus dari cart
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem?.price || 0;
      }
    },
  });
});

//form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;
const form = document.querySelector("#checkoutForm");
form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});
//kirim data ketika tombol chekout di klik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open("http://wa.me/6289513819755?text=" + encodeURIComponent(message));
});

//format pesan whatshapp
const formatMessage = (obj) => {
  return `data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
No HP: ${obj.phone}
Data Pesanan
${JSON.parse(obj.items).map(
  (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
)}
TOTAL: ${rupiah(obj.total)}
Terima kasih.`;
};

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
