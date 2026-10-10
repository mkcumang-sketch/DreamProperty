import nodemailer from 'nodemailer';
import { LeadRecord } from '@/types';

export async function sendLeadNotification(lead: Partial<LeadRecord>) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  const subject = `[NEW LEAD] ${lead.name} (${lead.type}) - Dream Properties Partnership`;
  const textContent = `
NEW LEAD RECEIVED FROM WEBSITE:
---------------------------------------------
Name:          ${lead.name}
Phone:         ${lead.phone}
Email:         ${lead.email || 'N/A'}
Relationship:  ${lead.type}
Service:       ${lead.service || 'Not specified'}
Property Type: ${lead.propertyType || 'Not specified'}
Location:      ${lead.location || 'Not specified'}
Budget Range:  ${lead.budgetRange || 'Not specified'}
Language:      ${lead.language || 'en'}
Message:
${lead.message || 'No additional message.'}

Timestamp:     ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
Lead ID:       ${lead.id || 'N/A'}
Source:        ${lead.source || 'website'}
---------------------------------------------
Partner: Dream Properties (113/182 Swaroop Nagar, Kanpur)
  `.trim();

  // If SMTP is unconfigured in development, log cleanly without throwing
  if (!host || !user || !pass || !notifyEmail) {
    console.log('\n=================== SIMULATED LEAD EMAIL ===================');
    console.log(`To: ${notifyEmail || '[Unconfigured NOTIFY_EMAIL]'}`);
    console.log(`Subject: ${subject}`);
    console.log(textContent);
    console.log('============================================================\n');
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from: `"Dream Properties Leads" <${user}>`,
      to: notifyEmail,
      subject,
      text: textContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0231c; border-radius: 8px;">
          <h2 style="color: #e0231c; margin-top: 0;">New Interior Lead Received</h2>
          <p><strong>Name:</strong> ${lead.name}</p>
          <p><strong>Phone:</strong> <a href="tel:${lead.phone}">${lead.phone}</a> | <a href="https://wa.me/${lead.phone?.replace(/[^0-9]/g, '')}">WhatsApp</a></p>
          <p><strong>Email:</strong> ${lead.email || 'N/A'}</p>
          <p><strong>Relationship:</strong> ${lead.type}</p>
          <p><strong>Service:</strong> ${lead.service || 'Not specified'}</p>
          <p><strong>Property:</strong> ${lead.propertyType || 'Not specified'} (${lead.location || 'Kanpur'})</p>
          <p><strong>Budget:</strong> ${lead.budgetRange || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f7f7f7; padding: 10px 15px; border-left: 3px solid #e0231c;">${lead.message || 'None'}</blockquote>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #777;">Dream Properties Partnership Lead System · Swaroop Nagar, Kanpur</p>
        </div>
      `,
    });

    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('Failed to send SMTP email:', err);
    // Never fail lead generation just because SMTP failed
    return { success: false, error: (err as Error).message };
  }
}
