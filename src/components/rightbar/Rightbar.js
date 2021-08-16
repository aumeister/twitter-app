import Online from '../online/Online'
import './rightbar.css'

export default function Rightbar({ user }) {

    const HomeRightbar = () => {
        return (
            <>
                <div className='birthdayContainer'>
                    <img className='birthdayImg' src='https://icons-for-free.com/iconfiles/png/512/present+icon-1320184287234188353.png' alt=''></img>
                    <span className='birthdayText'>
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
                    </span>
                </div>
                <img className='rightbarAd' src='https://i.pinimg.com/originals/bf/5f/a1/bf5fa1e612d2c8c9b5861aba6d1e1748.jpg' alt=''></img>
                <h4 className='rightbarTitle'>Online friends</h4>
                <ul className='rightbarFriendList'>
                    <Online></Online>
                </ul>
            </>
        )
    }
    const ProfileRightbar = () => {
        return (
            <>
                <h4 className='rightbarTitle'>User information title</h4>
                <div className='rightbarInfo'>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>City: </span>
                        <span className='rightbarInfoValie'>{user.city}</span>
                    </div>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>From: </span>
                        <span className='rightbarInfoValie'>{user.from}</span>
                    </div>
                </div>
                <h4 className='rightbarTitle'>User followings   </h4>
                <div className='rightbarFollowings'>
                    <div className='rightbarFollowing'>
                        <img src="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className='rightbarFollowingImg' alt=''></img>
                        <span className='rightbarFollwingName'>Jane Doe</span>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className='rightbar'>
            <div className='rightbarWrapper'>
                {user ? <ProfileRightbar></ProfileRightbar> : <HomeRightbar></HomeRightbar>}
            </div>
        </div>
    )
}
