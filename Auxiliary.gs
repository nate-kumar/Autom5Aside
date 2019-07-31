function addDays(date, days) {
  return new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
}

function zero2D(rows, cols) {
  var array = [], row = [];
  while (cols--) row.push(0);
  while (rows--) array.push(row.slice());
  return array;
}


function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

/**
* Return a string containing an HTML table representation
* of the given range, preserving style settings.
*/
function getHtmlTable(range){
  var ss = range.getSheet().getParent();
  var sheet = range.getSheet();
  startRow = range.getRow();
  startCol = range.getColumn();
  lastRow = range.getLastRow();
  lastCol = range.getLastColumn();
  
  // Read table contents
  var data = range.getValues();
  
  // Get css style attributes from range
  var fontColors = range.getFontColors();
  var backgrounds = range.getBackgrounds();
  var fontFamilies = range.getFontFamilies();
  Logger.log(fontFamilies)
  var fontSizes = range.getFontSizes();
  var fontLines = range.getFontLines();
  var fontWeights = range.getFontWeights();
  var horizontalAlignments = range.getHorizontalAlignments();
  var verticalAlignments = range.getVerticalAlignments();
  var borderColor = "black black black black";
  
  // Get column widths in pixels
  var colWidths = [];
  for (var col=startCol; col<=lastCol; col++) { 
    colWidths.push(sheet.getColumnWidth(col));
  }
  // Get Row heights in pixels
  var rowHeights = [];
  for (var row=startRow; row<=lastRow; row++) { 
    rowHeights.push(sheet.getRowHeight(row));
  }
  
  // Future consideration...
  var numberFormats = range.getNumberFormats();
  Logger.log(numberFormats)
  
  // Build HTML Table, with inline styling for each cell
  var tableFormat = 'style="border-collapse:collapse;text-align:center" border = 1.5 cellpadding = 5';
  var html = ['<table '+tableFormat+'>'];
  // Column widths appear outside of table rows
  for (col=0;col<colWidths.length;col++) {
    html.push('<col width="'+colWidths[col]+'">')
  }
  // Populate rows
  for (row=0;row<data.length;row++) {
    html.push('<tr height="'+rowHeights[row]+'">');
    if (season == 1) {
      for (col=0;col<data[row].length;col++) {
      // Get formatted data
      if (col==2) {
      borderColor = "#ffdd00 black white black"
      }
      else {
      borderColor = "black black black black"
      }
      if (col==1||col==4) {
      var cellText = parseFloat(data[row][col]).toFixed(3)
      }
      else {
      var cellText = data[row][col];
      }
      if(col==0||col==3) { var horizAlign = 'left' } else { var horizAlign = 'center' }
      Logger.log(cellText)
      if (cellText instanceof Date) {
      cellText = Utilities.formatDate(
      cellText,
      ss.getSpreadsheetTimeZone(),
      'MMM/d EEE');
      }
      var style = 'style="'
      + 'color: ' + fontColors[row][col]+'; '
      + 'font-family: Sans-Serif; '
      + 'font-size: 7; '
      + 'font-weight: ' + fontWeights[row][col]+'; '
      + 'border-color: ' + borderColor+'; '
      + 'background-color: ' + backgrounds[row][col]+'; '
      + 'text-align: ' + horizAlign+'; '
      + 'vertical-align: ' + verticalAlignments[row][col]+'; '
      + 'step: 0.01; '
      +'"';
      html.push('<td ' + style + '>'
      +cellText
      +'</td>');
      }
    }
    else if (season == 2) {
      for (col=0;col<data[row].length;col++) {
        // Get formatted data
        if ((row>=0)&&(row<=7)) {
          if (col==1) {
            borderColor = "#f3f3f3 black #f3f3f3 black"
          }
          else {
            borderColor = "black black black black"
          }
        }
        else {
          borderColor = "#f3f3f3 #f3f3f3 #f3f3f3 #f3f3f3"
        }
        /*if (col==1||col==4) {
        var cellText = parseFloat(data[row][col]).toFixed(3)
        }
        else {
        var cellText = data[row][col];
        }*/
        var cellText = data[row][col];
        if(col==0||col==2) { var horizAlign = 'left' } else { var horizAlign = 'center' }
        Logger.log(cellText)
        if (cellText instanceof Date) {
          cellText = Utilities.formatDate(
            cellText,
            ss.getSpreadsheetTimeZone(),
            'MMM/d EEE');
        }
        var style = 'style="'
        + 'color: ' + fontColors[row][col]+'; '
        + 'font-family: Sans-Serif; '
        + 'font-size: 7; '
        + 'font-weight: ' + fontWeights[row][col]+'; '
        //+ 'border-color: ' + borderColor+'; '
        + 'background-color: ' + backgrounds[row][col]+'; '
        + 'text-align: ' + horizAlign+'; '
        + 'vertical-align: ' + verticalAlignments[row][col]+'; '
        + 'step: 0.01; '
        +'"';
        html.push('<td ' + style + '>'
                  +cellText
                  +'</td>');
      }
    }
    html.push('</tr>');
  }
  html.push('</table>');
  
  return html.join('');
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function filterArray(arrayUnfilt) {
  
  var array = []
  for (var a = 0; a < arrayUnfilt.length; a++) {
    if (arrayUnfilt[a] != "") {
      array.push(arrayUnfilt[a])
    }
  }
  return array
  
}

function random(number) {
  return Math.floor(Math.random()*(number+1))+1
}
