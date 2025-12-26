import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send welcome email
export const sendWelcomeEmail = async (req, res) => {
  try {
    const { email, name, username } = req.body;
    console.log('📧 Email request received:', { email, name, username });
    console.log('📧 Email config:', { user: process.env.EMAIL_USER, passLength: process.env.EMAIL_PASS?.length });

    if (!email || !name) {
      return res.status(400).json({ message: 'Email and name are required' });
    }

    const transporter = createTransporter();
    console.log('📧 Transporter created successfully');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to PMSSS - Registration Successful!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to PMSSS!</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Prime Minister's Special Scholarship Scheme</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2d3748; margin-bottom: 20px;">Dear ${name},</h2>
            
            <p style="color: #4a5568; line-height: 1.6; margin-bottom: 15px;">
              Congratulations! Your registration for the PMSSS scholarship program has been completed successfully.
            </p>
            
            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #2d3748; margin: 0 0 10px 0;">Registration Details:</h3>
              <p style="margin: 5px 0; color: #4a5568;"><strong>Username:</strong> ${username}</p>
              <p style="margin: 5px 0; color: #4a5568;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0; color: #4a5568;"><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <h3 style="color: #2d3748; margin: 20px 0 10px 0;">Next Steps:</h3>
            <ul style="color: #4a5568; line-height: 1.6; padding-left: 20px;">
              <li>Log in to your dashboard to complete your scholarship application</li>
              <li>Upload required documents for verification</li>
              <li>Track your application status in real-time</li>
              <li>Receive updates on disbursement schedules</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/login" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 12px 30px; 
                        text-decoration: none; 
                        border-radius: 6px; 
                        font-weight: bold;
                        display: inline-block;">
                Access Your Dashboard
              </a>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
              <p style="color: #718096; font-size: 14px; margin: 0;">
                <strong>Important:</strong> Keep your login credentials secure. If you have any questions, 
                contact our support team at <a href="mailto:support@pmsss.gov.in" style="color: #667eea;">support@pmsss.gov.in</a>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #718096; font-size: 12px;">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>&copy; 2024 Prime Minister's Special Scholarship Scheme. All rights reserved.</p>
          </div>
        </div>
      `
    };

    console.log('📧 Sending email to:', email);
    const result = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent successfully:', result.messageId);

    res.status(200).json({ 
      message: 'Welcome email sent successfully',
      messageId: result.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      message: 'Failed to send welcome email',
      error: error.message 
    });
  }
};