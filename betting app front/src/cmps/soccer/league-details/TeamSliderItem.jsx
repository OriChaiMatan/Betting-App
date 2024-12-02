export function TeamSliderItem({ imgSrc, altText, nameLabel }) {
    return (
      <div className="team-slider-item">
        <img src={imgSrc} alt={altText} className="team-badge" />
        <div className="team-name">{nameLabel}</div>
      </div>
    );
  }