export async function GET() {
  return Response.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'wuhr-ai-vram-insight',
    version: '1.0.0'
  })
} 