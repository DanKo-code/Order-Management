import { LightningElement, api, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import FILTER_UPDATED_CHANNEL from '@salesforce/messageChannel/Filter_Update__c';

export default class OMList extends LightningElement {

    //TEMP DB
    products = [
        {
            "id": "1",
            'productName': 'Car',
            'Description': `1 ipsum dolor sit amet consectetur adipisicing elit.Voluptatibus repudiandae, praesentium nostrum alias
            dignissimos cum aliquid.Delectus molestiae adipisci aliquam, repellat voluptas nulla assumenda odio nobis
            niolore et saepe, magnam perspiciatis ut incidunt est.`,
            Type: 'firstType',
            Family: 'firstFamily',
            img: 'https://s3-us-west-1.amazonaws.com/sfdc-demo/ebikes/dynamox1.jpg',
        },
        {
            "id": "2",
            'productName': 'Dog',
            'Description': `Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptatibus repudiandae, praesentium nostrum alias
            dignissimos cum aliquid.Delectus molestiae adipisci aliquam, repellat voluptas nulla assumenda odio nobis
            niolore et saepe, magnam perspiciatis ut incidunt est.`,
            Type: 'firstType',
            Family: 'firstFamily',
        },
        {
            "id": "3",
            'productName': 'Nikita',
            'Description': `Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptatibus repudiandae, praesentium nostrum alias
            dignissimos cum aliquid.Delectus molestiae adipisci aliquam, repellat voluptas nulla assumenda odio nobis
            niolore et saepe, magnam perspiciatis ut incidunt est.`,
            Type: 'secondType',
            Family: 'secondFamily',
        },
        {
            "id": "4",
            'productName': 'TV',
            'Description': `Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptatibus repudiandae, praesentium nostrum alias
            dignissimos cum aliquid.Delectus molestiae adipisci aliquam, repellat voluptas nulla assumenda odio nobis
            niolore et saepe, magnam perspiciatis ut incidunt est.`,
            Type: 'secondType',
            Family: 'secondFamily',
        },
        {
            "id": "4",
            'productName': 'Door',
            'Description': `Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptatibus repudiandae, praesentium nostrum alias
            dignissimos cum aliquid.Delectus molestiae adipisci aliquam, repellat voluptas nulla assumenda odio nobis
            niolore et saepe, magnam perspiciatis ut incidunt est.`,
            Type: 'thirdType',
            Family: 'thirdFamily',
        }
    ];

    //"REDUX"
    type = '';
    family = '';
    subscription = null;

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
    }

    handleMessage(message) {

        if (message.Type != null)
            this.type = message.Type
        else if (message.Family != null)
            this.family = message.Family
    }

    @api inputText = '';
    get filteredItems() {
        return this.products.filter(product => product.productName.toLowerCase().includes(this.inputText.toLowerCase()) ||
            product.Description.toLowerCase().includes(this.inputText.toLowerCase())).filter(product => product.Type.includes(this.type) && product.Family.includes(this.family));
    }


    // Modal hendler
    handleDetailsClick(event) {
        const modalDetails = this.template.querySelector('c-modal-details');
        if (modalDetails) {
            debugger
            modalDetails.product = event.detail;
            modalDetails.show();
        }
    }
}