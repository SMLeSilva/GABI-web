import { NextResponse } from 'next/server';
import sharp from 'sharp';

const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const REPO_OWNER = "SMLeSilva";
const REPO_NAME = "GABI-web";

async function uploadToGitHub(fileName: string, buffer: Buffer) {
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_ACCESS_TOKEN não configurada.");
  }

  const path = `public/images/uploads/${fileName}`;
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
  
  // Verificar se o arquivo já existe para pegar o SHA (opcional para uploads novos)
  const getRes = await fetch(url, {
    headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
  });
  
  let sha = "";
  if (getRes.ok) {
    const data = await getRes.json();
    sha = data.sha;
  }

  const putRes = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `upload: nova imagem ${fileName}`,
      content: buffer.toString('base64'),
      sha: sha || undefined
    })
  });

  if (!putRes.ok) {
    const error = await putRes.json();
    throw new Error(error.message || "Falha ao enviar para o GitHub");
  }

  return `/images/uploads/${fileName}`;
}

export async function POST(request: Request) {
  try {
    // PROTEÇÃO: Verificar se o usuário está autenticado no Netlify
    const authHeader = request.headers.get('authorization');
    if (process.env.NODE_ENV === 'production') {
      if (!authHeader || authHeader === 'Bearer ' || authHeader === 'Bearer undefined') {
        return NextResponse.json({ error: 'Sessão expirada ou inválida. Por favor, saia e entre novamente no painel.' }, { status: 401 });
      }
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Otimização com Sharp
    const optimizedBuffer = await sharp(buffer)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const fileName = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.webp`;
    
    const imageUrl = await uploadToGitHub(fileName, optimizedBuffer);

    return NextResponse.json({ success: true, url: imageUrl });

  } catch (error: any) {
    console.error("Erro no upload:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
