# Document Q&A Chatbot

A modern React-based chatbot application that allows users to upload documents or paste text and ask questions about the content. The application provides an intuitive interface for document processing and AI-powered question answering.

## 🚀 Features

- **Document Upload**: Support for PDF, DOCX, and TXT files (max 5MB)
- **Text Input**: Direct text pasting for quick processing
- **Real-time Chat**: Interactive Q&A interface with the uploaded content
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0 with Vite
- **Styling**: CSS with modern design patterns
- **Icons**: Lucide React for beautiful icons
- **HTTP Client**: Axios for API communication
- **Build Tool**: Vite for fast development and building

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Backend API** running (see Backend Setup section)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chatbot-task-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

**Note**: Replace `http://localhost:5000` with your actual backend API URL.

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
src/
├── api/
│   └── documentService.js    # API service functions
├── components/
│   └── chatbotComponent/
│       ├── chatbot.jsx       # Main chatbot component
│       └── chatbot.css       # Component styles
├── App.jsx                   # Root application component
├── main.jsx                  # Application entry point
└── index.css                 # Global styles
```

## 🔧 API Endpoints

The application communicates with the following backend endpoints:

- `POST /upload` - Upload and process documents
- `POST /process-text` - Process text input
- `POST /ask` - Ask questions about processed content

## 📝 Usage

### Uploading Documents

1. Click the "Upload Document" section
2. Select a file (PDF, DOCX, or TXT) up to 5MB
3. Wait for processing to complete
4. Start asking questions about your document

### Pasting Text

1. Click the "Or Paste Text" section
2. Paste your text content
3. Click "Process Text"
4. Begin asking questions about your content

### Asking Questions

1. Once a document or text is processed, the chat interface appears
2. Type your question in the input field
3. Press Enter or click the send button
4. Receive AI-powered answers based on your content

## 🎨 Features in Detail

### File Upload
- **Supported Formats**: PDF, DOCX, TXT
- **Size Limit**: 5MB maximum
- **Validation**: Automatic file type and size checking
- **Progress Indication**: Loading states during upload and processing

### Text Processing
- **Direct Input**: Paste text directly into the interface
- **Real-time Processing**: Immediate text processing
- **Validation**: Ensures text is not empty before processing

### Chat Interface
- **Message History**: Persistent conversation history
- **User/Bot Messages**: Clear distinction between user and bot messages
- **Timestamps**: Each message includes a timestamp
- **Auto-scroll**: Automatically scrolls to latest messages
- **Loading States**: Visual feedback during API calls

### Error Handling
- **Network Errors**: Graceful handling of API failures
- **File Errors**: Clear error messages for invalid files
- **User Feedback**: Informative error messages and alerts

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style

The project uses ESLint for code quality. Run the linter with:

```bash
npm run lint
```

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Environment Variables

Make sure to set the correct `VITE_BACKEND_URL` for your production environment.
