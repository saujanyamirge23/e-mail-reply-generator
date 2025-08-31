# Email Writer - AI-Powered Email Assistant

A Spring Boot application with Chrome extension integration that provides AI-powered email generation using Google's Gemini API.

## Features

- **Spring Boot Backend**: REST API for email generation
- **Chrome Extension**: Integrates with Gmail to provide AI reply suggestions
- **Gemini AI Integration**: Uses Google's Gemini API for intelligent email content generation
- **React Frontend**: Modern web interface for email generation

## Architecture

- **Backend**: Spring Boot application running on port 8080
- **Frontend**: React application running on port 3000
- **Chrome Extension**: Injects AI reply button directly into Gmail interface

## Prerequisites

- Java 11 or higher
- Node.js 14 or higher
- Maven 3.6 or higher
- Google Gemini API key

## Setup

### Backend Setup

1. Clone the repository
2. Configure your Gemini API key in `src/main/resources/application.properties`:
   ```properties
   gemini.api.key=your_gemini_api_key_here
   ```
3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Chrome Extension Setup

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the project root directory
4. The extension will be loaded and ready to use in Gmail

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/email/generate` - Generate AI-powered email content
- `GET /api/email/generate/info` - Get API information

## Usage

1. Start both backend and frontend servers
2. Load the Chrome extension
3. Open Gmail and compose a new email
4. Click the AI-powered reply button to generate intelligent email content

## Configuration

The application uses the following default configuration:
- Backend port: 8080
- Frontend port: 3000 (with proxy to backend)
- API base path: `/api/email`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
