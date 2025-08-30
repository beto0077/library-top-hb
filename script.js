const testDiv = document.querySelector(".test-div");

for (let index = 0; index <= 10; index++) {
    const testNumber = document.createElement("p");
    testNumber.textContent = `${index}...`;
    testDiv.appendChild(testNumber);
}
const testText = document.createElement("p");
testText.textContent = "The JS is working as well...";
testDiv.appendChild(testText);