import { SQSEvent } from 'aws-lambda'
import { recordVisit } from '../services/statsService'

export async function handler(event: SQSEvent): Promise<void> {
  for (const record of event.Records) {
    const body = JSON.parse(record.body) as { code: string; timestamp: string }
    await recordVisit(body.code, body.timestamp)
  }
}
