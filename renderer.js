const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const iconButtons = document.querySelectorAll('.icon-button-title');
  const newNoteBtn = document.getElementById('newNoteBtn');
  const closeBtn = document.getElementById("closeBtn");
  const minimizeBtn = document.getElementById("minimizeBtn");
  const container = document.querySelector('.notes-container');
  const notePath = path.join(__dirname, 'notes.json');

  function loadNotes() {
    container.classList.add('fade-out');

      
        setTimeout(() => {
          fs.readFile(notePath, 'utf8', (err, data) => {
            if (err || !data) return;
      
            const notes = JSON.parse(data);
            container.innerHTML = '';
      
            for (let i = notes.length - 1; i >= 0; i--) {
              const note = notes[i];
              const snippet = note.text.length > 20
                ? note.text.slice(0, 16) + '...'
                : note.text;
      
              const card = document.createElement('div');
              card.className = 'note-card';
              card.innerHTML = `
                <div class="note-text">
                  <p>${snippet}</p>
                  <span>${note.date}</span>
                </div>
                <div class="note-actions">
                  <img src="assets/edit.png" class="icon-button edit-btn" data-index="${i}">
                  <img src="assets/delete.png" class="icon-button delete-btn" data-index="${i}">
                </div>
              `;
              container.appendChild(card);
            }
      
            attachListeners(); 
      
            container.classList.remove('fade-out');
            container.classList.add('fade-in');
      
            setTimeout(() => {
              container.classList.remove('fade-in');
            }, 300);
          });
        }, 150); 
      
  }

  function deleteNote(index) {
    fs.readFile(notePath, 'utf8', (err, data) => {
      if (err || !data) return;

      const notes = JSON.parse(data);
      notes.splice(index, 1); 

      fs.writeFile(notePath, JSON.stringify(notes, null, 2), err => {
        if (err) {
          console.error('Failed to delete note:', err);
        } else {
          loadNotes();
        }
      });
    });
  }

  function attachListeners() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-index');
        sessionStorage.setItem('editingIndex', index);
        window.location.href = 'editor.html';
      });
    });
  
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        deleteNote(index);
      });
    });
  }
  



  
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

  
  iconButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });


  if (newNoteBtn) {
    newNoteBtn.addEventListener('click', () => {
      clickSound.currentTime = 0;
      clickSound.play();
      sessionStorage.removeItem('editingIndex');
      setTimeout(() => {
        window.location.href = 'editor.html';
      }, 200);
    });
  }

  loadNotes();
});
