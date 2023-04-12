import '../../styles/settings.css'
import SampleStudentImage from '../../images/sample-avatar/user.png'
import { useEffect, useState } from 'react'

function SettingContent() {

    const [formData, setFormData] = useState({
        email: '',
        SAnumber: '',
        name: '',
        birthday: '',
        phoneNumber: '',
        userType: ''
    })

    const [postProfileImage, setPostProfileImage] = useState({ myImage : "" })
    const [isSetProfileImg, setIsSetProfileImg] = useState(false)
    const [fetchedProfileImage, setFetchedProfileImage] = useState('')
    const notificationContainer = document.querySelector('.notification-container')
    const [isSubmit, setIsSubmit] = useState(false)

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

    async function getStudentDetails(){
        const req = await fetch(process.env.REACT_APP_PATH +'/api/student/get-verified', {
            headers: {
                'x-access-token': sessionStorage.getItem('student')
            }
        })
        const data = await req.json()
        setFormData({
            email: data.email,
            SAnumber: data.SAnumber,
            name: data.name,
            birthday: data.birthday,
            phoneNumber: data.phoneNumber,
            userType: data.user
        })
        setFetchedProfileImage(data.profilePicture)
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

    function updateStudent(event) {
        event.preventDefault()
        setIsSubmit(true)
    }

    useEffect(() => {
        const modButton = document.querySelector('.mod-button')
        const vewContainer = document.querySelector('.view-mod')
        const editContainer = document.querySelector('.edit-mod')
        const studentDetails = document.querySelector('.student-details')
        modButton.addEventListener('click', () => {
            if (modButton.className.includes("view")){
                modButton.classList.remove('view')
                modButton.innerText = "Edit"
                vewContainer.style.display = "block"
                editContainer.style.display = "none"
                studentDetails.classList.remove("active")
            } else {
                modButton.classList.add('view')
                modButton.innerText = "View"
                vewContainer.style.display = "none"
                editContainer.style.display = "block"
                studentDetails.classList.add("active")
            }
        })
        getStudentDetails()
    },[])

    useEffect(() => {
        if(isSetProfileImg) {
            createPostProfilePic(postProfileImage)
        }

        async function formUpload() {
            if(isSubmit) {
                const response = await fetch(process.env.REACT_APP_PATH + '/api/update-student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        formData    
                    )
                })
                const data = await response.json()
                if (data.updated === 'done') {
                    const notification = document.createElement('div')
                    notification.classList.add('notification')
                    notification.innerHTML = 'Student details updated'
                    notificationContainer.appendChild(notification)
                    setTimeout(() => {
                        notification.remove()
                    }, 7000)
                }

                if (data.status === "not") {
                    const notification = document.createElement('div')
                    notification.classList.add('notification')
                    notification.innerHTML = 'Please enter valid data.'
                    notificationContainer.appendChild(notification)
                    setTimeout(() => {
                        notification.remove()
                    }, 7000)
                }
                setIsSubmit(false)
            }
        }
        formUpload()
    }, [isSetProfileImg, postProfileImage, isSubmit, formData, notificationContainer])

    return(
        <div className='setting-container'>
            <div className='setting-content'>
                <div className='settings-student-image'>
                    <label htmlFor='my-pic-details'>
                        <img src={fetchedProfileImage || SampleStudentImage} alt="" />
                    </label>
                    <input
                        type="file"
                        name="profile-image"
                        id="my-pic-details"
                        accept=".jpeg, .png, .jpg"
                        onChange={handleProfilePic}
                    />
                    <button className='mod-button'>Edit</button>
                </div>
                <div className='student-details'>
                    <ul className='view-mod'>
                        <li>
                            <h3>E-mail</h3>
                            <p>{formData.email}</p>
                        </li>
                        <li>
                            <h3>Name</h3>
                            <p>{formData.name}</p>
                        </li>
                        <li>
                            <h3>Status</h3>
                            <p>{formData.userType}</p>
                        </li>
                        <li>
                            <h3>Student Number</h3>
                            <p>{formData.SAnumber}</p>
                        </li>
                        <li>
                            <h3>Birthday</h3>
                            <p>{formData.birthday}</p>
                        </li>
                        <li>
                            <h3>Phone NUmber</h3>
                            <p>+94{formData.phoneNumber}</p>
                        </li>
                    </ul>
                    <ul className='edit-mod'>
                        <form onSubmit={updateStudent}>
                            <li>
                                <h3>E-mail</h3>
                                <p>{formData.email}</p>
                            </li>
                            <li>
                                <h3>Name</h3>
                                <input 
                                    type='text'
                                    placeholder='Name'
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required={true}
                                />
                            </li>
                            <li>
                                <h3>Status</h3>
                                <p>{formData.userType}</p>
                            </li>
                            <li>
                                <h3>Student Number</h3>
                                <input 
                                    type='text'
                                    placeholder='SA Number'
                                    value={formData.SAnumber}
                                    onChange={(e) => setFormData({...formData, SAnumber: e.target.value})}
                                    maxLength={10}
                                    required={true}
                                />
                            </li>
                            <li>
                                <h3>Student Birthday</h3>
                                <input 
                                    type='text'
                                    value={formData.birthday}
                                    onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                                    required={true}
                                />
                            </li>
                            <li>
                                <h3>Phone NUmber</h3>
                                <input 
                                    type='number'
                                    placeholder='Phone Number'
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                                    maxLength={10}
                                />
                            </li>
                            <button>Save Changes</button>
                        </form>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SettingContent