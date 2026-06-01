import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!GOOGLE_SHEETS_URL) {
      console.warn('GOOGLE_SHEETS_WEBHOOK_URL not set, simulating submission');
      return NextResponse.json({ success: true, message: 'Survey submitted successfully (simulated)' });
    }

    const timestamp = new Date().toISOString();
    
    const rowData = {
      Timestamp: timestamp,
      UserType: body.userType,
      ...body,
    };

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rowData),
    });

    if (!response.ok) {
      throw new Error('Failed to send data to Google Sheets');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in survey submission:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
