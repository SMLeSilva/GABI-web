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
  
  // Buscar o SHA do arquivo atual (necessário para atualizar)
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
    // PROTEÇÃO: Verificar se o usuário está autenticado no Netlify
    const authHeader = request.headers.get('authorization');
    
    // Se estiver em produção e não tiver o header de autorização OU o token estiver vazio
    if (process.env.NODE_ENV === 'production') {
      if (!authHeader || authHeader === 'Bearer ' || authHeader === 'Bearer undefined') {
        return NextResponse.json({ error: 'Sessão expirada ou inválida. Por favor, saia e entre novamente no painel.' }, { status: 401 });
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
