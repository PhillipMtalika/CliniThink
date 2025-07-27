# CliniThink 🏥

**AI-powered symptom checker and diagnosis assistant for frontline health workers in Malawi**

CliniThink is a modern web application designed to support healthcare workers in Malawi by providing AI-powered symptom analysis and diagnosis suggestions. The system uses natural language processing to understand patient symptoms and suggest possible conditions, improving early diagnosis and triage.

## 🚀 Features

- **AI-Powered Symptom Analysis**: Uses Hugging Face NLP models to analyze patient symptoms
- **Modern UI/UX**: Built with Next.js, TypeScript, and shadcn/ui for a professional interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Diagnosis**: Instant analysis with confidence scores and urgency levels
- **Comprehensive Recommendations**: Detailed treatment and triage recommendations
- **Form Validation**: Robust input validation using Zod schema validation
- **Error Handling**: Graceful error handling and user feedback

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Python FastAPI with Bio_ClinicalBERT
- **UI Components**: shadcn/ui, Lucide React icons
- **Form Handling**: React Hook Form with Zod validation
- **API Integration**: Axios for HTTP requests
- **AI/ML**: Hugging Face Bio_ClinicalBERT for medical text analysis
- **Styling**: Tailwind CSS with custom design system

## 📋 Prerequisites

- Node.js 18+ 
- Python 3.8+
- npm or yarn
- pip (Python package manager)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/PhillipMtalika/CliniThink.git
cd CliniThink
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Python Backend Configuration
PYTHON_BACKEND_URL=http://localhost:8000

# Next.js Configuration
NEXT_PUBLIC_APP_NAME=CliniThink
NEXT_PUBLIC_APP_DESCRIPTION=AI-powered symptom checker for healthcare workers in Malawi
```

### 4. Run the Development Environment

#### Option 1: Using the startup script (Recommended)

**On Windows:**
```bash
start-dev.bat
```

**On macOS/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

#### Option 2: Manual startup

**Terminal 1 - Start Python Backend:**
```bash
cd backend
pip install -r requirements.txt
python main.py
```

**Terminal 2 - Start Next.js Frontend:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
cliniThink/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── diagnose/
│   │   │       └── route.ts          # API endpoint for symptom analysis
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main application page
│   ├── components/
│   │   └── ui/                       # shadcn/ui components
│   └── lib/
│       └── utils.ts                  # Utility functions
├── public/                           # Static assets
├── .env.local                        # Environment variables
└── README.md                         # This file
```

## 🔧 Configuration

### AI Model Configuration

The application uses Bio_ClinicalBERT for medical text analysis. The model is automatically downloaded on first run.

To customize the AI analysis:

1. Modify the `MEDICAL_CONDITIONS` dictionary in `backend/main.py` to add more conditions
2. Adjust the confidence calculation logic in `analyze_symptoms_with_ai()` function
3. Add more sophisticated NLP processing as needed

### Customizing the UI

- **Colors**: Modify the color scheme in `src/app/globals.css`
- **Components**: Add new shadcn/ui components using `npx shadcn@latest add [component-name]`
- **Styling**: Customize Tailwind classes in the components

## 🧪 Testing the Application

1. **Start the development server**: `npm run dev`
2. **Open the application** in your browser
3. **Enter sample symptoms** such as:
   - "Patient has high fever, severe headache, and muscle pain for 3 days"
   - "Experiencing nausea, vomiting, and stomach cramps"
   - "Cough, sore throat, and runny nose for 1 week"
4. **Click "Analyze Symptoms"** to see AI-powered diagnosis suggestions

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**Medical Disclaimer**: CliniThink is designed to support healthcare workers and provide diagnostic suggestions only. This tool should not replace professional medical judgment, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.

## 🆘 Support

For support, email phillipmtalika1@gmail.com or create an issue in the GitHub repository.

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for providing the AI/ML infrastructure
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) for the amazing React framework
- Healthcare workers in Malawi for their invaluable feedback and support

---

**Built with ❤️ for healthcare workers in Malawi**
