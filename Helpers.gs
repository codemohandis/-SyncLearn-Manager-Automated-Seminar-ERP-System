/**
 * Merges Date and Time strings into a single Date object
 */
function parseDateTime(dateVal, timeVal) {
  const date = new Date(dateVal);
  const timeStr = String(timeVal);
  const timeParts = timeStr.match(/(\d+):(\d+):?(\d+)?\s*(AM|PM)/i);
  if (!timeParts) return date;

  let hours = parseInt(timeParts[1]);
  if (timeParts[4].toUpperCase() === "PM" && hours < 12) hours += 12;
  if (timeParts[4].toUpperCase() === "AM" && hours === 12) hours = 0;

  date.setHours(hours, parseInt(timeParts[2]), 0, 0);
  return date;
}

/**
 * Checks for duplicate entries and time conflicts
 */
function checkDuplicateAndTimeClash(email, name, seminarID, currentSemData) {
  const regSheet = SpreadsheetApp.getActive().getSheetByName(REG_SHEET_NAME);
  const allRegData = regSheet.getDataRange().getValues();
  const currentSemTime = parseDateTime(currentSemData.date, currentSemData.time).getTime();

  for (let i = 1; i < allRegData.length; i++) {
    const prevStatus = String(allRegData[i][EMAIL_STATUS_COL - 1]);
    if (String(allRegData[i][3]).trim() === email && prevStatus.includes("✅")) {
      
      if (String(allRegData[i][2]).trim() === name && String(allRegData[i][1]).trim() === seminarID) 
        return "⚠️ Duplicate Entry";
      
      const prevSem = getSeminarData(allRegData[i][1]);
      if (prevSem && parseDateTime(prevSem.date, prevSem.time).getTime() === currentSemTime && 
          String(allRegData[i][1]) !== seminarID) {
        return "❌ Time Clash with " + allRegData[i][1];
      }
    }
  }
  return "PROCEED";
}

function getSeminarData(id) {
  try {
    const sheet = SpreadsheetApp.openById(SEMINAR_FILE_ID).getSheetByName(SEMINAR_SHEET_NAME);
    const rows = sheet.getDataRange().getValues();
    const row = rows.find(r => String(r[1]).trim() === String(id).trim()); 
    if (!row) return null;
    return { title: row[2], date: row[3], time: row[4], status: row[7], zoom: row[9], thumbnail: row[10], speaker: row[11] };
  } catch (e) { return null; }
}

function getDirectLink(url) {
  if (url && url.includes("drive.google.com")) {
    const id = url.includes("id=") ? url.split("id=")[1].split("&")[0] : url.split("/d/")[1].split("/")[0];
    return "https://lh3.googleusercontent.com/u/0/d/" + id;
  }
  return url;
}

function sendEmail(to, subject, htmlBody) {
  MailApp.sendEmail({ to: to, subject: subject, htmlBody: htmlBody });
}
