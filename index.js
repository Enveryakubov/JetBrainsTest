const banner = document.querySelector(".cookie-banner")
const input = document.querySelector("#input")
const text = document.querySelector(".prompt-box__text")
const carret = document.querySelector(".prompt-box__carret")
const promptMessageBox = document.querySelector(".prompt-box__message")
const bannerRemoveButtons = document.querySelectorAll(".remove_banner")



let messageConfig = {
    "default": `<br>
                <span>Command not found. Type "help" to see all commands.</span>`,
                
    "help":     `<br>
                <span>Type "y" or "yes" if you agree that JetBrains may use cookies and IP address to collect individual statistics and to provide you with personalized offers.</span>
                <br>
                <br>
                <span>Type "n" or "no" if you don’t want JetBrains to collect individual statistics and to provide you with personalized offers.</span>
                <br>
                <br>
                <span>Use "clear" to reset the terminal.</span>`
}

const reactToCommand = (text) =>{
    let response;
    if (text in messageConfig){
        response = messageConfig[text]
    }else{
        response=messageConfig["default"]
    }
    let targetValue = `<p><span>~ root# ${text}</span>${response}</p>`
    promptMessageBox.insertAdjacentHTML("beforeend", targetValue)
}

function scrollToBottom (selector) {
    const div = document.querySelector(selector);
    div.scrollTop = div.scrollHeight;
}

const clearInput = () => {
    input.value = ""
    text.innerText = ""
    scrollToBottom(".cookie-banner")
}

input.addEventListener("keyup", function(e){
    let textValue = e.target.value.trim()
    text.innerHTML= `<span class="text">${textValue}</span>`
    if (e.key === "Enter"){
        if (textValue){
            if (textValue === "help"){
               reactToCommand("help")
               clearInput()
            }
            else if (textValue === "yes" || textValue === "y"){
                banner.remove()
            }
            else if (textValue === "no" || textValue === "n"){
                banner.remove()
            }
            else if (textValue === "clear"){
                promptMessageBox.innerHTML = ""
                clearInput()
            }
            else{
                reactToCommand(textValue)
                clearInput()
            }
        
        }
    }}
)

input.addEventListener('focus', () => {
    carret.style.background = 'white';
  }, true);
  
input.addEventListener('blur', () => {
    carret.style.background = 'black';
  }, true);


const displayTheFinalNote = (text) => {
    const body = document.querySelector("body")
    body.style.display = "flex"
    body.style.height = "100vh"
    body.style.justifyContent = "center"
    body.style.alignItems = "center"
    body.style.backgroundColor = "#32502E"
    body.style.color = "#F3EFCC"
    body.style.fontSize = "50px"
    body.innerHTML = `<p>${text}</p>`
}

bannerRemoveButtons.forEach(button => button.addEventListener("click", () => {
    banner.remove()
    displayTheFinalNote("Please, REFRESH the page to start over!")
}))
