import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons'
import { useContext, useRef, useState } from 'react'
import './share.css'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);
    let postImageBase64;
    async function handleFiles(e) {
        if (e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/jpg' && e.target.files[0].type !== 'image/png') {
            alert('Фотография должна быть формата jpg,jpeg или png');
            return e.target.value = null;
        }
        return setFile(postImageBase64 = await Main(postImageBase64, e.target.files[0]));
    }

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    async function Main(sourceString, file) {
        return (sourceString = await toBase64(file));
    }

    const submitHandler = async e => {
        e.preventDefault();
        let newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (file) {
            newPost = {
                userId: user._id,
                postKey: user._id + Date.now(),
                desc: desc.current.value,
                img: file
            }
        }
        console.log(newPost)
        try {
            await axios.post('/posts', newPost);
            window.location.reload();
        } catch (err) {

        }
    }
    return (
        <div className='share'>
            <div className='shareWrapper'>
                <div className='shareTop'>
                    <img src={user.profilePicture || PF + "/person/noAvatar.png"} alt='' className='shareProfileImg'></img>
                    <input ref={desc} placeholder={`What's in your mind ${user.username} ?`} className='shareInput'></input>
                </div>
                <hr className='shareHr'></hr>
                <form className='shareBottom' onSubmit={submitHandler}>
                    <div className='shareOptions'>
                        <label htmlFor='file' className='shareOption'>
                            <PermMedia
                                htmlColor='#f5402c'
                                className='shareIcon'></PermMedia>
                            <span className='shareOptionText'>Media</span>
                            <input style={{ display: 'none' }} type='file' id='file' accept='.png,.jpg,.jpeg' onChange={handleFiles}></input>
                        </label>
                        <div className='shareOption'>
                            <Label
                                htmlColor='#193ae0'
                                className='shareIcon'></Label>
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className='shareOption'>
                            <Room
                                htmlColor='#209e09'
                                className='shareIcon'></Room>
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className='shareOption'>
                            <EmojiEmotions
                                htmlColor='#fcdb03'
                                className='shareIcon'></EmojiEmotions>
                            <span className='shareOptionText'>Emoji</span>
                        </div>
                    </div>
                    <button type='submit' className='shareButton'>Tweet</button>
                </form>
            </div>
        </div>
    )
}
