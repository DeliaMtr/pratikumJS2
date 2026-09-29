console.log("Bismillah Pratikum Dimulaii")

// aktivitas 1 DOM SELECTION /seleksi elemen
// kenapa kita harus seleksi karena kita harus "menangkap" atau ambil id/class 
// mengambil elemen html tersebut lalu disimpan di variabel javascript

//1. memgabil elemen judul utama & sub judul 
// document.getelemntById("...") mengambil berdasarkan atribut id
const JudulUtama = document.getElementById("judul-utama"); //menangkap: <h1 id="judul-utama">

// document.querySelector("#...") 
// tanda # artinya ID
const subJudul = document.querySelector("#sub-judul"); //menangkap: <p id="sub-judul">

// 2. mengambil element pada kartu 1 (kartu manipulasi teks & style )
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

// 3. mengambil element tombol tombol aksi pada kartu s = document.getElementById("btn-ubah-teks");
const BtnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

//4. mengambnil element pada kartu 2 (fitur catatan dinamis / to do list sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");

// aktivitas ke 2 manipulasi teks & style (card 1)
// addEventListener("click", function() {...}) artinya adalah tolong dengarkan dulu/tung
// sampai di klik user, jika di klik jalankan perintah didalam function

// a. mengubah teks & warna secara langsung 
BtnUbahTeks.addEventListener("click", function() {
    //.innertext = mengganti atau mengisi secara langsung teks yang ada didalam elemen HTML
    teksPreview.innerText = "Good Beb! teks ini berhasil diubah pake DOM";

    //.style.color = mengubah warna teks secara langsung (InLIne Style)
    teksPreview.style.color = "#6A1B9A"

    // console.log = mencetak pesan di console browser
    console.log("[DOM] teks preview telah diperbaharui!");
});

// B. manipulasi class css menggunakan classList.toggle()
btnToggleWarna.addEventListener("click", function() {
    //.classlist.toggle("nama-class") = fitur saklar otomatis (ON/OFF)
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM Berhasil di Switch Bub!");
});

//c. mengembalikan (reset) teks ke kondisi semula 
btnReset.addEventListener("click", function() {
    //1. kembalikan teks semula teks asli 
    teksPreview.innerText = "Haloo! Teks ini siap diubahh yaa";

    //2. kosongkan warna agar kembali ke warna scc bawaan 
    teksPreview.style.color = "";

    //3. hapus class khsus untuk menggunakan .classList.remove("
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM Tampilan di reset");

});

// aktivitas 3 & 4 : element dinamis & event handing (TO-DO List Sederhana)
// di aktivitas ini jika belajar elemen HTML baru (<li>) secara otomatis dalam javascript
// mengisi teksnya, memberi tombol hapus, lalu menempelkan ke layar (<ul>)

// langkah 1: membuat variabel penampung angka jumlah catatan
// "let" digunakan untuk nilai variabel yang akan berubah ubah bisa bertambah bisa berkurang (counting)
let totalCatatan = 0;

// langkah 2: fungsi update angka counter & pesan status
function perbaruiJumlah() {
    //masukkan total angka total catatan terbaru ke dalam tag <span id="jumlah-catatan">
    jumlahCatatan.innerText = totalCatatan;

    // conditional statment berupa apakah catatanya itu kosong/ 0?
    if (totalCatatan === 0) {
        // jika 0: hapus class "hidden" supaya teks "belum ada catatan" muncul ke layar
        pesanKosong.classList.remove("hidden");
    } else {
        // ika > 0: tambahkan class "hidden" agar teks "belum ada catatan " tersembunyi
        pesanKosong.classList.add("hidden");
    }
}

// langkah 3: fungsi utama logika tambah catatan baru 
function tambahCatatan() {
    //3.1 inputcatatan.value fungsi nya untuk mengambil teks yang diketik oleh user
    // .trim() = untuk menghapus spasi diawal dan diakhir
    const isiTeks = inputCatatan.value.trim();

    //3.2 validasi input: jika isi teks kosong maka tampilkan alert
    if (isiTeks === ""){
        alert("catatan kamuu tidak boleh kosong sayang!");
        return;

    }
    
    // 3.3 document.createElement("li") -> membuat memori di js secara dinamis
    const liBaru = document.createElement("li");
    liBaru.className = "note-item"; // menambahkan pada tag li 

    // 3.4 .innerHTML = mengisi struktur didalam <li> dengan teks catatan dan tombol hapus
    // tanda bactick (`)
    liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`;

    // 3.5 menambahkan telinga / event listener untuk tombol hapus pada catatan dinamis
    // liBaru.querySelector(".btn-hapus") = mengambil tombol ber class "btn-hapus" khusus yang ada di li
    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function() {
        liBaru.remove(); //menghapus elemen list dari layar HTML
        totalCatatan--; // totalCatatan dikurangi sebanyak 1x
        perbaruiJumlah(); // panggil fungsi perbaruiJumlah untuk update angka dilayar
        console.log(`Dom Catatan "${isiTeks}" dihapus.`);
    });

    // 3.6  appendChild = memasukan elemen li kedalam wadah <ul id="daftar-catatan">
    daftarCatatan.appendChild(liBaru);

    //3.7 mengkosonghkan kembali isi kolom input (inputCatatan.value = "") supaya bisa diketik lagi
    inputCatatan.value ="";

    //3.8 totalCatatan++ artinya tambah nilai total cattan sebanyak 1, lalu update ke layar
    totalCatatan++;
    perbaruiJumlah();

    console.log(`Dom Catatan baru ditambahkan: ${isiTeks}`);
}

// langkah 4: event listener klik tombol + "tambah"
// ketiks tombol "+ Tambah " di klik oleh user, maka dijalankan fungsi tambah 
btnTambah.addEventListener("click", function() {
    tambahCatatan();
});

// langlaj 5: event listener keybord "enter" pada kolom input
// ketika user mengetik di kolom input dan melepas tombol keybord (`event keyup`);
inputCatatan.addEventListener("keyup", function (event) {
    // periksa apakah tombol keyboard yang ditekan user adalah enter?
    if (event.key === "Enter") {
        tambahCatatan(); // jika ya, jalankan fungsi tambahCatatan
    }
});