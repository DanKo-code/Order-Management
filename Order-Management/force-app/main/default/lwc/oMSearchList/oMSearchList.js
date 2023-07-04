import { LightningElement, track } from 'lwc';

export default class OMSearchList extends LightningElement {

    inputText;

    handleInputChange(event) {
        this.inputText = event.target.value.toLowerCase();
    }
}