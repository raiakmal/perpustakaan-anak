import { NextResponse } from 'next/server';

// Pastikan variabel lingkungan sudah diatur
const KINDE_API_URL = process.env.KINDE_API_URL;
const KINDE_CLIENT_ID = process.env.KINDE_CLIENT_ID;
const KINDE_CLIENT_SECRET = process.env.KINDE_CLIENT_SECRET;

if (!KINDE_API_URL || !KINDE_CLIENT_ID || !KINDE_CLIENT_SECRET) {
  console.error('Kinde API environment variables are missing.');
}

export async function POST(request) {
  try {
    // Parsing body request
    const { username, password } = await request.json();

    // Validasi masukan
    if (typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ message: 'Invalid input: Username and password must be strings.' }, { status: 400 });
    }

    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required.' }, { status: 400 });
    }

    // Mengirim request ke Kinde API
    const response = await fetch(`${KINDE_API_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'password',
        username,
        password,
        client_id: KINDE_CLIENT_ID,
        client_secret: KINDE_CLIENT_SECRET,
      }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error('Error response from Kinde API:', responseText);
      return NextResponse.json(
        {
          message: 'Invalid credentials or server error',
          details: responseText, // Opsional: Hati-hati jika data ini berisi info sensitif
        },
        { status: response.status }
      );
    }

    // Parsing respons JSON dari Kinde API
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (jsonError) {
      console.error('Error parsing JSON from Kinde API:', jsonError.message);
      return NextResponse.json(
        {
          message: 'Failed to parse response from Kinde API',
          error: jsonError.message,
        },
        { status: 500 }
      );
    }

    const { access_token } = data;

    if (!access_token) {
      return NextResponse.json({ message: 'Token not received from Kinde API.' }, { status: 500 });
    }

    // Respons sukses dengan token
    return NextResponse.json({ token: access_token });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
