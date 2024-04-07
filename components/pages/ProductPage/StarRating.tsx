interface Props {
  rating: number;
}

export const StarRating = ({ rating }: Props) => {
  switch (rating) {
    case 1:
      return <span className="text-paragraph-small text-brand-dark-grey">&#9733;</span>;
    case 2:
      return <span className="text-paragraph-small text-brand-dark-grey">&#9733;&#9733;</span>;
    case 3:
      return (
        <span className="text-paragraph-small text-brand-dark-grey">&#9733;&#9733;&#9733;</span>
      );
    case 4:
      return (
        <span className="text-paragraph-small text-brand-dark-grey">
          &#9733;&#9733;&#9733;&#9733;
        </span>
      );
    case 5:
      return (
        <span className="text-paragraph-small text-brand-dark-grey">
          &#9733;&#9733;&#9733;&#9733;&#9733;
        </span>
      );
    default:
      return (
        <span className="text-paragraph-small text-brand-dark-grey">
          &#9733;&#9733;&#9733;&#9733;&#9733;
        </span>
      );
  }
};
