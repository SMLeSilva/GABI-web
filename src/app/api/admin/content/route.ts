import { NextResponse } from 'next/server';
import { SiteConfig, ServiceCategory } from '@/lib/content';

const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const REPO_OWNER = "SMLeSilva";
const REPO_NAME = "GABI-web";

async function commitToGitHub(path: string, content: string, message: string) {
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_ACCESS_TOKEN não configurada no ambiente.");
  }

  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
  
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

  try {
    let filePath = '';
    if (type === 'servicos') filePath = 'src/content/servicos.json';
    else if (type === 'galeria') filePath = 'src/content/galeria.json';
    else if (type === 'config') filePath = 'src/content/config.json';
    else return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 });

    const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${filePath}?t=${Date.now()}`;
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) throw new Error("Falha ao buscar do GitHub");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    
    // Diagnóstico extra para sabermos exatamente o que está chegando
    const tokenPart = authHeader.replace('Bearer ', '').trim();
    
    if (process.env.NODE_ENV === 'production') {
      // Se o token for muito curto ou inexistente, algo está errado no envio
      if (!tokenPart || tokenPart === 'undefined' || tokenPart === 'null' || tokenPart.length < 10) {
        return NextResponse.json({ 
          error: `Token inválido ou ausente. Recebido: "${authHeader.substring(0, 15)}..." (Tamanho: ${authHeader.length}). Por favor, saia e entre novamente.` 
        }, { status: 401 });
      }
    }

    const { type, data } = await request.json();
    let filePath = '';
    let message = '';

    if (type === 'servicos') {
      filePath = 'src/content/servicos.json';
      message = 'update: alteração de serviços via painel admin';
    } else if (type === 'galeria') {
      filePath = 'src/content/galeria.json';
      message = 'update: nova foto na galeria';
    } else if (type === 'config') {
      filePath = 'src/content/config.json';
      message = 'update: alteração de contatos/configurações';
    }

    await commitToGitHub(filePath, JSON.stringify(data, null, 2), message);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Erro na API de conteúdo:", error);
    // Se o erro for do GitHub, vamos mostrar a mensagem dele!
    return NextResponse.json({ error: "Erro no GitHub: " + error.message }, { status: 500 });
  }
}
