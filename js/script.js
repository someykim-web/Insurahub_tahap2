// =====================================
// LOGIN
// =====================================

const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", function(e){

e.preventDefault();


let email = document.getElementById("loginEmail").value;
let password = document.getElementById("loginPassword").value;

let message = document.getElementById("loginMessage");


if(email=="" || password==""){

message.innerHTML="Email dan password harus diisi";
message.style.color="red";
return;

}


if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){

message.innerHTML="Email tidak valid";
message.style.color="red";
return;

}


if(
email === localStorage.getItem("userEmail") &&
password === localStorage.getItem("userPassword")
){

message.innerHTML="Login berhasil!";
message.style.color="green";


setTimeout(function(){

window.location.href="index.html";

},1000);


}

else{

message.innerHTML="Email atau password salah";
message.style.color="red";

}


});

}





// =====================================
// SIGN UP
// =====================================


const signupForm = document.getElementById("signupForm");


if(signupForm){


signupForm.addEventListener("submit",function(e){

e.preventDefault();


let nama =
document.getElementById("fullName").value;


let email =
document.getElementById("signupEmail").value;


let password =
document.getElementById("signupPassword").value;


let confirm =
document.getElementById("confirmPassword").value;


let phone =
document.getElementById("phone").value;


let message =
document.getElementById("signupMessage");



if(
nama=="" ||
email=="" ||
password=="" ||
confirm=="" ||
phone==""
){

message.innerHTML="Semua data harus diisi";
message.style.color="red";
return;

}



if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){

message.innerHTML="Email tidak valid";
message.style.color="red";
return;

}



if(password.length < 8){

message.innerHTML="Password minimal 8 karakter";
message.style.color="red";
return;

}



if(password!==confirm){

message.innerHTML="Password tidak sama";
message.style.color="red";
return;

}


// validasi nama lengkap: 3-32 karakter, tidak boleh mengandung angka

if(nama.length < 3 || nama.length > 32){

message.innerHTML="Nama lengkap harus 3-32 karakter";
message.style.color="red";
return;

}


if(/[0-9]/.test(nama)){

message.innerHTML="Nama lengkap tidak boleh mengandung angka";
message.style.color="red";
return;

}


// validasi nomor HP: awalan 08, hanya angka, panjang 10-16 digit

if(!/^08[0-9]{8,14}$/.test(phone)){

message.innerHTML="Nomor HP harus diawali 08, hanya berisi angka, dan panjang 10-16 digit";
message.style.color="red";
return;

}



localStorage.setItem("userName",nama);
localStorage.setItem("userEmail",email);
localStorage.setItem("userPassword",password);



message.innerHTML="Pendaftaran berhasil!";
message.style.color="green";


setTimeout(function(){

window.location.href="login.html";

},1000);



});


}






// =====================================
// ASURANSI MOBIL
// =====================================


function hitungPremiMobil(){


let harga =
Number(document.getElementById("hargaMobil").value);


let tahun =
Number(document.getElementById("tahunMobil").value);


let nama =
document.getElementById("namaPemilik").value;


let merk =
document.getElementById("merkMobil").value;



if(
harga==0 ||
tahun==0 ||
nama=="" ||
merk==""
){

alert("Semua data kendaraan harus diisi!");
return;

}



let tahunSekarang = new Date().getFullYear();

let umurMobil = tahunSekarang - tahun;


let premi;



if(umurMobil >= 0 && umurMobil <= 3){

premi = harga * 0.025;

}

else if(umurMobil > 3 && umurMobil <= 5){

if(harga < 200000000){

premi = harga * 0.04;

}

else{

premi = harga * 0.03;

}

}

else{

premi = harga * 0.05;

}




document.getElementById("hasilPremi").innerHTML =

"Estimasi Premi: Rp " +
premi.toLocaleString("id-ID")+
" / tahun";



localStorage.setItem(
"produk",
"Asuransi Mobil"
);


localStorage.setItem(
"jenisAsuransi",
"Mobil"
);


localStorage.setItem(
"premi",
premi
);


}




function checkoutMobil(){


let premi =
localStorage.getItem("premi");



if(!premi){

alert("Hitung premi terlebih dahulu!");

return;

}



localStorage.setItem(
"produk",
"Asuransi Mobil"
);



window.location.href="checkout.html";


}

// =====================================
// ASURANSI KESEHATAN
// =====================================


function hitungUmurDariTanggal(tanggalLahir){

let lahir = new Date(tanggalLahir);
let sekarang = new Date();

let umur = sekarang.getFullYear() - lahir.getFullYear();

let belumUlangTahun =
(sekarang.getMonth() < lahir.getMonth()) ||
(sekarang.getMonth() == lahir.getMonth() && sekarang.getDate() < lahir.getDate());

if(belumUlangTahun){
umur--;
}

return umur;

}



function hitungPremiKesehatan(){


let nama = document.getElementById("namaPeserta").value;

let tanggalLahir = document.getElementById("tanggalLahirKesehatan").value;

let merokok = document.getElementById("merokok").value;

let hipertensi = document.getElementById("hipertensi").value;

let diabetes = document.getElementById("diabetes").value;

let riwayat = document.getElementById("riwayat").value;

let kelas = document.getElementById("kelas").value;



if(
nama=="" ||
tanggalLahir=="" ||
merokok=="" ||
hipertensi=="" ||
diabetes=="" ||
riwayat=="" ||
kelas==""
){

alert("Semua data harus diisi!");

return;

}


let umur = hitungUmurDariTanggal(tanggalLahir);


// biaya premi dasar (P)

let P = 2000000;


// faktor pengali berdasarkan umur (m)

let m;

if(umur <= 20){

m = 0.1;

}

else if(umur <= 35){

m = 0.2;

}

else if(umur <= 50){

m = 0.25;

}

else{

m = 0.4;

}


// k1 = merokok, k2 = hipertensi, k3 = diabetes (1 = ya, 0 = tidak)

let k1 = (merokok=="Ya") ? 1 : 0;

let k2 = (hipertensi=="Ya") ? 1 : 0;

let k3 = (diabetes=="Ya") ? 1 : 0;


// Premi = P + (m*P) + (k1*0.5P) + (k2*0.4P) + (k3*0.5P)

let premi = P + (m*P) + (k1*0.5*P) + (k2*0.4*P) + (k3*0.5*P);



document.getElementById("hasilKesehatan").innerHTML =

"Estimasi Premi: Rp " +

premi.toLocaleString("id-ID") +

" / tahun";



localStorage.setItem(
"produk",
"Asuransi Kesehatan"
);


localStorage.setItem(
"jenisAsuransi",
"Kesehatan"
);


localStorage.setItem(
"premi",
premi
);



}



function checkoutKesehatan(){


let premi = localStorage.getItem("premi");


if(!premi){

alert("Hitung premi terlebih dahulu!");

return;

}


window.location.href="checkout.html";


}







// =====================================
// ASURANSI JIWA
// =====================================
// Catatan: fungsi hitungPremiJiwa() dan checkoutJiwa()
// sudah dipindah & diperbaiki langsung di dalam beli-jiwa.html
// supaya tidak ada duplikat/bentrok fungsi.






// =====================================
// CHECKOUT
// =====================================


let produkCheckout =
document.getElementById("checkoutProduk");


let hargaCheckout =
document.getElementById("checkoutHarga");



if(produkCheckout){


produkCheckout.innerHTML =
localStorage.getItem("produk");


}



if(hargaCheckout){


hargaCheckout.innerHTML =

"Rp " +

Number(localStorage.getItem("premi"))
.toLocaleString("id-ID");


}






// =====================================
// PEMBAYARAN
// =====================================


function bayarSekarang(){


let metode =

document.querySelector(
'input[name="metode"]:checked'
);



if(!metode){

alert("Pilih metode pembayaran!");

return;

}



localStorage.setItem(
"metode",
metode.value
);



localStorage.setItem(
"status",
"Berhasil"
);



window.location.href="pembayaran.html";


}






// =====================================
// HISTORY
// =====================================


let historyProduk =
document.getElementById("historyProduk");


let historyHarga =
document.getElementById("historyHarga");


let historyStatus =
document.getElementById("historyStatus");



if(historyProduk){



historyProduk.innerHTML =

localStorage.getItem("produk") || "-";



historyHarga.innerHTML =

"Rp " +

Number(
localStorage.getItem("premi") || 0
)
.toLocaleString("id-ID");



historyStatus.innerHTML =

localStorage.getItem("status") || "Belum Dibayar";


}






// ===============================
// NAVBAR USER
// ===============================


let userArea = document.getElementById("user-area");


if(userArea){

let userName = localStorage.getItem("userName");


if(userName){

userArea.innerHTML = `

<span>
${userName}
</span>

<button onclick="logout()">
Logout
</button>

`;

}

else{

userArea.innerHTML = `

<a href="login.html">Login</a>

<a href="signup.html">Sign Up</a>

`;

}

}


function logout(){

localStorage.removeItem("userName");
localStorage.removeItem("userEmail");
localStorage.removeItem("userPassword");

window.location.href="login.html";

}
