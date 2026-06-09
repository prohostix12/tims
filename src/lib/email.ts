import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOtpEmail(toEmail: string, otp: string, name?: string) {
  const greeting = name ? `Hi ${name},` : 'Hello,';

  await transporter.sendMail({
    from: `"Find Your University" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Your OTP for Course Finder — ${otp}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:500px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#E8502A,#ff7a50);padding:32px 40px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Find Your University</h1>
            <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:13px;">Course Finder Verification</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 8px;color:#333;font-size:15px;">${greeting}</p>
            <p style="margin:0 0 28px;color:#555;font-size:14px;line-height:1.6;">
              Use the OTP below to verify your email and continue with the Course Finder quiz.
              This code is valid for <strong>5 minutes</strong>.
            </p>

            <!-- OTP Box -->
            <div style="background:#FFF5F2;border:2px dashed #E8502A;border-radius:12px;padding:24px;text-align:center;margin-bottom:28px;">
              <p style="margin:0 0 6px;color:#888;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Your OTP Code</p>
              <p style="margin:0;font-size:42px;font-weight:800;color:#E8502A;letter-spacing:10px;">${otp}</p>
            </div>

            <p style="margin:0;color:#999;font-size:12px;line-height:1.6;">
              If you did not request this, please ignore this email.<br/>
              Do not share this OTP with anyone.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#fafafa;padding:20px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;color:#bbb;font-size:12px;">© ${new Date().getFullYear()} Find Your University. All rights reserved.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
    text: `${greeting}\n\nYour OTP for the Course Finder is: ${otp}\n\nThis code expires in 5 minutes. Do not share it with anyone.\n\n— Find Your University`,
  });
}
