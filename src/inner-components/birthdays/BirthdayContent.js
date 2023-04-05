import '../../styles/birthday.css'
import { useEffect, useState } from 'react'
import cake from '../../images/birthday-wish-card/cake.png'
import balloons from '../../images/birthday-wish-card/balloons.png'
import SampleStudentImage from '../../images/sample-avatar/user.png'
import download from '../../images/birthday-wish-card/download.png'
import 'html2canvas'
import html2canvas from 'html2canvas'

function BirthdayContent() {
    const [birthdayList, setBirthdayList] = useState([])

    async function getBirthdayList() {
        const req = await fetch(process.env.REACT_APP_PATH +'/api/student/get-birthday-list')
        const data = await req.json()
        setBirthdayList(data.birthdayList)
    }

    function downloadPng(studentId) {
        const birthdayCard = document.getElementById(studentId)
        html2canvas(birthdayCard).then((canvas) => {
            const base64image = canvas.toDataURL("image/png")
            var anchor = document.createElement('a')
            anchor.setAttribute("href", base64image)
            anchor.setAttribute("download", "birthday-wish.png")
            anchor.click()
            anchor.remove()
        })
    }

    useEffect(() => {
        getBirthdayList()
    }, [])

    return (
        <div className='birthday-container'>
            <div className='birthday-content'>
                { birthdayList.length > 0 &&
                    <div className='birthday-content-container'>
                        <h2>&#127880;&#127881; Many happy returns of the day to our today birthday boys and girls:) &#127880;&#127882;</h2>
                        <div className='birthday-card-container'>
                            {birthdayList.map(student =>
                                <div key={student._id} className='birthday-card' id={student._id}>
                                    <div className='card-text'>
                                        <img className='cake' src={cake} alt="" />
                                        <h3 className='special-font'>Happy Birthday</h3>
                                        <p>{student.name}</p>
                                        <p className='wish-text'>We wish you a lifetime of fantastic memories as you commemorate yet another year of development and accomplishment.</p>
                                        <div className='avatar-outer'>
                                            <img src={student.profilePicture || SampleStudentImage} alt="" />
                                        </div>
                                    </div>
                                    <div className='up-circle'></div>
                                    <div className='bottom-circle'></div>
                                    <img className='balloons' src={balloons} alt="" />
                                    <img className='download-button' src={download} alt="" onClick={() => downloadPng(student._id)} />
                                    <p className='wish-text bottom-text'>From Year 1 first semester students <br/>SLIITA</p>
                                </div> 
                            )}
                        </div>
                    </div>
                }  
                { birthdayList.length === 0 &&
                  <div className='no-birthdays'>
                    <h2>No birthdays to show today..</h2>
                  </div>
                }
            </div>
        </div>  
    )
}

export default BirthdayContent