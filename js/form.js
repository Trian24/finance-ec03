document.addEventListener('DOMContentLoaded', function() {
    var elem1 = document.querySelectorAll('select');
    var elem2 = document.querySelectorAll('.datepicker');
    var instance1 = M.FormSelect.init(elem1, {});
    var instance2 = M.Datepicker.init(elem2, {});
});

function getData() {
    var d = document.getElementById("divisi");
    var divisi = d.options[d.selectedIndex].text;
    var tanggal = document.getElementById("date").value;
    var jenis = document.querySelector('input[name="jenis"]:checked').value;
    var jumlah =  parseInt(document.getElementById("jumlah").value);
    var deskripsi = document.getElementById("deskripsi").value;

    console.log(divisi + ", " + tanggal + ", " + jenis + ", " + jumlah+ + ", " + deskripsi);
}