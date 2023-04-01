import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import '../styles/email-verify.css'

function EmailVerify() {
    const params = useParams()
    const [verified, setVerified] = useState(false)

    function getToLogin() {
        sessionStorage.setItem('emailVerified', true)
        if (verified) {
            window.location.href = '/'
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const url = `${process.env.REACT_APP_PATH}/api/student/${params.id}/verify/${params.token}`
            try {
                const response = await fetch(url)
                const data = await response.json()
                if (data.verified === "student") {
                    setVerified(true)
                }
                console.log(data)
            } catch (error) {
                console.log(error.message)
            }  
        }
        fetchData()
    }, [params])

    return(
        <div className="email-verify-container">
            <div className="email-verify-inner">
                <h1><i className="fa-solid fa-circle-check"></i></h1>
                <p>Email Verified Successfully</p>
                <h4 className="email-verify-link" onClick={getToLogin}>Login</h4>
            </div>
        </div>
    )
}

export default EmailVerify