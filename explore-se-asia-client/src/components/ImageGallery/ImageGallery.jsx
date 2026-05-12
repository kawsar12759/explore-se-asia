import { useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ImageGallery({ images, spotName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine all images (main image + additional images)
  const allImages = images?.allImages ? [images.image, ...images.allImages].filter(Boolean) : [images?.image].filter(Boolean);

  if (!allImages.length) return null;

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Thumbnail Grid */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">📸 Gallery</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main Image */}
          <div 
            className="md:col-span-2 h-64 md:h-80 rounded-xl overflow-hidden cursor-pointer group relative"
            onClick={() => setIsOpen(true)}
          >
            <img
              src={allImages[0]}
              alt={spotName}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-adventure-500 text-white px-4 py-2 rounded-lg font-semibold">
                View Gallery
              </button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="space-y-3">
            {allImages.slice(0, 3).map((img, idx) => (
              <div
                key={idx}
                className={`h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-adventure-500 ring-2 ring-adventure-300'
                    : 'border-gray-200 hover:border-adventure-300'
                }`}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsOpen(true);
                }}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
            {allImages.length > 3 && (
              <button 
                onClick={() => setIsOpen(true)}
                className="w-full h-20 bg-adventure-100 rounded-lg flex items-center justify-center font-bold text-adventure-600 hover:bg-adventure-200 transition-colors border-2 border-adventure-200"
              >
                +{allImages.length - 3} More
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Gallery Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          {/* Main Image Display */}
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/75 p-2 rounded-full transition-colors z-10"
            >
              <FiX size={24} />
            </button>

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center px-4">
              <img
                src={allImages[currentIndex]}
                alt={`${spotName} - ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              {/* Navigation Buttons */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-adventure-500 hover:bg-adventure-600 text-white p-3 rounded-full transition-colors"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-adventure-500 hover:bg-adventure-600 text-white p-3 rounded-full transition-colors"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg font-semibold">
              {currentIndex + 1} / {allImages.length}
            </div>
          </div>

          {/* Thumbnail Strip at Bottom */}
          <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 pb-4">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-adventure-500 ring-2 ring-adventure-300 scale-110'
                    : 'border-gray-500 hover:border-adventure-300 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
