"use server";

import dns from 'dns/promises';

export async function resolveDnsRecords(domain: string) {
  try {
    const txtRecords = await dns.resolveTxt(domain).catch(() => []);
    // txtRecords is an array of arrays of strings
    const flattenedTxt = txtRecords.map(r => r.join(''));
    const dmarcRecords = flattenedTxt.filter(record => record.startsWith('v=DMARC1'));
    
    const mxRecords = await dns.resolveMx(domain).catch(() => []);
    
    return {
      success: true,
      data: {
        dmarc: dmarcRecords,
        mx: mxRecords
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function fetchSecurityHeaders(domain: string) {
  try {
    const target = domain.startsWith('http') ? domain : `https://${domain}`;
    const res = await fetch(target, { method: 'HEAD', cache: 'no-store' });
    
    const sts = res.headers.get('strict-transport-security') || null;
    const xfo = res.headers.get('x-frame-options') || null;
    
    return {
      success: true,
      data: {
        'strict-transport-security': sts,
        'x-frame-options': xfo
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
