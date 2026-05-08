# 🪢 Hangman

A classic **Hangman** word-guessing game built as a mobile app using **React Native** and **Expo**. Written in TypeScript for a clean, type-safe codebase and runs on both Android and iOS.

---

## 🎮 Gameplay

- A random word is selected and displayed as blank letter slots
- Guess one letter at a time by tapping on the on-screen keyboard
- Correct guesses reveal the letter in its position(s)
- Wrong guesses draw the hangman step by step
- You have **6 attempts** before the game is over
- Guess the full word before the hangman is complete to win!

---

## 🚀 Features

- **Random Word Selection** — A new word is picked every round
- **On-Screen Keyboard** — Tap letters to make guesses; used letters are disabled
- **Hangman Drawing** — Visual progression with each wrong guess
- **Win / Lose Detection** — Clear end-game states with the option to play again
- **Letter Tracking** — Correctly and incorrectly guessed letters are tracked separately
- **Cross-Platform** — Runs on Android and iOS via Expo

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile framework |
| Expo | Toolchain, build system & file-based routing |
| TypeScript | Type-safe development |
| Expo Router | File-based navigation |

---

## 📁 Project Structure

```
Hangman/
│
├── app/                     # Expo Router screens (file-based routing)
│   ├── index.tsx            # Main game screen
│   └── _layout.tsx          # Root layout
│
├── assets/                  # Images, fonts, and static files
│
├── app.json                 # Expo configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # ESLint configuration
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) app on your phone — for quick testing on a physical device
- [Android Studio](https://developer.android.com/studio) — for Android emulator (optional)
- [Xcode](https://developer.apple.com/xcode/) — for iOS simulator (optional, macOS only)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Devrajchapai/Hangman.git
cd Hangman
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the App

```bash
npx expo start
```

In the terminal output you'll see a QR code. From there you can open the app in:

- **Expo Go** — scan the QR code with your phone
- **Android Emulator** — press `a`
- **iOS Simulator** — press `i` *(macOS only)*
- **Web browser** — press `w`

---

## 🔄 Reset to Blank Project

If you want to start fresh:

```bash
npm run reset-project
```

This moves the starter code to `app-example/` and creates a clean `app/` directory.

---


## 👤 Author

**Devraj Chapai**

- GitHub: [@Devrajchapai](https://github.com/Devrajchapai)

---

> ⭐ If you found this project fun, please consider giving it a star!
