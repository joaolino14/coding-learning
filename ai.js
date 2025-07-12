document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    
    
    
    // Auto-resize textarea functio
    function resizeTextarea() {
        messageInput.style.height = 'auto';
        messageInput.style.height = (messageInput.scrollHeight) + 'px';
    }
    
    // Initialize textarea resize
    messageInput.addEventListener('input', resizeTextarea);

    // Mengamankan karakter HTML agar tidak dibaca sebagai tag
        function escapeHtml(str) {
            return str.replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;");
        }

        // Format isi text
        function formatContent(text) {
    return text.replace(/```(\w)\n*([\s\S]*?)```/g, function(_, lang, code) {
        return `<pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>`;
    }).replace(/\n/g, "<br>");
}
    
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = formatContent(content);
        
        const metaDiv = document.createElement('div');
        metaDiv.className = 'message-meta';
        metaDiv.innerHTML = `<span>${sender === 'user' ? 'You' : 'AI Assistant'}</span><span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(metaDiv);
        
       
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage && sender === 'user') {
            welcomeMessage.remove();
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator message ai-message';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingDiv.appendChild(dot);
        }
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Simulate AI response (replace with actual API call)
    async function getAIResponse(userMessage) {
        showTypingIndicator();
        
        try {
    
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message:userMessage
                }),
            });

            if(!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            console.log('Balasan dari flask' , data.reply);
            return data.reply;

          
        } catch (error) {
            console.error('Error:', error);
            return "Sorry, I'm having trouble responding. Please try again later.";
        } finally {
            removeTypingIndicator();
        }
    }
    
    // Handle sending a message
    async function handleSendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        messageInput.value = '';
        resizeTextarea();
        
        // Get and display AI response
        const aiResponse = await getAIResponse(message);
        addMessage(aiResponse, 'ai');
    }
    
    // Event listeners
    sendBtn.addEventListener('click', handleSendMessage);
    
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    
    // Suggestion buttons
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            messageInput.value = this.textContent;
            handleSendMessage();
        });
    });
});