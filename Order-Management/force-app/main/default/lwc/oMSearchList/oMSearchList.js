import { LightningElement } from 'lwc';

export default class OMSearchList extends LightningElement {

    inputText = "";

    handleInputChange(event) {
        inputText = event.target.value.toLowerCase();

    }
}