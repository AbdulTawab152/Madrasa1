import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://website.anwarululoom.com/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tagId: string }> }
) {
  try {
    const { tagId } = await params;
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const apiUrl = `${API_BASE_URL}/darul-ifta/tag/${tagId}${queryString ? `?${queryString}` : ''}`;

    console.log('🔍 Iftah Tag API endpoint called - fetching from external API:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.warn(`⚠️ External API responded with status: ${response.status}`);
      return NextResponse.json(
        { 
          data: null,
          success: false,
          error: `API responded with status: ${response.status}`
        },
        { 
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      );
    }

    const data = await response.json();
    console.log('✅ Iftah tag data received from API:', data);
    
    // Handle the API response structure: { tag_id, data: [...], pagination: {...} }
    if (data && typeof data === 'object') {
      // The API returns: { tag_id: "1", data: [...], pagination: {...} }
      return NextResponse.json({ 
        data: data, // Return full structure including tag_id, data array, and pagination
        success: true,
        tag_id: data.tag_id,
        pagination: data.pagination 
      }, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    return NextResponse.json({ data: data || null, success: true }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('❌ Error fetching iftah tag:', error);
    return NextResponse.json(
      { 
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

