import React from "react";
import "./NewsTicker.css";

const NewsTicker = props => {
  const { id, title, url, description, publishedAt } = props;
  console.log(props);
  return (
    // <div className="ticker-wrap">
    //   <div>
    //     <span>Hi</span>
    //   </div>
    // </div>

    <div key={id} className="testTicker animated slideInRight infinite">
      <div className="animated slideOutLeft infinite">
        <div className="article-info">
          <a href={url} target="_blank">
            {title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
