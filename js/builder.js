// ========================================
// PORTFOLIOFLOW BUILDER
// COMPLETE VERSION + PHONEPE QR
// ========================================

console.log("PortfolioFlow Builder Loaded");


// ========================================
// GLOBAL PHOTO
// ========================================

let savedProfilePhoto = "";


// ========================================
// HELPERS
// ========================================

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : "";
}


function setValue(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.value = value || "";
    }
}


function escapeHTML(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function escapeAttribute(value) {
    return escapeHTML(value);
}


// ========================================
// REMOVE ITEM
// ========================================

function removeItem(button) {

    const card = button.closest(".dynamic-card");

    if (card) {
        card.remove();
        updateAllPreviews();
    }
}


// ========================================
// ADD PROJECT
// ========================================

function addProject() {

    const container =
        document.getElementById("projectsContainer");

    if (!container) return;

    const card =
        document.createElement("div");

    card.className = "dynamic-card";

    card.innerHTML = `

        <div class="form-grid">

            <div class="input-group">

                <label>
                    Project Name
                </label>

                <input
                    type="text"
                    class="project-name"
                    placeholder="e.g. Saarthi AI"
                >

            </div>


            <div class="input-group">

                <label>
                    Technology
                </label>

                <input
                    type="text"
                    class="project-tech"
                    placeholder="Python, Flask, AI"
                >

            </div>


            <div class="input-group full">

                <label>
                    Description
                </label>

                <textarea
                    class="project-description"
                    placeholder="Describe your project..."
                ></textarea>

            </div>


            <div class="input-group">

                <label>
                    GitHub / Project Link
                </label>

                <input
                    type="url"
                    class="project-link"
                    placeholder="https://github.com/..."
                >

            </div>


            <div class="input-group">

                <label>
                    Live Demo Link
                </label>

                <input
                    type="url"
                    class="project-demo"
                    placeholder="https://your-project.com"
                >

            </div>

        </div>


        <button
            type="button"
            class="remove-btn"
            onclick="removeItem(this)"
        >
            Remove
        </button>

    `;

    container.appendChild(card);

    updateAllPreviews();
}


// ========================================
// ADD JOURNEY
// ========================================

function addJourney() {

    const container =
        document.getElementById("journeyContainer");

    if (!container) return;

    const card =
        document.createElement("div");

    card.className = "dynamic-card";

    card.innerHTML = `

        <div class="form-grid">

            <div class="input-group">

                <label>
                    Year
                </label>

                <input
                    type="text"
                    class="journey-year"
                    placeholder="2026"
                >

            </div>


            <div class="input-group">

                <label>
                    Title
                </label>

                <input
                    type="text"
                    class="journey-title"
                    placeholder="Started AI Research"
                >

            </div>


            <div class="input-group full">

                <label>
                    Description
                </label>

                <textarea
                    class="journey-description"
                    placeholder="Describe this milestone..."
                ></textarea>

            </div>

        </div>


        <button
            type="button"
            class="remove-btn"
            onclick="removeItem(this)"
        >
            Remove
        </button>

    `;

    container.appendChild(card);

    updateAllPreviews();
}


// ========================================
// ADD RESEARCH
// ========================================

function addResearch() {

    const container =
        document.getElementById("researchContainer");

    if (!container) return;

    const card =
        document.createElement("div");

    card.className = "dynamic-card";

    card.innerHTML = `

        <div class="form-grid">

            <div class="input-group full">

                <label>
                    Research Title
                </label>

                <input
                    type="text"
                    class="research-title"
                    placeholder="Research paper title"
                >

            </div>


            <div class="input-group">

                <label>
                    Research Area
                </label>

                <input
                    type="text"
                    class="research-area"
                    placeholder="Artificial Intelligence"
                >

            </div>


            <div class="input-group">

                <label>
                    Status
                </label>

                <select class="research-status">

                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Published</option>

                </select>

            </div>


            <div class="input-group full">

                <label>
                    Abstract
                </label>

                <textarea
                    class="research-abstract"
                    placeholder="Write a short abstract..."
                ></textarea>

            </div>


            <div class="input-group">

                <label>
                    DOI
                </label>

                <input
                    type="text"
                    class="research-doi"
                    placeholder="10.xxxx/xxxxx"
                >

            </div>


            <div class="input-group">

                <label>
                    Paper Link
                </label>

                <input
                    type="url"
                    class="research-link"
                    placeholder="https://..."
                >

            </div>

        </div>


        <button
            type="button"
            class="remove-btn"
            onclick="removeItem(this)"
        >
            Remove
        </button>

    `;

    container.appendChild(card);

    updateAllPreviews();
}


// ========================================
// ADD CERTIFICATION
// ========================================

function addCertification() {

    const container =
        document.getElementById("certificationsContainer");

    if (!container) return;

    const card =
        document.createElement("div");

    card.className = "dynamic-card";

    card.innerHTML = `

        <div class="form-grid">

            <div class="input-group">

                <label>
                    Certificate Name
                </label>

                <input
                    type="text"
                    class="certificate-name"
                    placeholder="AI/ML Certification"
                >

            </div>


            <div class="input-group">

                <label>
                    Organization
                </label>

                <input
                    type="text"
                    class="certificate-org"
                    placeholder="Organization"
                >

            </div>


            <div class="input-group">

                <label>
                    Year
                </label>

                <input
                    type="text"
                    class="certificate-year"
                    placeholder="2026"
                >

            </div>


            <div class="input-group">

                <label>
                    Certificate Link
                </label>

                <input
                    type="url"
                    class="certificate-link"
                    placeholder="https://..."
                >

            </div>

        </div>


        <button
            type="button"
            class="remove-btn"
            onclick="removeItem(this)"
        >
            Remove
        </button>

    `;

    container.appendChild(card);

    updateAllPreviews();
}


// ========================================
// ADD ACHIEVEMENT
// ========================================

function addAchievement() {

    const container =
        document.getElementById("achievementsContainer");

    if (!container) return;

    const card =
        document.createElement("div");

    card.className = "dynamic-card";

    card.innerHTML = `

        <div class="form-grid">

            <div class="input-group">

                <label>
                    Achievement
                </label>

                <input
                    type="text"
                    class="achievement-title"
                    placeholder="Hackathon Winner"
                >

            </div>


            <div class="input-group">

                <label>
                    Year
                </label>

                <input
                    type="text"
                    class="achievement-year"
                    placeholder="2026"
                >

            </div>


            <div class="input-group full">

                <label>
                    Description
                </label>

                <textarea
                    class="achievement-description"
                    placeholder="Describe your achievement..."
                ></textarea>

            </div>

        </div>


        <button
            type="button"
            class="remove-btn"
            onclick="removeItem(this)"
        >
            Remove
        </button>

    `;

    container.appendChild(card);

    updateAllPreviews();
}


// ========================================
// PROFILE PHOTO
// ========================================

function updateProfilePhotoPreview() {

    const input =
        document.getElementById("profilePhoto");

    const avatar =
        document.getElementById("previewAvatar");

    if (!avatar) return;

    avatar.replaceChildren();

    const file =
        input?.files?.[0];

    if (file) {

        if (!file.type.startsWith("image/")) {

            input.value = "";
            savedProfilePhoto = "";

            showYou();

            return;
        }

        const reader =
            new FileReader();

        reader.onload =
            function(event) {

                avatar.replaceChildren();

                const img =
                    document.createElement("img");

                img.id = "previewPhoto";

                img.src =
                    event.target.result;

                img.alt =
                    "Profile Photo";

                img.style.position =
                    "absolute";

                img.style.inset =
                    "0";

                img.style.width =
                    "100%";

                img.style.height =
                    "100%";

                img.style.objectFit =
                    "cover";

                img.style.borderRadius =
                    "50%";

                img.style.display =
                    "block";

                avatar.appendChild(img);

                savedProfilePhoto =
                    event.target.result;

            };

        reader.readAsDataURL(file);

        return;
    }


    if (savedProfilePhoto) {

        showSavedPhoto();

        return;
    }


    showYou();
}


// ========================================
// SHOW YOU
// ========================================

function showYou() {

    const avatar =
        document.getElementById("previewAvatar");

    if (!avatar) return;

    avatar.replaceChildren();

    const text =
        document.createElement("span");

    text.id =
        "previewAvatarText";

    text.textContent =
        "YOU";

    text.style.position =
        "absolute";

    text.style.inset =
        "0";

    text.style.display =
        "flex";

    text.style.alignItems =
        "center";

    text.style.justifyContent =
        "center";

    avatar.appendChild(text);
}


// ========================================
// SHOW SAVED PHOTO
// ========================================

function showSavedPhoto() {

    const avatar =
        document.getElementById("previewAvatar");

    if (!avatar || !savedProfilePhoto) {
        return;
    }

    avatar.replaceChildren();

    const img =
        document.createElement("img");

    img.id =
        "previewPhoto";

    img.src =
        savedProfilePhoto;

    img.alt =
        "Profile Photo";

    img.style.position =
        "absolute";

    img.style.inset =
        "0";

    img.style.width =
        "100%";

    img.style.height =
        "100%";

    img.style.objectFit =
        "cover";

    img.style.borderRadius =
        "50%";

    img.style.display =
        "block";

    avatar.appendChild(img);
}


// ========================================
// PERSONAL PREVIEW
// ========================================

function updatePersonalPreview() {

    const name =
        getValue("name");

    const title =
        getValue("title");

    const about =
        getValue("about");

    const degree =
        getValue("degree");

    const specialization =
        getValue("specialization");

    const college =
        getValue("college");

    const skills =
        getValue("skills");


    const previewName =
        document.getElementById("previewName");

    const previewTitle =
        document.getElementById("previewTitle");

    const previewAbout =
        document.getElementById("previewAbout");

    const previewEducation =
        document.getElementById("previewEducation");

    const previewSkills =
        document.getElementById("previewSkills");


    if (previewName) {

        previewName.textContent =
            name || "Your Name";
    }


    if (previewTitle) {

        previewTitle.textContent =
            title || "Your Professional Title";
    }


    if (previewAbout) {

        previewAbout.textContent =
            about ||
            "Your introduction will appear here.";
    }


    if (previewEducation) {

        const parts = [
            degree,
            specialization,
            college
        ].filter(Boolean);

        previewEducation.textContent =
            parts.length
                ? parts.join(" • ")
                : "Your education details";
    }


    if (previewSkills) {

        const list =
            skills
                .split(",")
                .map(item => item.trim())
                .filter(Boolean);

        previewSkills.innerHTML =
            list.length
                ? list
                    .map(
                        item =>
                            `<span>${escapeHTML(item)}</span>`
                    )
                    .join("")
                : "<span>Your Skills</span>";
    }


    updateSocialPreview();
}


// ========================================
// SOCIAL PREVIEW
// ========================================

function updateSocialPreview() {

    const container =
        document.getElementById("previewSocials");

    if (!container) return;

    container.innerHTML = "";

    const github =
        getValue("github");

    const linkedin =
        getValue("linkedin");

    const resume =
        getValue("resumeLink");


    if (github) {

        container.innerHTML += `

            <a
                href="${escapeAttribute(github)}"
                target="_blank"
                rel="noopener noreferrer"
            >
                GitHub
            </a>

        `;
    }


    if (linkedin) {

        container.innerHTML += `

            <a
                href="${escapeAttribute(linkedin)}"
                target="_blank"
                rel="noopener noreferrer"
            >
                LinkedIn
            </a>

        `;
    }


    if (resume) {

        container.innerHTML += `

            <a
                href="${escapeAttribute(resume)}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Resume
            </a>

        `;
    }
}


// ========================================
// PROJECT PREVIEW
// ========================================

function updateProjectsPreview() {

    const container =
        document.getElementById("previewProjects");

    if (!container) return;

    const projects =
        document.querySelectorAll(
            "#projectsContainer .dynamic-card"
        );

    container.innerHTML = "";

    projects.forEach(function(project) {

        const name =
            project.querySelector(
                ".project-name"
            )?.value ||
            "Untitled Project";

        const tech =
            project.querySelector(
                ".project-tech"
            )?.value ||
            "Technology";

        const description =
            project.querySelector(
                ".project-description"
            )?.value ||
            "Project description";

        const github =
            project.querySelector(
                ".project-link"
            )?.value ||
            "";

        const demo =
            project.querySelector(
                ".project-demo"
            )?.value ||
            "";


        const card =
            document.createElement("div");

        card.className =
            "preview-project-card";


        card.innerHTML = `

            <h4>
                ${escapeHTML(name)}
            </h4>

            <p class="preview-project-tech">
                ${escapeHTML(tech)}
            </p>

            <p>
                ${escapeHTML(description)}
            </p>

            <div class="preview-project-actions">

                ${
                    github
                        ?
                        `
                        <a
                            href="${escapeAttribute(github)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub →
                        </a>
                        `
                        :
                        ""
                }

                ${
                    demo
                        ?
                        `
                        <a
                            href="${escapeAttribute(demo)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Live Demo →
                        </a>
                        `
                        :
                        ""
                }

            </div>
        `;


        container.appendChild(card);

    });
}


// ========================================
// JOURNEY PREVIEW
// ========================================

function updateJourneyPreview() {

    const container =
        document.getElementById("previewJourney");

    if (!container) return;

    container.innerHTML = "";

    document.querySelectorAll(
        "#journeyContainer .dynamic-card"
    ).forEach(function(item) {

        const year =
            item.querySelector(
                ".journey-year"
            )?.value ||
            "Year";

        const title =
            item.querySelector(
                ".journey-title"
            )?.value ||
            "Journey Milestone";

        const description =
            item.querySelector(
                ".journey-description"
            )?.value ||
            "Description";


        const card =
            document.createElement("div");

        card.className =
            "timeline-item";


        card.innerHTML = `

            <div class="timeline-year">
                ${escapeHTML(year)}
            </div>

            <h4>
                ${escapeHTML(title)}
            </h4>

            <p>
                ${escapeHTML(description)}
            </p>

        `;


        container.appendChild(card);

    });
}


// ========================================
// RESEARCH PREVIEW
// ========================================

function updateResearchPreview() {

    const container =
        document.getElementById(
            "previewResearchList"
        );

    if (!container) return;

    container.innerHTML = "";

    document.querySelectorAll(
        "#researchContainer .dynamic-card"
    ).forEach(function(item) {

        const title =
            item.querySelector(
                ".research-title"
            )?.value ||
            "Research Paper";

        const area =
            item.querySelector(
                ".research-area"
            )?.value ||
            "Research Area";

        const status =
            item.querySelector(
                ".research-status"
            )?.value ||
            "Ongoing";

        const abstract =
            item.querySelector(
                ".research-abstract"
            )?.value ||
            "Research abstract";

        const doi =
            item.querySelector(
                ".research-doi"
            )?.value ||
            "";

        const link =
            item.querySelector(
                ".research-link"
            )?.value ||
            "";


        const card =
            document.createElement("div");

        card.className =
            "preview-research-card";


        card.innerHTML = `

            <h4>
                ${escapeHTML(title)}
            </h4>

            <p class="research-area">
                ${escapeHTML(area)}
            </p>

            <p>
                ${escapeHTML(abstract)}
            </p>

            <span class="research-status">
                ${escapeHTML(status)}
            </span>

            <div class="research-actions">

                ${
                    doi
                        ?
                        `
                        <span>
                            DOI: ${escapeHTML(doi)}
                        </span>
                        `
                        :
                        ""
                }

                ${
                    link
                        ?
                        `
                        <a
                            href="${escapeAttribute(link)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Paper →
                        </a>
                        `
                        :
                        ""
                }

            </div>

        `;


        container.appendChild(card);

    });
}


// ========================================
// CERTIFICATION PREVIEW
// ========================================

function updateCertificationPreview() {

    const container =
        document.getElementById(
            "previewCertificates"
        );

    if (!container) return;

    container.innerHTML = "";

    document.querySelectorAll(
        "#certificationsContainer .dynamic-card"
    ).forEach(function(item) {

        const name =
            item.querySelector(
                ".certificate-name"
            )?.value ||
            "Certificate";

        const organization =
            item.querySelector(
                ".certificate-org"
            )?.value ||
            "Organization";

        const year =
            item.querySelector(
                ".certificate-year"
            )?.value ||
            "";

        const link =
            item.querySelector(
                ".certificate-link"
            )?.value ||
            "";


        const card =
            document.createElement("div");

        card.className =
            "preview-certificate";


        card.innerHTML = `

            <h4>
                ${escapeHTML(name)}
            </h4>

            <p>
                ${escapeHTML(organization)}
            </p>

            <p class="certificate-year">
                ${escapeHTML(year)}
            </p>

            ${
                link
                    ?
                    `
                    <a
                        href="${escapeAttribute(link)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Certificate →
                    </a>
                    `
                    :
                    ""
            }

        `;


        container.appendChild(card);

    });
}


// ========================================
// ACHIEVEMENT PREVIEW
// ========================================

function updateAchievementPreview() {

    const container =
        document.getElementById(
            "previewAchievements"
        );

    if (!container) return;

    container.innerHTML = "";

    document.querySelectorAll(
        "#achievementsContainer .dynamic-card"
    ).forEach(function(item) {

        const title =
            item.querySelector(
                ".achievement-title"
            )?.value ||
            "Achievement";

        const year =
            item.querySelector(
                ".achievement-year"
            )?.value ||
            "";

        const description =
            item.querySelector(
                ".achievement-description"
            )?.value ||
            "Achievement description";


        const card =
            document.createElement("div");

        card.className =
            "preview-achievement";


        card.innerHTML = `

            <h4>
                ${escapeHTML(title)}
            </h4>

            <p>
                ${escapeHTML(description)}
            </p>

            <p class="achievement-year">
                ${escapeHTML(year)}
            </p>

        `;


        container.appendChild(card);

    });
}


// ========================================
// ALL PREVIEWS
// ========================================

function updateAllPreviews() {

    updatePersonalPreview();

    updateProfilePhotoPreview();

    updateProjectsPreview();

    updateJourneyPreview();

    updateResearchPreview();

    updateCertificationPreview();

    updateAchievementPreview();
}


// ========================================
// SAVE
// ========================================

function savePortfolio() {

    const portfolioData = {

        personal: {

            name:
                getValue("name"),

            title:
                getValue("title"),

            about:
                getValue("about"),

            email:
                getValue("email"),

            location:
                getValue("location"),

            github:
                getValue("github"),

            linkedin:
                getValue("linkedin"),

            resume:
                getValue("resumeLink")

        },


        education: {

            degree:
                getValue("degree"),

            specialization:
                getValue("specialization"),

            college:
                getValue("college")

        },


        skills:
            getValue("skills"),


        projects: [],

        journey: [],

        research: [],

        certifications: [],

        achievements: [],


        // ====================================
        // DONATION + ACTUAL PHONEPE QR
        // ====================================

        donation: {

            upi:
                getValue("upi"),

            purpose:
                getValue("donationPurpose"),

            qrCode:
                "assets/phonepe-qr.jpeg"

        },


        profilePhoto:
            savedProfilePhoto

    };


    // ========================================
    // PROJECTS
    // ========================================

    document.querySelectorAll(
        "#projectsContainer .dynamic-card"
    ).forEach(function(item) {

        portfolioData.projects.push({

            name:
                item.querySelector(
                    ".project-name"
                )?.value || "",

            tech:
                item.querySelector(
                    ".project-tech"
                )?.value || "",

            description:
                item.querySelector(
                    ".project-description"
                )?.value || "",

            link:
                item.querySelector(
                    ".project-link"
                )?.value || "",

            demo:
                item.querySelector(
                    ".project-demo"
                )?.value || ""

        });

    });


    // ========================================
    // JOURNEY
    // ========================================

    document.querySelectorAll(
        "#journeyContainer .dynamic-card"
    ).forEach(function(item) {

        portfolioData.journey.push({

            year:
                item.querySelector(
                    ".journey-year"
                )?.value || "",

            title:
                item.querySelector(
                    ".journey-title"
                )?.value || "",

            description:
                item.querySelector(
                    ".journey-description"
                )?.value || ""

        });

    });


    // ========================================
    // RESEARCH
    // ========================================

    document.querySelectorAll(
        "#researchContainer .dynamic-card"
    ).forEach(function(item) {

        portfolioData.research.push({

            title:
                item.querySelector(
                    ".research-title"
                )?.value || "",

            area:
                item.querySelector(
                    ".research-area"
                )?.value || "",

            status:
                item.querySelector(
                    ".research-status"
                )?.value || "",

            abstract:
                item.querySelector(
                    ".research-abstract"
                )?.value || "",

            doi:
                item.querySelector(
                    ".research-doi"
                )?.value || "",

            link:
                item.querySelector(
                    ".research-link"
                )?.value || ""

        });

    });


    // ========================================
    // CERTIFICATIONS
    // ========================================

    document.querySelectorAll(
        "#certificationsContainer .dynamic-card"
    ).forEach(function(item) {

        portfolioData.certifications.push({

            name:
                item.querySelector(
                    ".certificate-name"
                )?.value || "",

            organization:
                item.querySelector(
                    ".certificate-org"
                )?.value || "",

            year:
                item.querySelector(
                    ".certificate-year"
                )?.value || "",

            link:
                item.querySelector(
                    ".certificate-link"
                )?.value || ""

        });

    });


    // ========================================
    // ACHIEVEMENTS
    // ========================================

    document.querySelectorAll(
        "#achievementsContainer .dynamic-card"
    ).forEach(function(item) {

        portfolioData.achievements.push({

            title:
                item.querySelector(
                    ".achievement-title"
                )?.value || "",

            year:
                item.querySelector(
                    ".achievement-year"
                )?.value || "",

            description:
                item.querySelector(
                    ".achievement-description"
                )?.value || ""

        });

    });


    // ========================================
    // SAVE LOCAL STORAGE
    // ========================================

    localStorage.setItem(
        "portfolioFlowData",
        JSON.stringify(portfolioData)
    );


    console.log(
        "Portfolio saved",
        portfolioData
    );


    alert(
        "Portfolio saved successfully!"
    );
}


// ========================================
// LOAD
// ========================================

function loadPortfolio() {

    const saved =
        localStorage.getItem(
            "portfolioFlowData"
        );

    if (!saved) {
        return;
    }


    try {

        const data =
            JSON.parse(saved);


        // ====================================
        // PERSONAL
        // ====================================

        if (data.personal) {

            setValue(
                "name",
                data.personal.name
            );

            setValue(
                "title",
                data.personal.title
            );

            setValue(
                "about",
                data.personal.about
            );

            setValue(
                "email",
                data.personal.email
            );

            setValue(
                "location",
                data.personal.location
            );

            setValue(
                "github",
                data.personal.github
            );

            setValue(
                "linkedin",
                data.personal.linkedin
            );

            setValue(
                "resumeLink",
                data.personal.resume
            );

        }


        // ====================================
        // EDUCATION
        // ====================================

        if (data.education) {

            setValue(
                "degree",
                data.education.degree
            );

            setValue(
                "specialization",
                data.education.specialization
            );

            setValue(
                "college",
                data.education.college
            );

        }


        // ====================================
        // SKILLS
        // ====================================

        setValue(
            "skills",
            data.skills
        );


        // ====================================
        // PHOTO
        // ====================================

        savedProfilePhoto =
            data.profilePhoto || "";


        // ====================================
        // PROJECTS
        // ====================================

        const projectContainer =
            document.getElementById(
                "projectsContainer"
            );

        if (
            projectContainer &&
            Array.isArray(data.projects)
        ) {

            projectContainer.innerHTML = "";

            data.projects.forEach(function(item) {

                addProject();

                const cards =
                    projectContainer.querySelectorAll(
                        ".dynamic-card"
                    );

                const card =
                    cards[cards.length - 1];

                if (!card) return;

                card.querySelector(
                    ".project-name"
                ).value =
                    item.name || "";

                card.querySelector(
                    ".project-tech"
                ).value =
                    item.tech || "";

                card.querySelector(
                    ".project-description"
                ).value =
                    item.description || "";

                card.querySelector(
                    ".project-link"
                ).value =
                    item.link || "";

                const demo =
                    card.querySelector(
                        ".project-demo"
                    );

                if (demo) {
                    demo.value =
                        item.demo || "";
                }

            });

        }


        // ====================================
        // JOURNEY
        // ====================================

        const journeyContainer =
            document.getElementById(
                "journeyContainer"
            );

        if (
            journeyContainer &&
            Array.isArray(data.journey)
        ) {

            journeyContainer.innerHTML = "";

            data.journey.forEach(function(item) {

                addJourney();

                const cards =
                    journeyContainer.querySelectorAll(
                        ".dynamic-card"
                    );

                const card =
                    cards[cards.length - 1];

                if (!card) return;

                card.querySelector(
                    ".journey-year"
                ).value =
                    item.year || "";

                card.querySelector(
                    ".journey-title"
                ).value =
                    item.title || "";

                card.querySelector(
                    ".journey-description"
                ).value =
                    item.description || "";

            });

        }


        // ====================================
        // RESEARCH
        // ====================================

        const researchContainer =
            document.getElementById(
                "researchContainer"
            );

        if (
            researchContainer &&
            Array.isArray(data.research)
        ) {

            researchContainer.innerHTML = "";

            data.research.forEach(function(item) {

                addResearch();

                const cards =
                    researchContainer.querySelectorAll(
                        ".dynamic-card"
                    );

                const card =
                    cards[cards.length - 1];

                if (!card) return;

                card.querySelector(
                    ".research-title"
                ).value =
                    item.title || "";

                card.querySelector(
                    ".research-area"
                ).value =
                    item.area || "";

                card.querySelector(
                    ".research-status"
                ).value =
                    item.status || "Ongoing";

                card.querySelector(
                    ".research-abstract"
                ).value =
                    item.abstract || "";

                card.querySelector(
                    ".research-doi"
                ).value =
                    item.doi || "";

                card.querySelector(
                    ".research-link"
                ).value =
                    item.link || "";

            });

        }


        // ====================================
        // CERTIFICATIONS
        // ====================================

        const certificateContainer =
            document.getElementById(
                "certificationsContainer"
            );

        if (
            certificateContainer &&
            Array.isArray(data.certifications)
        ) {

            certificateContainer.innerHTML = "";

            data.certifications.forEach(function(item) {

                addCertification();

                const cards =
                    certificateContainer.querySelectorAll(
                        ".dynamic-card"
                    );

                const card =
                    cards[cards.length - 1];

                if (!card) return;

                card.querySelector(
                    ".certificate-name"
                ).value =
                    item.name || "";

                card.querySelector(
                    ".certificate-org"
                ).value =
                    item.organization || "";

                card.querySelector(
                    ".certificate-year"
                ).value =
                    item.year || "";

                card.querySelector(
                    ".certificate-link"
                ).value =
                    item.link || "";

            });

        }


        // ====================================
        // ACHIEVEMENTS
        // ====================================

        const achievementContainer =
            document.getElementById(
                "achievementsContainer"
            );

        if (
            achievementContainer &&
            Array.isArray(data.achievements)
        ) {

            achievementContainer.innerHTML = "";

            data.achievements.forEach(function(item) {

                addAchievement();

                const cards =
                    achievementContainer.querySelectorAll(
                        ".dynamic-card"
                    );

                const card =
                    cards[cards.length - 1];

                if (!card) return;

                card.querySelector(
                    ".achievement-title"
                ).value =
                    item.title || "";

                card.querySelector(
                    ".achievement-year"
                ).value =
                    item.year || "";

                card.querySelector(
                    ".achievement-description"
                ).value =
                    item.description || "";

            });

        }


        // ====================================
        // DONATION
        // ====================================

        if (data.donation) {

            setValue(
                "upi",
                data.donation.upi
            );

            setValue(
                "donationPurpose",
                data.donation.purpose
            );

        }


    } catch (error) {

        console.error(
            "Portfolio loading error:",
            error
        );

    }

}


// ========================================
// INPUT
// ========================================

document.addEventListener(
    "input",
    function(event) {

        if (
            event.target &&
            event.target.id === "profilePhoto"
        ) {
            return;
        }

        updateAllPreviews();

    }
);


// ========================================
// CHANGE
// ========================================

document.addEventListener(
    "change",
    function(event) {

        if (
            event.target &&
            event.target.id === "profilePhoto"
        ) {

            updateProfilePhotoPreview();

        } else {

            updateAllPreviews();

        }

    }
);


// ========================================
// DOM READY
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // Global functions
        window.addProject =
            addProject;

        window.addJourney =
            addJourney;

        window.addResearch =
            addResearch;

        window.addCertification =
            addCertification;

        window.addAchievement =
            addAchievement;

        window.removeItem =
            removeItem;


        // Load saved portfolio
        loadPortfolio();


        // Initial preview
        updateAllPreviews();


        // ====================================
        // SAVE BUTTON
        // ====================================

        const saveBtn =
            document.getElementById(
                "saveBtn"
            );

        if (saveBtn) {

            saveBtn.addEventListener(
                "click",
                savePortfolio
            );

        }


        // ====================================
        // PREVIEW BUTTON
        // ====================================

        const previewBtn =
            document.getElementById(
                "previewBtn"
            );

        if (previewBtn) {

            previewBtn.addEventListener(
                "click",
                function() {

                    const preview =
                        document.getElementById(
                            "portfolioPreview"
                        );

                    if (preview) {

                        preview.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }


        // ====================================
        // GENERATE PORTFOLIO
        // ====================================

        const generateBtn =
            document.getElementById(
                "generateBtn"
            );

        if (generateBtn) {

            generateBtn.addEventListener(
                "click",
                function() {

                    savePortfolio();

                    setTimeout(
                        function() {

                            window.location.href =
                                "portfolio.html";

                        },
                        150
                    );

                }
            );

        }

    }
);