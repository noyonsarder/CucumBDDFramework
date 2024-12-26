module.exports = {
    default: {
        require: [
            "step_definitions/**/*.js",
            "support/hooks.js"
        ],
        format: ["allure-cucumberjs/reporter"],
        paths: ["features/**/*.feature"]
    }
};
