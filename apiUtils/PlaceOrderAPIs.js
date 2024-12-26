class PlaceOrderAPIs {



    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getToken(loginDetails) {

        const storeData = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {

            data: loginDetails
        })
        const parseJSobject = await storeData.json();
        const token = parseJSobject.token;

        if (!token) {
            throw new Error('Failed to fetch token. Response: ' + JSON.stringify(parseJSobject));
        }
        return token;

    }

    async placeOrderID(orderDetails,loginDetails) {
        let response ={};
        response.token= await this.getToken(loginDetails);
        const PlaceOrder = await this.apiContext.post(`https://rahulshettyacademy.com/api/ecom/order/create-order`, {
            data: orderDetails,
            headers: {
                "authorization":response.token,
                "content-type": "application/json"

            }
        })
        const parsePlaceOrder = await PlaceOrder.json();
        console.log('API Response:', JSON.stringify(parsePlaceOrder));

        if (!parsePlaceOrder.orders || !Array.isArray(parsePlaceOrder.orders) || parsePlaceOrder.orders.length === 0) {
            throw new Error('The API response does not contain valid orders. Response: ' + JSON.stringify(parsePlaceOrder));
        }
        
        const orderId = parsePlaceOrder.orders[0];
        response.orderId=orderId;
        return response;

    }
}

module.exports = { PlaceOrderAPIs };