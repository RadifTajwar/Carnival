import React, {Fragment, useRef, useState, useEffect} from 'react'
import './LoginSignUp.css'
import Loader from '../layout/loader/Loader'
import {Link} from 'react-router-dom'
import {MailOutline} from "@mui/icons-material";
import {LockOpen} from "@mui/icons-material";
import {Face} from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux'
import {login, signupuser, clearErrors} from '../../actions/userAction'
import {useAlert} from "react-alert";
import {useNavigate} from "react-router-dom";
import MetaData from '../layout/header/MetaData'
import {useLocation} from "react-router-dom";

const LoginSignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, loading, isAuthenticated} = useSelector(state => state.user)

    const location = useLocation();
    const redirect = location.search ? '/' + (location.search.split("=")[1]).toString() : '/account'

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate(redirect)
        }


    }, [dispatch, error, alert, isAuthenticated, navigate, redirect])


    const loginTab = useRef(null);
    const signupTab = useRef(null);
    const switcherTab = useRef(null);


    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const {name, email, password} = user;

    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState('/profile.jpg')

    const loginSubmit = (e) => {
        e.preventDefault();


        dispatch(login(loginEmail, loginPassword))
    }

    const signupSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.set('avatar', avatar);
        dispatch(signupuser(myForm))
    }


    const signupDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({...user, [e.target.name]: e.target.value})
        }
    }


    const switchTabs = (e, tab) => {
        if (tab === 'login') {
            switcherTab.current.classList.add('shiftToNeutral');
            switcherTab.current.classList.remove('shiftToRight');

            // signupTab.current.classList.add('shiftToNeutral');
            signupTab.current.classList.remove('shiftToRightForm'); // Updated class name here
            loginTab.current.classList.remove('shiftToLeft');
        }

        if (tab === 'signup') {
            switcherTab.current.classList.add('shiftToRight');
            switcherTab.current.classList.remove('shiftToNeutral');

            signupTab.current.classList.remove('shiftToNeutral');
            signupTab.current.classList.add('shiftToRightForm'); // Updated class name here
            loginTab.current.classList.add('shiftToLeft');
        }
    };


    return (
        <Fragment>
            <MetaData title='Credentials'/>
            {loading ? (
                <Loader/>
            ) : (
                <Fragment>
                    <div className='LoginSignUpContainer'>
                        <div className='LoginSignUpBox'>
                            <div>
                                <div className='login_signup_toggle'>
                                    <p onClick={(e) => switchTabs(e, 'login')}>Login</p>
                                    <p onClick={(e) => switchTabs(e, 'signup')}>Sign Up</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                                <div className='loginEmail'>
                                    <MailOutline/>
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        required={true}
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className='loginPassword'>
                                    <LockOpen/>
                                    <input
                                        type='password'
                                        placeholder='Password'
                                        required={true}
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to='/password/forgot'> Forgot Password</Link>
                                <input type='submit' value='Login' className='loginBtn'/>
                            </form>

                            <form className='signUpForm' ref={signupTab} encType='multipart/form-data'
                                  onSubmit={signupSubmit}>
                                <div className='signUpName'>
                                    <Face/>
                                    <input
                                        type='text'
                                        placeholder='Name'
                                        required={true}
                                        name='name'
                                        value={name}
                                        onChange={signupDataChange}
                                    />
                                </div>
                                <div className='signupEmail'>
                                    <MailOutline/>
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        required={true}
                                        name='email'
                                        value={email}
                                        onChange={signupDataChange}
                                    />
                                </div>
                                <div className='signinPassword'>
                                    <LockOpen/>
                                    <input
                                        type='password'
                                        placeholder='Password'
                                        required={true}
                                        name='password'
                                        value={password}
                                        onChange={signupDataChange}
                                    />
                                </div>

                                <div id='signupImage'>
                                    <img src={avatarPreview} alt='Avatar Preview'/>
                                    <input
                                        type='file'
                                        name='avatar'
                                        accept='image/*'
                                        onChange={signupDataChange}
                                    />
                                </div>
                                <input
                                    type='submit'
                                    value='Sign Up'
                                    className='signUpBtn'
                                />
                            </form>


                        </div>

                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default LoginSignUp;