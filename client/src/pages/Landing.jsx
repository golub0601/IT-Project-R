import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/landing.scss";

const Landing = () => {
    const [showButton, setShowButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            // Show button if scrolled past one-ninth of the viewport height
            if (window.scrollY > window.innerHeight / 4 ) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const goToHome = () => {
        navigate('/posts/home');
    };

    return (
        <div>
            <section className="section top-section">
                <div className="content-container content-theme-dark">
                    <div className="content-inner">
                        <div className="content-center">
                            <h1>DREAM</h1>
                            <p>Your life alone</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section bottom-section">
                <div className="content-container content-theme-light">
                    <div className="content-inner">
                        <div className="content-center">
                            <h1>BUILD</h1>
                            <p>It together with us</p>
                        </div>
                        <button
                            className={`draw go-home-btn ${showButton ? 'visible' : ''}`}
                            onClick={goToHome}
                        >
                            LET US SHOW WHAT WE GOT
                        </button>
                    </div>
                </div>
                
            </section>
        </div>
    );
};

export default Landing;
