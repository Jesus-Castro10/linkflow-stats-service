# LinkFlow Stats Service

Serverless analytics service responsible for processing visit events and exposing statistics for shortened URLs.

Built using AWS Lambda, Amazon SQS, DynamoDB and Terraform.

---

# Features

- Asynchronous visit processing
- SQS consumer architecture
- Visit aggregation
- Statistics API
- DynamoDB persistence
- DLQ support
- CloudWatch logging
- Terraform infrastructure provisioning
- Deploy automation script

---

# Tech Stack

- Node.js 18
- TypeScript
- AWS Lambda
- Amazon SQS
- API Gateway REST API
- DynamoDB
- Terraform
- AWS SDK v3

---

# Project Structure

```bash
src/
  handlers/
  repositories/
  services/
  utils/

terraform/
  providers.tf
  lambda.tf
  api_gateway.tf
  iam.tf
  dynamodb.tf
  sqs.tf
  dlq.tf
  variables.tf
  outputs.tf

scripts/
  deploy.sh
```

---

# Responsibilities

The service is responsible for:

- consuming visit events from SQS
- storing analytics data
- aggregating visit counts
- exposing statistics endpoints

---

# Architecture

The service uses two Lambda functions:

- SQS consumer Lambda
- Stats API Lambda

---

# Event Processing Flow

```text
Redirect Service
↓
SQS
↓
Stats Consumer Lambda
↓
DynamoDB
```

---

# Statistics API Flow

```text
Frontend
↓
API Gateway
↓
Stats API Lambda
↓
DynamoDB
```

---

# Endpoints

## Get URL Statistics

```http
GET /stats/{code}
```

---

## Response

```json
{
  "code": "aZ91xK",
  "totalVisits": 120,
  "recentVisits": [
    "2026-05-23T18:00:00Z",
    "2026-05-23T17:45:00Z"
  ],
  "todayVisits": 15,
  "weekVisits": 60,
  "monthVisits": 120
}
```

---

# Queue Event Format

```json
{
  "code": "aZ91xK",
  "timestamp": "2026-05-23T18:00:00Z"
}
```

---

# Environment Variables

```env
TABLE_NAME=
QUEUE_URL=
DLQ_URL=
```

---

# Infrastructure

Terraform provisions:

- SQS queue
- Dead Letter Queue
- Lambda functions
- API Gateway
- IAM roles and permissions
- DynamoDB table
- CloudWatch logging

---

# Data Strategy

Analytics are stored separately from URL resolution data.

This separation allows:

- independent scaling
- better analytics flexibility
- cleaner architecture
- reduced coupling between services

---

# Dead Letter Queue

Failed messages are automatically moved to a DLQ after retry exhaustion.

This prevents data loss and improves observability.

---

# Local Development

## Install dependencies

```bash
npm install
```

---

## Build project

```bash
npm run build
```

---

# Deployment

## Deploy using script

```bash
./scripts/deploy.sh
```

---

## Terraform Apply

```bash
terraform init
terraform apply
```

---

# CORS

CORS enabled for frontend integration.

---

# Future Improvements

- Geographic analytics
- Device analytics
- Browser analytics
- Real-time metrics
- Dashboard aggregation
- Time-series optimization

---

# License

MIT
