document.getElementById('convertButton').addEventListener('click', function() {
    const input = document.getElementById('inputFileName').value;
    const output = convertToCamelCase(input);
    document.getElementById('outputCommand').textContent = output;
    document.getElementById('copyButton').disabled = !output;
    document.getElementById('copyOldNameButton').disabled = !input;
    document.getElementById('copyNewNameButton').disabled = !output;
    document.getElementById('copyMessage').classList.add('hidden'); // Hide the message when converting
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('inputFileName').value = '';
    document.getElementById('outputCommand').textContent = '';
    document.getElementById('copyButton').disabled = true;
    document.getElementById('copyOldNameButton').disabled = true;
    document.getElementById('copyNewNameButton').disabled = true;
    document.getElementById('copyMessage').classList.add('hidden'); // Hide the message when clearing
});

document.getElementById('copyButton').addEventListener('click', function() {
    const output = document.getElementById('outputCommand').textContent;
    copyToClipboard(output);
    showCopyMessage();
});

document.getElementById('copyOldNameButton').addEventListener('click', function() {
    const input = document.getElementById('inputFileName').value;
    const oldFileName = input.split('/').pop().split('\\').pop(); // Handle both / and \ separators
    copyToClipboard(oldFileName);
    showCopyMessage();
});

document.getElementById('copyNewNameButton').addEventListener('click', function() {
    const output = document.getElementById('outputCommand').textContent;
    const newFileName = output.split(' ').pop().split('/').pop();
    copyToClipboard(newFileName);
    showCopyMessage();
});

function convertToCamelCase(path) {
    if (!path) return '';

    // Replace backslashes with forward slashes
    path = path.replace(/\\/g, '/');

    // Extract file path, name, and extension
    const parts = path.split('/');
    const fileName = parts.pop();
    const [name, ext] = fileName.split('.');

    // Convert name to camelCase
    const camelCaseName = name.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase())
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .replace(/([a-z\d])([A-Z])/g, '$1 $2')
        .split(' ')
        .map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');

    const newFileName = `${camelCaseName}.${ext}`;
    const newPath = [...parts, newFileName].join('/');

    return `git mv ${path} ${newPath}`;
}

function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

function showCopyMessage() {
    const copyMessage = document.getElementById('copyMessage');
    copyMessage.classList.remove('hidden');
    copyMessage.classList.add('visible');
    setTimeout(() => {
        copyMessage.classList.remove('visible');
        copyMessage.classList.add('hidden');
    }, 2000); // Message visible for 2 seconds
}
