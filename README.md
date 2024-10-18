# CV Viewer

**CV Viewer** is a web application built with **Next.js** that allows users to upload and share their CV via a unique link. The application tracks various statistics such as the number of views, time spent by viewers on the CV, downloads, and print actions.

## Features

- **Upload CV**: Users can upload their CV in PDF format.
- **Generate Shareable Link**: After uploading the CV, users receive a unique link to share with others.
- **Track Statistics**:
  - **View Count**: Number of times the CV was viewed.
  - **Time Spent**: Time viewers spent on the CV page.
  - **Downloads**: Number of times the CV was downloaded.
  - **Prints**: Number of times the CV was printed.

## Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/) (React-based framework)
- **Backend**: Node.js and API routes provided by Next.js
- **Database**: [MongoDB](https://www.mongodb.com/) (using MongoDB Atlas for cloud hosting)
- **Authentication**: JWT (JSON Web Token) for secure user authentication.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for rapid styling and utility-first CSS.


## Setup and Installation

### Prerequisites

Before running this project, ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/) (for local or cloud database)

### Installation

1. **Clone the repository**:

```bash
   git clone https://github.com/your-username/cv_viewer.git
``` 
2.  **Navigate to the project directory**:

```bash
   cd cv_viewer
```

3. **Install the dependencies**:

```bash
   npm install
 ```

4. **Set up environment variables**:

Create a .env.local file at the root of your project and add the following environment variables:

```bash
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

5. **Running the Application**

```bash
   pnpm dev
 ```


The application should now be running on [http://localhost:3000](http://localhost:3000).


```

.
├── app/                    # Next.js app directory
│   ├── api/                # API routes
│   ├── (pages)/            # Pages directory
│   ├── assets/             # Assets (images, etc.)
│   ├── components/         # React components
│   ├── fonts/              # Fonts used in the application
│   ├── lib/                # Helper libraries
│   ├── models/             # Database models
│   ├── layout.tsx          # Application layout
│   └── page.tsx            # Main page of the application
├── node_modules/           # Node.js modules
├── public/                 # Public files (favicon, etc.)
├── .env.local              # Environment variables
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── next-env.d.ts           # Next.js environment types
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project documentation
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration

```