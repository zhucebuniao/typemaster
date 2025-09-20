# Typemaster - 2D Typing & English Learning Game

A modern web-based typing game that combines typing practice with English vocabulary learning. Built with React, TypeScript, and Tailwind CSS.

## 🎮 Features

### MVP (v1.0) - Currently Available
- **Multiple Game Modes**: Words and sentences with easy, medium, and hard difficulty levels
- **Real-time Metrics**: Live WPM (Words Per Minute) and accuracy tracking
- **Visual Feedback**: Color-coded typing progress with character-by-character feedback
- **Vocabulary Review**: Automatic mistake tracking for words you get wrong
- **Local Leaderboard**: Track your best scores locally
- **User Progress**: Level system and total score tracking
- **Responsive Design**: Works on desktop and mobile devices

### Upcoming Features (Roadmap)
- **2D Game Engine**: Enhanced visual effects using Pixi.js or Canvas API
- **Spaced Repetition**: Ebbinghaus forgetting curve-based vocabulary review
- **Global Leaderboard**: Compete with players worldwide using Vercel Serverless Functions
- **Achievement System**: Unlock badges and rewards
- **Custom Content**: User-generated word lists and challenges
- **Advanced Analytics**: Detailed typing statistics and progress tracking

## 🚀 Quick Start

### Development
```bash
# Clone the repository
git clone https://github.com/zhucebuniao/typemaster.git
cd typemaster

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom game theme
- **Build Tool**: Vite for fast development and optimized builds
- **Deployment**: Vercel with automatic CI/CD
- **State Management**: React hooks with local storage persistence
- **Font**: Fira Code monospace font for optimal typing experience

## 🎯 Game Modes

### Word Practice
- **Easy**: Common 3-5 letter words (apple, cat, book)
- **Medium**: 6-10 letter words (computer, important, technology)
- **Hard**: Complex vocabulary (sophisticated, entrepreneurship)

### Sentence Practice
- **Easy**: Simple sentences with basic grammar
- **Medium**: Longer sentences with varied vocabulary
- **Hard**: Complex sentences with advanced vocabulary

## 📊 Scoring System

Your score is calculated based on:
- **WPM (Words Per Minute)**: Speed of typing
- **Accuracy**: Percentage of correct characters
- **Formula**: `Score = WPM × (Accuracy/100) × 10`

## 🏆 Progress Tracking

- **Levels**: Advance levels by accumulating points
- **Best Records**: Track your highest WPM and accuracy
- **Mistake Words**: Review vocabulary you've struggled with
- **Local Storage**: All progress saved in your browser

## 🌐 Deployment

This project is configured for automatic deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically build and deploy on every push to main
3. The app will be available at your Vercel domain

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔮 Future Enhancements

- **Multiplayer Mode**: Real-time typing races
- **Themes**: Customizable visual themes
- **Sound Effects**: Audio feedback for typing events
- **Mobile App**: React Native version for iOS/Android
- **Content Management**: Admin panel for managing word lists
- **AI-Powered**: Personalized difficulty adjustment

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Acknowledgments

- Inspired by popular typing games like TypeRacer and Keybr
- Built with modern web technologies for optimal performance
- Designed with accessibility and user experience in mind

---

**Start your typing journey today and master both speed and vocabulary!** 🚀
