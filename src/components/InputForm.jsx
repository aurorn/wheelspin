import { useState } from 'react';
import { GithubPicker } from 'react-color';
import '../styles/InputForm.css';

const GITHUB_COLORS = [
  '#e34c26', 
  '#563d7c', 
  '#f1e05a', 
  '#2b7489', 
  '#41b883', 
  '#61dafb',
  '#764abc', 
  '#3178c6', 
  '#dd1b16', 
  '#ff9800' 
];

const InputForm = ({ segments, setSegments }) => {
  const [newSegmentName, setNewSegmentName] = useState('');
  const [displayColorPicker, setDisplayColorPicker] = useState(null);
  const [showColorWarning, setShowColorWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState('');

  const shortenName = (text) => {
    return text.substring(0, 7);
  };

  const handleAddSegment = (e) => {
    e.preventDefault();
    if (!newSegmentName.trim()) return;
    
    const defaultColor = GITHUB_COLORS[segments.length % GITHUB_COLORS.length];
    
    if (segments.some(segment => segment.color.toLowerCase() === defaultColor.toLowerCase())) {
      const unusedColor = GITHUB_COLORS.find(color => 
        !segments.some(segment => segment.color.toLowerCase() === color.toLowerCase())
      );
      
      if (!unusedColor) {
        setWarningMessage('No unique colors available');
        setShowColorWarning(true);
        setTimeout(() => setShowColorWarning(false), 3000);
        return;
      }

      setSegments(prev => [...prev, { 
        color: unusedColor, 
        text: newSegmentName.trim() 
      }]);
    } else {
      setSegments(prev => [...prev, { 
        color: defaultColor, 
        text: newSegmentName.trim() 
      }]);
    }
    
    setNewSegmentName('');
  };

  const handleDelete = (index) => {
    setSegments(prev => prev.filter((_, i) => i !== index));
    setDisplayColorPicker(null);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingName(segments[index].text);
  };

  const handleSaveEdit = (index) => {
    if (editingName.trim()) {
      setSegments(prev => prev.map((segment, i) => 
        i === index ? { ...segment, text: editingName.trim() } : segment
      ));
    }
    setEditingIndex(null);
    setEditingName('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingName('');
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      handleSaveEdit(index);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleColorChange = (color, index) => {
    const newColor = color.hex;
    
    const isDuplicate = segments.some((segment, i) => 
      i !== index && segment.color.toLowerCase() === newColor.toLowerCase()
    );

    if (isDuplicate) {
      setWarningMessage('This color is already used in another segment');
      setShowColorWarning(true);
      setTimeout(() => setShowColorWarning(false), 3000);
      return;
    }

    setSegments(prev => prev.map((segment, i) => 
      i === index ? { ...segment, color: newColor } : segment
    ));
    setDisplayColorPicker(null);
  };

  const toggleColorPicker = (index) => {
    setDisplayColorPicker(displayColorPicker === index ? null : index);
  };

  return (
    <div className="input-form">
      {showColorWarning && (
        <div className="warning-popup">
          {warningMessage}
        </div>
      )}
      <form onSubmit={handleAddSegment}>
        <input
          type="text"
          value={newSegmentName}
          onChange={(e) => setNewSegmentName(e.target.value)}
          placeholder="Enter segment name"
          className="input-field"
          maxLength="20"
        />
        <button 
          type="submit" 
          className="button button-edit add-button"
          disabled={segments.length >= 10}
        >
          Add Segment
        </button>
      </form>

      <ul className="segment-list">
        {segments.map((segment, index) => (
          <li key={index} className="segment-item">
            <div className="segment-info">
              <div 
                className="color-block"
                style={{ backgroundColor: segment.color }}
                onClick={() => toggleColorPicker(index)}
              />
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                  className="edit-input"
                  autoFocus
                  maxLength="20"
                />
              ) : (
                <span title={segment.text}>
                  {shortenName(segment.text) || `Segment ${index + 1}`}
                  {segment.text.length > 7 && '...'}</span>
              )}
            </div>
            <div>
              {editingIndex === index ? (
                <>
                  <button 
                    onClick={() => handleSaveEdit(index)}
                    className="button button-save"
                  >
                    Save
                  </button>
                  <button 
                    onClick={handleCancelEdit}
                    className="button button-cancel"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleEdit(index)}
                    className="button button-edit"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(index)}
                    className="button button-delete"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
            {displayColorPicker === index && (
              <div className="color-picker-popover">
                <div 
                  className="color-picker-cover" 
                  onClick={() => setDisplayColorPicker(null)}
                />
                <GithubPicker
                  colors={GITHUB_COLORS}
                  color={segment.color}
                  onChange={(color) => handleColorChange(color, index)}
                  triangle="hide"
                  width="212px"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputForm;