# AuthUser

## Description
AuthUser is a web application that integrates Firebase for authentication and real-time database functionality. It offers a user-friendly interface with dynamic features to manage user accounts, perform secure logins, and interact with a real-time database.

## Features
- User authentication using Firebase
- Real-time database interactions
- Responsive design with a mobile-friendly menu
- Secure environment variable management
- Modern UI with Tailwind CSS

## Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/authuser.git
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    - Create a `.env` file in the root directory.
    - Add your environment variables:
      ```env
      REACT_APP_FIREBASE_API_KEY=your_api_key
      REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
      REACT_APP_FIREBASE_DATABASE_URL=your_database_url
      REACT_APP_FIREBASE_PROJECT_ID=your_project_id
      REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
      REACT_APP_FIREBASE_APP_ID=your_app_id
      REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
      ```

## Usage
1. **Start the development server:**
    ```bash
    npm run dev
    ```

2. **Open your browser and navigate to:**
    ```
    http://localhost:3000
    ```

## Testing
- **Unit Tests:**
    ```bash
    npm run test
    ```

- **End-to-End Tests:**
    ```bash
    npm run e2e
    ```

## Build
To create a production build, use:
```bash
npm run build
