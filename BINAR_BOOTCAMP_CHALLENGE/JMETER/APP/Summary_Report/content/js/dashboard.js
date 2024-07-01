/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 2.2083333333333335, "KoPercent": 97.79166666666667};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.005416666666666667, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "GET Product List"], "isController": false}, {"data": [0.0, 500, 1500, "GET Fetch Order"], "isController": false}, {"data": [0.0, 500, 1500, "POST Create Order"], "isController": false}, {"data": [0.0, 500, 1500, "DELETE Delete Product"], "isController": false}, {"data": [0.0, 500, 1500, "GET Fetch Product by ID"], "isController": false}, {"data": [0.0, 500, 1500, "GET Fetch Order by ID"], "isController": false}, {"data": [0.0, 500, 1500, "PUT Edit Order by ID"], "isController": false}, {"data": [0.0, 500, 1500, "POST Login Account"], "isController": false}, {"data": [0.0, 500, 1500, "POST Fetch Product"], "isController": false}, {"data": [0.0, 500, 1500, "POST Register Account"], "isController": false}, {"data": [0.0, 500, 1500, "GET Product"], "isController": false}, {"data": [0.065, 500, 1500, "GET Fetch Product"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2400, 2347, 97.79166666666667, 3612.697500000001, 0, 265274, 202.0, 1250.6000000000022, 25484.799999999967, 62236.56999999993, 3.8528221922558274, 401.5487950148093, 0.670058078284531], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET Product List", 200, 200, 100.0, 5888.124999999999, 167, 80261, 501.5, 28877.40000000005, 46483.85, 71474.2300000001, 0.32187356162752145, 0.10086838469362465, 0.05815098525497214], "isController": false}, {"data": ["GET Fetch Order", 200, 200, 100.0, 2556.3149999999987, 29, 59043, 194.0, 328.30000000000007, 24995.54999999993, 58885.160000000105, 0.35796682005544905, 0.11055371761966383, 0.0636230090332927], "isController": false}, {"data": ["POST Create Order", 200, 200, 100.0, 4006.9400000000005, 33, 60748, 215.5, 6271.100000000027, 36725.74999999997, 60744.8, 0.35712372551470456, 0.11050259026302163, 0.08858342410228023], "isController": false}, {"data": ["DELETE Delete Product", 200, 200, 100.0, 748.0799999999996, 27, 17832, 191.0, 926.7000000000007, 2243.749999999994, 15779.420000000006, 0.3223518793114564, 0.09853925490377796, 0.07082927035652117], "isController": false}, {"data": ["GET Fetch Product by ID", 200, 189, 94.5, 18187.950000000004, 29, 265274, 210.0, 63523.40000000001, 120213.05, 125679.85000000005, 0.3225884497205577, 400.8969108753639, 0.059556002362960395], "isController": false}, {"data": ["GET Fetch Order by ID", 200, 200, 100.0, 1386.075, 33, 60223, 190.5, 312.5, 3701.399999999993, 59868.630000000296, 0.35809051812117065, 0.11038210160639406, 0.06679227437611679], "isController": false}, {"data": ["PUT Edit Order by ID", 200, 200, 100.0, 1864.6450000000013, 32, 60216, 201.5, 505.400000000001, 15929.549999999983, 38725.720000000074, 0.35810590624071165, 0.11054421578387592, 0.07064198541076537], "isController": false}, {"data": ["POST Login Account", 200, 200, 100.0, 2191.0299999999997, 173, 50943, 483.5, 2851.3000000000006, 13246.399999999994, 37948.490000000005, 0.32196994088631886, 0.09838319775715738, 0.08520884177753164], "isController": false}, {"data": ["POST Fetch Product", 200, 200, 100.0, 1.2950000000000004, 0, 6, 1.0, 2.0, 2.0, 4.990000000000009, 0.32208868067645063, 0.8284976415056358, 0.0], "isController": false}, {"data": ["POST Register Account", 200, 200, 100.0, 42.37500000000003, 0, 994, 1.0, 153.8, 350.09999999999957, 558.97, 0.32181607246010685, 0.8277964207616422, 0.0], "isController": false}, {"data": ["GET Product", 200, 200, 100.0, 3080.3849999999998, 32, 60246, 213.0, 14440.2, 18939.999999999978, 60210.73, 0.3220108936285314, 0.10058123469441972, 0.0616348976085861], "isController": false}, {"data": ["GET Fetch Product", 200, 158, 79.0, 3399.155000000002, 31, 105746, 202.0, 13869.500000000005, 20595.349999999977, 53352.21000000004, 0.32229993231701426, 0.09565761272440133, 0.07616853869210688], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.io.FileNotFoundException/Non HTTP response message: D:\\\\OKILANI\\\\SQA BOOTCAMP\\\\BINAR\\\\NEWMAN\\\\710f4b0d6971497243139d0885ff8369 - Shortcut.lnk (The system cannot find the path specified)", 400, 17.04303365999148, 16.666666666666668], "isController": false}, {"data": ["502/Bad Gateway", 1706, 72.68853855986366, 71.08333333333333], "isController": false}, {"data": ["504/Gateway Time-out", 15, 0.6391137622496804, 0.625], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 23,131,971; received: 234,326)", 1, 0.04260758414997869, 0.041666666666666664], "isController": false}, {"data": ["500/Internal Server Error", 83, 3.536429484448232, 3.4583333333333335], "isController": false}, {"data": ["403/Forbidden", 142, 6.050276949296975, 5.916666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2400, 2347, "502/Bad Gateway", 1706, "Non HTTP response code: java.io.FileNotFoundException/Non HTTP response message: D:\\\\OKILANI\\\\SQA BOOTCAMP\\\\BINAR\\\\NEWMAN\\\\710f4b0d6971497243139d0885ff8369 - Shortcut.lnk (The system cannot find the path specified)", 400, "403/Forbidden", 142, "500/Internal Server Error", 83, "504/Gateway Time-out", 15], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["GET Product List", 200, 200, "502/Bad Gateway", 154, "403/Forbidden", 46, "", "", "", "", "", ""], "isController": false}, {"data": ["GET Fetch Order", 200, 200, "502/Bad Gateway", 185, "403/Forbidden", 15, "", "", "", "", "", ""], "isController": false}, {"data": ["POST Create Order", 200, 200, "502/Bad Gateway", 179, "403/Forbidden", 17, "504/Gateway Time-out", 4, "", "", "", ""], "isController": false}, {"data": ["DELETE Delete Product", 200, 200, "502/Bad Gateway", 161, "500/Internal Server Error", 39, "", "", "", "", "", ""], "isController": false}, {"data": ["GET Fetch Product by ID", 200, 189, "502/Bad Gateway", 177, "504/Gateway Time-out", 11, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 23,131,971; received: 234,326)", 1, "", "", "", ""], "isController": false}, {"data": ["GET Fetch Order by ID", 200, 200, "502/Bad Gateway", 189, "403/Forbidden", 11, "", "", "", "", "", ""], "isController": false}, {"data": ["PUT Edit Order by ID", 200, 200, "502/Bad Gateway", 186, "403/Forbidden", 14, "", "", "", "", "", ""], "isController": false}, {"data": ["POST Login Account", 200, 200, "502/Bad Gateway", 156, "500/Internal Server Error", 44, "", "", "", "", "", ""], "isController": false}, {"data": ["POST Fetch Product", 200, 200, "Non HTTP response code: java.io.FileNotFoundException/Non HTTP response message: D:\\\\OKILANI\\\\SQA BOOTCAMP\\\\BINAR\\\\NEWMAN\\\\710f4b0d6971497243139d0885ff8369 - Shortcut.lnk (The system cannot find the path specified)", 200, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["POST Register Account", 200, 200, "Non HTTP response code: java.io.FileNotFoundException/Non HTTP response message: D:\\\\OKILANI\\\\SQA BOOTCAMP\\\\BINAR\\\\NEWMAN\\\\710f4b0d6971497243139d0885ff8369 - Shortcut.lnk (The system cannot find the path specified)", 200, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["GET Product", 200, 200, "502/Bad Gateway", 161, "403/Forbidden", 39, "", "", "", "", "", ""], "isController": false}, {"data": ["GET Fetch Product", 200, 158, "502/Bad Gateway", 158, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
