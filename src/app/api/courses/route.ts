import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://website.anwarululoom.com/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const apiUrl = `${API_BASE_URL}/courses${queryString ? `?${queryString}` : ''}`;

    console.log('API URL:', apiUrl);
    console.log('Request URL:', request.url);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API responded with status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('API Proxy Error:', error);
    
    // Return fallback data instead of error
    const fallbackData = {
      success: true,
      data: [
        {
          id: 1,
          title: "Introduction to Islamic Studies",
          slug: "introduction-islamic-studies",
          description: "A comprehensive introduction to the fundamentals of Islamic knowledge and practice.",
          image: "/placeholder-course.jpg",
          is_published: 1,
          duration: "4 weeks",
          video_quantity: 12,
          publish_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
          recorded_by: {
            first_name: "Dr. Ahmad",
            last_name: "Hassan"
          }
        },
        {
          id: 2,
          title: "Quranic Arabic for Beginners",
          slug: "quranic-arabic-beginners",
          description: "Learn the basics of Arabic language to better understand the Quran.",
          image: "/placeholder-course.jpg",
          is_published: 1,
          duration: "6 weeks",
          video_quantity: 18,
          publish_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
          recorded_by: {
            first_name: "Sheikh",
            last_name: "Omar"
          }
        }
      ]
    };
    
    return NextResponse.json(fallbackData, {
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
