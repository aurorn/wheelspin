import React from 'react';
import '../styles/Intro.css';
import NavBar from './NavBar.jsx';
import IntroWheel from './IntroWheel.jsx';
export default function Intro() {
    

    const handleClick = (e) => {
        e.preventDefault();

        const appContainer = document.querySelector('.App');
        appContainer.classList.remove('hide-app');
        
        const introPage = document.querySelector('.intro-page');
        introPage.classList.add('hide-intro');
    }
    return (
        <div className="intro-page container">
            <NavBar />
            <div className="intro-content">
                <h1 className="intro-title">Welcome!</h1>
                <IntroWheel />

                <button className="start-button" onClick={handleClick}>Start</button>
            </div>
        </div>
    );
}