
import { useState, useEffect, useContext } from 'react'
import './DeviceConnect.css'
import { useSearchParams, useLocation, useParams } from 'react-router-dom'
import api from '../../config/api';
import { Disk, Phone, MoreOne, Config, LoadingFour, Plus, Left, Pencil, CheckCorrect, CheckOne } from '@icon-park/react'
import { Device } from '../../models/Device';
import Context from '../../config/Context';

type QrcodeProps = {
    deviceId?: number;
    qrCode?: string;
}



function DeviceConnect() {

    const values = useContext(Context);
    const socket = values.socketActive;
    let listen: any = undefined;

    const [isConnected, setIsConnected] = useState(socket?.connected);
    let deviceShowing: Device = new Device();
    let deviceId: number;
    const [device, setDevice] = useState<Device>(new Device());
    const [devices, setDevices] = useState<Array<Device>>([]);
    const [searchParams] = useSearchParams();
    const [isNewDevice, setIsNewDevice] = useState(false);
    const [isEditDevice, setIsEditDevice] = useState(false);
    const [logs, setLogs] = useState<Array<string>>([]);
    const [qrcode, setQrcode] = useState('');
    const [deviceConnected, setDeviceConnected] = useState(false);


    const startNewDevice = () => {
        setDevice(new Device());
        setIsEditDevice(true);
    };

    const startUpdateDevice = (device: Device) => {
        setDevice(d => ({ ...d, ...device }))
        setIsEditDevice(true);
    }


    const listenAuth = async () => {
        console.log(device)
        if (!!device) {
            const { data } = await api.get('/devices/is-authenticated/' + device.id);
            const { qrcode_authentication, isAuthenticated } = data;
            if (!device.qrcode_authentication || device.qrcode_authentication != qrcode_authentication || device.isAuthenticated != isAuthenticated)
                setDevice(d => ({ ...d, qrcode_authentication, isAuthenticated }));

        }
    }

    const selectDevice = async (dvc: Device) => {
        clearInterval(listen);

        let deviceUpdated = new Device();
        await api.get('/devices/' + dvc.id).then(data => {
            deviceUpdated = { ...new Device(), ...data.data };
            setDevice(d => ({ ...d, ...deviceUpdated }))
        })




        // setDeviceConnected(devicUpdated.isAuthenticated);
        // setQrcode((qr) => qr = devicUpdated.qrCode)
        // deviceId = device.id;
        // if (!values.devicesActives || !values.devicesActives.some(d => d.id == device.id)) {
        //     if (!values.devicesActives)
        //         values.devicesActives = [];

        //     values.devicesActives.push({ id: device.id, name: device.alias })
        // }
        // startCLientWWApp();
    };




    const cancelEditDevice = () => {
        setIsEditDevice(false);
        setDevice(new Device());
    }









    // function onConnect() {
    //     setDeviceConnected(true);
    //     setLogs(log => ([...log, 'Connectado']))
    //     console.log('conectado')
    //     // startCLientWWApp();
    // }

    // function onDisconnect() {
    //     setIsConnected(false);
    //     console.log('Desconectado')
    // }


    // function onReceiveMenssage(msg: string) {
    //     console.log(msg);
    // }


    // function onReceiveQrCode(propsQrCode: QrcodeProps) {
    //     if (propsQrCode.deviceId == device.id && !!propsQrCode.qrCode) {
    //         setQrcode(propsQrCode.qrCode);
    //     }
    //     let d = values.devicesActives?.find(d => d.id == deviceId);
    //     d = { ...d, qrcode: propsQrCode.qrCode };
    // }


    // function startCLientWWApp() {
    //     socket?.emit('deviceId', deviceId)
    // }
    // function stopCLientWWApp() {
    //     socket?.emit('stopClient', deviceId)
    // }






    const saveDevice = async (event: any) => {
        event.preventDefault();
        const response = await api.post('/devices/save', device);
        setDevice(response.data)
        setIsNewDevice(false);
    }









    useEffect(() => {
        const getDevices = async () => {
            const response = await api.get('/devices/findall');
            setDevices(response.data);
        }
        getDevices();

        const listen = setInterval(() => {
            listenAuth()
        }, 1000)




        // socket?.on('deviceConnected', onConnect);
        // socket?.on('message', onReceiveMenssage);
        // socket?.on('qrcode', onReceiveQrCode);

        return () => {
            clearInterval(listen);
            console.log('FIM DA VIDA DO COMPONENTE')
            //     stopCLientWWApp();
            //     socket?.off('deviceConnected', onConnect);
            //     socket?.off('message', onReceiveMenssage);
            //     socket?.off('qrcode', onReceiveQrCode);

        };


    }, [device, isNewDevice])

    return (
        <>
            {isEditDevice && (
                <div className='container-form-new-device rows'>
                    <div className='container-cancel-edit' onClick={cancelEditDevice}>
                        <a><Left /></a>

                    </div>
                    <form onSubmit={saveDevice} className='rows center form-new-device'>
                        <h2>{device.id ? 'Atualizar' : 'Novo'} Dispositivo</h2>
                        <hr className='separator' />

                        <p>Numero do dispositivo</p>
                        <input type="text" value={device?.number} onChange={(e) => setDevice(dev => ({ ...dev, number: e.target.value }))}></input>
                        <hr className='separator' />
                        <p>Alias</p>
                        <input type="text" value={device?.alias} onChange={(e) => setDevice(dev => ({ ...dev, alias: e.target.value }))}></input>
                        <hr className='separator' />
                        <button className='btn btn-primary' type='submit'>{device.id ? 'Atualizar' : 'Salvar'} <Disk /></button>
                    </form>
                </div>
            ) || !isEditDevice &&
                (
                    <div className="container-terminal">
                        <h2 className='ifo-dispositivos'>Dispositivos cadastados:</h2>
                        <div className='columns'>
                            <ul className='col-devices'>
                                <li onClick={startNewDevice}><Plus className='more' /></li>
                                {
                                    !!devices && !!devices.length && devices.map(d => (
                                        <li key={d.id} className={`${d.id == device.id ? 'phone-selected' : ''}`} onClick={() => selectDevice(d)}>
                                            <Pencil onClick={() => startUpdateDevice(d)} className='edit' />
                                            <Phone className='phone' />
                                            <p>{d.number}</p>
                                            <p>{d.alias}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <br />
                        {/* <p className='info-select-veiculo'>Selecione ou cadastre algum dispositivo</p> */}
                        {!!device.id && !device.isAuthenticated && (
                            <>
                                <br />
                                <div className="columns container-qrcode">
                                    <div className="info">
                                        <p>1. Abra o Whatsapp no seu celular.</p>
                                        <p>2. Toque em <strong>Mais opções</strong> <MoreOne className='icon' /> ou <strong>Configurações</strong> <Config className='icon' />  e selecione <strong>Aparelhos conectados</strong>.
                                        </p>
                                        <p>3. Toque em <strong>Conectar um aparelho</strong>.</p>
                                        <p>4. Aponte seu celular para esta tela para capturar o QR code.</p>
                                    </div>

                                    <div className='col-qrcode'>
                                        {!!device.qrcode_authentication && (<img className="qrcode" src={device.qrcode_authentication} alt="qrcode" />)}
                                        {!device.qrcode_authentication && (
                                            <div className='spinner'>
                                                <LoadingFour className='spin' />
                                            </div>
                                        )}
                                    </div>


                                </div>

                            </>
                        )}
                        {!!device.isAuthenticated && (
                            <div className='conectado'>
                                <span>
                                    <CheckOne />
                                </span>
                                <p>
                                    Dispositivo Conectado
                                </p>
                            </div>
                        )}
                        <br />
                    </div>
                )
            }

        </>
    )
}


export default DeviceConnect;
