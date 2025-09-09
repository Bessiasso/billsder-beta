# Billsder

Billsder is a modern web application built with Next.js for managing suppliers, products, and orders. It provides a comprehensive interface for businesses to handle their supplier relationships and order management efficiently.

## Features

-   **Supplier Management**

    -   View and manage supplier information
    -   Track supplier status (active/inactive)
    -   Categorize suppliers
    -   Detailed supplier profiles with contact information

-   **Product Management**

    -   Associate products with suppliers
    -   Track product availability
    -   Manage product pricing and details

-   **Order Management**

    -   Create and send orders to suppliers
    -   Track order status
    -   Manage order quantities and pricing
    -   Email integration for order communication

-   **User Interface**
    -   Modern, responsive design
    -   Intuitive navigation
    -   Real-time updates
    -   Search and filter capabilities

## Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Language**: TypeScript
-   **UI Components**:
    -   Shadcn UI
    -   Radix UI
    -   Tailwind CSS
-   **State Management**: React Hook Form
-   **Validation**: Zod
-   **Icons**: Lucide Icons
-   **Animations**: Framer Motion

## Getting Started

### Prerequisites

-   Node.js 18.0 or later
-   pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd billsder
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add necessary environment variables.

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
billsder/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── suppliers/        # Supplier-related components
│   └── ui/              # UI components
├── lib/                  # Utility functions and hooks
├── services/            # API services and types
└── public/              # Static assets
```

## Development

-   The project uses TypeScript for type safety
-   Follows a component-based architecture
-   Implements responsive design principles
-   Uses modern React patterns and hooks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
