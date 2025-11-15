type EmailOptions = {
  to: string
  subject: string
  html: string
}

type CalendarEventOptions = {
  summary: string
  description: string
  startDateTime: string // Format: YYYY-MM-DDTHH:mm:ss
  endDateTime: string
  attendees?: string[]
}

type SheetOptions = {
  sheetName: string
  values: string[]
}

// Send email using Gmail API
export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    // Using Nodemailer with Gmail OAuth2 or SMTP
    // You'll need to set up OAuth2 credentials or use an App Password
    
    const GMAIL_USER = process.env.GMAIL_USER
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD
    
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      console.warn('[v0] Gmail credentials not configured')
      return
    }

    // For production, install nodemailer: npm install nodemailer
    // const nodemailer = require('nodemailer')
    
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: GMAIL_USER,
    //     pass: GMAIL_APP_PASSWORD,
    //   },
    // })
    
    // await transporter.sendMail({
    //   from: GMAIL_USER,
    //   to,
    //   subject,
    //   html,
    // })
    
    console.log('[v0] Email would be sent to:', to, 'Subject:', subject)
  } catch (error) {
    console.error('[v0] Send email error:', error)
    throw error
  }
}

// Create Google Calendar event
export async function createCalendarEvent(options: CalendarEventOptions) {
  try {
    // Using Google Calendar API
    // You'll need to set up OAuth2 credentials
    
    const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID
    const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    
    if (!GOOGLE_CALENDAR_ID || !GOOGLE_SERVICE_ACCOUNT_KEY) {
      console.warn('[v0] Google Calendar credentials not configured')
      return
    }

    // For production, install googleapis: npm install googleapis
    // const { google } = require('googleapis')
    
    // const auth = new google.auth.GoogleAuth({
    //   credentials: JSON.parse(GOOGLE_SERVICE_ACCOUNT_KEY),
    //   scopes: ['https://www.googleapis.com/auth/calendar'],
    // })
    
    // const calendar = google.calendar({ version: 'v3', auth })
    
    // const event = {
    //   summary: options.summary,
    //   description: options.description,
    //   start: {
    //     dateTime: options.startDateTime,
    //     timeZone: 'America/Argentina/Buenos_Aires',
    //   },
    //   end: {
    //     dateTime: options.endDateTime,
    //     timeZone: 'America/Argentina/Buenos_Aires',
    //   },
    //   attendees: options.attendees?.map(email => ({ email })),
    //   reminders: {
    //     useDefault: false,
    //     overrides: [
    //       { method: 'email', minutes: 24 * 60 },
    //       { method: 'popup', minutes: 30 },
    //     ],
    //   },
    // }
    
    // await calendar.events.insert({
    //   calendarId: GOOGLE_CALENDAR_ID,
    //   requestBody: event,
    // })
    
    console.log('[v0] Calendar event would be created:', options.summary)
  } catch (error) {
    console.error('[v0] Create calendar event error:', error)
    throw error
  }
}

// Add row to Google Sheets
export async function addToSheet({ sheetName, values }: SheetOptions) {
  try {
    const GOOGLE_SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID
    const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    
    if (!GOOGLE_SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_KEY) {
      console.warn('[v0] Google Sheets credentials not configured')
      return
    }

    // For production, install googleapis: npm install googleapis
    // const { google } = require('googleapis')
    
    // const auth = new google.auth.GoogleAuth({
    //   credentials: JSON.parse(GOOGLE_SERVICE_ACCOUNT_KEY),
    //   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    // })
    
    // const sheets = google.sheets({ version: 'v4', auth })
    
    // await sheets.spreadsheets.values.append({
    //   spreadsheetId: GOOGLE_SPREADSHEET_ID,
    //   range: `${sheetName}!A:J`,
    //   valueInputOption: 'RAW',
    //   requestBody: {
    //     values: [values],
    //   },
    // })
    
    console.log('[v0] Sheet row would be added:', sheetName, values)
  } catch (error) {
    console.error('[v0] Add to sheet error:', error)
    throw error
  }
}
