var Excel = require('exceljs');

// create workbook & add worksheet
var workbook = new Excel.Workbook();
var worksheet = workbook.addWorksheet('Discography');
var data = require('./log_analysis/device.json');



// add column headers
worksheet.columns = [
    { header: 'mac', key: 'mac'},
    { header: 'meter', key: 'meter'}
];

// add row using keys]
data.MANAGER_MAPPING[0].mac.forEach(function (ele,index,array) {

    worksheet.addRow({mac:ele, meter: data.MANAGER_MAPPING[0].meterNumber[index]});
});


// save workbook to disk
workbook.xlsx.writeFile('charger.xlsx').then(function() {
    console.log("saved");
});

/*
/!------------------excel demo--------------------*!/
var Excel = require('exceljs');

// create workbook & add worksheet
var workbook = new Excel.Workbook();
var worksheet = workbook.addWorksheet('Discography');

// add column headers
worksheet.columns = [
    { header: 'Album', key: 'album'},
    { header: 'Year', key: 'year'}
];

// add row using keys
worksheet.addRow({album: "Taylor Swift", year: 2006});

// add rows the dumb way
worksheet.addRow(["Fearless", 2008]);

// add an array of rows
var rows = [
    ["Speak Now", 2010],
    {album: "Red", year: 2012}
];
worksheet.addRows(rows);

// edit cells directly
worksheet.getCell('A6').value = "1989";
worksheet.getCell('B6').value = 2014;

// save workbook to disk
workbook.xlsx.writeFile('taylor_swift.xlsx').then(function() {
    console.log("saved");
});*/
