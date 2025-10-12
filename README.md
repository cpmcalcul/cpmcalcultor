# ShipAny Template One

Ship Any AI SaaS Startups in hours.

![preview](preview.png)

## Quick Start

1. Clone the repository

```bash
git clone https://github.com/shipanyai/shipany-template-one.git
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

```bash
cp .env.example .env.development
```

**Important**: You need to set up the following environment variables:

- `REPLICATE_API_TOKEN`: Get your API token from [Replicate](https://replicate.com/account/api-tokens)
- `DATABASE_URL`: Your database connection string
- `NEXTAUTH_SECRET`: Your NextAuth secret key

4. Run the development server

```bash
pnpm dev
```

## AI Workstation Features

The AI Workstation integrates with Replicate's Flux-Kontext model for advanced image editing and generation:

- **Image Enhancement**: Upload images and enhance them with AI
- **Prompt-based Editing**: Use text prompts to guide image modifications
- **Credit System**: Each generation costs 5 credits
- **Real-time Processing**: Powered by Replicate's AI models

### Replicate Configuration

To use the AI Workstation, you need:

1. A Replicate account
2. API token from [Replicate Dashboard](https://replicate.com/account/api-tokens)
3. Set `REPLICATE_API_TOKEN` in your environment variables

The system uses the `black-forest-labs/flux-kontext-max` model for image processing.

## Customize

- Set your environment variables

```