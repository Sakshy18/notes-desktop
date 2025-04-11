# 📝 NoteIt – A Beautiful Minimal Desktop Notes App

![NoteIt Screenshot](noteit-preview.png)
![NoteIt Editor](noteit-editor.png)

NoteIt is a minimal offline desktop note-taking app built using **Electron.js**. It features:
- ✨ Smooth animations
- 📁 Local storage for your notes
- 🖋️ Edit and delete functionality
- 🔊 Click sound interactions
- 🔒 No internet required — runs 100% offline

---

## 🚀 How to Set Up NoteIt on Your Desktop

### 📦 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download) (version 14 or above)
- [Git](https://git-scm.com/)

---

### 🛠️ 1. Clone the Repository

```bash
git clone https://github.com/your-username/noteit-app.git
cd noteit-app
```

### 📁 2. Install Dependencies

```bash
npm install
```
### 💻 3. Run the App Locally (Development)

```bash
npm start
```

###📦 4. Build Desktop App (Windows/macOS/Linux)
this is for macOS
```bash
npm run package

```
if you are using windows make sure you write this in package.json

```bash
"package": "electron-packager . NoteIt --platform=win32 --arch=x64 --icon=icon.ico --overwrite"
```
also remove this :
"package": "electron-packager . NoteIt --platform=darwin --arch=x64 --icon=icon.icns --overwrite"

PS: also dont forget to rename icon (windows supports.ico whereas Mac supports .icns)

### Good to Go ;)



