import nodemailer from "nodemailer";

// Create reusable transporter
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null; // Email not configured
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

/**
 * Format budget label for display
 */
function formatBudget(val: string): string {
  switch (val) {
    case "10k": return "Under $10K";
    case "50k": return "$10K - $50K";
    case "100k": return "$50K - $100K";
    case "max": return "$100K+";
    default: return val;
  }
}

/**
 * Send notification email to admin when a new lead is submitted.
 */
export async function sendLeadNotification(lead: any): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) {
    console.log("⚠ Email not configured. Skipping lead notification.");
    return;
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"Blinx Lab System" <${process.env.SMTP_USER}>`,
    to: notificationEmail,
    subject: `⚡ NEW LEAD: ${lead.name} — ${lead.brand}`,
    html: `
      <div style="font-family: 'Courier New', monospace; background: #1A1A1A; color: #F7F5F0; padding: 40px; max-width: 600px;">
        <div style="border-bottom: 4px solid #FF3C5A; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">
            ⚡ NEW TRANSMISSION
          </h1>
          <p style="color: #FFD600; font-size: 12px; text-transform: uppercase; letter-spacing: 3px; margin-top: 8px;">
            BLINX_ LAB LEAD SYSTEM
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #FFD600; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; width: 140px;">Agent</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; font-size: 16px; font-weight: bold;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #FFD600; text-transform: uppercase; font-size: 11px; letter-spacing: 2px;">Vector</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; font-size: 16px;">${lead.email}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #FFD600; text-transform: uppercase; font-size: 11px; letter-spacing: 2px;">Brand</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; font-size: 16px; font-weight: bold;">${lead.brand}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #FFD600; text-transform: uppercase; font-size: 11px; letter-spacing: 2px;">Budget</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #333;">
              <span style="background: #FF3C5A; color: #1A1A1A; padding: 4px 12px; font-weight: bold; font-size: 14px;">${formatBudget(lead.budget)}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #FFD600; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; vertical-align: top;">Objective</td>
            <td style="padding: 12px 0; font-size: 14px; line-height: 1.6;">${lead.message}</td>
          </tr>
        </table>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 4px solid #FFD600; text-align: center;">
          <p style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">
            Transmitted at ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `
  });

  console.log(`✓ Lead notification sent for: ${lead.name} (${lead.email})`);
}

/**
 * Send confirmation email to the lead after form submission.
 */
export async function sendLeadConfirmation(lead: any): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) return;

  await transporter.sendMail({
    from: `"Blinx_ Lab" <${process.env.SMTP_USER}>`,
    to: lead.email,
    subject: `⚡ Signal Received — Blinx_ Lab`,
    html: `
      <div style="font-family: 'Courier New', monospace; background: #1A1A1A; color: #F7F5F0; padding: 40px; max-width: 600px;">
        <div style="border-bottom: 4px solid #FF3C5A; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">
            SIGNAL RECEIVED.
          </h1>
        </div>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          Hey ${lead.name},
        </p>

        <p style="font-size: 14px; line-height: 1.6; color: #ccc; margin-bottom: 24px;">
          Your transmission has been intercepted by the Blinx_ Lab command center. Our high-velocity agents are auditing your brand stack right now.
        </p>

        <p style="font-size: 14px; line-height: 1.6; color: #ccc; margin-bottom: 24px;">
          Expect a response within <span style="color: #FFD600; font-weight: bold;">24 hours</span>. We'll reach out with an initial audit and attack plan for <strong>${lead.brand}</strong>.
        </p>

        <div style="background: #FF3C5A; color: #1A1A1A; padding: 20px; text-align: center; margin-top: 30px;">
          <p style="margin: 0; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
            GET READY TO DOMINATE.
          </p>
        </div>

        <div style="margin-top: 30px; text-align: center;">
          <p style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">
            blinx_ lab — High Velocity Creative
          </p>
        </div>
      </div>
    `
  });

  console.log(`✓ Confirmation email sent to: ${lead.email}`);
}
