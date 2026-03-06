# Fresh Juice Shop - Setup Instructions

## Project Structure
```
project-folder/
│
├── index.html          # Homepage with product catalog
├── order.html          # Order form page
├── recap.html          # Order recap/dashboard page
│
├── css/
│   └── style.css       # Custom styles and animations
│
└── js/
    ├── app.js          # Homepage logic
    ├── order.js        # Order form logic
    └── recap.js        # Recap page logic
```

## Google Sheets Integration Setup

### Step 1: Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Fresh Juice Shop Orders" (or any name you prefer)
4. Keep this spreadsheet open

### Step 2: Open Apps Script Editor
1. In your spreadsheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy all code from `google-apps-script.js` file
4. Paste it into the Apps Script editor
5. Click the **Save** icon (💾) and name your project "Fresh Juice API"

### Step 3: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: Fresh Juice Shop API v1
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Review permissions and click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to [Project Name] (unsafe)**
9. Click **Allow**
10. **COPY THE WEB APP URL** - you'll need this!

### Step 4: Update Website Configuration
1. Open `js/order.js`
2. Find line 10: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';`
3. Replace with your actual Web App URL
4. Save the file

5. Open `js/recap.js`
6. Find line 2: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';`
7. Replace with your actual Web App URL
8. Save the file

### Step 5: Test the Integration
1. Open `index.html` in your browser
2. Click "Buy Now" on any product
3. Fill out the order form
4. Submit the order
5. Check your Google Spreadsheet - you should see a new row with the order data
6. Go to `recap.html` to view all orders

## Color Palette
- **Primary**: #5A9CB5 (Blue)
- **Secondary**: #FACE68 (Yellow)
- **Tertiary**: #FAAC68 (Orange)
- **Accent**: #FA6868 (Red)

## Features Included

### Homepage (index.html)
✅ Product catalog with cards
✅ Product images, names, prices, descriptions
✅ "Buy Now" buttons
✅ Responsive design
✅ Navigation bar

### Order Page (order.html)
✅ Customer information form
✅ Product selection dropdown
✅ Quantity selector
✅ Automatic price calculation
✅ Loading animation during submission
✅ Success notification modal
✅ Form validation

### Recap Page (recap.html)
✅ Statistics cards (total orders, revenue)
✅ Orders table with all transaction details
✅ Refresh button
✅ Loading state
✅ Empty state handling
✅ Responsive table design

### Additional Features
✅ Mobile responsive layout
✅ Modern, clean UI with TailwindCSS
✅ Loading animations
✅ Success notifications
✅ Currency formatting (Indonesian Rupiah)
✅ Date formatting
✅ Smooth transitions and hover effects

## Troubleshooting

### Orders not appearing in Google Sheets
1. Check that you deployed the Apps Script as a Web App
2. Verify the Web App URL is correctly pasted in both `order.js` and `recap.js`
3. Make sure "Who has access" is set to "Anyone"
4. Check browser console for errors (F12)

### CORS Errors
- The code uses `mode: 'no-cors'` for POST requests, which is normal
- GET requests should work without CORS issues
- If you see CORS errors on GET requests, redeploy the Apps Script

### Orders not showing on recap page
1. Verify the Google Apps Script URL in `recap.js`
2. Check that the spreadsheet has an "Orders" sheet
3. Open browser console (F12) to see error messages
4. Try clicking the "Refresh" button

## Customization

### Change Products
Edit the `products` array in `js/app.js` and `js/order.js`:
```javascript
const products = [
    {
        id: 1,
        name: 'Your Product Name',
        price: 15000,
        image: 'image-url',
        description: 'Product description'
    }
];
```

### Change Colors
Update the Tailwind config in each HTML file:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#YourColor',
                secondary: '#YourColor',
                tertiary: '#YourColor',
                accent: '#YourColor'
            }
        }
    }
}
```

## Deployment

###