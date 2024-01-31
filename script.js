document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    
    // Client-side checks
    document.getElementById('length').classList.toggle('valid', password.length >= 12);
    
    document.getElementById('combination').classList.toggle('valid', /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /\W/.test(password));

    if (document.getElementById('length').classList.contains('valid') && document.getElementById('combination').classList.contains('valid')) {
        document.getElementById('length').querySelector('i').classList.add('both-valid');
        document.getElementById('combination').querySelector('i').classList.add('both-valid');
    } else {
        document.getElementById('length').querySelector('i').classList.remove('both-valid');
        document.getElementById('combination').querySelector('i').classList.remove('both-valid');
    }
    
    // Server-side check
    fetch('http://your_backend_url/check_strength', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password: password})
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('strength-output').innerText = data.message;
        document.getElementById('strength-output').style.backgroundColor = data.color;
        document.getElementById('not-word').classList.toggle('valid', data.not_word);
        document.getElementById('not-similar').classList.toggle('valid', data.not_similar);
    })
    .catch(error => console.error('Error:', error));
});
