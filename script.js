// DOM Elements
const nameInput = document.getElementById('nameInput');
const printBtn = document.getElementById('printBtn');
const resetBtn = document.getElementById('resetBtn');
const displayArea = document.getElementById('displayArea');

// State
let isPrinting = false;
let printInterval = null;

// Font families pool
const fonts = [
    'Georgia, serif',
    'Times New Roman, serif',
    'Palatino, serif',
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Verdana, sans-serif',
    'Trebuchet MS, sans-serif',
    'Impact, sans-serif',
    'Comic Sans MS, cursive',
    'Courier New, monospace',
    'Lucida Console, monospace',
    'cursive',
    'fantasy'
];

// Color palette
const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#FF0080', '#7B68EE', '#FF4500', '#32CD32', '#FFD700',
    '#2C3E50', '#8E44AD', '#E74C3C', '#16A085', '#F39C12',
    '#E91E63', '#9C27B0', '#3F51B5', '#00BCD4', '#4CAF50'
];

// Gradient combinations
const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)'
];

// Animations
const animations = [
    'anim-fadeIn',
    'anim-slideInLeft',
    'anim-slideInRight',
    'anim-bounceIn',
    'anim-scaleUp',
    'anim-rotateIn',
    'anim-glitchEffect',
    'anim-pulse',
    'anim-wave'
];

// Text transforms
const textTransforms = ['uppercase', 'lowercase', 'capitalize', 'none'];

// Generate random style
function generateRandomStyle() {
    const fontSize = Math.floor(Math.random() * (72 - 24 + 1)) + 24;
    const rotation = Math.floor(Math.random() * 31) - 15; // -15 to +15
    const letterSpacing = Math.floor(Math.random() * 9) - 1; // -1 to 8
    const wordSpacing = Math.floor(Math.random() * 21); // 0 to 20
    const skewX = Math.floor(Math.random() * 21) - 10; // -10 to +10

    // Randomly choose color or gradient
    const useGradient = Math.random() > 0.5;
    const textColor = colors[Math.floor(Math.random() * colors.length)];
    const gradient = gradients[Math.floor(Math.random() * gradients.length)];

    // Random background
    const bgOpacity = (Math.random() * 0.3 + 0.1).toFixed(2); // 0.1 to 0.4
    const bgColor = colors[Math.floor(Math.random() * colors.length)];

    // Random shadow effects
    const shadowType = Math.floor(Math.random() * 4);
    let textShadow;
    switch(shadowType) {
        case 0:
            textShadow = `2px 2px 4px rgba(0,0,0,0.3)`;
            break;
        case 1:
            textShadow = `0 0 10px ${textColor}, 0 0 20px ${textColor}`;
            break;
        case 2:
            textShadow = `3px 3px 0 rgba(0,0,0,0.1), 6px 6px 0 rgba(0,0,0,0.1)`;
            break;
        case 3:
            textShadow = `1px 1px 2px rgba(0,0,0,0.2)`;
            break;
    }

    // Random text decoration
    const decorations = ['none', 'underline', 'overline', 'none', 'none'];
    const textDecoration = decorations[Math.floor(Math.random() * decorations.length)];

    // Random border
    const borderWidth = Math.floor(Math.random() * 4); // 0 to 3
    const borderColor = colors[Math.floor(Math.random() * colors.length)];
    const borderStyles = ['solid', 'dashed', 'dotted', 'double'];
    const borderStyle = borderStyles[Math.floor(Math.random() * borderStyles.length)];

    return {
        fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
        fontSize: `${fontSize}px`,
        color: useGradient ? 'transparent' : textColor,
        background: useGradient ? gradient : `rgba(${hexToRgb(bgColor)}, ${bgOpacity})`,
        backgroundClip: useGradient ? 'text' : 'padding-box',
        WebkitBackgroundClip: useGradient ? 'text' : 'padding-box',
        textShadow: useGradient ? 'none' : textShadow,
        transform: `rotate(${rotation}deg) skewX(${skewX}deg)`,
        letterSpacing: `${letterSpacing}px`,
        wordSpacing: `${wordSpacing}px`,
        textTransform: textTransforms[Math.floor(Math.random() * textTransforms.length)],
        textDecoration: textDecoration,
        border: borderWidth > 0 ? `${borderWidth}px ${borderStyle} ${borderColor}` : 'none',
        padding: '10px 20px',
        borderRadius: `${Math.floor(Math.random() * 20)}px`,
        animation: animations[Math.floor(Math.random() * animations.length)]
    };
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '0, 0, 0';
}

// Print name function
function printName() {
    const name = nameInput.value.trim();

    if (!name) {
        alert('Please enter a name!');
        return;
    }

    if (isPrinting) {
        return;
    }

    isPrinting = true;
    let count = 0;
    const maxIterations = 30;

    printInterval = setInterval(() => {
        if (count >= maxIterations) {
            clearInterval(printInterval);
            isPrinting = false;
            return;
        }

        const nameItem = document.createElement('div');
        nameItem.className = 'name-item';
        nameItem.textContent = name;

        const styles = generateRandomStyle();
        const animationClass = styles.animation;
        delete styles.animation;

        // Apply styles
        Object.assign(nameItem.style, styles);
        nameItem.classList.add(animationClass);

        displayArea.appendChild(nameItem);

        // Auto-scroll to bottom
        displayArea.scrollTop = displayArea.scrollHeight;

        count++;
    }, 400); // Print every 400ms
}

// Reset function
function reset() {
    if (printInterval) {
        clearInterval(printInterval);
        printInterval = null;
    }

    isPrinting = false;
    displayArea.innerHTML = '';
    nameInput.value = '';
    nameInput.focus();
}

// Event listeners
printBtn.addEventListener('click', printName);
resetBtn.addEventListener('click', reset);

nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        printName();
    }
});

// Focus input on load
nameInput.focus();
