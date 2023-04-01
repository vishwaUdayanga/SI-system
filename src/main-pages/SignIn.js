import '../styles/sign-in.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    async function signInStudent(event) {
        event.preventDefault()
        console.log(formData)
    }

    return(
        <>
            <div className="sign-in">
                <form onSubmit={signInStudent}>
                    <h1>Login To Your Account</h1>
                    <input
                        type='email'
                        placeholder='Email Address'
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <Link to="/sign-up" className="link">Sign Up</Link>
                    <button>Login</button>
                </form>
            </div>
        </>
    )
}

export default SignIn