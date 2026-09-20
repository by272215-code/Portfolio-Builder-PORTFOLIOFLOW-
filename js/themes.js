/* =====================================================
   PORTFOLIOFLOW THEME SYSTEM
===================================================== */

(function () {

    "use strict";


    /* ================================================
       AVAILABLE THEMES
    ================================================= */

    const THEMES = [
        "teal",
        "purple",
        "blue",
        "green",
        "premium"
    ];


    const DEFAULT_THEME = "teal";


    /* ================================================
       CHECK THEME
    ================================================= */

    function isValidTheme(theme) {

        return THEMES.includes(theme);

    }


    /* ================================================
       GET SAVED DATA
    ================================================= */

    function getSavedData() {

        const saved =
            localStorage.getItem(
                "portfolioFlowData"
            );

        if (!saved) {
            return null;
        }

        try {

            return JSON.parse(saved);

        } catch (error) {

            console.error(
                "PortfolioFlow theme data error:",
                error
            );

            return null;
        }
    }


    /* ================================================
       APPLY THEME
    ================================================= */

    function applyTheme(theme, saveTheme = true) {

        if (!isValidTheme(theme)) {

            theme =
                DEFAULT_THEME;

        }


        document.body.classList.remove(
            "theme-teal",
            "theme-purple",
            "theme-blue",
            "theme-green",
            "theme-premium"
        );


        document.body.classList.add(
            "theme-" + theme
        );


        /* UPDATE RADIO */

        const radio =
            document.querySelector(
                `input[name="portfolioTheme"][value="${theme}"]`
            );


        if (radio) {

            radio.checked = true;

        }


        /* SAVE THEME */

        if (saveTheme) {

            localStorage.setItem(
                "portfolioFlowTheme",
                theme
            );

        }


        /* GLOBAL */

        window.currentPortfolioTheme =
            theme;

    }


    /* ================================================
       GET CURRENT THEME
    ================================================= */

    function getCurrentTheme() {

        const saved =
            localStorage.getItem(
                "portfolioFlowTheme"
            );


        if (isValidTheme(saved)) {

            return saved;

        }


        const data =
            getSavedData();


        if (
            data &&
            isValidTheme(data.theme)
        ) {

            return data.theme;

        }


        return DEFAULT_THEME;

    }


    /* ================================================
       THEME SELECTOR
    ================================================= */

    function setupThemeSelector() {

        const radios =
            document.querySelectorAll(
                'input[name="portfolioTheme"]'
            );


        radios.forEach(function (radio) {

            radio.addEventListener(
                "change",
                function () {

                    if (
                        radio.checked
                    ) {

                        applyTheme(
                            radio.value,
                            true
                        );

                    }

                }
            );

        });

    }


    /* ================================================
       SAVE THEME WITH PORTFOLIO
    ================================================= */

    function connectWithSavePortfolio() {

        if (
            typeof window.savePortfolio !==
            "function"
        ) {

            return;

        }


        if (
            window.savePortfolio.__themeWrapped
        ) {

            return;

        }


        const originalSave =
            window.savePortfolio;


        function themedSavePortfolio() {

            /* RUN ORIGINAL SAVE */

            originalSave();


            /* READ SAVED DATA */

            const saved =
                localStorage.getItem(
                    "portfolioFlowData"
                );


            let data = {};


            if (saved) {

                try {

                    data =
                        JSON.parse(saved);

                } catch (error) {

                    data = {};

                }

            }


            /* ADD THEME */

            data.theme =
                getCurrentTheme();


            /* SAVE AGAIN */

            localStorage.setItem(
                "portfolioFlowData",
                JSON.stringify(data)
            );


            localStorage.setItem(
                "portfolioFlowTheme",
                data.theme
            );

        }


        themedSavePortfolio.__themeWrapped =
            true;


        window.savePortfolio =
            themedSavePortfolio;

    }


    /* ================================================
       SAVE BUTTON EXTRA PROTECTION
    ================================================= */

    function protectSaveButton() {

        const saveBtn =
            document.getElementById(
                "saveBtn"
            );


        if (!saveBtn) {
            return;
        }


        saveBtn.addEventListener(
            "click",
            function () {

                setTimeout(
                    function () {

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


                            data.theme =
                                getCurrentTheme();


                            localStorage.setItem(
                                "portfolioFlowData",
                                JSON.stringify(data)
                            );

                        } catch (error) {

                            console.error(
                                "Theme save error:",
                                error
                            );

                        }

                    },
                    50
                );

            }
        );

    }


    /* ================================================
       GENERATE BUTTON PROTECTION
    ================================================= */

    function protectGenerateButton() {

        const generateBtn =
            document.getElementById(
                "generateBtn"
            );


        if (!generateBtn) {
            return;
        }


        generateBtn.addEventListener(
            "click",
            function () {

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


                    data.theme =
                        getCurrentTheme();


                    localStorage.setItem(
                        "portfolioFlowData",
                        JSON.stringify(data)
                    );


                } catch (error) {

                    console.error(
                        "Theme generate error:",
                        error
                    );

                }

            },
            true
        );

    }


    /* ================================================
       INITIALIZE
    ================================================= */

    function initializeThemeSystem() {

        const theme =
            getCurrentTheme();


        applyTheme(
            theme,
            false
        );


        setupThemeSelector();


        /*
           builder.js normally registers its
           savePortfolio event before this script.
           Wrap the function after page load.
        */

        connectWithSavePortfolio();


        protectSaveButton();

        protectGenerateButton();


        console.log(
            "PortfolioFlow Theme System Ready:",
            theme
        );

    }


    /* ================================================
       DOM READY
    ================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            /*
               Run once immediately
            */

            initializeThemeSystem();


            /*
               builder.js also initializes
               on DOMContentLoaded, so connect
               again after it has finished.
            */

            setTimeout(
                function () {

                    connectWithSavePortfolio();

                    const theme =
                        getCurrentTheme();

                    applyTheme(
                        theme,
                        false
                    );

                },
                100
            );

        }
    );


    /* ================================================
       GLOBAL FUNCTIONS
    ================================================= */

    window.PortfolioFlowThemes = {

        apply: applyTheme,

        get: getCurrentTheme,

        available: THEMES

    };


})();