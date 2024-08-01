// Mock data for messages
const messages = [
    { id: 1, name: 'יוסי', platform: 'WhatsApp', content: 'היי, מה שלומך? אפשר להיפגש השבוע?', time: '10:30', icon: 'W', color: '#25D366', read: false },
    { id: 2, name: 'דנה', platform: 'Facebook', content: 'ראית את התמונות מאתמול?', time: '09:15', icon: 'f', color: '#3b5998', read: true },
    { id: 3, name: 'רונן', platform: 'LinkedIn', content: 'הזדמנות עסקית חדשה, מעוניין לשמוע?', time: 'אתמול', icon: 'in', color: '#0e76a8', read: false }
];

// Load message list
function loadMessages(filter = 'all') {
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';
    messages.forEach(message => {
        if (filter === 'all' || (filter === 'read' && message.read) || (filter === 'unread' && !message.read)) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-item';
            messageElement.onclick = () => showMessage(message.id);
            messageElement.innerHTML = `
                <div class="message-icon" style="background-color: ${message.color};">${message.icon}</div>
                <div class="message-preview">
                    <strong>${message.name} - ${message.platform}</strong><br>
                    ${message.content}
                </div>
                <div class="message-time">${message.time}</div>
            `;
            messageList.appendChild(messageElement);
        }
    });
}

// Filter messages
function filterMessages(filter) {
    document.querySelectorAll('.filter').forEach(f => f.classList.remove('active-filter'));
    document.querySelector(`.filter:nth-child(${filter === 'read' ? 1 : filter === 'unread' ? 2 : 3})`).classList.add('active-filter');
    loadMessages(filter);
}

// Show message details
function showMessage(id) {
    const message = messages.find(m => m.id === id);
    message.read = true;
    const messageScreen = document.getElementById('message-screen');
    
    let template = `
        <div class="header">
            <span id="message-header">הודעה מ${message.name}</span>
            <button onclick="showScreen('home-screen')" style="float: left;">חזרה</button>
        </div>
        <div class="contact-info">
            <div class="contact-avatar">${message.name[0]}</div>
            <div class="contact-details">
                <strong>${message.name} כהן</strong><br>
                <span>054-${Math.floor(1000000 + Math.random() * 9000000)}</span>
            </div>
            <div class="social-links">
                <a href="#" class="social-link" style="background-color: #3b5998;">f</a>
                <a href="#" class="social-link" style="background-color: #0e76a8;">in</a>
            </div>
        </div>
        <div class="message-content">
            ${message.content}
        </div>
        <div class="action-icons">
            <div class="action-icon" style="background-color: #4CAF50;" onclick="toggleOptions('reply-box')">↩️</div>
            <div class="action-icon" style="background-color: #2196F3;" onclick="toggleOptions('ai-options')">AI</div>
            <div class="action-icon" style="background-color: #FFA000;" onclick="toggleOptions('reminder-options')">🔔</div>
            <div class="action-icon" style="background-color: #9C27B0;" onclick="toggleOptions('add-contact')">👤+</div>
            <div class="action-icon" style="background-color: #FF5722;" onclick="toggleOptions('schedule-meeting')">📅</div>
        </div>
        <div id="reply-box" class="options-container">
            <textarea placeholder="הקלד את תשובתך כאן..." style="width: 100%; height: 100px; margin-bottom: 10px;"></textarea>
            <button class="button" onclick="sendReply()">שלח</button>
        </div>
        <div id="ai-options" class="options-container">
            <button class="button" onclick="showAIReply()">הצע מענה אפשרי</button>
            <button class="button" onclick="showAIFollowUp()">Follow Up - הגדרת זמן למענה</button>
        </div>
        <div id="reminder-options" class="options-container">
            <button class="button" onclick="setReminder('קירבה')">תזכורת קירבה</button>
            <button class="button" onclick="setReminder('זמן')">תזכורת זמן</button>
        </div>
        <div id="add-contact" class="options-container">
            <button class="button" onclick="saveContact()">שמור איש קשר</button>
        </div>
        <div id="schedule-meeting" class="options-container">
            <button class="button" onclick="scheduleMeeting()">קבע פגישה</button>
        </div>
    `;
    
    messageScreen.innerHTML = template;
    showScreen('message-screen');
}

// Switch between screens
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`.nav-item:nth-child(${screenId === 'home-screen' ? 1 : screenId === 'tasks-screen' ? 2 : 3})`).classList.add('active');
}

// Toggle option containers
function toggleOptions(optionsId) {
    const allOptions = document.querySelectorAll('.options-container');
    const clickedOptions = document.getElementById(optionsId);
    allOptions.