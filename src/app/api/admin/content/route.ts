import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const GITHUB_REPO = "SMLeSilva/GABI-web"; // Nome do seu repositório

async function updateGitHubFile(filePath: string, content: string, message: string) {
  const relativePath = filePath.split(process.cwd() + path.sep).pop()?.replace(/\\/g, '/');
  if (!relativePath) throw new Error("Caminho inválido");

  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${relativePath}`;
  
  // 1. Pegar o SHA do arquivo atual
  const getRes = await fetch(url, {
    headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
  });
  
  let sha = "";
  if (getRes.ok) {
    const fileData = await getRes.json();
    sha = fileData.sha;
  }

  // 2. Fazer o Update (Commit)
  const putRes = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      sha: sha || undefined
    })
  });

  if (!putRes.ok) {
    const error = await putRes.json();
    throw new Error(error.message || "Falha no commit ao GitHub");
  }

  return await putRes.json();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (!type) {
    return NextResponse.json({ error: 'Missing type' }, { status: 400 });
  }

  const filePath = path.join(CONTENT_DIR, `${type}.json`);
  
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  return NextResponse.json(JSON.parse(fileContents));
}

export async function POST(request: Request) {
  // PROTEÇÃO: Verificar se o usuário está autenticado no Netlify
  const authHeader = request.headers.get('authorization');
  if (process.env.NODE_ENV === 'production' && !authHeader) {
    return NextResponse.json({ error: 'Não autorizado. Faça login novamente.' }, { status: 401 });
  }

  const body = await request.json();
  const { type, data } = body;

  if (!type || !data) {
    return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
  }

  const filePath = path.join(CONTENT_DIR, `${type}.json`);
  const contentString = JSON.stringify(data, null, 2);
  
  try {
    // Se estivermos em produção (Netlify) e tivermos o Token, usamos a API do GitHub
    if (GITHUB_TOKEN && process.env.NODE_ENV === 'production') {
      await updateGitHubFile(filePath, contentString, `feat(cms): update ${type}.json via admin panel`);
      return NextResponse.json({ success: true, mode: 'github' });
    } 
    
    // Fallback para desenvolvimento local
    fs.writeFileSync(filePath, contentString);
    return NextResponse.json({ success: true, mode: 'local' });
    
  } catch (error: any) {
    console.error('Erro ao salvar:', error);
    return NextResponse.json({ error: error.message || 'Failed to save content' }, { status: 500 });
  }
}
