import cloudinary from '@/lib/cloudinary';
import { Readable } from 'stream';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      console.error('File tidak ditemukan');
      return new Response(JSON.stringify({ error: 'File tidak ditemukan' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Mengubah buffer ke stream
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    // Fungsi untuk mengunggah menggunakan stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: 'perpustakaan-anak',
          use_filename: true,
          unique_filename: false,
        },
        (error, result) => {
          if (error) {
            console.error('Error dalam proses upload:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.pipe(uploadStream);
    });

    return new Response(JSON.stringify({ url: uploadResult.secure_url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saat mengunggah gambar:', error);
    return new Response(JSON.stringify({ error: 'Gagal mengunggah gambar', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
