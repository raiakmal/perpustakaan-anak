import { NextResponse } from 'next/server';

const KINDE_API_URL = process.env.KINDE_API_URL;
const KINDE_CLIENT_ID = process.env.KINDE_CLIENT_ID;
const KINDE_CLIENT_SECRET = process.env.KINDE_CLIENT_SECRET;

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    const response = await fetch(`${KINDE_API_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'password',
        username, // Gunakan username
        password, // Gunakan password
        client_id: KINDE_CLIENT_ID,
        client_secret: KINDE_CLIENT_SECRET,
      }),
    });

    // Cek jika response tidak ok, log untuk melihat apa yang diterima
    const responseText = await response.text(); // Ambil respons sebagai teks

    if (!response.ok) {
      console.error('Error response from Kinde API:', responseText); // Log respons HTML
      return NextResponse.json({ message: 'Invalid credentials or server error', details: responseText }, { status: response.status });
    }

    // Jika respons OK, coba parse sebagai JSON
    try {
      const data = JSON.parse(responseText);
      const { access_token } = data;
      return NextResponse.json({ token: access_token });
    } catch (jsonError) {
      console.error('Error parsing JSON from Kinde API:', jsonError.message);
      return NextResponse.json({ message: 'Failed to parse response from Kinde API', error: jsonError.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
