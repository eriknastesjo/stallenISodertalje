import config from "../config/config.json";
import Park from "../interfaces/park";


const parkModel = {
    getData: async function getData(): Promise<Park[]> {
        const response = await fetch(`${config.base_url}/2cc90eb1-2c6a-444b-ab52-e4bcd22c7130`);
        const result = await response.json();

        return result.results;
    }


    // ,
    // getIndividualOrder: async function getIndividualOrder(orderId: Partial<Order>): Promise<Order[]> {

    //     const response = await fetch(`${config.base_url}/orders/:${orderId}?api_key=${config.api_key}`);
    //     const result = await response.json();

    //     return result.data;
    // },
    // pickOrder: async function pickOrder(order: Partial<Order>) {
    //     // console.log(order);
    //     // Promise.all() itererar genom alla items och returnerar ett enda promise i form av array
    //     Promise.all(order.order_items.map(async (order_item: Partial<OrderItem>) => {
    //         let changedProduct = {
    //             id: order_item.product_id,
    //             name: order_item.name,
    //             stock: order_item.stock - order_item.amount, // minskar lagerstatus i produkttabellen
    //             api_key: config.api_key,
    //         }
    //         productModel.updateProduct(changedProduct);
    //     }));

    //     let changedOrder = {
    //         id: order.id,
    //         name: order.name,
    //         status_id: 200, // markerar att den är packad
    //         api_key: config.api_key,
    //     };

    //     await this.updateOrder(changedOrder);

    // },

    // updateOrder: async function updateOrder(order: Partial<Order>) {

    //     await fetch(`${config.base_url}/orders`, {
    //         body: JSON.stringify(order),
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         method: 'PUT'
    //     });
    // }

};

export default parkModel;