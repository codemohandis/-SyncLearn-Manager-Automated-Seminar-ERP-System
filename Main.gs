/**
 * Main Entry Point: Triggered on Google Form Submission
 */
function onFormSubmit(e) {
  const ss = SpreadsheetApp.getActive();
  const regSheet = ss.getSheetByName(REG_SHEET_NAME);
  if (!regSheet) return;

  const currentRow = e.range.getRow();
  const values = e.values; 

  try {
    const seminarID = values[1] ? values[1].toString().trim() : null;
    const name      = values[2] ? values[2].toString().trim() : "Participant";
    const email     = values[3] ? values[3].toString().trim() : null;

    if (!seminarID || !email) {
      regSheet.getRange(currentRow, EMAIL_STATUS_COL).setValue("❌ Data Missing");
      return;
    }

    const currentSemData = getSeminarData(seminarID);
    if (!currentSemData) {
      regSheet.getRange(currentRow, EMAIL_STATUS_COL).setValue("❌ Seminar ID Not Found");
      return;
    }

    // Advanced Validation: Duplicate & Time Clash Logic
    const validationResult = checkDuplicateAndTimeClash(email, name, seminarID, currentSemData);
    if (validationResult !== "PROCEED") {
      regSheet.getRange(currentRow, EMAIL_STATUS_COL).setValue(validationResult);
      return;
    }

    // Process and Send Email
    currentSemData.thumbnail = getDirectLink(currentSemData.thumbnail);
    const htmlBody = composeHtml(name, currentSemData);
    sendEmail(email, `Registration Confirmed: ${currentSemData.title}`, htmlBody);
    
    // Finalize Registration
    regSheet.getRange(currentRow, EMAIL_STATUS_COL).setValue("✅ Confirmed");
    updateRegistrationCount(seminarID);

  } catch (err) {
    regSheet.getRange(currentRow, EMAIL_STATUS_COL).setValue("❌ Error: " + err.message);
  }
}
