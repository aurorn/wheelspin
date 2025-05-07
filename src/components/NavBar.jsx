import '../styles/NavBar.css';
import Githubmark from '../assets/githubmark.svg';
import DraggableWheel from './DraggableWheel';

function NavBar() {
    const segments = [
        { color: '#FF6B6B' },
        { color: '#4ECDC4' },
        { color: '#45B7D1' },
        { color: '#96CEB4' },
        { color: '#FFEEAD' },
        { color: '#D4A5A5' },
        { color: '#9B59B6' },
        { color: '#3498DB' },
        { color: '#E67E22' },
        { color: '#2ECC71' }
    ];
    
    const createSegmentStyle = (index) => {
        const degree = 360 / segments.length;
        const startAngle = degree * index;
        
        return {
            background: `conic-gradient(from ${startAngle}deg, ${segments[index].color} 0deg, ${segments[index].color} ${degree}deg, transparent ${degree}deg)`
        };
    };
    
    return (
        <div className="top-bar">
            <div className="logo-wheel-container">
                <div style={{ position: 'relative' }}>
                    <DraggableWheel>
                        <div className="logo-wheel spin">
                            {segments.map((segment, index) => (
                                <div 
                                    key={index}
                                    className="segment"
                                    style={createSegmentStyle(index)}
                                />
                            ))}
                        </div>
                    </DraggableWheel>
                </div>
            </div>
            <p className="main-title">Spin the Wheel</p>
            <a href="https://github.com/aurorn" target="_blank" rel="noopener noreferrer">
                <img src={Githubmark} alt="github" className="github spin" />
            </a>
        </div>
    );
}

export default NavBar;