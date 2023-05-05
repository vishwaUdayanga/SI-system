import '../../styles/learning-documents.css'
import downloadImg from '../../images/birthday-wish-card/download.png'
import pdtTutorial01 from '../../documents/PDT/PDT-tutorial1-answers.pdf'
import pdtTutorial02 from '../../documents/PDT/PDT-tutorial2-answers.pdf'
import fmsFactorization1 from '../../documents/FMS/FMS-factorization1-answers.pdf'
import fmsFactorization2 from '../../documents/FMS/FMS-factorization2-answers.pdf'
import fmsFactorization3 from '../../documents/FMS/FMS-factorization3-answers.pdf'
import fmsTutorial1 from '../../documents/FMS/FMS-tutorial1-answers.pdf'
import absoluteValueNote from '../../documents/FMS/Absolute-value-note.pdf'

function DocumentContent() {
    function downloadDocument(leaningDocument, name) {
        var anchor = document.createElement('a')
        anchor.setAttribute("href", leaningDocument)
        anchor.setAttribute("download", name+".pdf")
        anchor.click()
        anchor.remove()
    }

    return (
        <div className="documents-container">
            <div className="documents-content">
                <div className="module-name">
                    <h2>PDT</h2>
                </div>
                <div className='document-card'>
                    <div className='main-text'>
                        <h3>TUTORIAL 01 ANSWERS</h3>
                    </div>
                    <div onClick={() => downloadDocument(pdtTutorial01, "PDT-tutorial1-answers")} className='download-btn'>
                        <img src={downloadImg} alt='' />
                    </div>
                </div>
                <div className='document-card'>
                    <div className='main-text'>
                        <h3>TUTORIAL 02 ANSWERS</h3>
                    </div>
                    <div onClick={() => downloadDocument(pdtTutorial02, "PDT-tutorial2-answers")} className='download-btn'>
                        <img src={downloadImg} alt='' />
                    </div>
                </div>


                <div className="module-name">
                    <h2>FMS</h2>
                </div>
                <div className='document-card'>
                    <div className='main-text'>
                        <h3>FACTORIZATION 01 ANSWERS</h3>
                    </div>
                    <div onClick={() => downloadDocument(fmsFactorization1, "FMS-factorization1-answers")} className='download-btn'>
                        <img src={downloadImg} alt='' />
                    </div>
                </div>
                <div className='document-card'>
                    <div className='main-text'>
                        <h3>FACTORIZATION 02 ANSWERS</h3>
                    </div>
                    <div onClick={() => downloadDocument(fmsFactorization2, "FMS-factorization2-answers")} className='download-btn'>
                        <img src={downloadImg} alt='' />
                    </div>
                </div>
                <div className='document-card'>
                    <div className='main-text'>
                        <h3>FACTORIZATION 03 ANSWERS</h3>
                    </div>
                    <div onClick={() => downloadDocument(fmsFactorization3, "FMS-factorization3-answers")} className='download-btn'>
                        <img src={downloadImg} alt='' />
                    </div>
                </div>
                <div className='document-card'>
                    <div className='main-text'>
                        <h3>TUTORIAL 01 ANSWERS</h3>
                    </div>
                    <div onClick={() => downloadDocument(fmsTutorial1, "FMS-tutorial1-answers")} className='download-btn'>
                        <img src={downloadImg} alt='' />
                    </div>
                </div>
                <div className='document-card'>
                    <div className='main-text'>
                        <h3>ABSOLUTE VALUE NOTE</h3>
                    </div>
                    <div onClick={() => downloadDocument(absoluteValueNote, "Absolute-value-note")} className='download-btn'>
                        <img src={downloadImg} alt='' />
                    </div>
                </div>
                {/* <button onClick={() => downloadDocument(Tutorial02, "tutorial-2")} >Download</button> */}
            </div>
        </div>       
    )
}

export default DocumentContent