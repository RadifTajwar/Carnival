import React, {Fragment, useState} from 'react'
import './UserOptions.css'
import {SpeedDial, SpeedDialAction} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from "react-router-dom";
import {useAlert} from 'react-alert'
import {logout} from '../../../actions/userAction'
import {useDispatch, useSelector} from "react-redux";

const UserOptions = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [open, setOpen] = useState(false);

    const {cartItems} = useSelector((state) => state.cart)

    const options = [
        {icon: <ListAltIcon/>, name: "Orders", func: orders},
        {icon: <PersonIcon/>, name: "Profile", func: account},
        {
            icon: <ShoppingCartIcon style={{color: cartItems.length > 0 ? "green" : "unset"}}/>,
            name: `Cart(${cartItems.length})`,
            func: cart
        },
        {icon: <ExitToAppIcon/>, name: "Logout", func: logoutUser},
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon/>,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        navigate('/admin/dashboard')
    }

    function orders() {
        navigate('/orders')
    }

    function account() {
        navigate('/account')
    }

    function cart() {
        navigate('/cart')
    }

    function logoutUser() {
        dispatch(logout());
        navigate('/logout');
        alert.success('Logged Out Successfully')
    }


    return (
        <Fragment>
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                className='speedDial'
                icon={<img
                    className='speedDialIcon'
                    src={user.avatar.url}
                    alt='Profile'
                />}
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 768}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions;