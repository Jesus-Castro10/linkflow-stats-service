resource "aws_api_gateway_rest_api" "stats_api" {
  name = "linkflow-stats-api"
}

resource "aws_api_gateway_resource" "stats" {
  rest_api_id = aws_api_gateway_rest_api.stats_api.id
  parent_id   = aws_api_gateway_rest_api.stats_api.root_resource_id
  path_part   = "stats"
}

resource "aws_api_gateway_resource" "stats_code" {
  rest_api_id = aws_api_gateway_rest_api.stats_api.id
  parent_id   = aws_api_gateway_resource.stats.id
  path_part   = "{code}"
}

resource "aws_api_gateway_method" "get_stats" {
  rest_api_id   = aws_api_gateway_rest_api.stats_api.id
  resource_id   = aws_api_gateway_resource.stats_code.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_stats" {
  rest_api_id             = aws_api_gateway_rest_api.stats_api.id
  resource_id             = aws_api_gateway_resource.stats_code.id
  http_method             = aws_api_gateway_method.get_stats.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.stats_api.invoke_arn
}

resource "aws_api_gateway_deployment" "stats_api" {
  rest_api_id = aws_api_gateway_rest_api.stats_api.id

  depends_on = [
    aws_api_gateway_integration.get_stats
  ]
}

resource "aws_api_gateway_stage" "dev" {
  rest_api_id   = aws_api_gateway_rest_api.stats_api.id
  deployment_id = aws_api_gateway_deployment.stats_api.id
  stage_name    = "dev"
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.stats_api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.stats_api.execution_arn}/*/*"
}
