import React from 'react';
import '../styles/Intro.css';
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
            <div className="top-bar">
                <img src="#" alt="Logo" className="logo" />
                <p className="main-title">Spin the Wheel</p>
                <img src="#" alt="github" className="github" />
            </div>
            <div className="intro-content">
                <h1 className="intro-title">Welcome to Spin the Wheel!</h1>
                <button className="start-button" onClick={handleClick}>Start</button>
            </div>
        </div>
    );
}