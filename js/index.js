document.addEventListener('DOMContentLoaded', function() {
    
    // Setting up values, putting everything in a default state
    cutOutput = false;
    outputting = false;
    textIndex = 0;
    textElement = document.getElementById('textOutput');
    textAudio.loop = true;
    document.getElementById('header').innerText = displayHeader;
    document.title = displayTitle;

    // When the box is clicked, then progress the text
    document.getElementById('textBox').addEventListener('click', function() {
        if (textIndex < textToDisplay.length || outputting) {
            cutOutput = true;
            nextDisplay();
        }
    });

});

// Variables used thoughout the file are declared here
let textToDisplayChar;
let textIndex;
let charIndex;
let textOutputInterval;
let textElement;
let audioPause;
let cutOutput;
let outputting;

function nextDisplay() {

    if (cutOutput && outputting) {
        // clearInterval stops the loop of this function
        clearInterval(textOutputInterval);
        textElement.innerHTML = textToDisplayChar.join('');
        audioPause = setTimeout(() => {textAudio.pause();}, textSpeed);
        cutOutput = false;
        outputting = false;
    } else {
        if (textToDisplay[textIndex].startsWith('[IMAGE]:')) {
            let tmpImgString = textToDisplay[textIndex].substr(8);
            let imgElement = document.getElementById('imageToDisplay')
            if (!!imgElement.getAttribute('src')) {
                imgElement.classList.toggle('imageFade');
                setTimeout(() => {imgElement.setAttribute('src', 'assets/images/' + tmpImgString);}, 500);
                setTimeout(() => {imgElement.classList.toggle('imageFade');}, 1000);
            } else {
                setTimeout(() => {imgElement.setAttribute('src', 'assets/images/' + tmpImgString);}, 500);
                setTimeout(() => {imgElement.classList.toggle('imageFade');}, 500);
            }
        } else if (textToDisplay[textIndex].startsWith('[SOUND]:')) {
            let tmpImgString = textToDisplay[textIndex].substr(8);
            new Audio('assets/sounds/' + tmpImgString).play();
        } else {
            // [...Foo] creates an array from the Foo variable, this is used here to split the string into chars
            // This is used as it allows support for special characters (unlike a function like Foo.split('') which would output broken characters in that case)
            textToDisplayChar = [...textToDisplay[textIndex]];
            // Stops sounds issues when click mashing
            clearTimeout(audioPause);
            charIndex = 0;
            outputting = true;
            // When the text starts displaying, there's a delay which means that the sounds start to early, this stops that
            // 1.06666666667 is a tiny bit after the text speed so it doens't start too quickly
            setTimeout(() => {textAudio.play();}, (textSpeed*1.06666666667));
            textElement.innerHTML = '';
            // Every Xms, a char is displayed
            textOutputInterval = setInterval(textOutput, textSpeed);
        }
        // Now that everything is done with the textIndex, it's incremented 
        textIndex++;
    }
}

function textOutput() {
    if (charIndex < textToDisplayChar.length) {
        // This appends the char to the currently displayed text
        textElement.innerHTML = textElement.innerHTML + textToDisplayChar[charIndex];
        charIndex++;
    } else {
        // clearInterval stops the loop of this function
        clearInterval(textOutputInterval);
        // Stopping the audio as soon as possible was really janky, this avoids that
        // At first, only the looping was stopped but then the audio would still loop about 5 times before stopping
        audioPause = setTimeout(() => {textAudio.pause();}, textSpeed);
        outputting = false;
        return;
    }
}