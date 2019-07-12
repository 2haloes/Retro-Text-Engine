$(function() {
    textToDisplay = ["Hello there", "*Gasp!*"]

    document.getElementById("textBox").addEventListener("click", function() {
        nextDisplay();
    });
});

let textToDisplay;
let textIndex;

function nextDisplay() {
    // [...Foo] creates an array from the Foo variable, this is used here to split the string into chars
    // This is used as it allows support for special characters (unlike a function like Foo.split('') which would output broken characters in that case)
    let textToDisplayChar = [...textToDisplay[textIndex]];

    textIndex++;
}

