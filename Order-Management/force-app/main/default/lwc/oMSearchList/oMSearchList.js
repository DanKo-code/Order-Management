import { LightningElement, track } from 'lwc';

export default class OMSearchList extends LightningElement {

    @track inputText = '';

    handleInputChange(event) {
        this.inputText = event.target.value;
    }
}