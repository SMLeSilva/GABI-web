import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const UPLOAD_DIR = path.join(process.cwd(), 'public/images/uploads');
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const GITHUB_REPO = "SMLeSilva/GABI-web";

async function uploadToGitHub(fileName: string, buffer: Buffer) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/public/images/uploads/${fileName}`;
  
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `feat(cms): upload image ${fileName}`,
      content: buffer.toString('base64'),
    })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Falha ao enviar para o GitHub");
  }

  return `/images/uploads/${fileName}`;
}

export async function POST(request: Request) {
  try {
    // PROTEÇÃO: Verificar se o usuário está autenticado no Netlify
    const authHeader = request.headers.get('authorization');
    if (process.env.NODE_ENV === 'production' && !authHeader) {
      return NextResponse.json({ error: 'Não autorizado. Faça login novamente.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-').toLowerCase()}`;
    const webpName = fileName.substring(0, fileName.lastIndexOf('.')) + '.webp';
    
    // Otimização com Sharp
    const optimizedBuffer = await sharp(buffer)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toBuffer();

    // Se estivermos em produção e tivermos o Token
    if (GITHUB_TOKEN && process.env.NODE_ENV === 'production') {
      const url = await uploadToGitHub(webpName, optimizedBuffer);
      return NextResponse.json({ success: true, url });
    }

    // Local development
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
    const filePath = path.join(UPLOAD_DIR, webpName);
    fs.writeFileSync(filePath, optimizedBuffer);

    return NextResponse.json({ 
      success: true, 
      url: `/images/uploads/${webpName}` 
    });
  } catch (error: any) {
    console.error('Erro no upload:', error);
    return NextResponse.json({ error: error.message || 'Falha ao processar imagem.' }, { status: 500 });
  }
}
