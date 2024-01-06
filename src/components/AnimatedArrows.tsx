import { FC } from 'react';
import { IoChevronForward } from 'react-icons/io5';

import '@styles/AnimatedArrows.css';

type AnimatedArrowsProps = {
  style?: React.CSSProperties;
};

export const AnimatedArrows: FC<AnimatedArrowsProps> = ({ style }) => {
  return (
    <div className='arrows' style={style}>
      <IoChevronForward />
      <IoChevronForward />
      <IoChevronForward />
    </div>
  );
};
