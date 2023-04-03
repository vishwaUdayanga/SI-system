import '../../styles/course-details.css'
import { Link } from 'react-router-dom'

function CourseDetails() {
    return(
        <div className='course-container'>
            <div className='course-content'>
                <div className='course-card'>
                    <h4>Communication English</h4>
                    <p>Monday -- 8.30 a.m. - 12.45 p.m.</p>
                    <p>Tuesday -- 8.30 a.m. - 10.30 a.m.</p>
                    <p>12th Floor Auditorium</p>
                    <h5>Enrollment Key - CSE2023#</h5>
                    <p>Mr. Ishara Weerasinghe - <Link to='#' onClick={(e) => {window.location.href = 'mailto:raviharee.w@sliit.lk'; e.preventDefault();}} className="emails">raviharee.w@sliit.lk</Link></p>
                </div>
                <div className='course-card'>
                    <h4>Programming Skills</h4>
                    <p>Monday -- 1.30 p.m. - 4.30 p.m.</p>
                    <p>Thursday -- 10.45 a.m. - 12.45 p.m.</p>
                    <p>12th Floor Auditorium</p>
                    <h5>Enrollment Key - PSinC2023</h5>
                    <p>Anurudda Abesinghe - <Link  to='#' onClick={(e) => {window.location.href = 'mailto:anuruddha.a@sliit.lk'; e.preventDefault();}} className="emails">anuruddha.a@sliit.lk</Link></p>
                </div>
                <div className='course-card'>
                    <h4>Foundation of Mathematical Skills</h4>
                    <p>Tuesday -- 10.45 a.m. - 3.30 p.m.</p>
                    <p>Thursday -- 10.45 p.m. - 12.45 p.m.</p>
                    <p>12th Floor Auditorium</p>
                    <h5>Enrollment Key - FMS@23</h5>
                    <p>Chamith Jayasinghe - <Link  to='#' onClick={(e) => {window.location.href = 'mailto:chamith.j@sliit.lk'; e.preventDefault();}} className="emails">chamith.j@sliit.lk</Link></p>
                </div>
                <div className='course-card'>
                    <h4>Programming Design Techniques</h4>
                    <p>Wednesday -- 8.30 a.m. - 12.45 p.m.</p>
                    <p>Thursday -- 8.30 a.m. - 10.30 a.m.</p>
                    <p>12th Floor Auditorium</p>
                    <h5>Enrollment Key - IT1005</h5>
                    <p>Rushira ManikkaArachchi - <Link  to='#' onClick={(e) => {window.location.href = 'mailto:ruchira.m@sliit.lk'; e.preventDefault();}} className="emails">ruchira.m@sliit.lk</Link></p>  
                </div>
            </div>
        </div>
    )
}

export default CourseDetails
