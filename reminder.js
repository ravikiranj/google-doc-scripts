function sendEmail() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var numRows = sheet.getLastRow() - 1;   // Number of rows to process
  var timeColumn = 8;
  var maxColumns = sheet.getLastColumn();
  var dataRange = sheet.getRange(startRow, timeColumn, numRows);
  var data = dataRange.getValues();
  var dataLen = data.length;

  var emailSubject = "Airport Pickup Reminder";
  var emailAddresses = "ravikiran.j.127@gmail.com,rkjanardhana@gmail.com";
  var headers = sheet.getRange(1, 1, 1, maxColumns).getValues()[0];
  var rowData;
  var needToSendEmail = false;
  var markup = getInlineCSS() + "<table><thead><tr>";
  for (var j = 0; j < headers.length; j++) {
    markup += "<th>" + headers[j] + "</th>";
  }
  markup += "</tr></thead><tbody>";

  for (var i = 0; i < dataLen; i++) {    
    var sheetTime = Date.parse(data[i]);
    var currTime = new Date().getTime();
    var diff = (sheetTime - currTime) / (1000*60*60*24);
    if (diff > 0 && diff <= 2) {
      rowData = sheet.getRange(startRow + i, 1, 1, maxColumns).getValues()[0];   
      markup += "<tr>";
      for (var j = 0; j < rowData.length; j++) {
        markup += "<td>" + rowData[j] + "</td>";
      }
      markup += "</tr>";
      needToSendEmail = true;
    }    
  }
  markup += "</tbody></table>";
  if (needToSendEmail) {    
    MailApp.sendEmail({
      to: emailAddresses,
      subject: emailSubject,
      htmlBody: markup
    });
  }   
}

function getInlineCSS() {
  var css = "<head><style type='text/css'>";
  css += "table{border:1px solid #DDD;border-spacing:0;border-collapse:collapse;margin:0 0 1.5em}td{border:1px solid #DDD;vertical-align:top}th{color:#FFF;background-color:#6199DF}tr{margin:0;padding:0;border:0 none;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline}table td{padding:6px 10px}table th{border:1px solid #4D90FE}";
  css += "</style></head>";
  return css;
}

