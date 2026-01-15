const users = [
    { name: "Luke Doctor", isMain: true, color: "#007aff" },
    { name: "Alfred Zaloney", isMain: false, color: "#34c759" },
    { name: "Tuff Phanel", isMain: false, color: "#ff9500" },
    { name: "Sir. Alphons", isMain: false, color: "#af52de" }
];

const userSelect = document.getElementById("userSelect");
const chat = document.getElementById("chat");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const colorPanel = document.getElementById("colorPanel");
const colorBtn = document.getElementById("colorBtn");
const app = document.getElementById("app");

/* =========================
   POPOLA SELECT
========================= */
users.forEach((user, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = user.name;
    userSelect.appendChild(option);
});

/* =========================
   COLOR PANEL
========================= */
users.forEach((u, i) => {
    const row = document.createElement("div");
    row.innerHTML = `
        <span>${u.name}</span>
        <input type="color" value="${u.color}">
    `;
    row.querySelector("input").addEventListener("input", e => {
        users[i].color = e.target.value;
    });
    colorPanel.appendChild(row);
});

colorBtn.addEventListener("click", () => {
    colorPanel.style.display =
        colorPanel.style.display === "block" ? "none" : "block";
});

/* =========================
   INVIO MESSAGGIO
========================= */
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const user = users[userSelect.value];

    const msg = document.createElement("div");
    msg.classList.add("message", user.isMain ? "self" : "other");

    const sender = document.createElement("div");
    sender.classList.add("sender");
    sender.textContent = user.name;
    sender.style.color = user.color;

    const content = document.createElement("div");
    content.textContent = text;

    const timestamp = document.createElement("div");
    timestamp.classList.add("timestamp");
    timestamp.textContent = new Date().toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit"
    });

    msg.append(sender, content, timestamp);
    chat.appendChild(msg);

    chat.scrollTop = chat.scrollHeight;
    input.value = "";
}

/* =========================
   DARK MODE TOGGLE (DOUBLE CLICK HEADER)
========================= */
document.querySelector(".header").addEventListener("dblclick", () => {
    app.classList.toggle("dark");
});
