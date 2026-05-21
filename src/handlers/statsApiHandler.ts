import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getStats } from "../services/statsService";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
};

export async function handler(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  const code = event.pathParameters?.code;

  if (!code) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: "Missing code" }),
    };
  }

  const stats = await getStats(code);

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify(stats),
  };
}
