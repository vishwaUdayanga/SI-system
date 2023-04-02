import '../styles/header.css'
import SampleStudentImage from '../images/sample-avatar/user.png'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'

function Header() {
    const [postProfileImage, setPostProfileImage] = useState({ myImage : "" })
    const [isSetProfileImg, setIsSetProfileImg] = useState(false)
    const [fetchedProfileImage, setFetchedProfileImage] = useState('')
    const [studentName, setStudentName] = useState('')
    const notificationContainer = document.querySelector('.notification-container')

    async function handleProfilePic(event) {
        const file = event.target.files[0]
        const fileSizeInKb = file.size/1024
        const MAX_FILE_SIZE = 2048
        if (fileSizeInKb > MAX_FILE_SIZE) {
            const notification = document.createElement('div')
            notification.classList.add('notification')
            notification.innerHTML = 'File is too large'
            notificationContainer.appendChild(notification)
            setTimeout(() => {
                notification.remove()
            }, 7000)
            return
        }
        const base64 = await convertToBase64(file)
        setPostProfileImage({ myImage: base64 })
        setIsSetProfileImg(true)
    }

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    async function authenticateStudent() {
        const req = await fetch(process.env.REACT_APP_PATH +'/api/student/get-verified', {
            headers: {
                'x-access-token': sessionStorage.getItem('student')
            }
        })
        const data = await req.json()
        if (data.status === 'ok') {
            setFetchedProfileImage(data.profilePicture)
            setStudentName(data.name)
        }

        if (data.status === 'error') {
            window.location.href = "/"
        }
    }

    async function createPostProfilePic(newProfileImg) {
        try {
            const studentToken = {payload: newProfileImg.myImage }
            const req = await fetch(process.env.REACT_APP_PATH +'/api/student/upload-profile-pic', {
                method: 'POST',
                headers: {
                    'x-access-token': sessionStorage.getItem('student'),
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(studentToken)
            })

            const data = await req.json()
            if (data.status === 'ok') {
                setFetchedProfileImage(studentToken.payload)
                setIsSetProfileImg(false)
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        const menuButtonContainer = document.querySelector('.menu-button-container')
        const menuList = document.querySelector('.menu-list')
        menuButtonContainer.addEventListener('click', () => {
            menuList.classList.toggle('active')
        })

        const studentToken = sessionStorage.getItem('student')
        if(studentToken) {
            const student = jwtDecode(studentToken)
            if (!student) {
                sessionStorage.removeItem('student')
                window.location.href = "/"
            } else {
                authenticateStudent()
            }
        } else {
            window.location.href = "/"
        }

        if(isSetProfileImg) {
            createPostProfilePic(postProfileImage)
        }
    }, [isSetProfileImg, postProfileImage])

    return(
        <header>
            <div className='notification-container'></div>
            <nav>
                <div className="top-nav-bar">
                    <div className="nav-topic">
                        <h1>SI System</h1>
                    </div>
                    <div className="nav-student-details">
                        <p className='student-name'>{studentName}</p>
                        <div className='student-image'>
                            <label htmlFor='my-pic'>
                                <img src={fetchedProfileImage || SampleStudentImage} alt="" />
                            </label>
                            <input
                                type="file"
                                name="profile-image"
                                id="my-pic"
                                accept=".jpeg, .png, .jpg"
                                onChange={handleProfilePic}
                            />
                        </div>
                    </div>
                </div>
                <div className='menu-bar'>
                    <div className='menu-button-container'>
                        <h4>MENU</h4>
                        <div className='three-bars'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className='menu-list'>
                    <ul>
                        <li>
                            <Link className="menu-links">Courses</Link>
                        </li>
                        <li>
                            <Link className="menu-links">Announcement</Link>
                        </li>
                        <li>
                            <Link className="menu-links">Birth days</Link>
                        </li>
                        <li>
                            <Link className="menu-links">Events</Link>
                        </li>
                        <li>
                            <Link className="menu-links">Participants</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header