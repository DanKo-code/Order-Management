import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

import { publish, MessageContext } from 'lightning/messageService';
import ADD_TO_CART_CHANNEL from '@salesforce/messageChannel/Add_To_Cart__c';

export default class OMItem extends LightningElement {
    @api product;

    handleDetails() {
        const event = new CustomEvent('detailsclick', {
            detail: this.product,
            bubbles: true
        });

        this.dispatchEvent(event);
    }

    //redux

    @wire(MessageContext)
    messageContext;

    handleCartAdd() {

        const payload = {
            add: this.product
        }


        publish(this.messageContext, ADD_TO_CART_CHANNEL, payload)

        this.showToast();
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Alert!',
            message: 'Product added to cart',
            variant: 'success'
        });
        this.dispatchEvent(event);
    }
}