export function log(level: string, message: string, extra?: Record<string, unknown>): void {
  console.log(JSON.stringify({ level, message, ...extra }))
}
