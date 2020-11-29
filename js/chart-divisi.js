var tahun_select = `2020`;
var bulan_select = ``;
var divisi_select = `sales`;
var url_endpoint = `http://localhost:3000/transaction/?divisi=${divisi_select}`;
var url_transaksiTahun = `${url_endpoint}&tahun=${tahun_select}`;
var url_transaksiBulan = `${url_endpoint}&tahun=${tahun_select}&bulan=${bulan_select}`;

fetch(url_transaksiTahun)
    .then(function (response) {
        response.json().then(function (data) {
            grafik_tahun(data);
            detilTransaksi(data);
        })
    })

document.addEventListener('DOMContentLoaded', function () {
    var elem1 = document.querySelectorAll('select');
    var instance1 = M.FormSelect.init(elem1, {});


});

function detilTransaksi(data) {
    var detTransaksi = ``;
    var count = 0;
    data.data.forEach(function (element){
        detTransaksi +=
            `<tr>
                <th>${count+=1}</th>
                <td>${element.tanggal_transaksi}</td>
                <td>${element.jenis_transaksi}</td>
                <td>${element.divisi}</td>
                <td>${element.jumlah_transaksi}</td>
                <td>${element.deskripsi}</td>
            </tr>`;
    });
    document.getElementById("table-trans").innerHTML = detTransaksi;
}

function getData() {

    var divisi = document.getElementById("get-divisi");
    divisi_select = divisi.options[divisi.selectedIndex].value;
    console.log(divisi_select)

    var bulan = document.getElementById("get-tanggal");
    bulan_select = bulan.options[bulan.selectedIndex].value;
    console.log(bulan_select)

    var tahun = document.getElementById("get-tahun");
    tahun_select = tahun.options[tahun.selectedIndex].value;
    console.log(tahun_select);

    url_endpoint = `http://localhost:3000/transaction/?divisi=${divisi_select}`;
    url_transaksiTahun = `${url_endpoint}&tahun=${tahun_select}`;
    url_transaksiBulan = `${url_endpoint}&tahun=${tahun_select}&bulan=${bulan_select}`;

    console.log(url_endpoint);


    if (bulan_select == ``) {
        console.log(url_transaksiTahun);
        fetch(url_transaksiTahun)
            .then(function (response) {
                response.json().then(function (data) {
                    grafik_tahun(data);         
                    detilTransaksi(data)
                })
            })
    }
    else {
        console.log(url_transaksiBulan)
        fetch(url_transaksiBulan)
            .then(function (response) {
                response.json().then(function (data) {
                    grafik(data);
                    detilTransaksi(data)
                })
            })
    }

}

function array_data(data) {
    var count;
    var check = ``;
    var data_done = [];

    data.data.forEach(function (element) {
        if (element.tanggal_transaksi != check) {
            check = element.tanggal_transaksi;
            data_done[check] = 0;
            if (element.jenis_transaksi == 'PEMASUKAN') {
                data_done[check] += element.jumlah_transaksi;
            }
            else {
                data_done[check] -= element.jumlah_transaksi;
            }
        }
        else {

            if (element.jenis_transaksi == 'PEMASUKAN') {
                data_done[check] += element.jumlah_transaksi;
            }
            else {
                data_done[check] -= element.jumlah_transaksi;
            }
        }

    });

    return (Object.values(data_done));
}

function date_data(data) {
    var check = ``;
    var data_done = [];


    data.data.forEach(function (element) {
        if (element.tanggal_transaksi != check) {
            check = element.tanggal_transaksi;
            data_done[check] = check;
        }
    });
    return (Object.values(data_done));
}

function grafik(data_api) {


    Highcharts.chart('chart-period', {

        title: {
            text: ''
        },

        subtitle: {
            text: ''
        },

        yAxis: {
            title: {
                text: 'Total Pendapatan/Pengeluaran'
            }
        },

        xAxis: {
            categories: date_data(data_api),
            crosshair: true
        },



        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 0
            }
        },

        series: [{
            name: 'Total Pendapatan/Pengeluaran',
            data: array_data(data_api)
        },],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });



}


function array_data_tahun(data) {
    var count;
    var check = ``;
    var data_done = [];

    data.data.forEach(function (element) {
        if (element.tanggal_transaksi.substring(0, 7) != check) {
            check = element.tanggal_transaksi.substring(0, 7);
            data_done[check] = 0;
            if (element.jenis_transaksi == 'PEMASUKAN') {
                data_done[check] += element.jumlah_transaksi;
            }
            else {
                data_done[check] -= element.jumlah_transaksi;
            }
        }
        else {

            if (element.jenis_transaksi == 'PEMASUKAN') {
                data_done[check] += element.jumlah_transaksi;
            }
            else {
                data_done[check] -= element.jumlah_transaksi;
            }
        }

    });

    return (Object.values(data_done));
}

function date_data_tahun(data) {
    var check = ``;
    var data_done = [];


    data.data.forEach(function (element) {
        if (element.tanggal_transaksi.substring(0, 7) != check) {
            check = element.tanggal_transaksi.substring(0, 7);
            data_done[check] = check;
        }
    });
    return (Object.values(data_done));
}

function grafik_tahun(data_api) {


    Highcharts.chart('chart-period', {

        title: {
            text: ''
        },

        subtitle: {
            text: ''
        },

        yAxis: {
            title: {
                text: 'Total Pendapatan/Pengeluaran'
            }
        },

        xAxis: {
            categories: date_data_tahun(data_api),
            crosshair: true
        },



        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 0
            }
        },

        series: [{
            name: 'Total Pendapatan/Pengeluaran',
            data: array_data_tahun(data_api)
        },],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });



}