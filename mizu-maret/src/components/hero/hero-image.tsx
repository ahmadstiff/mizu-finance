import heroImages from "@/contstants/image/hero-image";

const HeroImage = () => {
  const displayImages = heroImages.slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {displayImages.map((src, index) => (
        <div
          key={index}
          className="rounded-2xl p-0.5 shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center"
        >
          <img
            src={src}
            alt={`Hero ${index + 1}`}
            className="w-full h-full object-contain rounded-3xl cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default HeroImage;
