const base = require(`@playwright/test`);

 exports.customTest = base.test.extend(
    {
        loginDetails: {
            userName: "sumon4@yopmail.com",
            passWord: "Tim1234@",
            productName: "ADIDAS ORIGINAL"
        }
    }
)