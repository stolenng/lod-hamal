import {Col, Input, Modal, Row, Space, Typography} from "antd";
import {FunctionComponent, useEffect, useState} from "react";
import Ticket from "../stores/ticket";
import {useStore} from "../helpers/use-store";
import {observer} from "mobx-react-lite";


const {TextArea} = Input;

interface Props {
    isOpen: boolean;
    onOk: (folder: Ticket) => void;
    onCancel: () => void;
}

const AddTicketModal: FunctionComponent<Props> = ({isOpen, onOk, onCancel}) => {
    const rootStore = useStore();
    const [data, setData] = useState({
        title: '',
        text: '',
        addressName: '',
        coordinates: {
            lat: 0,
            lng: 0
        }
    });

    useEffect(() => {
        if (isOpen && rootStore.currentTicket === null) {
            setData({
                title: '',
                text: '',
                addressName: '',
                coordinates: {
                    lat: rootStore.currentLocation.lat,
                    lng: rootStore.currentLocation.lng
                }
            })
        }
    }, [isOpen, rootStore.currentTicket])

    return (
        <Modal
            maskClosable={false}
            okText={'שמור'}
            cancelText={'בטל'}
            title={rootStore.currentTicket ? rootStore.currentTicket.title : 'הוסף ארוע'}
            {...rootStore.currentTicket &&{footer: null}}
            onCancel={
                () => {
                    rootStore.setCurrent(null);
                    setData({
                        title: '',
                        text: '',
                        addressName: '',
                        coordinates: {
                            lat: 0,
                            lng: 0
                        }
                    })
                    onCancel();
                }
            }
            onOk={async () => {
                const newTicket = new Ticket(data);
                await onOk(newTicket);
            }} visible={isOpen}>
            {
                rootStore.currentTicket === null ? (
                        <Row>
                            <Space direction={'vertical'} style={{width: '100%'}}>
                                <Col span={24}>
                                    <div>כותרת</div>
                                    <Input value={data.title} onChange={e => setData({...data, title: e.target.value})} type={'text'} max={50}/>
                                </Col>
                                <Col span={24}>
                                    <div>תיאור</div>
                                    <TextArea value={data.text} onChange={e => setData({...data, text: e.target.value})} maxLength={500}/>
                                </Col>
                            </Space>
                        </Row>
                    ) :
                    (
                        <Row>
                            <Space direction={'vertical'} style={{width: '100%'}}>
                                <Col span={24}>
                                    <Typography.Text underline>תיאור</Typography.Text>
                                    <div>{rootStore.currentTicket.text}</div>
                                </Col>
                            </Space>
                        </Row>
                    )
            }
        </Modal>
    )
};

export default observer(AddTicketModal);