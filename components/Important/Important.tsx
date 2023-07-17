import React from "react";
import { Rating } from "flowbite-react";

interface RatingProps {
  value: number;
}

const Important: React.FC<RatingProps> = ({ value }) => {
  const rating = [1, 2, 3, 4, 5];
  
  return (
    <Rating>
      {rating.map((item) => (
        <Rating.Star key={item} filled={item <= value} />
      ))}
    </Rating>
  );
};

export default Important;
