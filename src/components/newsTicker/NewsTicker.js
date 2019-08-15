import React from 'react';
import './NewsTicker.css';

const NewsTicker = props => {
  const { id, title, url } = props;
  console.log(props);
  return (
    //Animate CSS animations used to mimmick a news ticker
    <div key={id} className="testTicker animated slideInRight infinite">
      <div className="animated slideOutLeft infinite">
        <div className="article-info">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
