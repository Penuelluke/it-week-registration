// Comprehensive CORS configuration
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '3600'
};

function doOptions(e) {
  const corsHeaders = CORS_HEADERS;
  
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(corsHeaders);
}

function doPost(e) {
  // Enhanced CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Log incoming request details
  console.log('Incoming request received:');
  console.log('Request method:', e.parameter.method || 'No method specified');
  console.log('Request parameters:', JSON.stringify(e.parameter));
  console.log('Request body:', e.postData ? e.postData.contents : 'No body');

  try {
    // Parse the incoming payload
    let params;
    try {
      params = e.postData && e.postData.contents 
        ? JSON.parse(e.postData.contents) 
        : e.parameter;
    } catch (parseError) {
      console.error('Error parsing payload:', parseError);
      return createErrorResponse(corsHeaders, 'Invalid payload format');
    }

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'contactNumber', 'eventType'];
    const missingFields = requiredFields.filter(field => !params[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return createErrorResponse(corsHeaders, `Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate event type
    if (!params.eventType) {
      console.error('Missing event type in payload');
      return createErrorResponse(corsHeaders, 'Event type is required');
    }

    // Route to appropriate handler based on event type
    switch (params.eventType) {
      case 'mobile-legends':
      case 'call-of-duty':
        return handleGameSubmission(params, corsHeaders);
      case 'talent':
        return handleTalentSubmission(params, corsHeaders);
      case 'trash-on-show':
        return handleTrashOnShowSubmission(params, corsHeaders);
      default:
        console.error('Unknown event type:', params.eventType);
        return createErrorResponse(corsHeaders, 'Unknown event type');
    }
  } catch (error) {
    console.error('Unexpected error in doPost:', error);
    return createErrorResponse(corsHeaders, 'Internal server error');
  }
}

function handleGameSubmission(params, corsHeaders) {
  const requiredFields = ['fullName', 'email', 'teamName', 'contactNumber'];
  validateRequiredFields(params, requiredFields);

  const teamMembers = params.teamMembers || [];
  const substitutes = params.substitutes || [];

  const expectedTeamSize = params.eventType === 'mobile-legends' ? 5 : 6;
  if (teamMembers.length !== expectedTeamSize) {
    throw new Error(`Team must have exactly ${expectedTeamSize} members`);
  }

  teamMembers.forEach((member, index) => {
    if (!member.name || !member.inGameName) {
      throw new Error(`Team member ${index + 1} is missing name or in-game name`);
    }
  });

  substitutes.forEach((sub, index) => {
    if (!sub.name || !sub.inGameName) {
      throw new Error(`Substitute ${index + 1} is missing name or in-game name`);
    }
  });

  const sheetName = params.eventType === 'mobile-legends' ? 'Mobile Legends' : 'Call of Duty';
  const ss = SpreadsheetApp.openById('13hCTs0VHH9X8moZkZwYy2eaWgqPTsN5yIVnT0QZtbao');
  const sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "Captain", "Email", "Contact", "Team Name",
      "Organization", "Facebook", "Team Members", "Substitutes", "Message"
    ]);
  }

  const formatMember = m => `${m.name} (${m.inGameName})${m.role ? ` - ${m.role}` : ''}`;
  const membersText = teamMembers.map(formatMember).join("\n");
  const subsText = substitutes.map(formatMember).join("\n");

  sheet.appendRow([
    new Date(),
    params.fullName,
    params.email,
    params.contactNumber,
    params.teamName,
    params.organization || "N/A",
    params.facebook || "N/A",
    membersText,
    subsText || "None",
    params.message || ""
  ]);

  return createSuccessResponse(corsHeaders, `${sheetName} team registered successfully`);
}

function handleTalentSubmission(params, corsHeaders) {
  const requiredFields = [
    'fullName', 'organization', 'contactNumber',
    'email', 'facebook', 'performanceType',
    'duration', 'participants'
  ];
  validateRequiredFields(params, requiredFields);

  const duration = parseInt(params.duration);
  if (isNaN(duration) || duration < 1 || duration > 10) {
    throw new Error('Performance duration must be between 1 and 10 minutes');
  }

  const ss = SpreadsheetApp.openById('13hCTs0VHH9X8moZkZwYy2eaWgqPTsN5yIVnT0QZtbao');
  const sheet = ss.getSheetByName('SOT Got Talent') || ss.insertSheet('SOT Got Talent');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "Name", "Organization", "Contact", "Email",
      "Facebook", "Performance Type", "Duration (mins)", "Participants",
      "Props Needed", "Message"
    ]);
  }

  sheet.appendRow([
    new Date(),
    params.fullName,
    params.organization,
    params.contactNumber,
    params.email,
    params.facebook,
    params.performanceType,
    `${duration} mins`,
    params.participants,
    params.props || "None",
    params.message || ""
  ]);

  return createSuccessResponse(corsHeaders, 'SOT Got Talent Registration successful');
}

function handleTrashOnShowSubmission(params, corsHeaders) {
  const requiredFields = [
    'fullName', 'organization', 'contactNumber',
    'email', 'facebook', 'heroChoice'
  ];
  validateRequiredFields(params, requiredFields);

  const ss = SpreadsheetApp.openById('13hCTs0VHH9X8moZkZwYy2eaWgqPTsN5yIVnT0QZtbao');
  const sheet = ss.getSheetByName('Trash on Show') || ss.insertSheet('Trash on Show');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "Name", "Organization", "Contact", "Email",
      "Facebook", "Hero Choice", "Message"
    ]);
  }

  sheet.appendRow([
    new Date(),
    params.fullName,
    params.organization,
    params.contactNumber,
    params.email,
    params.facebook,
    params.heroChoice,
    params.message || ""
  ]);

  return createSuccessResponse(corsHeaders, 'Trash on Show Registration successful');
}

function validateRequiredFields(params, requiredFields) {
  const missingFields = requiredFields.filter(field => !params[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
}

function isValidPhoneNumber(phone) {
  return /^(09|\+639)\d{9}$/.test(phone);
}

// Utility function to create error responses
function createErrorResponse(headers, message) {
  return ContentService.createTextOutput(JSON.stringify({
    result: 'error',
    message: message,
    timestamp: new Date().toISOString()
  }))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeaders(headers);
}

// Utility function to create success responses
function createSuccessResponse(headers, message) {
  return ContentService.createTextOutput(JSON.stringify({
    result: 'success',
    message: message,
    timestamp: new Date().toISOString()
  }))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeaders(headers);
}
