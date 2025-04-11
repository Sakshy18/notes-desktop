const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('.editor-textarea');
  const saveBtn = document.getElementById('saveBtn');
  const backBtn = document.querySelector('.editor-back-btn');
  const clickSound = document.getElementById('clickSound');
  const savePopup = document.getElementById('savePopup');
  const notePath = path.join(__dirname, 'notes.json');
  const editingIndex = sessionStorage.getItem('editingIndex');


  if (editingIndex !== null && textarea) {
    fs.readFile(notePath, 'utf8', (err, data) => {
      if (!err && data) {
        try {
          const notes = JSON.parse(data);
          if (notes[editingIndex]) {
            textarea.value = notes[editingIndex].text;
          }
        } catch (e) {
          console.error("Couldn't parse notes.json:", e);
        }
      }
    });
  }


  function showSaveAnimation() {
    savePopup.style.display = 'block';
    savePopup.classList.add('show');
    setTimeout(() => {
      savePopup.classList.remove('show');
      savePopup.style.display = 'none';
    }, 3000);
  }


  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      clickSound.currentTime = 0;
      clickSound.play();

      const noteText = textarea.value.trim();
      if (!noteText) return;

      fs.readFile(notePath, 'utf8', (err, data) => {
        let notes = [];
        if (!err && data) {
          try {
            notes = JSON.parse(data);
          } catch (e) {
            console.error('Error parsing notes.json:', e);
          }
        }

        const note = {
          text: noteText,
          date: new Date().toLocaleDateString()
        };

        if (editingIndex !== null && notes[editingIndex]) {
          notes[editingIndex] = note; 
        } else {
          notes.push(note); 
        }

        fs.writeFile(notePath, JSON.stringify(notes, null, 2), err => {
          if (err) {
            console.error('Failed to save note:', err);
          } else {
            showSaveAnimation();
          }
        });
      });
    });
  }


  if (backBtn) {
    backBtn.addEventListener('click', () => {
      clickSound.currentTime = 0;
      clickSound.play();
      sessionStorage.removeItem('editingIndex');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 200);
    });
  }

  const closeBtn = document.getElementById("closeBtn");
  const minimizeBtn = document.getElementById("minimizeBtn");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      ipcRenderer.send('close-window');
    });
  }

  if (minimizeBtn) {
    minimizeBtn.addEventListener("click", () => {
      ipcRenderer.send('minimize-window');
    });
  }
});
