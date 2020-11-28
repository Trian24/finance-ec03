var base_url = "http://localhost:3000/";

async function getTotal() {
    let response = await fetch(base_url+"total");
    let data = await response.json();
    return data[0].total_kas;
}

document.addEventListener('DOMContentLoaded', function() {
    var elem1 = document.querySelectorAll('select');
    var elem2 = document.querySelectorAll('.datepicker');
    var elem3 = document.querySelectorAll('.modal');
    var options = {
        format: 'yyyy-mm-dd', 
        formatSubmit: 'yyyy-mm-dd'
    };
    var instance1 = M.FormSelect.init(elem1, {});
    var instance2 = M.Datepicker.init(elem2, options);
    var instance3 = M.Modal.init(elem3, {});
});

async function hitungTotal(jumlah_transaksi, jenis) {
    var total_sebelum = await getTotal();
    var total_sekarang;
    if(jenis == "PEMASUKAN") {
        total_sekarang = total_sebelum + jumlah_transaksi;
    } else if(jenis == "PENGELUARAN") {
        total_sekarang = total_sebelum - jumlah_transaksi;
    }
    return total_sekarang;
}

async function getData() {
    var d = document.getElementById("divisi");
    var divisi = d.options[d.selectedIndex].value;
    var tanggal = document.getElementById("date").value;
    var jenis = document.querySelector('input[name="jenis"]:checked').value;
    var jumlah =  parseInt(document.getElementById("jumlah").value);
    var deskripsi = document.getElementById("deskripsi").value;
    var total = await hitungTotal(jumlah, jenis);
    var data = {
        tanggal_transaksi: tanggal,
        jenis_transaksi: jenis,
        divisi: divisi,
        jumlah_transaksi: jumlah,
        deskripsi: deskripsi,
        total_kas: total
    };
    console.log(data);

    if(divisi !== "" && tanggal !== "" && jenis !== null && jumlah !== "" &&
    deskripsi !== "") {
        fetch(base_url+"transaction", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => {
            console.log(response);
            formSent();
        })
        .catch(err => {
            console.log(err)
        })
    } else {
        alert("Isi semua input terlebih dahulu");
        console.log("AAAAAAAAAAAAAABBBBBBBBBCCCCCCCCC");
    }
}

function formSent() {
    alert("Data sudah terkirim");
    document.getElementById("date").value = "";
    document.getElementById("jumlah").value = "";
    deskripsi = document.getElementById("deskripsi").value = "";
}