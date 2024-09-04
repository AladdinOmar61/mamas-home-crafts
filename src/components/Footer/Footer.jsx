import './Footer.css'

function Footer() {
    const date = new Date();

    return (
        <>
        <div className="footer">
            <p> Questions? Send them at <u>monaomar@gmail.com</u></p>
            <p>© Made by Mama {date.getYear()+1900}</p>
        </div>
        </>
    )
}

export default Footer