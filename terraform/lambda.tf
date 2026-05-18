resource "aws_lambda_function" "stats_consumer" {
  filename         = "../function.zip"
  function_name    = "stats-consumer"
  role             = aws_iam_role.lambda_role.arn
  handler          = "dist/handlers/statsConsumerHandler.handler"
  runtime          = "nodejs18.x"
  source_code_hash = filebase64sha256("../function.zip")

  environment {
    variables = {
      TABLE_NAME = var.table_name
    }
  }
}

resource "aws_lambda_function" "stats_api" {
  filename         = "../function.zip"
  function_name    = "stats-api"
  role             = aws_iam_role.lambda_role.arn
  handler          = "dist/handlers/statsApiHandler.handler"
  runtime          = "nodejs18.x"
  source_code_hash = filebase64sha256("../function.zip")

  environment {
    variables = {
      TABLE_NAME = var.table_name
    }
  }
}

resource "aws_lambda_event_source_mapping" "sqs_trigger" {
  event_source_arn = aws_sqs_queue.main.arn
  function_name    = aws_lambda_function.stats_consumer.arn
  batch_size       = 10
}
