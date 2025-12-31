import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const GET: APIRoute = async () => {
  const filePath = path.join(process.cwd(), 'public', 'cv.pdf');
  
  try {
    const buffer = await readFile(filePath);
    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="cv.pdf"',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error serving CV:', error);
    return new Response('CV not found', { status: 404 });
  }
};
