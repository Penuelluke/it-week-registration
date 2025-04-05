import type { NextApiRequest, NextApiResponse } from 'next';

// Google Apps Script URL - replace with your actual URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxSXaopMcdMcaBzjus8xe7GsNwGVC6iw0LicnIh1bWfCaOOzlb-JLx3RWSKhpDvPjN4/exec';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      result: 'error', 
      message: 'Method Not Allowed' 
    });
  }

  try {
    // Forward the request to Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    // Check if the response from Google Apps Script is OK
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google Apps Script error: status ${response.status}, message: ${errorText}`);
    }

    // Parse the response
    const result = await response.json();
    
    // Send successful response back to client
    res.status(200).json({
      result: 'success',
      message: result.message || 'Registration submitted successfully'
    });
  } catch (error: any) {
    // Log the error for server-side tracking
    console.error('Registration submission error:', error);

    // Send error response back to client
    res.status(500).json({ 
      result: 'error', 
      message: error.message || 'Failed to submit registration'
    });
  }
}

// Disable body parsing to allow raw body for verification if needed
export const config = {
  api: {
    bodyParser: true,
  },
};
