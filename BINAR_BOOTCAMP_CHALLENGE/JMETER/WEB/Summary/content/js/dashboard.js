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

    var data = {"OkPercent": 61.111111111111114, "KoPercent": 38.888888888888886};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3123611111111111, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "POST Regristration"], "isController": false}, {"data": [0.0, 500, 1500, "GET Get Category"], "isController": false}, {"data": [0.52, 500, 1500, "GET List Product"], "isController": false}, {"data": [0.0, 500, 1500, "PUT Update Offer-1"], "isController": false}, {"data": [0.6, 500, 1500, "GET List Categories"], "isController": false}, {"data": [0.7225, 500, 1500, "PUT Update Offer-0"], "isController": false}, {"data": [0.68, 500, 1500, "GET List Offers"], "isController": false}, {"data": [0.6275, 500, 1500, "GET Get Product"], "isController": false}, {"data": [0.0, 500, 1500, "DELETE Delete Product"], "isController": false}, {"data": [0.0, 500, 1500, "PUT Update Product"], "isController": false}, {"data": [0.0, 500, 1500, "PUT Update Offer"], "isController": false}, {"data": [0.57, 500, 1500, "POST Create Offer"], "isController": false}, {"data": [0.07, 500, 1500, "PUT Update Profile"], "isController": false}, {"data": [0.0, 500, 1500, "GET Get Category-1"], "isController": false}, {"data": [0.36, 500, 1500, "POST Create Product"], "isController": false}, {"data": [0.6325, 500, 1500, "GET Get Category-0"], "isController": false}, {"data": [0.39, 500, 1500, "POST Session"], "isController": false}, {"data": [0.45, 500, 1500, "GET Get Profile"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3600, 1400, 38.888888888888886, 1088.470277777781, 26, 4311, 941.0, 2001.9, 2359.8999999999996, 3242.99, 21.935169388252497, 50.81317928573605, 29.311536528150132], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["POST Regristration", 200, 200, 100.0, 1720.7199999999996, 526, 3068, 1662.5, 2382.8, 2799.7499999999995, 3054.67, 1.2502813132954915, 0.760669197444425, 0.9041218844552524], "isController": false}, {"data": ["GET Get Category", 200, 200, 100.0, 1763.279999999999, 419, 4182, 1730.0, 2467.1, 2842.2499999999995, 3430.98, 1.316985157577274, 3.4480832104147185, 1.6443279918610318], "isController": false}, {"data": ["GET List Product", 200, 0, 0.0, 901.8449999999997, 92, 2303, 841.0, 1392.4, 1573.85, 2205.9200000000037, 1.3329068031563234, 16.78749258570591, 0.9220096444137875], "isController": false}, {"data": ["PUT Update Offer-1", 200, 200, 100.0, 1039.5549999999994, 133, 2476, 1065.5, 1550.8000000000002, 1694.4499999999996, 2414.3700000000035, 1.3709898546750754, 2.636209984233617, 0.8398116174252811], "isController": false}, {"data": ["GET List Categories", 200, 0, 0.0, 815.6200000000001, 46, 2181, 783.0, 1478.9, 1605.5, 1873.94, 1.3185654008438819, 1.3777978309599155, 0.8270134905722574], "isController": false}, {"data": ["PUT Update Offer-0", 200, 0, 0.0, 647.1349999999995, 26, 2077, 540.5, 1279.3000000000002, 1464.3999999999996, 1877.950000000001, 1.3695065667839876, 1.6346612268724576, 0.9483966715854777], "isController": false}, {"data": ["GET List Offers", 200, 0, 0.0, 652.8700000000005, 56, 1781, 559.0, 1152.4, 1352.1499999999996, 1671.9, 1.362797004572184, 1.6597510042110426, 0.866427474498661], "isController": false}, {"data": ["GET Get Product", 200, 0, 0.0, 660.9700000000008, 42, 1958, 632.5, 973.6, 1145.8499999999997, 1499.2400000000007, 1.3487268018990075, 2.476066157999973, 0.8529116482790245], "isController": false}, {"data": ["DELETE Delete Product", 200, 200, 100.0, 546.5649999999999, 43, 1887, 498.0, 902.3000000000002, 992.9, 1395.6200000000013, 1.358575669268339, 1.511269491315305, 0.8872003279262022], "isController": false}, {"data": ["PUT Update Product", 200, 200, 100.0, 596.9349999999995, 37, 1461, 552.5, 921.9, 1133.75, 1454.7800000000002, 1.3555186553254939, 1.5086896158799012, 7.782960548053137], "isController": false}, {"data": ["PUT Update Offer", 200, 200, 100.0, 1686.9199999999998, 167, 3761, 1585.0, 2559.8, 2740.5499999999997, 3717.5700000000024, 1.3676896985611906, 4.262356862724985, 1.7849285510353412], "isController": false}, {"data": ["POST Create Offer", 200, 0, 0.0, 761.305, 157, 2698, 693.5, 1182.1000000000001, 1421.7499999999995, 2142.560000000003, 1.359915141295183, 4.314682716923464, 0.9881828686389968], "isController": false}, {"data": ["PUT Update Profile", 200, 0, 0.0, 2264.7349999999997, 1181, 4311, 2170.0, 3339.4000000000005, 3840.7499999999977, 4180.650000000001, 1.2656305371336, 1.9877320849997469, 4.415178084104313], "isController": false}, {"data": ["GET Get Category-1", 200, 200, 100.0, 1043.3849999999993, 315, 3374, 974.0, 1537.7, 1841.049999999999, 2386.4600000000005, 1.3183133499001378, 2.5349208847200893, 0.80754417173668], "isController": false}, {"data": ["POST Create Product", 200, 0, 0.0, 1296.4300000000007, 350, 2571, 1249.5, 1856.8, 1945.75, 2187.6800000000003, 1.3188088518450136, 3.08346267276396, 4.873951753026667], "isController": false}, {"data": ["GET Get Category-0", 200, 0, 0.0, 719.72, 43, 2158, 714.5, 1198.6000000000001, 1409.1999999999996, 2082.630000000002, 1.3202540168728463, 0.917989121106901, 0.8396763974888769], "isController": false}, {"data": ["POST Session", 200, 0, 0.0, 1361.9549999999997, 203, 3275, 1150.0, 3062.8000000000015, 3206.0, 3247.95, 1.2554218531281975, 2.5728179002755653, 0.8845452273568977], "isController": false}, {"data": ["GET Get Profile", 200, 0, 0.0, 1112.5200000000002, 128, 3237, 1028.5, 1814.6000000000001, 2185.6499999999996, 3208.290000000001, 1.2913973565096113, 2.027733464463973, 0.8076151886085838], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 800, 57.142857142857146, 22.22222222222222], "isController": false}, {"data": ["403/Forbidden", 400, 28.571428571428573, 11.11111111111111], "isController": false}, {"data": ["401/Unauthorized", 200, 14.285714285714286, 5.555555555555555], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3600, 1400, "500/Internal Server Error", 800, "403/Forbidden", 400, "401/Unauthorized", 200, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["POST Regristration", 200, 200, "401/Unauthorized", 200, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["GET Get Category", 200, 200, "500/Internal Server Error", 200, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["PUT Update Offer-1", 200, 200, "500/Internal Server Error", 200, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE Delete Product", 200, 200, "403/Forbidden", 200, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["PUT Update Product", 200, 200, "403/Forbidden", 200, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["PUT Update Offer", 200, 200, "500/Internal Server Error", 200, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["GET Get Category-1", 200, 200, "500/Internal Server Error", 200, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
