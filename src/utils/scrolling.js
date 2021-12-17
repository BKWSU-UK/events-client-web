// When the user clicks on the button, scroll to the top of the document
export function topFunction() {
    setTimeout(() => {
        console.log('topFunction called');
        var elmnt = document.getElementById("closeTop");
        if (elmnt) {
            elmnt.scrollIntoView();
        } else {
            topFunction();
        }
    }, 500);
}