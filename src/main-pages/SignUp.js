import '../styles/sign-up.css'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'


function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        SAnumber: '',
        name: '',
        birthday: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const ref = useRef()

    async function signUpStudent(event) {
        event.preventDefault()
        setFormErrors(validate(formData.password, formData.confirmPassword, formData.phoneNumber))
        const mainButton = document.getElementById('button-text')
        const loadingCircle = document.getElementById('loading-circle')
        mainButton.innerText = ""
        loadingCircle.classList.add('active')
        setIsSubmit(true)
    }

    function validate (password, confirmPassword, phoneNumber) {
        const errors = {}
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if (!regexPassword.test(password)) {
            errors.password = "Minimum eight characters, at least one letter, one number and one special character"
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = "Characters did not match"
        }
        if(phoneNumber.length !== 10) {
            errors.phoneNumber = "Enter a valid phone number"
        }
        return errors
    }

    useEffect(() => {
        const notificationContainer = document.querySelector('.notification-container')
        const mainButton = document.getElementById('button-text')
        const loadingCircle = document.getElementById('loading-circle')

        async function formUpload() {
            if(Object.keys(formErrors).length === 0 && isSubmit) {
                const response = await fetch(process.env.REACT_APP_PATH + '/api/sign-up-student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        formData    
                    )
                })
                const data = await response.json()
                console.log(data)
                if (data.error === 'invalid') {
                    formErrors.email = 'This email has already registered'
                    mainButton.innerText = "Submit"
                    loadingCircle.classList.remove('active')
                }
                if (data.registered === 'done') {
                    console.log("registered successfully")
                    setFormData({
                        ...formData, 
                        email: '',
                        SAnumber: '',
                        name: '',
                        birthday: '',
                        phoneNumber: '',
                        password: '',
                        confirmPassword: ''
                    })
                    // animatedElements.forEach((elements) => {
                    //     elements.classList.add('active')
                    // })
                    mainButton.innerText = "Submit"
                    loadingCircle.classList.remove('active')
                    const notification = document.createElement('div')
                    notification.classList.add('notification')
                    notification.innerHTML = 'An email sent to your account. Please verify!'
                    notificationContainer.appendChild(notification)
                    setTimeout(() => {
                        notification.remove()
                    }, 7000)
                }
                setIsSubmit(false)
            } else {
                mainButton.innerText = "Submit"
                loadingCircle.classList.remove('active')
            }
        }
        formUpload()
    }, [formData, formErrors, isSubmit])

    return(
        <>
            <div className="sign-up">
                <div className='notification-container'></div>
                <form onSubmit={signUpStudent}>
                    <h1>Create Your Account</h1>
                    <input
                        type='email'
                        placeholder='Email Address'
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required={true}
                    />
                    <p>{formErrors.email}</p>
                    <input
                        type='text'
                        placeholder='SA Number'
                        value={formData.SAnumber}
                        onChange={(e) => setFormData({...formData, SAnumber: e.target.value})}
                        maxLength={10}
                        required={true}
                    />
                    <input
                        type='text'
                        placeholder='Name'
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required={true}
                        maxLength={40}
                    />
                    <input
                        type='text'
                        placeholder='Birth Day'
                        value={formData.birthday}
                        onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                        required={true}
                        ref={ref}
                        onFocus={() => (ref.current.type = "date")}
                    />
                    <input
                        type='number'
                        placeholder='Phone Number'
                        maxLength={10}
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        required={true}
                    />
                    <p>{formErrors.phoneNumber}</p>
                    <input
                        type='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required={true}
                    />
                    <p>{formErrors.password}</p>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        required={true}
                    />
                    <p>{formErrors.confirmPassword}</p>
                    <Link to="/" className="link">Sign In</Link>
                    <button id='signUp'><h3 className='button-text' id='button-text'>Submit</h3><div className='loading-circle' id='loading-circle'></div></button>
                </form>
            </div>
        </>
    )
}

export default SignUp
