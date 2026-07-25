export interface OtpEmailTemplateProps {
  otp: string;
  appName?: string;
  expiryMinutes?: number;
}

export function renderOtpEmailHtml({
  otp,
  appName = 'Campus Minutes',
  expiryMinutes = 10,
}: OtpEmailTemplateProps): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your ${appName} Verification Code</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background-color: #4f46e5; padding: 24px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
    .content { padding: 32px 24px; color: #374151; line-height: 1.6; }
    .greeting { font-size: 16px; margin-bottom: 16px; font-weight: 600; color: #111827; }
    .otp-box { background-color: #f3f4f6; border-radius: 8px; border: 1px dashed #d1d5db; text-align: center; padding: 20px; margin: 24px 0; }
    .otp-code { font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #4f46e5; font-family: monospace; }
    .expiry { font-size: 14px; color: #6b7280; margin-top: 12px; }
    .security-notice { font-size: 13px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 24px; }
    .footer { background-color: #f9fafb; padding: 16px 24px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${appName}</h1>
    </div>
    <div class="content">
      <div class="greeting">Hello,</div>
      <p>Use the following verification code to complete your login to <strong>${appName}</strong>:</p>
      
      <div class="otp-box">
        <div class="otp-code">${otp}</div>
        <div class="expiry">This code will expire in ${expiryMinutes} minutes.</div>
      </div>
      
      <div class="security-notice">
        <strong>Security Notice:</strong> If you did not request this verification code, please ignore this email. Do not share this code with anyone.
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} ${appName}. Instant delivery inside COEP campus in minutes.
    </div>
  </div>
</body>
</html>`;
}
