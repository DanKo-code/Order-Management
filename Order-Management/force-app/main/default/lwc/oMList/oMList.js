import { LightningElement, track, api } from 'lwc';

export default class OMList extends LightningElement {

    products = [
        {
            "id": "1",
            'productName': 'Car'
        },
        {
            "id": "2",
            'productName': 'Dog'
        },
        {
            "id": "3",
            'productName': 'Nikita'
        },
        {
            "id": "4",
            'productName': 'TV'
        },
        {
            "id": "4",
            'productName': 'Door'
        },
    ];

    @api inputText = '';

    get filteredItems() {
        return this.products.filter(product => product.productName.includes(this.inputText));
    }


}