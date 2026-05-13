import fs from 'fs';
import path from 'path';
import { ServiceCategory, GalleryImage, SiteConfig } from './content';

export function getServices(): ServiceCategory[] {
  const filePath = path.join(process.cwd(), 'src/content/servicos.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData).categories || [];
}

export function getGallery(): { images: GalleryImage[] } {
  const filePath = path.join(process.cwd(), 'src/content/galeria.json');
  if (!fs.existsSync(filePath)) return { images: [] };
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}

export function getConfig(): SiteConfig {
  const filePath = path.join(process.cwd(), 'src/content/config.json');
  if (!fs.existsSync(filePath)) return { whatsapp: '', email: '', address: '', instagram: '', facebook: '', tiktok: '' };
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}
