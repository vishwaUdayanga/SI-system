import '../styles/sign-in.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    async function signInStudent(event) {
        event.preventDefault()
        setFormErrors(validate(formData.password, formData.email))
        const mainButton = document.getElementById('button-text')
        const loadingCircle = document.getElementById('sign-in-loading-circle')
        mainButton.innerText = ""
        loadingCircle.classList.add('active')
        setIsSubmit(true)
    }

    function validate (password) {
        const errors = {}
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if (!regexPassword.test(password)) {
            errors.password = "Minimum eight characters, at least one letter, one number and one special character"
        }
        return errors
    }

    useEffect(() => {
        const notificationContainer = document.querySelector('.notification-container')
        const mainButton = document.getElementById('button-text')
        const loadingCircle = document.getElementById('sign-in-loading-circle')

        async function formUpload() {
            if(Object.keys(formErrors).length === 0 && isSubmit) {
                const response = await fetch(process.env.REACT_APP_PATH + '/api/sign-in-student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        formData
                    })
                })
                const data = await response.json()
                console.log(data)
                if(data.student === 'not') {
                    formErrors.password = 'Password is incorrect'
                    mainButton.innerText = "Login"
                    loadingCircle.classList.remove('active')
                }
                if(data.error === 'Invalid email') {
                    formErrors.email = 'Invalid email'
                    mainButton.innerText = "Login"
                    loadingCircle.classList.remove('active')
                }
                if (data.message === 'sent an email') {
                    mainButton.innerText = "Login"
                    loadingCircle.classList.remove('active')
                    const notification = document.createElement('div')
                    notification.classList.add('notification')
                    notification.innerHTML = 'An email sent to your account. Please verify!'
                    notificationContainer.appendChild(notification)
                    setTimeout(() => {
                        notification.remove()
                    }, 7000)
                }
                if (data.status === 'ok') {
                    setFormData({
                        ...formData, 
                        email: '',
                        password: '',
                    })
                    sessionStorage.setItem('student', data.student)
                    mainButton.innerText = "Login"
                    loadingCircle.classList.remove('active')
                    window.location.href = '/student-courses'
                }
                setIsSubmit(false)
            } else {
                mainButton.innerText = "Login"
                loadingCircle.classList.remove('active')
            }
        }
        formUpload()
    }, [formData, formErrors, isSubmit])

    return(
        <>
            <div className="sign-in">
                <div className='notification-container'></div>
                <form onSubmit={signInStudent}>
                    <h1>Login To Your Account</h1>
                    <input
                        type='email'
                        placeholder='Email Address'
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <p>{formErrors.email}</p>
                    <input
                        type='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <p>{formErrors.password}</p>
                    <Link to="/sign-up" className="link">Sign Up</Link>
                    <button id='signIn'><h3 className='button-text' id='button-text'>Login</h3><div className='sign-in-loading-circle' id='sign-in-loading-circle'></div></button>
                </form>
            </div>
        </>
    )
}

export default SignIn
