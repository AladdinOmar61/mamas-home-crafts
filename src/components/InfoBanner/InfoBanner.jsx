import './InfoBanner.css'
import banner from '../../assets/images/monaStoreBanner.png'

function InfoBanner() {
    return (
        <>
        <div className="info-banner">
            <img className="banner-img" src={banner} alt="store banner" />
        </div>
        </>
    )
}

export default InfoBanner