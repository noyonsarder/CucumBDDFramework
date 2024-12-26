 class LoginPage {

    constructor(page) {
        this.page= page;
        this.email= `//input[@id='userEmail']`;
        this.password =`//input[@id='userPassword']`;
        this.login =`//input[@value='Login']`;

    }

    async navigateLoginPage(){
      await this.page.goto("https://rahulshettyacademy.com/client", {waitUntil:"load"});
      await this.page.waitForLoadState('networkidle');
    }

    async validLogin(username,password){

        await this.page.locator(this.email).fill(username);
        await this.page.locator(this.password).fill(password);
        await this.page.locator(this.login).click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports= {LoginPage};