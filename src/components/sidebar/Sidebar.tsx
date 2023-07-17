import './Sidebar.css'
import { useState, useEffect } from 'react';
import { Close, Down, Up } from '@icon-park/react';
import axios from 'axios';
import api from '../../config/api';
import { Link } from 'react-router-dom';
import Home from '../home/Home';
import { Device } from '../../models/Device';

type Button = {
    type: string,
    hide: boolean,
    description: string;
}








function Sidebar() {

    const [toggle, setToggle] = useState(true);
    // const [buttons, setButtons] = useState<Array<Button>>([{ type: 'dispositivos', description: 'Dispositivos', hide: true },
    // ])

    const [buttonDispositivos, setButtonDispositivos] = useState<Button>({ type: 'dispositivos', description: 'Dispositivos', hide: true });
    const [devices, setDevices] = useState<Array<Device>>([]);


    const changeToggle = () => {
        setToggle(!toggle);
    }


    const changeToggleBtnDispositivos = () => {
        setButtonDispositivos(btn => ({ ...btn, hide: !btn.hide }))
    };



    useEffect(() => {

    }, [])




    return (
        <aside className="sidebar">
            <a className="btn-expand" onClick={changeToggle}>
                <img src={process.env.PUBLIC_URL + '/logo512.png'} />
            </a>
            <div className={`container-menu ${!toggle ? 'show-menu' : 'hide-menu'}`}>
                <Close className='btn-close' onClick={changeToggle} />
                <img src={process.env.PUBLIC_URL + '/logo512.png'} />
                <p>Chat Bot | Bel</p>
                <br />
                <div className='links'>

                    {/* <Route path="/about" component={About} />
                            <Route path="/contact" component={Contact} /> */}



                    <div className='link'><Link onClick={changeToggle} to="/"><p>Home</p></Link></div>
                    <div className='link'><Link onClick={changeToggle} to="/device"><p>Dispositivos</p></Link></div>

                    {/* <div className="acordion">
                        <a onClick={changeToggleBtnDispositivos} > {buttonDispositivos.description}
                            {buttonDispositivos.hide ? (<Down />) : (<Up />)}{buttonDispositivos.hide}
                        </a>
                        <div className={`${buttonDispositivos.hide ? 'hide-acordion' : 'show-acordion'}`}>
                            <ul>
                                {devices.length > 0 && devices.map(d => (
                                    <li className="link" key={d.id}>
                                        <Link to={{
                                            pathname: '/device/' + d.id, search: `deviceId=${d.id}`
                                        }} target='_blank'>
                                            <p>{d.alias}</p>
                                        </Link>
                                    </li>
                                ))}
                                <li className='link' key={0}><Link to={{
                                    pathname: '/device', search: "deviceId=new"
                                }} reloadDocument={true}><p>Cadastrar Novo</p></Link></li>

                            </ul>
                        </div>
                    </div> */}


                </div>
            </div>
        </aside >

    )
}


export default Sidebar;