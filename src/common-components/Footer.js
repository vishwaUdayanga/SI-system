import '../styles/footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    function logout() {
        sessionStorage.removeItem('student')
        window.location.href = "/"
    }

    return (
        <footer>
            <div className='footer-content'>
                <div className='footer-about'>
                    <h2>About</h2>
                    <p>This site is for sharing information between students attending lectures on weekdays. Lectures, events and all other announcements will be posted on this platform and notified to you via email. In addition, you can see birthday wishes for our peers :)</p>
                </div>
                <div className='footer-links'>
                    <div>
                        <h2>Contacts</h2>
                        <ul>
                            <li>
                                <p>SAD : <Link className="footer-links">studentservices.sliitacademy@sliit.lk</Link></p>
                            </li>
                            <li>
                                <p>ITSD : <Link className="footer-links">geethma.s@sliit.lk</Link></p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>Campus Email</h2>
                        <ul>
                            <li>
                                <p>Format : <Link className="footer-links">saxxxxxxxx@my.sliit.lkk</Link></p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>Links</h2>
                        <ul>
                            <li>
                                <Link className="footer-button">Connect WhatsApp</Link>
                            </li>
                            <li>
                                <Link className="footer-button logout" onClick={logout}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='copy-rights'>
                <p>Copyright 2023 All rights reserved | udhayangavishwa@gmail.com</p>
            </div>   
        </footer>
    )
}

export default Footer