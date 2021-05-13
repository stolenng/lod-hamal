import {action, makeObservable, observable, runInAction, toJS} from "mobx";
import Ticket from "./ticket";
import axios from "axios";

const id = 'bb809060-1f7d-4408-b850-7d7348a847f6'
const api = 'https://jsonstorage.net/api/items';

class RootStore {
    @observable
    isModalOpen: boolean = false;

    @observable
    currentTicket: Ticket | null = null;

    @observable
    tickets: Ticket[] = [];

    @observable
    currentLocation: {
        lat: number,
        lng: number
    } = {
        lat: 0,
        lng: 0
    }

    constructor() {
        makeObservable(this);


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((p) => {
                runInAction(() => {
                    this.currentLocation.lat = p.coords.latitude;
                    this.currentLocation.lng = p.coords.longitude;
                });
            })
        }
    }

    async fetch() {
        const result = await axios.get(`${api}/${id}`);

        runInAction(() => {
           result.data.tickets.forEach((ticket: any) => {
               this.tickets.push(new Ticket(ticket));
           })
        });
    }


    async update() {
        await axios.put(`${api}/${id}`, {tickets: toJS(this.tickets)});
    }

    @action
    addTicket(ticket: Ticket) {
        this.tickets.push(ticket);
    }

    @action
    setCurrent(ticket: Ticket | null) {
        this.currentTicket = ticket;
    }

    @action
    setModal(flag: boolean) {
        this.isModalOpen = flag;
    }
}

export default RootStore;