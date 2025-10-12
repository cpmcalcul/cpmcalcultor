# CPM Calculator

Professional CPM (Cost Per Mille) calculator for digital marketing and advertising campaigns.

![preview](preview.png)

## Quick Start

1. Clone the repository

```bash
git clone https://github.com/cpmcalcul/cpmcalcultor.git
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

- `DATABASE_URL`: Your database connection string
- `NEXTAUTH_SECRET`: Your NextAuth secret key

4. Run the development server

```bash
pnpm dev
```

## CPM Calculator Features

A comprehensive toolkit for marketing professionals and advertisers:

- **CPM Calculation**: Calculate Cost Per Mille for advertising campaigns
- **Impression Calculator**: Estimate reach and impressions
- **Budget Planning**: Plan advertising budgets effectively
- **Campaign Analytics**: Track and analyze campaign performance
- **Multi-platform Support**: Calculate CPM for various advertising platforms

1. A Replicate account
2. API token from [Replicate Dashboard](https://replicate.com/account/api-tokens)
3. Set `REPLICATE_API_TOKEN` in your environment variables

The system uses the `black-forest-labs/flux-kontext-max` model for image processing.

## Customize

- Set your environment variables

```