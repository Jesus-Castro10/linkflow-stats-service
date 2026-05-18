resource "aws_sqs_queue" "dlq" {
  name = "linkflow-stats-dlq"
}

resource "aws_sqs_queue" "main" {
  name = "linkflow-stats-queue"

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.dlq.arn
    maxReceiveCount     = 3
  })
}
