import React, {useState} from 'react';
import './App.css';
import Map from "./components/map";
import {PlusCircleFilled} from '@ant-design/icons';
import AddTicketModal from "./components/add-ticket-modal";
import {useStore} from "./helpers/use-store";
import {observer} from "mobx-react-lite";

function App() {
    const rootStore = useStore();

    return (
        <div className="App">
            <Map/>
            <PlusCircleFilled onClick={() => rootStore.setModal(true)} className='add-ticket'/>
            <AddTicketModal
                onOk={async (ticket) => {
                    rootStore.addTicket(ticket);
                    rootStore.setModal(false);
                    await rootStore.update();
                }}
                isOpen={rootStore.isModalOpen}
                onCancel={() => rootStore.setModal(false)}
            />
        </div>
    );
}

export default observer(App);
