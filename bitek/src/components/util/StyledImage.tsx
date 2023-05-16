import Image from "next/image";
import type { StaticImageData } from "next/image";
type StyledImageProps = {
  src: string | StaticImageData;
  alt: string;
  className: string;
};
/**
 * React Component that wraps an `<Image>` component with `fill` property set to `true` in a div with the `className` provided
 * @param src - The source of the image
 * @param alt - The alt text of the image
 * @param className - The className of the div
 * @returns A React Component
 * @example
 * ```tsx
 * <StyledImage
 *  className="h-10 w-10"
 * src={SmallLogo as StaticImageData}
 * alt="Logo"
 * />
 * ```
 * @see https://nextjs.org/docs/pages/api-reference/components/image#fill
 */
const StyledImage: React.FC<StyledImageProps> = ({ src, alt, className }) => {
  return (
    <div className={`relative ${className}`}>
      <Image src={src} alt={alt} fill />
    </div>
  );
};

export default StyledImage;
