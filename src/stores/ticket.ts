import {makeObservable, observable} from "mobx";

class Ticket {
    @observable
    title: string = '';

    @observable
    coordinates: { lat: number; lng: number } = {lat: 0, lng: 0};

    @observable
    text: string = '';

    @observable
    addressName: string = ''

    constructor(data: any) {
        Object.assign(this, data);

        makeObservable(this);
    }
}

export default Ticket;