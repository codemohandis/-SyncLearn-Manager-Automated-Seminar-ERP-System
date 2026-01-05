/**
 * Time-Driven Trigger: Sends reminders 1 hour before event
 */
function autoReminderTrigger() {
  const ss = SpreadsheetApp.openById(SEMINAR_FILE_ID);
  const sheet = ss.getSheetByName(SEMINAR_SHEET_NAME);
  const seminars = sheet.getDataRange().getValues();
  const now = new Date();
  
  const windowStart = new Date(now.getTime() + (55 * 60 * 1000));
  const windowEnd = new Date(now.getTime() + (65 * 60 * 1000));

  for (let i = 1; i < seminars.length; i++) {
    if (!seminars[i][3] || !seminars[i][4] || seminars[i][7] === "Completed") continue;
    
    const semDateTime = parseDateTime(seminars[i][3], seminars[i][4]);
    if (semDateTime >= windowStart && semDateTime <= windowEnd) {
      sendSeminarReminder(seminars[i][1]); 
    }
  }
}

/**
 * Daily Trigger: Marks seminars as 'Completed' in Column H
 */
function updateSeminarStatus() {
  const ss = SpreadsheetApp.openById(SEMINAR_FILE_ID);
  const sheet = ss.getSheetByName(SEMINAR_SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const now = new Date();

  for (let i = 1; i < data.length; i++) {
    if (!data[i][3] || !data[i][4] || data[i][7] === "Completed") continue;
    
    const semDateTime = parseDateTime(data[i][3], data[i][4]);
    if (now > new Date(semDateTime.getTime() + (2 * 60 * 60 * 1000))) {
      sheet.getRange(i + 1, 8).setValue("Completed"); 
    }
  }
}

/**
 * Updates Enrollment Counter in Column M
 */
function updateRegistrationCount(seminarID) {
  const regSheet = SpreadsheetApp.getActive().getSheetByName(REG_SHEET_NAME);
  const regData = regSheet.getDataRange().getValues();
  let count = 0;
  
  for (let i = 1; i < regData.length; i++) {
    if (String(regData[i][1]).trim() === String(seminarID).trim() && 
        String(regData[i][EMAIL_STATUS_COL - 1]).includes("✅")) {
      count++;
    }
  }

  const semSs = SpreadsheetApp.openById(SEMINAR_FILE_ID);
  const semSheet = semSs.getSheetByName(SEMINAR_SHEET_NAME);
  const semData = semSheet.getDataRange().getValues();
  
  for (let j = 1; j < semData.length; j++) {
    if (String(semData[j][1]).trim() === String(seminarID).trim()) {
      semSheet.getRange(j + 1, 13).setValue(count);
      break;
    }
  }
}
