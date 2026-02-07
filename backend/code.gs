/**
 * Compagnia Contact Form Backend
 * 
 * This script receives POST requests from the website, 
 * saves the data to a Google Sheet, and can be extended
 * to send email notifications.
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    
    // Add timestamp and form data
    sheet.appendRow([
      new Date(),
      data.firstName,
      data.lastName,
      data.email,
      data.message
    ]);

    // Send email notification
    sendEmailNotification(data);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Send an email notification when a new message arrives
 */
function sendEmailNotification(data) {
  const recipient = "iona@compagnia.org"; // Change this to the director's email
  const subject = "New Contact Form Submission: " + data.firstName + " " + data.lastName;
  const body = "You have a new message from your website:

" +
               "Name: " + data.firstName + " " + data.lastName + "
" +
               "Email: " + data.email + "
" +
               "Message: " + data.message;
               
  MailApp.sendEmail(recipient, subject, body);
}
