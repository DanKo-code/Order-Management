import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi'
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_NUMBER_FIELD from '@salesforce/schema/Account.AccountNumber';
import USER_ID from '@salesforce/user/Id';

import { publish, MessageContext } from 'lightning/messageService';
import CURT_SHOW_CHANNEL from '@salesforce/messageChannel/Curt_Show__c';
import CREATE_SHOW_CHANNEL from '@salesforce/messageChannel/Create_Show__c';

const FIELDS = [ACCOUNT_NAME_FIELD, ACCOUNT_NUMBER_FIELD];

export default class OMHeader extends LightningElement {
    accountName;
    accountNumber;

    @wire(getRecord, { recordId: USER_ID, fields: FIELDS })
    wiredAccount({ error, data }) {
        if (data) {
            this.accountName = getFieldValue(data, ACCOUNT_NAME_FIELD);
            this.accountNumber = getFieldValue(data, ACCOUNT_NUMBER_FIELD);
        } else if (error) {
            console.error(error);
            this.accountName = "error"
            this.accountNumber = "error"

            this.accountNumber = USER_ID
        }
    }

    //redux

    @wire(MessageContext)
    messageContext;

    // @wire(MessageContext)
    // messageContext2;

    handleCart() {
        const payload = {
            Type: 'show'
        }

        publish(this.messageContext, CURT_SHOW_CHANNEL, payload)
    }

    handleCreate() {
        debugger
        const payload = {
            Type: 'show'
        }

        publish(this.messageContext, CREATE_SHOW_CHANNEL, payload)
    }
}