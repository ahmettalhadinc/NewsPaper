import React, { useState } from 'react'
import '../css/Header.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import SearchPage from '../pages/SearchPage';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    const handleSearch = () => {
        if (searchTerm) {
          // Arama terimi varsa, searchPage'e yönlendir
          navigate(`/search?q=${searchTerm}`);
        }
      };
    return (
        <>
            <div className='container'>
                <div className='container-wrap'>
                    <div className='upper'>
                        <p className='name' style={{ fontWeight: "bolder", fontSize: 30 }}>Ahmet Talha Dinç</p>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <input type="text"
                                placeholder="Haber Ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} className='input' />

<div
                style={{
                  marginLeft: 10, height: '50px', width: '60px', backgroundColor: 'black',
                  display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: 50, justifyContent: 'center'
                }}
                onClick={handleSearch} // Arama tuşuna tıklanırsa yönlendir
              >
                <FaSearch color='white' size={15} />
              </div>
                        </div>
                    </div>

                    <div className={`navbar ${isMenuOpen ? 'active' : ''}`}>
                        <ul className='pages'>
                            <li style={{ fontWeight: location.pathname === '/' ? 'bold' : 'normal' }} className='list' >
                                <Link onClick={closeMenu} to="/">Ana Sayfa</Link>
                            </li>

                            <li style={{ fontWeight: location.pathname === '/genel' ? 'bold' : 'normal' }} className='list'>
                                <Link onClick={closeMenu} to="/genel">Genel</Link>
                            </li>
                            <li style={{ fontWeight: location.pathname === '/teknoloji' ? 'bold' : 'normal' }} className='list'>
                                <Link onClick={closeMenu} to="/teknoloji">Teknoloji</Link>
                            </li>
                            <li style={{ fontWeight: location.pathname === '/spor' ? 'bold' : 'normal' }} className='list'>
                                <Link onClick={closeMenu} to="/spor">Spor</Link>
                            </li>
                            <li style={{ fontWeight: location.pathname === '/bilim' ? 'bold' : 'normal' }} className='list'>
                                <Link onClick={closeMenu} to="/bilim">Bilim</Link>
                            </li>
                            <li style={{ fontWeight: location.pathname === '/saglik' ? 'bold' : 'normal' }} className='list'>
                                <Link onClick={closeMenu} to="/saglik">Sağlık</Link>
                            </li>
                            <li style={{ fontWeight: location.pathname === '/eglence' ? 'bold' : 'normal' }} className='list'>
                                <Link onClick={closeMenu} to="/eglence">Eğlence</Link>
                            </li>
                            <li style={{ fontWeight: location.pathname === '/hakkimda' ? 'bold' : 'normal' }} className='list'>
                                <Link onClick={closeMenu} to="/hakkimda">Hakkımda</Link>
                            </li>
                        </ul>
                    </div>


                    <div className="hamburger" style={{ marginTop: 50, marginBottom: 20 }} onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
