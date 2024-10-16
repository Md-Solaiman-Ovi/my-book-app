import React from "react";

interface WishlistIconProps {
  isWishlisted: boolean;
  onClick: () => void;
}

const WishlistIcon: React.FC<WishlistIconProps> = ({
  isWishlisted,
  onClick,
}) => <button onClick={onClick}>{isWishlisted ? "❤️" : "🤍"}</button>;

export default WishlistIcon;
