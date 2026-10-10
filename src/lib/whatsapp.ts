import { siteConfig } from '@/config/site';

export interface WhatsAppOptions {
  name?: string;
  type?: string;
  service?: string;
  propertyType?: string;
  leadId?: string;
}

export function buildWhatsAppLink(options: WhatsAppOptions = {}): string {
  const number = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');

  let text = `Hello! I am reaching out regarding interior design services in partnership with Dream Properties, Kanpur.`;

  if (options.name) {
    text += `\nMy name is ${options.name}.`;
  }

  if (options.type) {
    text += `\nI am a ${options.type} looking for assistance.`;
  }

  if (options.service) {
    text += `\nInterested in: ${options.service}.`;
  }

  if (options.propertyType) {
    text += `\nProperty type: ${options.propertyType}.`;
  }

  if (options.leadId) {
    text += `\n(Reference Lead #${options.leadId})`;
  }

  text += `\nCould we schedule a site visit?`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
