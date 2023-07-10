import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import FILTER_UPDATED_CHANNEL from '@salesforce/messageChannel/Filter_Update__c';

export default class OMFilter extends LightningElement {

    //checkBox logic
    valueType = '';
    valueFamily = '';

    get optionsType() {
        return [
            { label: 'new', value: 'new' },
            { label: 'worn', value: 'worn' },
            { label: 'killed', value: 'killed' },
        ]
    }

    get optionsFamily() {
        return [
            { label: 'Electronics', value: 'Electronics' },
            { label: 'Cars', value: 'Cars' },
            { label: 'Furniture', value: 'Furniture' },
        ]
    }

    @wire(MessageContext)
    messageContext;

    handleType(event) {

        this.valueType = event.detail.value

        const payload = {

            Type: this.value
        }

        publish(this.messageContext, FILTER_UPDATED_CHANNEL, payload)
    }

    handleFamily(event) {

        this.valueFamily = event.detail.value

        const payload = {
            Family: this.valueFamily
        }

        publish(this.messageContext, FILTER_UPDATED_CHANNEL, payload)
    }
}