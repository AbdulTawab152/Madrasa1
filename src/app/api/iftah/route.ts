import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://lawngreen-dragonfly-304220.hostingersite.com/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const apiUrl = `${API_BASE_URL}/iftah${queryString ? `?${queryString}` : ''}`;

    console.log('🔍 Iftah API endpoint called - fetching from external API:', apiUrl);

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
      // Return empty array on error instead of throwing
      return NextResponse.json(
        { 
          data: [],
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
    console.log('✅ Iftah data received from API');
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return NextResponse.json(
        { 
          data,
          success: true
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
    } else if (data && (Array.isArray(data.data) || data.data)) {
      return NextResponse.json(
        data,
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

    // If response format is unexpected, return empty array
    console.warn('⚠️ Unexpected response format, returning empty data');
    return NextResponse.json(
      { 
        data: [],
        success: false,
        error: 'Unexpected response format'
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
  } catch (error) {
    console.error('❌ Iftah API Proxy Error:', error);
    
    // Return empty array on error instead of throwing
    return NextResponse.json(
      { 
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch iftah data'
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

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

