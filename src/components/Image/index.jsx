import { LazyLoadImage } from "react-lazy-load-image-component";

const Image = ({
    name,
    imageUrl,
    className,
    handleClick,
}) => (
        <LazyLoadImage
            alt={name}
            src={imageUrl}
            className={className}
            onClick={handleClick}
        />
)

export default Image;