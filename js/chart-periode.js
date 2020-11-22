
Highcharts.chart('chart-period', {

    title: {
        text: ''
    },

    subtitle: {
        text: ''
    },

    yAxis: {
        title: {
            text: 'Total Kas'
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2010 to 2017'
        }
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
            pointStart: 1
        }
    },

    series: [{
        name: 'Total Kas',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, ],

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

document.addEventListener('DOMContentLoaded', function() {
    var elem1 = document.querySelectorAll('select');
    var instance1 = M.FormSelect.init(elem1, {});
    

});

function getData() {
    var bulan = document.getElementById("get-tanggal");
    var bulan_res = bulan.options[bulan.selectedIndex].value;
    var tahun = document.getElementById("get-tahun");
    var tahun_res = tahun.options[tahun.selectedIndex].value;
    


    console.log(`${tahun_res}${bulan_res}`);
    inputTotal_plus(`${tahun_res}${bulan_res}`);
    inputTotal_min(`${tahun_res}${bulan_res}`);
}

function inputTotal_plus(data) {
    var total_plus=data;
    document.getElementById("total-plus").innerHTML = total_plus;
 
}

function inputTotal_min(data) {
    var total_min=data;
    document.getElementById("total-min").innerHTML = total_min;
 
}

