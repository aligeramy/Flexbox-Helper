let flexDirection = 'row';
let justifyContent = 'flex-start';
let alignItems = 'flex-start';
let gap = '10';
let wrap = 'nowrap';
let isReverse = false;

function updateCSS() {
    const container = document.getElementById('flexContainer');
    const cssCode = document.getElementById('cssCode');

    container.style.flexDirection = flexDirection;
    container.style.justifyContent = justifyContent;
    container.style.alignItems = alignItems;
    container.style.gap = gap + 'px';
    container.style.flexWrap = wrap;

    cssCode.innerHTML = `display: <span class="code-value">flex</span>;<br>` +
                        `flex-direction: <span class="code-value">${flexDirection}</span>;<br>` +
                        `justify-content: <span class="code-value">${justifyContent}</span>;<br>` +
                        `align-items: <span class="code-value">${alignItems}</span>;<br>` +
                        `gap: <span class="code-value">${gap}px</span>;<br>` +
                        `flex-wrap: <span class="code-value">${wrap}</span>;<br>`;
}

function setFlexDirection(value) {
    if (isReverse) {
        flexDirection = value + '-reverse';
    } else {
        flexDirection = value;
    }
    updateIcons();
    updateCSS();
    selectButton('flexDirection', value);
    if (isReverse) {
        selectButton('flexDirection', value + '-reverse');
    }
}

function toggleFlexDirection() {
    isReverse = !isReverse;
    const reverseButton = document.getElementById('toggleDirection');
    if (isReverse) {
        reverseButton.classList.add('selected');
    } else {
        reverseButton.classList.remove('selected');
    }
    setFlexDirection(flexDirection.replace('-reverse', ''));
}

function toggleWrap() {
    wrap = wrap === 'nowrap' ? 'wrap' : 'nowrap';
    updateCSS();
    selectButton('flexWrap', wrap);
}

function updateIcons() {
    const prefix = flexDirection.includes('row') ? 'horizontal' : 'vertical';
    const icons = ['align-start', 'align-end', 'align-center', 'align-baseline', 'align-stretch', 'justify-start', 'justify-end', 'justify-center', 'justify-space-between', 'justify-space-around', 'justify-space-evenly'];
    
    icons.forEach(icon => {
        document.getElementById(icon).querySelector('img').src = `icons/${prefix}/${icon}.png`;
    });
}

function setJustifyContent(value) {
    justifyContent = value;
    updateCSS();
    selectButton('justifyContent', value);
}

function setAlignItems(value) {
    alignItems = value;
    updateCSS();
    selectButton('alignItems', value);
}

function changeGap(value) {
    gap = value;
    updateCSS();
}

function copyToClipboard() {
    const cssText = document.getElementById('cssCode').innerText;
    navigator.clipboard.writeText(cssText).then(() => {
        const copyButton = document.getElementById('copyButton');
        const cssOutput = document.getElementById('cssOutput');
        copyButton.innerText = 'Copied!';
        cssOutput.classList.add('copied');
        setTimeout(() => {
            copyButton.innerText = 'Copy';
            cssOutput.classList.remove('copied');
        }, 200);
    });
}

document.getElementById('copyButton').addEventListener('click', copyToClipboard);
document.getElementById('cssOutput').addEventListener('click', copyToClipboard);

function addBox() {
    const container = document.getElementById('flexContainer');
    const newBox = document.createElement('div');
    newBox.className = 'box';
    newBox.textContent = `Box ${container.children.length + 1}`;
    container.appendChild(newBox);
    updateCSS();
}

function removeBox() {
    const container = document.getElementById('flexContainer');
    if (container.children.length > 0) {
        container.removeChild(container.lastChild);
    }
    updateCSS();
}

function selectButton(property, value) {
    const groups = {
        flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
        flexWrap: ['wrap', 'nowrap'],
        justifyContent: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
        alignItems: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch']
    };

    const group = groups[property];

    group.forEach(val => {
        const button = document.querySelector(`[onclick*="${property === 'flexDirection' ? 'setFlexDirection' : property === 'flexWrap' ? 'toggleWrap' : 'set' + capitalizeFirstLetter(property)}('${val}')"]`);
        if (button) {
            button.classList.remove('selected');
        }
    });

    if (property === 'flexWrap') {
        const button = document.querySelector(`[onclick*="toggleWrap()"]`);
        if (button) {
            if (value === 'wrap') {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        }
    } else {
        const selectedButton = document.querySelector(`[onclick*="${property === 'flexDirection' ? 'setFlexDirection' : property === 'flexWrap' ? 'toggleWrap' : 'set' + capitalizeFirstLetter(property)}('${value}')"]`);
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }

        if (value.includes('reverse')) {
            const mainDirectionButton = document.querySelector(`[onclick*="setFlexDirection('${value.includes('row') ? 'row' : 'column'}')"]`);
            if (mainDirectionButton) {
                mainDirectionButton.classList.add('selected');
            }
        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

updateCSS(); // Initialize
