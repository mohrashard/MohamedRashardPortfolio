"use server";

export async function fetchHtmlAndAnalyze(domain: string) {
  try {
    const target = domain.startsWith('http') ? domain : `https://${domain}`;
    
    // Fetch HTML
    const res = await fetch(target, { headers: { 'User-Agent': 'Mozilla/5.0' }, cache: 'no-store' });
    const html = await res.text();
    
    // Count external script tags
    const scriptRegex = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
    let match;
    let externalScriptCount = 0;
    let firstJsUrl = null;
    while ((match = scriptRegex.exec(html)) !== null) {
      externalScriptCount++;
      if (!firstJsUrl && match[1].endsWith('.js')) {
        firstJsUrl = match[1];
      }
    }

    // Measure inline payload size (e.g., __NEXT_DATA__)
    let inlineStateSize = 0;
    const nextDataRegex = /<script[^>]*id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i;
    const nextDataMatch = html.match(nextDataRegex);
    if (nextDataMatch) {
        inlineStateSize = Buffer.byteLength(nextDataMatch[1], 'utf8');
    } else {
        // Fallback for general massive inline scripts
        const inlineScriptRegex = /<script(?:(?!src=).)*?>([\s\S]*?)<\/script>/gi;
        let inlineMatch;
        while ((inlineMatch = inlineScriptRegex.exec(html)) !== null) {
            if (inlineMatch[1].length > 1000) {
                inlineStateSize += Buffer.byteLength(inlineMatch[1], 'utf8');
            }
        }
    }

    // Resolve first JS URL if it's relative
    if (firstJsUrl && !firstJsUrl.startsWith('http')) {
        firstJsUrl = new URL(firstJsUrl, target).href;
    }

    return {
      success: true,
      data: {
        externalScriptCount,
        inlineStateSizeKb: (inlineStateSize / 1024).toFixed(2),
        firstJsUrl,
      }
    };

  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function checkBundleCache(jsUrl: string) {
  try {
    if (!jsUrl) return { success: false, error: 'No JS URL provided' };
    const res = await fetch(jsUrl, { method: 'HEAD', cache: 'no-store' });
    const cacheControl = res.headers.get('cache-control') || '';
    const hasImmutable = cacheControl.toLowerCase().includes('immutable');
    
    return {
      success: true,
      data: {
        cacheControl,
        hasImmutable
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
