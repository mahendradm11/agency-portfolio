import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'SoraZen Fullstack Next.js',
    timestamp: new Date().toISOString(),
  });
}
