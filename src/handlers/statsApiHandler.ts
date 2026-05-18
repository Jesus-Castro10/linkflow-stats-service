import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getStats } from '../services/statsService'

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const code = event.pathParameters?.code

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing code' })
    }
  }

  const stats = await getStats(code)

  return {
    statusCode: 200,
    body: JSON.stringify(stats)
  }
}
