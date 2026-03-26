// ============================================================
//  CYSE 411 Q4 Starter Code
//  Employee Directory Application

function loadSession() {
    const raw = sessionStorage.getItem("session");
    if (!raw) return null;

    try {
        const session = JSON.parse(raw);

        if (
            typeof session.userId === "string" && session.userId.trim() !== "" &&
            typeof session.role === "string" && session.role.trim() !== "" &&
            typeof session.displayName === "string" && session.displayName.trim() !== ""
        ) {
            return session;
        }
    } catch (e) {
        console.error("Invalid session data:", e);
    }

    return null;
}


// Q4.A – SAFE rendering
function renderStatusMessage(containerElement, message) {
    const p = document.createElement("p");
    p.textContent = message;
    containerElement.appendChild(p);
}


// Q4.B – Sanitization
function sanitizeSearchQuery(input) {
    if (!input) return null;

    let sanitized = input.trim();

    if (sanitized.length > 40) {
        sanitized = sanitized.substring(0, 40);
    }

    const regex = /^[a-zA-Z0-9 _-]+$/;

    if (!regex.test(sanitized)) {
        return null;
    }

    return sanitized.length > 0 ? sanitized : null;
}

function performSearch(query) {
    const sanitized = sanitizeSearchQuery(query);
    const label = document.getElementById("search-label");

    if (sanitized === null) {
        label.textContent = "Invalid search query.";
        return;
    }

    label.textContent = "Showing results for: " + sanitized;
}


// Application Bootstrap
document.addEventListener("DOMContentLoaded", function () {

    const session = loadSession();
    if (session) {
        document.getElementById("welcome-msg").textContent =
            "Welcome, " + session.displayName;
    }

    const simulatedProfiles = [
        {
            name: "Alice Johnson",
            department: "Engineering",
            status: "Working from home today"
        },
        {
            name: "Bob Martinez",
            department: "Security",
            status: "<img src=x onerror=\"alert('XSS: session stolen')\">"
        },
        {
            name: "Carol Lee",
            department: "HR",
            status: "Out of office until Friday"
        }
    ];

    const directory = document.getElementById("directory");

    simulatedProfiles.forEach(function (profile) {
        const card = document.createElement("div");
        card.className = "profile-card";

        const nameEl = document.createElement("h3");
        nameEl.textContent = profile.name;

        const deptEl = document.createElement("p");
        deptEl.textContent = "Department: " + profile.department;

        const statusContainer = document.createElement("div");
        statusContainer.className = "status";

        renderStatusMessage(statusContainer, profile.status);

        card.appendChild(nameEl);
        card.appendChild(deptEl);
        card.appendChild(statusContainer);
        directory.appendChild(card);
    });


    document.getElementById("search-btn").addEventListener("click", function () {
        const query = document.getElementById("search-input").value;
        performSearch(query);
    });

});
