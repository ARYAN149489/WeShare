const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Email templates
const emailTemplates = {
  welcome: (name, role) => ({
    subject: '🎉 Welcome to WeShare - Start Making a Difference!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to WeShare! 🎉</h1>
          </div>
          <div class="content">
            <h2>Hello ${name}! 👋</h2>
            <p>Thank you for joining WeShare as a <strong>${role}</strong>!</p>
            
            ${role === 'donor' ? `
              <p>As a donor, you can:</p>
              <ul>
                <li>📦 Create donation listings for items you want to share</li>
                <li>🤝 Connect with receivers who need your donations</li>
                <li>📊 Track your donation impact and history</li>
                <li>⭐ Receive ratings and build your reputation</li>
              </ul>
            ` : `
              <p>As a receiver, you can:</p>
              <ul>
                <li>🔍 Browse available donations in your area</li>
                <li>📝 Request items that meet your needs</li>
                <li>📍 Arrange pickup or delivery schedules</li>
                <li>⭐ Rate donors and build connections</li>
              </ul>
            `}
            
            <p>We're excited to have you in our community of caring individuals!</p>
            
            <center>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="button">Get Started Now</a>
            </center>
            
            <p>If you have any questions, feel free to reach out to our support team.</p>
            
            <p>Best regards,<br>The WeShare Team 💙</p>
          </div>
          <div class="footer">
            <p>© 2025 WeShare. Making the world a better place, one donation at a time.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  requestApproved: (receiverName, donorName, donationTitle, pickupDetails) => ({
    subject: '✅ Your Donation Request Has Been Approved!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 15px; border-left: 4px solid #38ef7d; margin: 15px 0; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Request Approved!</h1>
          </div>
          <div class="content">
            <h2>Great News, ${receiverName}!</h2>
            <p><strong>${donorName}</strong> has approved your request for:</p>
            
            <div class="info-box">
              <h3>📦 ${donationTitle}</h3>
              <p><strong>Pickup Type:</strong> ${pickupDetails.type === 'pickup' ? '🚗 You pick up from donor' : '🚚 Donor will drop off'}</p>
              <p><strong>Date:</strong> ${pickupDetails.date}</p>
              <p><strong>Time:</strong> ${pickupDetails.time}</p>
              ${pickupDetails.address ? `<p><strong>Location:</strong> ${pickupDetails.address}</p>` : ''}
            </div>
            
            <p>Please coordinate with the donor to finalize the details.</p>
            
            <center>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/receiver/requests" class="button">View Details</a>
            </center>
            
            <p>Best regards,<br>The WeShare Team 💚</p>
          </div>
          <div class="footer">
            <p>© 2025 WeShare. Making the world a better place, one donation at a time.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  requestFulfilledReceiver: (receiverName, donationTitle, donorName) => ({
    subject: '🎊 Donation Fulfilled - Please Rate Your Experience!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #fc466b 0%, #3f5efb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #fc466b 0%, #3f5efb 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎊 Donation Completed!</h1>
          </div>
          <div class="content">
            <h2>Congratulations, ${receiverName}!</h2>
            <p>Your donation request for <strong>"${donationTitle}"</strong> has been marked as fulfilled by ${donorName}.</p>
            
            <p>We hope this donation has been helpful to you! 💙</p>
            
            <p>Please take a moment to rate your experience with ${donorName}. Your feedback helps build trust in our community.</p>
            
            <center>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/receiver/requests" class="button">Rate Your Experience ⭐</a>
            </center>
            
            <p>Thank you for being part of the WeShare community!</p>
            
            <p>Best regards,<br>The WeShare Team 💜</p>
          </div>
          <div class="footer">
            <p>© 2025 WeShare. Making the world a better place, one donation at a time.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  donationFulfilledDonor: (donorName, donationTitle, receiverName) => ({
    subject: '🌟 Donation Fulfilled - You Made a Difference!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; border: 2px solid #f5576c; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌟 You Made a Difference!</h1>
          </div>
          <div class="content">
            <h2>Thank You, ${donorName}!</h2>
            <p>Your donation <strong>"${donationTitle}"</strong> has been successfully fulfilled and delivered to ${receiverName}.</p>
            
            <div class="highlight">
              <h3>🎉 Impact Made!</h3>
              <p>You've helped someone in need and made our community stronger.</p>
            </div>
            
            <p>Your generosity is truly appreciated. Thank you for being an amazing member of the WeShare community!</p>
            
            <center>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/donor/dashboard" class="button">View Your Dashboard</a>
            </center>
            
            <p>Keep up the great work! Every donation counts. 💖</p>
            
            <p>Best regards,<br>The WeShare Team 🌸</p>
          </div>
          <div class="footer">
            <p>© 2025 WeShare. Making the world a better place, one donation at a time.</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

// Send email function
const sendEmail = async (to, template) => {
  try {
    const mailOptions = {
      from: `"WeShare Platform" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: template.subject,
      html: template.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendEmail,
  emailTemplates
};
