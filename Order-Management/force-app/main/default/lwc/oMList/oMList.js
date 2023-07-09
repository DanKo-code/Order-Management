import { LightningElement, api, track, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import FILTER_UPDATED_CHANNEL from '@salesforce/messageChannel/Filter_Update__c';
import SEND_PRODUCT_CHANNEL from '@salesforce/messageChannel/Send_product__c';

import getProductList from '@salesforce/apex/ProductController.getProductList'


export default class OMList extends LightningElement {

    @track products = []
    @track errors

    //Bad method???
    @wire(getProductList)
    wiredPlayerList({ data, error }) {
        if (data) {
            this.products = data;
        }
        else if (error) {
            this.errors = error;
            alert(error)
        }
    }
    //Bad method???



    //"REDUX"
    type = '';
    family = '';
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
            FILTER_UPDATED_CHANNEL,
            (message) => this.handleMessage(message)
        );

        this.subscription2 = subscribe(
            this.messageContext,
            SEND_PRODUCT_CHANNEL,
            (message) => this.handleMessage2(message)
        );
    }

    handleMessage(message) {

        if (message.Type != null)
            this.type = message.Type
        else if (message.Family != null)
            this.family = message.Family
    }

    async handleMessage2(message) {
        alert(JSON.stringify(message.add))
        this.products = [...this.products, message.add];
    }

    @api inputText = '';
    get filteredItems() {
        return this.products.filter(product => product.Name.toLowerCase().includes(this.inputText.toLowerCase()) ||
            product.Description__c.toLowerCase().includes(this.inputText.toLowerCase())).filter(product => product.Type__c.includes(this.type) && product.Family__c.includes(this.family));
    }


    // Modal hendler
    handleDetailsClick(event) {
        const modalDetails = this.template.querySelector('c-modal-details');
        if (modalDetails) {
            modalDetails.product = event.detail;
            modalDetails.show();
        }
    }
}