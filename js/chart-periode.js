var tahun_select = `2020`;
var bulan_select = ``;
var url_endpoint = `http://localhost:3000/transaction/`;
var url_transaksiTahun = `${url_endpoint}?tahun=${tahun_select}`;
var url_transaksiBulan = `${url_endpoint}?tahun=${tahun_select}&bulan=${bulan_select}`;

fetch(url_transaksiTahun)
    .then(function (response) {
        response.json().then(function (data) {
            inputTotal_plus(data.total_pemasukan);
            inputTotal_min(data.total_pengeluaran);
            grafik_tahun(data);
        })
    })



document.addEventListener('DOMContentLoaded', function () {
    var elem1 = document.querySelectorAll('select');
    var instance1 = M.FormSelect.init(elem1, {});


});

function getData() {

    var bulan = document.getElementById("get-tanggal");
    bulan_select = bulan.options[bulan.selectedIndex].value;
    var tahun = document.getElementById("get-tahun");
    tahun_select = tahun.options[tahun.selectedIndex].value;
    console.log(bulan_select);

    url_transaksiTahun = `${url_endpoint}?tahun=${tahun_select}`;
    url_transaksiBulan = `${url_endpoint}?tahun=${tahun_select}&bulan=${bulan_select}`;

    if (bulan_select == ``) {
        console.log(`jalan tahun`);
        fetch(url_transaksiTahun)
            .then(function (response) {
                response.json().then(function (data) {
                    inputTotal_plus(data.total_pemasukan);
                    inputTotal_min(data.total_pengeluaran);
                    grafik_tahun(data);
                })
            })
    }
    else {
        fetch(url_transaksiBulan)
            .then(function (response) {
                response.json().then(function (data) {
                    inputTotal_plus(data.total_pemasukan);
                    inputTotal_min(data.total_pengeluaran);
                    grafik(data);
                })
            })
    }

}


function inputTotal_plus(data) {
    var total_plus = data;
    document.getElementById("total-plus").innerHTML = total_plus;

}

function inputTotal_min(data) {
    var total_min = data;
    document.getElementById("total-min").innerHTML = total_min;

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
                text: 'Total Pendapatan'
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
            name: 'Total Pendapatan',
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
                text: 'Total Pendapatan'
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
            name: 'Total Pendapatan',
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