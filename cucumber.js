module.exports = {
    default: {
        require: [
            "step_definitions/**/*.js",
            "support/hooks.js"
        ],
        format: [
            "progress", // For real-time feedback in the terminal
             "@cucumber/pretty-formatter",   // For detailed output
            // "allure-cucumberjs/reporter" // For Allure report generation
        ],
        paths: ["features/**/*.feature"]
    }
};
