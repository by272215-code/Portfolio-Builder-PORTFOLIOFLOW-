(function () {

    "use strict";

    /* =========================================================
       PORTFOLIOFLOW - PORTFOLIO.JS
       ========================================================= */

    /* =========================================================
       GET SAVED PORTFOLIO DATA
       ========================================================= */

    function getPortfolioData() {

        try {

            const saved =
                localStorage.getItem(
                    "portfolioFlowData"
                );

            if (!saved) {
                return null;
            }

            return JSON.parse(saved);


        } catch (error) {

            console.error(
                "Portfolio data error:",
                error
            );

            return null;
        }
    }


    /* =========================================================
       BASIC HELPERS
       ========================================================= */

    function safe(value) {

        if (
            value === null ||
            value === undefined
        ) {
            return "";
        }

        return String(value).trim();
    }


    function escapeHTML(value) {

        return safe(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function hasValue(value) {

        return safe(value) !== "";
    }


    function isValidLink(value) {

        const link = safe(value);

        if (!link) {
            return false;
        }

        return (
            link.startsWith("http://") ||
            link.startsWith("https://") ||
            link.startsWith("mailto:") ||
            link.startsWith("tel:") ||
            link.startsWith("upi:")
        );
    }


    function normalizeLink(value) {

        const link = safe(value);

        if (!link) {
            return "";
        }

        if (
            link.startsWith("http://") ||
            link.startsWith("https://") ||
            link.startsWith("mailto:") ||
            link.startsWith("tel:") ||
            link.startsWith("upi:")
        ) {
            return link;
        }

        return "https://" + link;
    }


    function getElement(id) {

        return document.getElementById(id);
    }


    function hideSection(id) {

        const section = getElement(id);

        if (section) {
            section.style.display = "none";
        }
    }


    function showSection(id) {

        const section = getElement(id);

        if (section) {
            section.style.display = "";
        }
    }


    function setText(id, value) {

        const element = getElement(id);

        if (element) {
            element.textContent = safe(value);
        }
    }


    /* =========================================================
       PERSONAL INFORMATION
       ========================================================= */

    function loadPersonal(personal) {

        personal = personal || {};

        setText(
            "portfolioName",
            personal.name
        );

        setText(
            "portfolioTitle",
            personal.title
        );

        setText(
            "portfolioAbout",
            personal.about
        );

        setText(
            "portfolioEmail",
            personal.email
        );

        setText(
            "portfolioLocation",
            personal.location
        );

        const emailElement =
            getElement("portfolioEmail");

        if (
            emailElement &&
            hasValue(personal.email)
        ) {

            emailElement.href =
                "mailto:" +
                safe(personal.email);

            emailElement.style.display =
                "inline-flex";

        } else if (emailElement) {

            emailElement.style.display =
                "none";
        }
    }


    /* =========================================================
       PROFILE PHOTO
       ========================================================= */

    /* =========================================================
   PROFILE PHOTO
   ========================================================= */

function loadProfilePhoto(data) {

    const photoContainer =
        getElement("portfolioPhoto");

    if (!photoContainer) {
        return;
    }

    const photo =
        safe(data.profilePhoto);

    /* ---------------------------------------------
       CLEAR OLD CONTENT
       --------------------------------------------- */

    photoContainer.innerHTML = "";

    /* ---------------------------------------------
       PHOTO EXISTS
       --------------------------------------------- */

    if (photo) {

        const img =
            document.createElement("img");

        img.src = photo;

        img.alt =
            safe(
                data.personal &&
                data.personal.name
            ) || "Profile Photo";

        img.loading = "eager";

        img.decoding = "async";

        img.style.width = "100%";

        img.style.height = "100%";

        img.style.objectFit = "cover";

        img.style.display = "block";

        img.style.borderRadius = "50%";

        photoContainer.appendChild(img);

        return;
    }

    /* ---------------------------------------------
       NO PHOTO = YOU FALLBACK
       --------------------------------------------- */

    const fallback =
        document.createElement("span");

    fallback.id =
        "photo-placeholder";

    fallback.textContent =
        "YOU";

    photoContainer.appendChild(
        fallback
    );
}

    /* =========================================================
       SOCIAL LINKS
       ========================================================= */

    function loadSocialLinks(personal) {

        const container =
            getElement("portfolioSocials");

        if (!container) {
            return;
        }

        container.innerHTML = "";

        personal = personal || {};

        const links = [];

        if (isValidLink(personal.github)) {

            links.push({
                name: "GitHub",
                url: normalizeLink(
                    personal.github
                ),
                icon: "GitHub ↗"
            });
        }

        if (isValidLink(personal.linkedin)) {

            links.push({
                name: "LinkedIn",
                url: normalizeLink(
                    personal.linkedin
                ),
                icon: "LinkedIn ↗"
            });
        }

        if (isValidLink(personal.email)) {

            links.push({
                name: "Email",
                url:
                    personal.email
                        .startsWith("mailto:")
                        ? personal.email
                        : "mailto:" +
                          personal.email,
                icon: "Email ↗"
            });
        }


        if (!links.length) {

            container.style.display =
                "none";

            return;
        }


        container.style.display =
            "flex";


        links.forEach(function (item) {

            const link =
                document.createElement("a");

            link.href = item.url;

            link.textContent =
                item.icon;

            link.target =
                item.url.startsWith(
                    "mailto:"
                )
                    ? "_self"
                    : "_blank";

            link.rel =
                "noopener noreferrer";

            link.className =
                "social-link";

            container.appendChild(
                link
            );
        });
    }


    /* =========================================================
       RESUME
       ========================================================= */

    function loadResume(personal) {

        const viewButton =
            getElement(
                "resumeViewBtn"
            );

        const downloadButton =
            getElement(
                "resumeDownloadBtn"
            );

        personal = personal || {};

        const resume =
            safe(
                personal.resume ||
                personal.resumeLink ||
                personal.resumeUrl
            );


        if (!resume) {

            if (viewButton) {
                viewButton.style.display =
                    "none";
            }

            if (downloadButton) {
                downloadButton.style.display =
                    "none";
            }

            return;
        }


        if (viewButton) {

            viewButton.href =
                resume;

            viewButton.target =
                "_blank";

            viewButton.rel =
                "noopener noreferrer";

            viewButton.style.display =
                "inline-flex";
        }


        if (downloadButton) {

            downloadButton.href =
                resume;

            downloadButton.setAttribute(
                "download",
                ""
            );

            downloadButton.style.display =
                "inline-flex";
        }
    }


    /* =========================================================
       EDUCATION
       ========================================================= */

    function loadEducation(education) {

        const section =
            getElement(
                "educationSection"
            );

        const container =
            getElement(
                "portfolioEducation"
            );

        if (!container) {
            return;
        }

        education =
            education || {};


        const degree =
            safe(education.degree);

        const specialization =
            safe(
                education.specialization
            );

        const college =
            safe(education.college);


        if (
            !degree &&
            !specialization &&
            !college
        ) {

            hideSection(
                "educationSection"
            );

            return;
        }


        showSection(
            "educationSection"
        );


        let html = "";


        if (degree) {

            html +=
                "<h3>" +
                escapeHTML(degree) +
                "</h3>";
        }


        if (specialization) {

            html +=
                "<p>" +
                escapeHTML(
                    specialization
                ) +
                "</p>";
        }


        if (college) {

            html +=
                "<span>" +
                escapeHTML(college) +
                "</span>";
        }


        container.innerHTML =
            html;
    }


    /* =========================================================
       SKILLS
       ========================================================= */

    function loadSkills(skills) {

        const container =
            getElement(
                "portfolioSkills"
            );

        if (!container) {
            return;
        }


        const section =
            getElement(
                "skillsSection"
            );


        if (
            Array.isArray(skills)
        ) {

            skills =
                skills
                    .map(
                        item => safe(item)
                    )
                    .filter(Boolean);

        } else {

            skills =
                safe(skills)
                    .split(",")
                    .map(
                        item =>
                            item.trim()
                    )
                    .filter(Boolean);
        }


        if (!skills.length) {

            if (section) {
                section.style.display =
                    "none";
            }

            return;
        }


        if (section) {
            section.style.display =
                "";
        }


        container.innerHTML =
            skills
                .map(
                    function (skill) {

                        return (
                            '<span class="skill-tag">' +
                            escapeHTML(skill) +
                            "</span>"
                        );
                    }
                )
                .join("");
    }


    /* =========================================================
       PROJECTS
       ========================================================= */

    function loadProjects(projects) {

        const container =
            getElement(
                "portfolioProjects"
            );

        if (!container) {
            return;
        }


        const section =
            getElement(
                "projectsSection"
            );


        projects =
            Array.isArray(projects)
                ? projects
                : [];


        const validProjects =
            projects.filter(
                function (project) {

                    return (
                        project &&
                        (
                            hasValue(
                                project.name
                            ) ||
                            hasValue(
                                project.title
                            ) ||
                            hasValue(
                                project.description
                            ) ||
                            hasValue(
                                project.link
                            ) ||
                            hasValue(
                                project.demo
                            ) ||
                            hasValue(
                                project.liveDemo
                            )
                        )
                    );
                }
            );


        if (!validProjects.length) {

            if (section) {
                section.style.display =
                    "none";
            }

            return;
        }


        if (section) {
            section.style.display =
                "";
        }


        container.innerHTML = "";


        validProjects.forEach(
            function (project) {

                const name =
                    safe(
                        project.name ||
                        project.title
                    );

                const tech =
                    safe(
                        project.tech ||
                        project.technology
                    );

                const description =
                    safe(
                        project.description
                    );

                const link =
                    normalizeLink(
                        project.link
                    );

                const demo =
                    normalizeLink(
                        project.demo ||
                        project.liveDemo
                    );


                const card =
                    document.createElement(
                        "article"
                    );

                card.className =
                    "project-card";


                let html = "";


                if (name) {

                    html +=
                        "<h3>" +
                        escapeHTML(name) +
                        "</h3>";
                }


                if (tech) {

                    html +=
                        '<div class="project-tech">' +
                        escapeHTML(tech) +
                        "</div>";
                }


                if (description) {

                    html +=
                        "<p>" +
                        escapeHTML(
                            description
                        ) +
                        "</p>";
                }


                let projectActions = "";


if (
    link &&
    isValidLink(link)
) {

    projectActions +=
        '<a href="' +
        escapeHTML(link) +
        '" target="_blank" rel="noopener noreferrer" class="project-link">' +
        "View Project ↗" +
        "</a>";
}


if (
    demo &&
    isValidLink(demo)
) {

    projectActions +=
        '<a href="' +
        escapeHTML(demo) +
        '" target="_blank" rel="noopener noreferrer" class="project-demo">' +
        "Live Demo ↗" +
        "</a>";
}


if (projectActions) {

    html +=
        '<div class="project-actions">' +
        projectActions +
        "</div>";
}


                card.innerHTML =
                    html;

                container.appendChild(
                    card
                );
            }
        );
    }


    /* =========================================================
       JOURNEY
       ========================================================= */

    function loadJourney(journey) {

        const container =
            getElement(
                "portfolioJourney"
            );

        if (!container) {
            return;
        }


        const section =
            getElement(
                "journeySection"
            );


        journey =
            Array.isArray(journey)
                ? journey
                : [];


        const validJourney =
            journey.filter(
                function (item) {

                    return (
                        item &&
                        (
                            hasValue(
                                item.year
                            ) ||
                            hasValue(
                                item.title
                            ) ||
                            hasValue(
                                item.description
                            )
                        )
                    );
                }
            );


        if (!validJourney.length) {

            if (section) {
                section.style.display =
                    "none";
            }

            return;
        }


        if (section) {
            section.style.display =
                "";
        }


        container.innerHTML = "";


        validJourney.forEach(
            function (item) {

                const year =
                    safe(item.year);

                const title =
                    safe(item.title);

                const description =
                    safe(
                        item.description
                    );


                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "journey-item";


                let html = "";


                if (year) {

                    html +=
                        '<span class="journey-year">' +
                        escapeHTML(year) +
                        "</span>";
                }


                if (title) {

                    html +=
                        "<h3>" +
                        escapeHTML(title) +
                        "</h3>";
                }


                if (description) {

                    html +=
                        "<p>" +
                        escapeHTML(
                            description
                        ) +
                        "</p>";
                }


                card.innerHTML =
                    html;


                container.appendChild(
                    card
                );
            }
        );
    }


    /* =========================================================
       RESEARCH
       ========================================================= */

    function loadResearch(research) {

        const container =
            getElement(
                "portfolioResearch"
            );

        if (!container) {
            return;
        }


        const section =
            getElement(
                "researchSection"
            );


        research =
            Array.isArray(research)
                ? research
                : [];


        const validResearch =
            research.filter(
                function (item) {

                    return (
                        item &&
                        (
                            hasValue(
                                item.title
                            ) ||
                            hasValue(
                                item.area
                            ) ||
                            hasValue(
                                item.abstract
                            ) ||
                            hasValue(
                                item.doi
                            ) ||
                            hasValue(
                                item.link
                            )
                        )
                    );
                }
            );


        if (!validResearch.length) {

            if (section) {
                section.style.display =
                    "none";
            }

            return;
        }


        if (section) {
            section.style.display =
                "";
        }


        container.innerHTML = "";


        validResearch.forEach(
            function (item) {

                const title =
                    safe(item.title);

                const area =
                    safe(item.area);

                const status =
                    safe(item.status);

                const abstract =
                    safe(item.abstract);

                const doi =
                    safe(item.doi);

                const link =
                    normalizeLink(
                        item.link
                    );


                const card =
                    document.createElement(
                        "article"
                    );

                card.className =
                    "research-card";


                let html = "";


                if (title) {

                    html +=
                        "<h3>" +
                        escapeHTML(title) +
                        "</h3>";
                }


                if (area) {

                    html +=
                        '<p class="research-area">' +
                        escapeHTML(area) +
                        "</p>";
                }


                if (status) {

                    html +=
                        '<span class="research-status">' +
                        escapeHTML(status) +
                        "</span>";
                }


                if (abstract) {

                    html +=
                        "<p>" +
                        escapeHTML(
                            abstract
                        ) +
                        "</p>";
                }


                if (doi) {

                    let doiUrl =
                        doi;

                    if (
                        doi.startsWith(
                            "10."
                        )
                    ) {

                        doiUrl =
                            "https://doi.org/" +
                            doi;
                    }

                    if (
                        isValidLink(
                            doiUrl
                        )
                    ) {

                        html +=
                            '<a href="' +
                            escapeHTML(
                                doiUrl
                            ) +
                            '" target="_blank" rel="noopener noreferrer">' +
                            "DOI ↗" +
                            "</a>";
                    }
                }


                if (
                    link &&
                    isValidLink(link)
                ) {

                    html +=
                        '<a href="' +
                        escapeHTML(link) +
                        '" target="_blank" rel="noopener noreferrer">' +
                        "Research Link ↗" +
                        "</a>";
                }


                card.innerHTML =
                    html;


                container.appendChild(
                    card
                );
            }
        );
    }


    /* =========================================================
       CERTIFICATIONS
       ========================================================= */

    function loadCertifications(
        certifications
    ) {

        const container =
            getElement(
                "portfolioCertifications"
            );

        if (!container) {
            return;
        }


        const section =
            getElement(
                "certificationsSection"
            );


        certifications =
            Array.isArray(
                certifications
            )
                ? certifications
                : [];


        const validCertificates =
            certifications.filter(
                function (item) {

                    return (
                        item &&
                        (
                            hasValue(
                                item.name
                            ) ||
                            hasValue(
                                item.title
                            ) ||
                            hasValue(
                                item.organization
                            ) ||
                            hasValue(
                                item.org
                            ) ||
                            hasValue(
                                item.year
                            ) ||
                            hasValue(
                                item.link
                            )
                        )
                    );
                }
            );


        if (
            !validCertificates.length
        ) {

            if (section) {
                section.style.display =
                    "none";
            }

            return;
        }


        if (section) {
            section.style.display =
                "";
        }


        container.innerHTML = "";


        validCertificates.forEach(
            function (item) {

                const name =
                    safe(
                        item.name ||
                        item.title
                    );

                const organization =
                    safe(
                        item.organization ||
                        item.org
                    );

                const year =
                    safe(item.year);

                const link =
                    normalizeLink(
                        item.link
                    );


                const card =
                    document.createElement(
                        "article"
                    );

                card.className =
                    "certificate-card";


                let html = "";


                if (name) {

                    html +=
                        "<h3>" +
                        escapeHTML(name) +
                        "</h3>";
                }


                if (organization) {

                    html +=
                        "<p>" +
                        escapeHTML(
                            organization
                        ) +
                        "</p>";
                }


                if (year) {

    html +=
        '<div class="certificate-year">' +
        escapeHTML(year) +
        "</div>";
}


                if (
                    link &&
                    isValidLink(link)
                ) {

                    html +=
                        '<a href="' +
                        escapeHTML(link) +
                        '" target="_blank" rel="noopener noreferrer">' +
                        "View Certificate ↗" +
                        "</a>";
                }


                card.innerHTML =
                    html;


                container.appendChild(
                    card
                );
            }
        );
    }


    /* =========================================================
       ACHIEVEMENTS
       ========================================================= */

    function loadAchievements(
        achievements
    ) {

        const container =
            getElement(
                "portfolioAchievements"
            );

        if (!container) {
            return;
        }


        const section =
            getElement(
                "achievementsSection"
            );


        achievements =
            Array.isArray(
                achievements
            )
                ? achievements
                : [];


        const validAchievements =
            achievements.filter(
                function (item) {

                    return (
                        item &&
                        (
                            hasValue(
                                item.title
                            ) ||
                            hasValue(
                                item.year
                            ) ||
                            hasValue(
                                item.description
                            )
                        )
                    );
                }
            );


        if (
            !validAchievements.length
        ) {

            if (section) {
                section.style.display =
                    "none";
            }

            return;
        }


        if (section) {
            section.style.display =
                "";
        }


        container.innerHTML = "";


        validAchievements.forEach(
            function (item) {

                const title =
                    safe(item.title);

                const year =
                    safe(item.year);

                const description =
                    safe(
                        item.description
                    );


                const card =
                    document.createElement(
                        "article"
                    );

                card.className =
                    "achievement-card";


                let html = "";


                if (title) {

                    html +=
                        "<h3>" +
                        escapeHTML(title) +
                        "</h3>";
                }


                if (year) {

                    html +=
                        '<span class="achievement-year">' +
                        escapeHTML(year) +
                        "</span>";
                }


                if (description) {

                    html +=
                        "<p>" +
                        escapeHTML(
                            description
                        ) +
                        "</p>";
                }


                card.innerHTML =
                    html;


                container.appendChild(
                    card
                );
            }
        );
    }


    /* =========================================================
       DONATION STYLES
       ========================================================= */

    function addDonationStyles() {

        if (
            document.getElementById(
                "portfolioDonationStyles"
            )
        ) {
            return;
        }


        const style =
            document.createElement(
                "style"
            );

        style.id =
            "portfolioDonationStyles";


        style.textContent = `

            .donation-box {
                margin-top: 20px;
                padding: 24px;
                border-radius: 20px;
                border: 1px solid rgba(32,214,199,0.22);
                background: rgba(32,214,199,0.04);
            }

            .donation-purpose {
                margin-bottom: 18px;
                opacity: 0.82;
                line-height: 1.7;
            }

            .donation-upi {
                display: flex;
                align-items: center;
                gap: 10px;
                flex-wrap: wrap;
                margin-bottom: 18px;
            }

            .donation-upi strong {
                color: var(--primary-color, #20D6C7);
            }

            .donation-actions {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                margin-top: 12px;
            }

            .donation-actions input {
                flex: 1;
                min-width: 180px;
                padding: 12px 14px;
                border-radius: 10px;
                border: 1px solid rgba(255,255,255,0.12);
                background: rgba(0,0,0,0.18);
                color: inherit;
                outline: none;
            }

            .donation-btn {
                border: none;
                border-radius: 10px;
                padding: 12px 16px;
                cursor: pointer;
                font-weight: 700;
                transition: 0.2s ease;
            }

            .donation-btn.primary {
                background: var(--primary-color, #20D6C7);
                color: #031516;
            }

            .donation-btn.secondary {
                background: rgba(255,255,255,0.08);
                color: inherit;
                border: 1px solid rgba(255,255,255,0.12);
            }

            .donation-btn:hover {
                transform: translateY(-1px);
            }

            .upi-qr-container {
                margin-top: 25px;
                display: none;
                text-align: center;
            }

            #upiQrCode {
                width: 190px;
                height: 190px;
                max-width: 100%;
                padding: 8px;
                background: #ffffff;
                border-radius: 12px;
                object-fit: contain;
            }

            .qr-note {
                margin-top: 10px;
                font-size: 13px;
                opacity: 0.7;
            }

            @media (max-width: 600px) {

                .donation-box {
                    padding: 18px;
                }

                .donation-actions {
                    flex-direction: column;
                }

                .donation-actions input,
                .donation-btn {
                    width: 100%;
                    box-sizing: border-box;
                }

                #upiQrCode {
                    width: 180px;
                    height: 180px;
                }
            }
        `;


        document.head.appendChild(
            style
        );
    }


    /* =========================================================
       DONATION
       ========================================================= */

    function loadDonation(data) {

        const section =
            getElement(
                "donationSection"
            );

        const container =
            getElement(
                "portfolioDonation"
            );


        if (!section || !container) {
            return;
        }


        const donation =
            data.donation || {};


        const upi =
    safe(
        donation.upi ||
        data.upi ||
        "8092437609@axl"
    );


        const purpose =
            safe(
                donation.purpose ||
                data.donationPurpose
            );


        const qrCode =
            safe(
                donation.qrCode
            ) ||
            "assets/phonepe-qr.jpeg";


        if (
            !upi &&
            !purpose
        ) {

            section.style.display =
                "none";

            return;
        }


        section.style.display =
            "";


        addDonationStyles();


        container.innerHTML = "";


        const box =
            document.createElement(
                "div"
            );

        box.className =
            "donation-box";


        let html = "";


        if (purpose) {

            html +=
                '<p class="donation-purpose">' +
                escapeHTML(purpose) +
                "</p>";
        }


        if (upi) {

            html += `

                <div class="donation-upi">

                    <span>UPI ID:</span>

                    <strong id="portfolioUpiId">
                        ${escapeHTML(upi)}
                    </strong>

                </div>

                <div class="donation-actions">

                    <input
                        type="number"
                        id="donationAmount"
                        placeholder="Enter amount (optional)"
                        min="1"
                        step="0.01"
                        inputmode="decimal"
                    >

                    <button
                        type="button"
                        id="payViaUpiBtn"
                        class="donation-btn primary"
                    >
                        Pay via UPI
                    </button>

                    <button
                        type="button"
                        id="copyUpiBtn"
                        class="donation-btn secondary"
                    >
                        Copy UPI ID
                    </button>

                </div>

                <div
                    class="upi-qr-container"
                    id="upiQrContainer"
                >

                    <img
                        id="upiQrCode"
                        src="${escapeHTML(qrCode)}"
                        alt="Bittu Kumar PhonePe UPI QR Code"
                    >

                    <div class="qr-note">
                        Scan this QR code to support my work.
                    </div>

                </div>
            `;
        }


        box.innerHTML =
            html;


        container.appendChild(
            box
        );


        /* =====================================================
           QR CODE
           ===================================================== */

        const qrContainer =
            getElement(
                "upiQrContainer"
            );

        const qrImage =
            getElement(
                "upiQrCode"
            );


        if (
            qrContainer &&
            qrImage
        ) {

            /*
             * Actual PhonePe QR
             * No external QR generator
             */

            qrImage.src =
                qrCode;

            qrImage.alt =
                "Bittu Kumar PhonePe UPI QR Code";

            qrContainer.style.display =
                "block";
        }


/* =====================================================
   PAY VIA UPI
   ===================================================== */

const payBtn =
    getElement("payViaUpiBtn");

if (payBtn) {

    payBtn.addEventListener(
        "click",
        function () {

            const amountInput =
                getElement("donationAmount");

            const amount =
                amountInput
                    ? amountInput.value.trim()
                    : "";

            /* -----------------------------------------
               CHECK UPI ID
               ----------------------------------------- */

            if (!upi) {

                alert(
                    "UPI ID is not available."
                );

                return;
            }

            /* -----------------------------------------
               CREATE UPI PAYMENT PARAMETERS
               ----------------------------------------- */

            const params = [];

            params.push(
                "pa=" +
                encodeURIComponent(upi)
            );

            /* Receiver name */

            params.push(
                "pn=" +
                encodeURIComponent(
                    "Bittu Kumar"
                )
            );

            /* Currency */

            params.push("cu=INR");

            /* -----------------------------------------
               OPTIONAL AMOUNT
               ----------------------------------------- */

            if (amount !== "") {

                const numericAmount =
                    Number(amount);

                if (
                    !Number.isFinite(
                        numericAmount
                    ) ||
                    numericAmount <= 0
                ) {

                    alert(
                        "Please enter a valid amount."
                    );

                    return;
                }

                params.push(
                    "am=" +
                    encodeURIComponent(
                        numericAmount.toFixed(2)
                    )
                );
            }

            /* -----------------------------------------
               CREATE UPI DEEP LINK
               ----------------------------------------- */

            const upiUrl =
                "upi://pay?" +
                params.join("&");

            console.log(
                "Opening UPI:",
                upiUrl
            );

            /* -----------------------------------------
               OPEN UPI APP
               ----------------------------------------- */

            window.location.href =
                upiUrl;
        }
    );
}


        /* =====================================================
           COPY UPI ID
           ===================================================== */

        const copyBtn =
            getElement(
                "copyUpiBtn"
            );


        if (copyBtn) {

            copyBtn.addEventListener(
                "click",
                async function () {

                    try {

                        await navigator.clipboard.writeText(
                            upi
                        );


                        const oldText =
                            copyBtn.textContent;


                        copyBtn.textContent =
                            "Copied ✓";


                        setTimeout(
                            function () {

                                copyBtn.textContent =
                                    oldText;

                            },
                            1500
                        );

                    } catch (error) {

                        /*
                         * Fallback for older browsers
                         */

                        const temp =
                            document.createElement(
                                "textarea"
                            );

                        temp.value =
                            upi;

                        document.body.appendChild(
                            temp
                        );

                        temp.select();

                        document.execCommand(
                            "copy"
                        );

                        temp.remove();


                        copyBtn.textContent =
                            "Copied ✓";


                        setTimeout(
                            function () {

                                copyBtn.textContent =
                                    "Copy UPI ID";

                            },
                            1500
                        );
                    }

                }
            );
        }
    }


    /* =========================================================
       APPLY THEME
       ========================================================= */

    function loadTheme(data) {

        const theme =
            safe(
                data.theme
            ) ||
            localStorage.getItem(
                "portfolioFlowTheme"
            ) ||
            "teal";


        const body =
            document.body;


        if (!body) {
            return;
        }


        body.classList.remove(
            "theme-teal",
            "theme-purple",
            "theme-blue",
            "theme-green",
            "theme-premium"
        );


        const allowedThemes = [
            "teal",
            "purple",
            "blue",
            "green",
            "premium"
        ];


        const selectedTheme =
            allowedThemes.includes(
                theme
            )
                ? theme
                : "teal";


        body.classList.add(
            "theme-" +
            selectedTheme
        );


        localStorage.setItem(
            "portfolioFlowTheme",
            selectedTheme
        );
    }


    /* =========================================================
       PORTFOLIO ACTIONS
       ========================================================= */

    function setupPortfolioActions() {

        /* =====================================================
           PRINT / SAVE PDF
           ===================================================== */

        const printBtn =
            getElement(
                "printPortfolioBtn"
            );


        if (printBtn) {

            printBtn.addEventListener(
                "click",
                function () {

                    window.print();

                }
            );
        }


        /* =====================================================
           SHARE
           ===================================================== */

        const shareBtn =
            getElement(
                "sharePortfolioBtn"
            );


        if (shareBtn) {

            shareBtn.addEventListener(
                "click",
                async function () {

                    const shareData = {

                        title:
                            document.title ||
                            "My Portfolio",

                        text:
                            "Check out my portfolio.",

                        url:
                            window.location.href
                    };


                    if (
                        navigator.share
                    ) {

                        try {

                            await navigator.share(
                                shareData
                            );

                        } catch (error) {

                            console.log(
                                "Share cancelled."
                            );
                        }

                        return;
                    }


                    try {

                        await navigator.clipboard.writeText(
                            window.location.href
                        );

                        alert(
                            "Portfolio link copied."
                        );

                    } catch (error) {

                        alert(
                            "Copy this link:\n" +
                            window.location.href
                        );
                    }
                }
            );
        }


        /* =====================================================
           COPY LINK
           ===================================================== */

        const copyLinkBtn =
            getElement(
                "copyPortfolioLinkBtn"
            );


        if (copyLinkBtn) {

            copyLinkBtn.addEventListener(
                "click",
                async function () {

                    try {

                        await navigator.clipboard.writeText(
                            window.location.href
                        );

                        const oldText =
                            copyLinkBtn.textContent;


                        copyLinkBtn.textContent =
                            "Copied ✓";


                        setTimeout(
                            function () {

                                copyLinkBtn.textContent =
                                    oldText;

                            },
                            1500
                        );

                    } catch (error) {

                        alert(
                            window.location.href
                        );
                    }

                }
            );
        }


        /* =====================================================
           BACK TO BUILDER
           ===================================================== */

        const backBtn =
            getElement(
                "backToBuilderBtn"
            );


        if (backBtn) {

            backBtn.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "builder.html";

                }
            );
        }
    }


    /* =========================================================
       MAIN PORTFOLIO LOADER
       ========================================================= */

    function loadPortfolio() {

        const data =
            getPortfolioData();


        if (!data) {

            console.warn(
                "No PortfolioFlow data found."
            );

            return;
        }


        const personal =
            data.personal || {};


        loadPersonal(
            personal
        );


        loadProfilePhoto(
            data
        );


        loadSocialLinks(
            personal
        );


        loadResume(
            personal
        );


        loadEducation(
            data.education || {}
        );


        loadSkills(
            data.skills || ""
        );


        loadProjects(
            data.projects || []
        );


        loadJourney(
            data.journey || []
        );


        loadResearch(
            data.research || []
        );


        loadCertifications(
            data.certifications || []
        );


        loadAchievements(
            data.achievements || []
        );


        loadDonation(
            data
        );


        loadTheme(
            data
        );


        setupPortfolioActions();


        console.log(
            "PortfolioFlow portfolio loaded successfully."
        );
    }


    /* =========================================================
       DOM READY
       ========================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            loadPortfolio
        );

    } else {

        loadPortfolio();
    }


})();