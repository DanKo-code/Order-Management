import { LightningElement, api, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import CURT_SHOW_CHANNEL from '@salesforce/messageChannel/Curt_Show__c';
import ADD_TO_CART_CHANNEL from '@salesforce/messageChannel/Add_To_Cart__c';

const columns = [
    { label: 'Product Name', fieldName: 'productName' },
    { label: 'Description', fieldName: 'Description' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'Family', fieldName: 'Family' },
    { label: 'Price', fieldName: 'price', type: 'currency' },
    { label: 'Img', fieldName: 'img', type: 'customImage' },
];

export default class ModalCart extends LightningElement {
    showModal = false;
    @api show() {
        this.showModal = true;
    }
    handleDialogClose() {
        this.showModal = false;
    }


    //redux
    subscription = null;
    subscription2 = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            CURT_SHOW_CHANNEL,
            (message) => this.handleMessage(message)
        );

        this.subscription2 = subscribe(
            this.messageContext,
            ADD_TO_CART_CHANNEL,
            (message) => this.handleMessage2(message)
        );
    }

    handleMessage(message) {

        if (message.Type === 'show')
            this.show()

    }

    handleMessage2(message) {

        //alert(JSON.stringify(message.add))

        this.products.push(message.add)

    }


    //dataTable
    columns = columns;
    @api products = []
}