import './arrow.css';

export default ({ size = 'medium', direction = 'right' }) => (
  <div className={`arrow arrow-${size} arrow-${direction}`}></div>
);
