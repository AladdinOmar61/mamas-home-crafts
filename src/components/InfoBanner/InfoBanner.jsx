import './InfoBanner.css'
import banner from '../../assets/images/monaStoreBanner.png'

function InfoBanner() {
    return (
        <>
        <div className="info-banner">
            <img className="banner-img" src={banner} alt="store banner" />
            <p className='banner-text'>Shop from many options <br /> of nice home decor for the <br /> season you want!</p>
            <button className='buy-now'>Buy Now</button>
        </div>
        </>
    )
}

export default InfoBanner