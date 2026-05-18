import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}))
const TABLE_NAME = process.env.TABLE_NAME!

export async function saveVisit(code: string, timestamp: string): Promise<void> {
  await client.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      PK: `CODE#${code}`,
      SK: `VISIT#${timestamp}`
    }
  }))
}

export async function countVisits(code: string): Promise<number> {
  const result = await client.send(new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': `CODE#${code}`
    },
    Select: 'COUNT'
  }))
  return result.Count ?? 0
}
