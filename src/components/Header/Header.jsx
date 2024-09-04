import './Header.css';
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import { mdiAccountOutline } from '@mdi/js';


function Header() {
  return (
    <>
      <div className="header">
        {/* <div style={{textAlign: 'left'}}> */}
        <h1 className="website-title">Made by Mama</h1>
        {/* <p style={{fontSize: '1.2rem', marginLeft: '3px'}}>Hand-crafted, home and holiday decor</p>
        </div> */}
        <div className='icons'>
        <Icon className='cart' path={mdiCartOutline} size={1.5} />
        <Icon className='account' path={mdiAccountOutline} size={1.5} />
        </div>
      </div>
    </>
  );
}

export default Header;
