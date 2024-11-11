// app/api/buku/route.js
import prisma from '../../../lib/prisma';

export async function GET(request) {
  try {
    const buku = await prisma.buku.findMany();
    return new Response(JSON.stringify(buku), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching books' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
