import './Footer.css'

function Footer() {
    const date = new Date();

    return (
        <div className="footer">
            <p>© Mamas Home Crafts {date.getYear()+1900}</p>
        </div>
    )
}

export default Footer