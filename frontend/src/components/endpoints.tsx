const ENV_BEARER = import.meta.env.VITE_BEARER as string | undefined;
const AUTH_USER = import.meta.env.VITE_USER as string | undefined;
const AUTH_PASS = import.meta.env.VITE_PASSWORD as string | undefined;

const AUTH_URL = "https://dev.denodare.inf.ufg.br/api/auth/signin";

let cachedToken: string | null = ENV_BEARER ?? null;
let cachedTokenExpiry: number | null = null;

async function obtainBearerToken(): Promise<string | null> {
    // If token provided via env, use it
    if (cachedToken) {
        // If expiry known, respect it
        if (!cachedTokenExpiry || Date.now() < cachedTokenExpiry) return cachedToken;
        // expired — clear and continue to obtain new
        cachedToken = null;
    }

    if (!AUTH_USER || !AUTH_PASS) return null;

    const resp = await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: AUTH_USER, password: AUTH_PASS }),
    });

    if (!resp.ok) {
        throw new Error(`Auth failed with status ${resp.status}`);
    }

    const body = await resp.json();
    const token = (body && (body.access_token || body.token || body.accessToken)) as string | undefined;
    if (!token) throw new Error('Auth response did not include access_token');

    cachedToken = token;
    if (body.expires_in && Number.isFinite(Number(body.expires_in))) {
        cachedTokenExpiry = Date.now() + Number(body.expires_in) * 1000;
    }

    return cachedToken;
}

export const fetchReportById = async (id: string) => {
    const url = `https://dev.denodare.inf.ufg.br/api/news/by-id/${id}`;

    const token = await obtainBearerToken();

    const headers: Record<string, string> = {
        Accept: 'application/json',
    };

    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(url, { method: 'GET', headers });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
};

export const summarizeReport = (report: any): string => {
    if (!report) return "Relato não encontrado.";

    const clean = (text?: string, limit = 180) => {
        if (!text) return "";
        const s = text.replace(/\s+/g, ' ').trim();
        return s.length > limit ? s.slice(0, limit).trim() + '...' : s;
    };

    const parts: string[] = [];

    if (report.title) parts.push(`Título: ${clean(report.title, 120)}`);
    if (report.source) parts.push(`Fonte: ${report.source}`);
    if (report.publishedAt) parts.push(`Publicado em: ${report.publishedAt}`);
    if (report.allegation) parts.push(`Alegação: ${clean(report.allegation, 120)}`);

    const contentSnippet = clean(report.content, 200);
    if (contentSnippet) parts.push(`Trecho: ${contentSnippet}`);

    if (report.facts) parts.push(`Constatações: ${clean(report.facts, 200)}`);

    if (typeof report.score !== 'undefined' && report.score !== null) {
        parts.push(`Score: ${Number(report.score).toFixed(2)}`);
    }

    if (report.url) parts.push(`Link: ${report.url}`);

    // Compose a short textual summary in Portuguese
    return parts.join(' — ');
};