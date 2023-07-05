import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import FILTER_UPDATED_CHANNEL from '@salesforce/messageChannel/Filter_Update__c';

export default class OMFilter extends LightningElement {

    @wire(MessageContext)
    messageContext;

    handleType(event) {
        const payload = {

            Type: event.target.textContent
        }

        publish(this.messageContext, FILTER_UPDATED_CHANNEL, payload)
    }

    handleFamily(event) {
        const payload = {
            Family: event.target.textContent
        }

        publish(this.messageContext, FILTER_UPDATED_CHANNEL, payload)
    }
}