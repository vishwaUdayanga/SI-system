import '../../styles/announcement.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function AnnouncementContent() {
    const [userType, setUserType] = useState('')
    const notificationContainer = document.querySelector('.notification-container')

    async function sendEmail(element) {
        const paragraph = document.getElementById(element).innerText
        const response = await fetch(process.env.REACT_APP_PATH + '/api/send-announcement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'announcement-id': element
            },
            body: JSON.stringify({
                paragraph
            })
        })
        const data = await response.json()
        if (data.status === "error") {
            const notification = document.createElement('div')
            notification.classList.add('notification')
            notification.innerHTML = 'This announcement has been already sent.'
            notificationContainer.appendChild(notification)
            setTimeout(() => {
                notification.remove()
            }, 7000)
        } else {
            const notification = document.createElement('div')
            notification.classList.add('notification')
            notification.innerHTML = 'Announcement Sent Successfully!'
            notificationContainer.appendChild(notification)
            setTimeout(() => {
                notification.remove()
            }, 7000)
        }
    }

    async function sendWhatsapp(element) {
        const paragraphWhatsapp = document.getElementById(element).innerText
        const response = await fetch(process.env.REACT_APP_PATH + '/api/send-announcement-whatsapp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'announcement-id': element
            }
        })
        const data = await response.json()
        if (data.status === "error") {
            const notification = document.createElement('div')
            notification.classList.add('notification')
            notification.innerHTML = 'This announcement has been already sent.'
            notificationContainer.appendChild(notification)
            setTimeout(() => {
                notification.remove()
            }, 7000)
        } else {
            window.location.href = `https://api.whatsapp.com/send/?phone=F0Fk7Tnk8ba5SMLDLrYm0J&text=${paragraphWhatsapp}&type=phone_number&app_absent=0`
        }
    }

    useEffect(() => {
        setUserType(sessionStorage.getItem("userType"))
    }, [])

    return(
        <div className='announcement-container'>
            <div className='announcement-content'>
                <div className='announcement-card' id='announcement1-card'>
                    <p id="announcement1">
                        NOTICE - Academic Announcement and Sharing Information <br />
                        FROM - <Link to='#' onClick={(e) => {window.location.href = 'https://si-system.onrender.com'; e.preventDefault();}}>https://si-system.onrender.com</Link> <br /><br />
                        Hi there, <br /><br />
                        From this point forward, you will receive announcements about academic matters via email, this group from the built site, and it will also be listed in the announcement tab. Visit the aforementioned website to register if you haven't already. <br /><br />

                        Thank you!
                    </p>
                    {
                        userType === "Admin" &&
                        <div className='button-container'>
                            <button onClick={() => sendEmail("announcement1")} className='announcement-send-button'>Email</button>
                            <button onClick={() => sendWhatsapp("announcement1")} className='announcement-send-button'>Whatsapp</button>
                        </div> 
                    }
                </div>
            </div>
        </div>
    )
}

export default AnnouncementContent