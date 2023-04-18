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
                <div className='announcement-card' id='announcement4-card'>
                    <p id="announcement4">
                        NOTICE - Additional Lecture on 27th <br />
                        FROM - <Link to='#' onClick={(e) => {window.location.href = 'https://si-system.onrender.com'; e.preventDefault();}} className='announcement-links'>https://si-system.onrender.com</Link> <br /><br />
                        Next Tuesday we will not have any lectures because of the new year festival. To cover the content of the Foundation of Mathematical Skills on that day, We will have an extra lecture on Thursday, April 27th from 2 p.m. to 5 p.m. Please share this message with the students who did not attend today's lecture. <br /><br />
                        Thank you 
                    </p>
                    {
                        userType === "Admin" &&
                        <div className='button-container'>
                            <button onClick={() => sendEmail("announcement4")} className='announcement-send-button'>Email</button>
                            <button onClick={() => sendWhatsapp("announcement4")} className='announcement-send-button'>Whatsapp</button>
                        </div> 
                    }
                </div>

                <div className='announcement-card' id='announcement3-card'>
                    <p id="announcement3">
                        NOTICE - Platform Update <br />
                        FROM - <Link to='#' onClick={(e) => {window.location.href = 'https://si-system.onrender.com'; e.preventDefault();}} className='announcement-links'>https://si-system.onrender.com</Link> <br /><br />
                         Good Evening ! New following features have been added to our website for your convenience. <br /><br /> 

                        1. You can change or Edit your personal details such as name, Sa number etc. <br /><br />

                        2. There's a new dark mode option available. <br /><br />

                        3. Separate tab for learning documents such as tutorial answers, short notes. <br /><br />

                        Those who haven't got the SA number yet, just type any number you want and change once you receive it. If you haven't joined yet you can join using the above link. Keep up the good work and happy new year! 
                    </p>
                    {
                        userType === "Admin" &&
                        <div className='button-container'>
                            <button onClick={() => sendEmail("announcement3")} className='announcement-send-button'>Email</button>
                            <button onClick={() => sendWhatsapp("announcement3")} className='announcement-send-button'>Whatsapp</button>
                        </div> 
                    }
                </div>
                <div className='announcement-card' id='announcement2-card'>
                    <p id="announcement2">
                        NOTICE - SLIIT Academy Holiday Notice(All Students) <br />
                        Source - <Link to='#' onClick={(e) => {window.location.href = 'https://sam.sliitacademy.lk/mod/forum/discuss.php?d=1728#p2140'; e.preventDefault();}} className='announcement-links'>https://sam.sliitacademy.lk/mod/forum/discuss.php?d=1728#p2140</Link> <br />
                        FROM - <Link to='#' onClick={(e) => {window.location.href = 'https://si-system.onrender.com'; e.preventDefault();}} className='announcement-links'>https://si-system.onrender.com</Link> <br /><br />
                        Dear Students, <br /><br />
                        Please note that, SLIIT Academy will be closed from 10th April 2023 to 16th April 2023 in lieu of Sinhala & Tamil New Year.
                         <br /><br />
                        Student Affairs Division
                    </p>
                    {
                        userType === "Admin" &&
                        <div className='button-container'>
                            <button onClick={() => sendEmail("announcement2")} className='announcement-send-button'>Email</button>
                            <button onClick={() => sendWhatsapp("announcement2")} className='announcement-send-button'>Whatsapp</button>
                        </div> 
                    }
                </div>
                <div className='announcement-card' id='announcement1-card'>
                    <p id="announcement1">
                        NOTICE - Academic Announcement and Sharing Information <br />
                        FROM - <Link to='#' onClick={(e) => {window.location.href = 'https://si-system.onrender.com'; e.preventDefault();}} className='announcement-links'>https://si-system.onrender.com</Link> <br /><br />
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
