import emailjs from '@emailjs/browser';

// Central EmailJS configuration. Falls back to env vars if provided.
export const EMAIL_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_ybt8dng",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_30453ru",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "VCv4trt9YAicUCEXs",
};

// Every submission is addressed to this inbox.
export const CONTACT_EMAIL = "info@traveloperations.pk";

/**
 * Send a payload through EmailJS. On failure, opens the visitor's mail
 * client pre-filled to CONTACT_EMAIL so the lead is never lost.
 * @returns {Promise<{ok: boolean, fallback?: boolean}>}
 */
export async function sendEmail(payload, { subject = "New website enquiry" } = {}) {
  const params = { to_email: CONTACT_EMAIL, subject, ...payload };

  try {
    await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      params,
      EMAIL_CONFIG.publicKey
    );
    return { ok: true };
  } catch (err) {
    // Graceful fallback: compose a mailto so the enquiry still reaches the inbox.
    try {
      const body = Object.entries(payload)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      if (typeof window !== "undefined") window.location.href = href;
      return { ok: false, fallback: true };
    } catch {
      return { ok: false };
    }
  }
}
