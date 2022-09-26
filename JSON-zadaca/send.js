
var obj, myJson;
var start, end, date, peoples,way;


function getValues() {
    start = $("#startpoint").val();
    end = $("#endtpoint").val();
    date = $("#date").val();
    peoples = $("#peoplenumber").val();
    way = $('input[name="radiochoice"]:checked').val();
    formObj();
}

function formObj() {
    obj = { start: start, end: end, date: date, peoples: peoples, way: way };
    /* console.log("object.."+obj); */
    myJson = JSON.stringify(obj);
    /* console.log("json.."+myJson); */
    $("tbody").empty();
}

function checkRoute() {
    $(document).ready(function () {
        getValues();
        $.ajax({
            method: "POST",
            url: "./form.php",
            data: { 'strObj': myJson },
            async: false,
            success: function (result) {
                /* console.log(result); */
                routes = JSON.parse(result);
                for(var r in routes){
                    for(var x in routes[r]){
                        $("tbody").append(
                            "<tr>" +
                            "<td>" + routes[r][x].startPoint + "</td>" +
                            "<td>" + routes[r][x].endPoint + "</td>" +
                            "<td>" + routes[r][x].startTime + "</td>" +
                            "<td>" + routes[r][x].endTime + "</td>" +
                            "<td>" + routes[r][x].date + "</td>" +
                            "<td>" + routes[r][x].freeSpace + "</td>" +
                            "</tr>");
                    }
                    
                } 
            }
        });
    });
}