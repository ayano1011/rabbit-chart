<script>
    google.charts.load('48', {packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
            var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1Or4LHQ2u0i520Fc3sZTok8PI67ybi41alb3CttDMQrI/gviz/tq?range=A1:B9');
    query.send(handleQueryResponse);
        };

    function handleQueryResponse(response) {
            var data = response.getDataTable();

    var options = {
        title: '○月×日',
    width: 600,
    height: 500,
    legend: 'bottom'
            };

    var chart = new google.visualization.ColumnChart(document.getElementById('myLineChart'));
    chart.draw(data, options);
        };

    const url = 'https://script.google.com/macros/s/AKfycbz63aPDcd0LHT4RvxXk9__czJslwH23lD-UILhsmnfx1qyt0jmcd5tWKhycDR19fRcCTw/exec';

    fetch(url)
    .then(function (fetch_data) {
                return fetch_data.json();
            })
    .then(function (json) {
                for (var i in json) {
        console.log(json[i].createDate);
                }
    console.log(json[0].sum);
    $('#lists').append('<li><p>' + json[0].sum + '</p></li>');
            })
</script>