import { promises as fs } from 'fs';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://lawngreen-dragonfly-304220.hostingersite.com';
const PLACEHOLDER_IMAGE = '/placeholder-gallery.jpg';

const toArrayBuffer = (data: Uint8Array) =>
  data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);

const createImageResponse = (payload: ArrayBuffer, contentType?: string | null) =>
  new NextResponse(payload, {
    status: 200,
    headers: {
      'Content-Type': contentType ?? 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

const loadPlaceholderImage = async () => {
  const filePath = join(process.cwd(), 'public', PLACEHOLDER_IMAGE.replace(/^\/+/, ''));
  try {
    const file = await fs.readFile(filePath);
    return createImageResponse(toArrayBuffer(file), 'image/jpeg');
  } catch (error) {
    console.error('Failed to load placeholder image:', error);
    return NextResponse.json({ error: 'Image not available' }, { status: 404 });
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path } = params;
    const imagePath = path.join('/');

    // Construct the full image URL
    const imageUrl = `${API_BASE_URL}/madrasa/public/storage/${imagePath}`;

    // Fetch the image from the server
    const response = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        Accept: 'image/*',
      },
    });

    if (!response.ok) {
      return await loadPlaceholderImage();
    }

    const imageBuffer = await response.arrayBuffer();

    return createImageResponse(imageBuffer, response.headers.get('content-type'));
  } catch (error) {
    console.error('Image Proxy Error:', error);
    return await loadPlaceholderImage();
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
