import { saveVisit, countVisits } from '../repositories/statsRepository'
import { log } from '../utils/logger'

export async function recordVisit(code: string, timestamp: string): Promise<void> {
  await saveVisit(code, timestamp)
  log('INFO', 'Visit stored', { code })
}

export async function getStats(code: string): Promise<{ code: string; totalVisits: number }> {
  const totalVisits = await countVisits(code)
  return { code, totalVisits }
}
