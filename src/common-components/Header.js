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
    const [studentType, setStudentType] = useState('')
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
            setStudentType(data.user)
            sessionStorage.setItem("userType", data.user)
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

    const theme = localStorage.getItem("theme")

    useEffect(() => {
        const menuButtonContainer = document.querySelector('.menu-button-container')
        const menuList = document.querySelector('.menu-list')
        menuButtonContainer.addEventListener('click', () => {
            menuList.classList.toggle('active')
        })

        const themeButton = document.querySelector('.theme')
        const palette = document.querySelector(':root')
        themeButton.addEventListener('click', () => {
            if (themeButton.className.includes('dark')){
                themeButton.classList.remove('dark')
                localStorage.removeItem('theme')
                palette.style.setProperty('--background-hue', '#c7d5e0');
                palette.style.setProperty('--text-hue', '#333646');
                palette.style.setProperty('--white', '#d9e7f1');
                palette.style.setProperty('--black', '#2a2c39');
                palette.style.setProperty('--shadow', 'rgba(71, 157, 255, 0.5)');
            } else {
                themeButton.classList.add('dark')
                localStorage.setItem('theme', 'dark')
                palette.style.setProperty('--background-hue', '#333646');
                palette.style.setProperty('--text-hue', '#c7d5e0');
                palette.style.setProperty('--white', '#2a2c39');
                palette.style.setProperty('--black', '#d9e7f1');
                palette.style.setProperty('--shadow', 'rgba(68, 77, 87, 0.5)');
            }
        })

        if (theme) {
            themeButton.classList.add('dark')
            palette.style.setProperty('--background-hue', '#333646');
            palette.style.setProperty('--text-hue', '#c7d5e0');
            palette.style.setProperty('--white', '#2a2c39');
            palette.style.setProperty('--black', '#d9e7f1');
            palette.style.setProperty('--shadow', 'rgba(68, 77, 87, 0.5)');
        } else {
            themeButton.classList.remove('dark')
            palette.style.setProperty('--background-hue', '#c7d5e0');
            palette.style.setProperty('--text-hue', '#333646');
            palette.style.setProperty('--white', '#d9e7f1');
            palette.style.setProperty('--black', '#2a2c39');
            palette.style.setProperty('--shadow', 'rgba(71, 157, 255, 0.5)');
        }

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
    }, [isSetProfileImg, postProfileImage, theme])

    return(
        <header>
            <div className='notification-container'></div>
            <nav>
                <div className="top-nav-bar">
                    <div className="nav-topic">
                        <h1>SI System</h1>
                    </div>
                    <div className="nav-student-details">
                        <p className='student-name'>{studentName} ({studentType})</p>
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
                    <div className='theme'></div>
                </div>
                <div className='menu-list'>
                    <ul>
                        <li>
                            <Link to = "/student-courses" className="menu-links">Courses</Link>
                        </li>
                        <li>
                            <Link to="/announcement" className="menu-links">Announcement</Link>
                        </li>
                        <li>
                            <Link to="/birthdays" className="menu-links">Birthdays</Link>
                        </li>
                        <li>
                            <Link to="/learning-documents" className="menu-links">Learning Documents</Link>
                        </li>
                        <li>
                            <Link to="/settings" className="menu-links">Settings</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header
