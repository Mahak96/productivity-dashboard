
  // Save note to local storage
  let textarea = document.getElementById('floatingTextarea2');
  const saveBtn = document.getElementById('saveNote');

  // Load saved note
  window.onload = () => {
    const savedNote = localStorage.getItem('userNote');
    if (savedNote) {
      textarea.value = savedNote;
    }

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

  // // Dark mode toggle
  // const toggleSwitch = document.getElementById('checkNativeSwitch');
  // toggleSwitch.addEventListener('change', function () {
  //   if (this.checked) {
  //     document.body.classList.add('bg-dark', 'text-light');
  //     localStorage.setItem('darkMode', 'true');
  //     textarea.style.backgroundColor="gray";
      
  //   } else {
  //     document.body.classList.remove('bg-dark', 'text-light');
  //     localStorage.setItem('darkMode', 'false');
  //     textarea.style.backgroundColor="white";

  //   }
  // });

