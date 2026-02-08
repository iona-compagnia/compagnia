/**
 * Compagnia Contact Form Backend
 * 
 * This script receives POST requests from the website, 
 * saves the data to a Google Sheet, and can be extended
 * to send email notifications.
 */

const SPREADSHEET_ID = '16Cb4kNN7BM_i4ShvdhEJ32xTr8GIl37HjE9WzlQdAl4';

function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getEvents') {
    return getEvents();
  }
  
  return ContentService.createTextOutput("Compagnia API is running");
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    if (action === 'addEvent') {
      return addEvent(data);
    }
    
    // Default to contact form submission
    return handleContactForm(data);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleContactForm(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
  sheet.appendRow([
    new Date(),
    data.firstName,
    data.lastName,
    data.email,
    data.message
  ]);
  sendEmailNotification(data);
  return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getEvents() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Events');
  if (!sheet) return createJsonResponse({ status: 'error', message: 'Events sheet not found' });
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const events = rows.map(row => {
    let obj = {};
    headers.forEach((header, i) => {
      obj[header.toLowerCase()] = row[i];
    });
    return obj;
  });
  
  return createJsonResponse(events);
}

function addEvent(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Events');
  if (!sheet) return createJsonResponse({ status: 'error', message: 'Events sheet not found' });
  
  sheet.appendRow([
    Date.now().toString(), // Simple ID
    data.date,
    data.time,
    data.title,
    data.location,
    data.description,
    data.imageurl
  ]);
  
  return createJsonResponse({ status: 'success' });
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendEmailNotification(data) {
  const recipient = "iona@compagnia.org"; 
  const subject = `New Contact Form Submission: ${data.firstName} ${data.lastName}`;
  const body = `You have a new message from your website:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Message: ${data.message}`;
               
  MailApp.sendEmail(recipient, subject, body);
}
