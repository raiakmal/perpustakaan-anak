import prisma from '@/lib/db';
import bcrypt from 'bcryptjs'; // Pastikan menggunakan bcryptjs
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    // Cari user berdasarkan username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    console.log('User found:', user); // Tambahkan log untuk melihat user yang ditemukan

    // Jika user ditemukan dan password cocok
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', passwordMatch); // Tambahkan log untuk melihat apakah password cocok

      if (passwordMatch) {
        return NextResponse.json({
          message: 'Login successful',
          success: true,
        });
      } else {
        return NextResponse.json({ message: 'Invalid username or password', success: false }, { status: 401 });
      }
    } else {
      return NextResponse.json({ message: 'Invalid username or password', success: false }, { status: 401 });
    }
  } catch (error) {
    // Tangani error server
    console.error(error);
    return NextResponse.json({ message: 'Internal server error', error: error.message, success: false }, { status: 500 });
  }
}
