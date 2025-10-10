import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://lawngreen-dragonfly-304220.hostingersite.com/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const apiUrl = `${API_BASE_URL}/articles/category${queryString ? `?${queryString}` : ''}`;

    console.log('🔍 Fetching categories from:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('📡 API Response status:', response.status);

    if (!response.ok) {
      console.error('❌ API Error:', response.status, response.statusText);
      
      // Return fallback categories instead of error
      const fallbackCategories = [
        { id: 1, name: 'General' },
        { id: 2, name: 'Islamic Studies' },
        { id: 3, name: 'Quran' },
        { id: 4, name: 'Hadith' },
        { id: 5, name: 'Fiqh' }
      ];
      
      return NextResponse.json(fallbackCategories, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    const data = await response.json();
    console.log('✅ Categories data received:', data);
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('❌ API Proxy Error:', error);
    
    // Return fallback categories instead of error
    const fallbackCategories = [
      { id: 1, name: 'General' },
      { id: 2, name: 'Islamic Studies' },
      { id: 3, name: 'Quran' },
      { id: 4, name: 'Hadith' },
      { id: 5, name: 'Fiqh' }
    ];
    
    return NextResponse.json(fallbackCategories, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
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
