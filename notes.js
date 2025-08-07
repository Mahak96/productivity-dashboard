document.addEventListener("DOMContentLoaded", () => {

  // Save note to local storage
  let textarea = document.getElementById('floatingTextarea2');
  const saveBtn = document.getElementById('saveNote');

  // Load saved note
    const savedNote = localStorage.getItem('userNote');
    if (savedNote) {
      textarea.value = savedNote;
    

    const isDark = localStorage.getItem('darkMode');
    if (isDark === 'true') {
      document.body.classList.add('bg-dark', 'text-light');
      document.getElementById('checkNativeSwitch').checked = true;
    }
  };

  // Save note on button click
  saveBtn.addEventListener('click', () => {
    localStorage.setItem('userNote', textarea.value);
    alert('Note Saved!');
  });

});
