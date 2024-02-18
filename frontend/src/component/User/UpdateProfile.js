import React, {Fragment, useState, useEffect} from 'react'
import './UpdateProfile.css'
import Loader from '../layout/loader/Loader'
import {MailOutline} from "@mui/icons-material";
import {Face} from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux'
import {updateProfile, clearErrors, loadUser} from '../../actions/userAction'
import {useAlert} from "react-alert";
import {useNavigate} from "react-router-dom";
import MetaData from '../layout/header/MetaData'
import {UPDATE_PROFILE_RESET} from "../../constants/userConstants";


const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const {user} = useSelector(state => state.user)
    const {error, isUpdated, loading} = useSelector(state => state.profile)


    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState('/profile.jpg')


    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }


        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully!")
            dispatch(loadUser())
            navigate('/account')
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }


    }, [dispatch, error, alert, isUpdated, navigate, user])


    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('avatar', avatar);
        dispatch(updateProfile(myForm))
    }


    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0]);

    }


    return (
        <Fragment>
            {loading ? (
                <Loader/>
            ) : (
                <Fragment>
                    <MetaData title='Update Your Profile'/>
                    <div className='updateProfileContainer'>
                        <div className='updateProfileBox'>
                            <h2 className='updateProfileHeading'>Update Your Profile</h2>
                            <form className='updateProfileForm' encType='multipart/form-data'
                                  onSubmit={updateProfileSubmit}>
                                <div className='updateProfileName'>
                                    <Face/>
                                    <input
                                        type='text'
                                        placeholder='Name'
                                        required={true}
                                        name='name'
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                    />
                                </div>
                                <div className='updateProfileEmail'>
                                    <MailOutline/>
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        required={true}
                                        name='email'
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>

                                <div id='signupImage'>
                                    <img src={avatarPreview} alt='Avatar Preview'/>
                                    <input
                                        type='file'
                                        name='avatar'
                                        accept='image/*'
                                        onChange={updateProfileDataChange}
                                    />
                                </div>

                                <input
                                    type='submit'
                                    value='Update Profile'
                                    className='updateProfileBtn'
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )

}

export {UpdateProfile}