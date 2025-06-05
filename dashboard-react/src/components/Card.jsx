const Card = ({
  title,
  content,
  imageSrc,
  footer,
  bgColor = "bg-white",
  textColor = "text-black",
  link,
}) => {
  return (
    <div className={`custom relative  m-[18px] sm:m-[18px] md:m-[15px] lg:m-[5px] p-4 rounded-lg shadow border border-gray-200 flex-1 ${bgColor} ${textColor} h-[300px] sm:h-[300px] md:h-[300px] lg:h-[300px] bg-white text-black`}>
      {/* Overlapping Image */}
      {imageSrc && (
        <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${bgColor} p-4 rounded-lg shadow-lg w-[90px] h-[90px] left-25 md:w-[90px] md:h-[90px]`}>
          <img src={imageSrc} alt={title} className="w-[60px] h-[60px] object-contain m-auto" />
        </div>
      )}

      {/* Title */}
      <div className="text-center text-lg font-semibold mb-2 pt-[90px] sm:pt-[120px] md:pt-[120px] lg:pt-[120px] text-black">
        {title}
      </div>

      {/* Content */}
      {content && (
        <div className="text-center mt-2 text-sm text-black">
          {content}
        </div>
      )}

      {/* Footer */}
      {footer && (
          <div className="mt-4 text-center text-sm text-gray-500">
            ⏱️{" "}
            <a
              href={link || "#"}
              target={link ? "_blank" : "_self"}
              rel={link ? "noopener noreferrer" : undefined}
              className="text-indigo-600 underline"
            >
              {footer}
            </a>
          </div>
)}
    </div>
  );
};

export default Card;
