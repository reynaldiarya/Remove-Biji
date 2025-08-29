# Remove Biji

Remove Biji is a background removal web application built with SvelteKit that allows users to easily remove backgrounds from images.

## Features

- Instant processing
- High quality output
- Google OAuth authentication
- Credits system
- Free tier with 3 credits per day
- Light/dark theme
- Responsive design
- SEO optimized

## Tech Stack

- SvelteKit
- TypeScript
- Tailwind CSS
- Skeleton UI
- Drizzle ORM
- MySQL

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL=
TRIPAY_API_KEY=
TRIPAY_PRIVATE_KEY=
TRIPAY_MERCHANT_CODE=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/reynaldiarya/Remove-Biji
   cd Remove-Biji
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run database migrations:**
   ```bash
   npm run db:push
   npm run db:migrate
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

Created by [tfkhdyt](https://github.com/tfkhdyt)