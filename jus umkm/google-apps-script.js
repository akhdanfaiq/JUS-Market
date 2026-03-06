// Google Apps Script for Fresh Juice Shop
// Deploy this as a Web App to connect with your website

// Spreadsheet configuration
const SHEET_NAME = 'Orders';

// Get active spreadsheet
function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

// Get or create Orders sheet
function getOrdersSheet() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Add headers
    sheet.appendRow([
      'Order ID',
      'Customer Name',
      'Phone',
      'Address',
      'Product',
      'Quantity',
      'Total Price',
      'Order Date'
    ]);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 8);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#5A9CB5');
    headerRange.setFontColor('#FFFFFF');
  }
  
  return sheet;
}

// Handle POST requests (new orders)
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrdersSheet();
    
    // Add new order row
    sheet.appendRow([
      data.orderId,
      data.customerName,
      data.phone,
      data.address,
      data.product,
      data.quantity,
      data.totalPrice,
      data.orderDate
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, orderId: data.orderId }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (fetch orders)
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getOrders') {
      const sheet = getOrdersSheet();
      const data = sheet.getDataRange().getValues();
      
      // Skip header row
      const orders = data.slice(1).map(row => ({
        orderId: row[0],
        customerName: row[1],
        phone: row[2],
        address: row[3],
        product: row[4],
        quantity: row[5],
        totalPrice: row[6],
        orderDate: row[7]
      }));
      
      // Sort by date (newest first)
      orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, orders: orders }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify setup
function testSetup() {
  const sheet = getOrdersSheet();
  Logger.log('Sheet name: ' + sheet.getName());
  Logger.log('Setup complete!');
}
