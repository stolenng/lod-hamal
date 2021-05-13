import ReactMapboxGl, {Feature, Marker, Popup} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useEffect} from "react";
import {useStore} from "../helpers/use-store";
import {observer} from "mobx-react-lite";
import {AlertFilled} from '@ant-design/icons';
import {runInAction} from "mobx";

const MapBox = ReactMapboxGl({
    accessToken:
        'pk.eyJ1Ijoic3RvbGVubmciLCJhIjoiY2tvbjV6c3BqMGF2MTJ3azczbmhvMmFhdyJ9.MF70MofoeKHzXV35nwYivQ'
});

// in render()
//31.951868, 34.890408
//    style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
const Map = () => {
    const rootStore = useStore();

    return (
        <MapBox
            center={[34.88433243329109, 31.942449253421216]}
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: '100vh',
                width: '100vw'
            }}
            zoom={[15]}
            fitBounds={[
                [34.896954, 31.975458],
                [34.890157, 31.931560,]
            ]}
            onClick={
                (_, e) => {
                    runInAction(() => {
                    //@ts-ignore
                        rootStore.currentLocation.lat = e.lngLat.lat;
                    //@ts-ignore
                        rootStore.currentLocation.lng = e.lngLat.lng;
                    })
                    rootStore.setModal(true);
                }
            }
        >
                {
                    rootStore.tickets.map((ticket, index) => {
                        return (
                            <Popup
                                onClick={() =>{
                                    rootStore.setCurrent(ticket);
                                    rootStore.setModal(true);
                                }}
                                key={index}
                                coordinates={[ticket.coordinates.lng, ticket.coordinates.lat]}
                            >
                                <span className='title'>{ticket.title}</span>
                                <img  src=" https://img.icons8.com/color/48/000000/marker.png" />
                            </Popup>
                        )
                    })
                }
        </MapBox>
    )
};

export default observer(Map);