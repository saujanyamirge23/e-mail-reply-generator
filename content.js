console.log("EmailWriter Extension Loaded");

function createAIButton() {
    const button = document.createElement('div');

    // Use same classes Gmail uses for the Send button (T-I is the core class)
    button.className = 'T-I J-J5-Ji T-I-KE L3 ai-reply-button';
    
    // Inline style overrides
    button.style.marginRight = '8px';
    button.style.backgroundColor = '#1a73e8'; // Gmail blue
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.boxShadow = 'none';

    // Inner content and attributes
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');

    return button;
}


function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }
    return '';
}



function findcomposeToolbar() {
    const selectors = [
        '.btc',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null;
}



function injectButton(){
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();
        const toolbar = findcomposeToolbar();
        if (!toolbar) {
            console.log("Toolbar not found");
            return;
    }
    console.log("Toolbar found, Creating AI button");
    const button = createAIButton();
    button.classList.add('ai-reply-button');


    button.addEventListener('click', async() =>{
        try{
            button.innerHTML = 'Generating...';
            button.disabled = true;
            const emailContent = getEmailContent();
           const response= await fetch('http://localhost:8080/api/email/generate',{

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone : "professional"
                })
            });

            if(!response.ok){
                throw new Error('API request failed');
            }
            const generatedReply = await response.text();
             const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
             
             if(composeBox){
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);

             }else{
                console.error('Compose box not found');
             }
            }catch(error){
                console.error(error);
                alert('Failed to generate reply');
            }finally{
                button.innerHTML = 'AI Reply';
                button.disabled = false;
            }

    });

    toolbar.insertBefore(button, toolbar.firstChild);

}

const observer = new MutationObserver((mutations) =>{
    for(const mutation of mutations) {
            const addedNodes =  Array.from(mutation.addedNodes);
            const hasComposeElements = addedNodes.some(node => 
                node.nodeType === Node.ELEMENT_NODE && 
                (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
                      );
            if (hasComposeElements) {
                console.log("Compose window detected");
                setTimeout(injectButton, 500);
            }
        }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
