"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import "@/styles/globals.css";
import Head from "next/head";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Preloader from "@/components/preloader";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface GalleryImage {
  src: string;
}

interface Props {
  allImages: GalleryImage[];
}

const batchSize = 24;

export default function WeddingGalleryPage({ allImages }: Props) {
  const [visibleImages, setVisibleImages] = useState<GalleryImage[]>(
    allImages.slice(0, batchSize)
  );
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [modalImageLoading, setModalImageLoading] = useState(true);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const showImage = (img: GalleryImage) => setCurrentImage(img);
  const closeModal = () => setCurrentImage(null);
  const showNext = () => {
    const currentIndex = visibleImages.findIndex(
      (img) => img.src === currentImage?.src
    );
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % visibleImages.length;
      setCurrentImage(visibleImages[nextIndex]);
    }
  };
  const showPrev = () => {
    const currentIndex = visibleImages.findIndex(
      (img) => img.src === currentImage?.src
    );
    if (currentIndex !== -1) {
      const prevIndex =
        (currentIndex - 1 + visibleImages.length) % visibleImages.length;
      setCurrentImage(visibleImages[prevIndex]);
    }
  };

  const [uploadErrors, setUploadErrors] = useState<string[]>([]);

  const loadMoreImages = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const nextImages = allImages.slice(
        visibleImages.length,
        visibleImages.length + batchSize
      );
      if (nextImages.length === 0) {
        setHasMore(false);
      } else {
        setVisibleImages((prev) => [...prev, ...nextImages]);
      }
      setIsLoading(false);
    }, 1000);
  }, [visibleImages.length, allImages]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 300;
      if (scrollY >= threshold && hasMore && !isLoading) {
        loadMoreImages();
      }
    };

    if (uploadErrors.length > 0) {
      const timer = setTimeout(() => setUploadErrors([]), 10000);
      return () => clearTimeout(timer);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading, loadMoreImages, uploadErrors]);

  const handleUpload = async (files: FileList) => {
    setIsUploading(true); // Start uploading
    const uploads: Promise<void>[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      const formData = new FormData();
      formData.append("photo[]", file);

      uploads.push(
        fetch("https://webcoastserver.com/phc/uploads/upload.php", {
          method: "POST",
          body: formData,
        })
          .then(async (res) => {
            const result = await res.json();
            if (res.ok && result.success) {
              let progress = 0;
              const interval = setInterval(() => {
                progress += 10;
                setUploadProgress((prev) => ({
                  ...prev,
                  [file.name]: progress,
                }));
                if (progress >= 100) clearInterval(interval);
              }, 100);

              const previewUrl = URL.createObjectURL(file);

              setVisibleImages((prev) => [{ src: previewUrl }, ...prev]);
            } else {
              errors.push(
                `${file.name}: ${result.errors?.[0]?.error || "Upload failed."}`
              );
            }
          })
          .catch((err) => {
            errors.push(`${file.name}: Network error.`);
            console.error("Upload error:", err);
          })
      );
    });

    await Promise.all(uploads);
    setUploadErrors(errors);
    setIsUploading(false); // Finish uploading
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleUpload(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      handleUpload(e.dataTransfer.files);
    }
  };

  return (
    <>
      <Head>
        <title>Ronnel & Junna - Wedding Gallery</title>
        <meta name="description" content="Ronnel and Junna Wedding" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${playfair.className} antialiased`}>
        <Preloader />
        <NavBar />

        <div className="bg-gray-100 min-h-screen py-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 text-center">
            Wedding Gallery
          </h2>

          <div
            className={`border-4 border-dashed ${
              dragOver ? "border-blue-600" : "border-gray-400"
            } rounded-lg p-6 mb-10 max-w-5xl mx-auto text-center transition-colors`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <p className="text-gray-600 text-lg mb-2">
              Drop images here to upload
            </p>
            <p className="text-gray-600 text-lg mb-2">or</p>
            <button
              onClick={() => inputRef.current?.click()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Select Photos
            </button>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </div>

          {isUploading && (
            <div className="flex items-center justify-center gap-2 text-blue-600 font-medium mb-4">
              <svg
                className="animate-spin h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Uploading photos...
            </div>
          )}

          <div className="max-w-4xl mx-auto mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(uploadProgress).map(([name, percent]) => (
              <div key={name}>
                <div className="flex justify-between text-sm text-gray-700">
                  <p className="truncate">{name}</p>
                  <p>{percent}%</p>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
                  <div
                    className="bg-blue-500 h-2 rounded transition-all duration-500 ease-in-out"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {uploadErrors.length > 0 && (
            <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <h4 className="font-semibold mb-2">Upload Errors:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {uploadErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {visibleImages.map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer group transform transition-transform duration-300 ease-in-out hover:scale-105 opacity-0 animate-fade-in"
                onClick={() => {
                  setModalImageLoading(true);
                  showImage(img);
                }}
              >
                <div className="relative w-full h-60">
                  <Image
                    src={img.src}
                    alt="Wedding Photo"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    priority={idx < 8}
                  />
                </div>
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="flex justify-center mt-10">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 animate-spin border-t-blue-500"></div>
            </div>
          )}

          {!hasMore && (
            <p className="text-center text-gray-600 mt-10 text-lg">
              🎉 You’ve reached the end of the gallery.
            </p>
          )}

          {currentImage && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
              onClick={(e) => {
                // Close modal only if backdrop itself is clicked
                if (e.target === e.currentTarget) {
                  closeModal();
                }
              }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-6 text-white text-3xl z-50 cursor-pointer"
                onClick={closeModal}
              >
                <FaTimes />
              </button>

              {/* Previous Button */}
              <button
                className="absolute left-4 text-white text-4xl z-50 cursor-pointer"
                onClick={() => {
                  setModalImageLoading(true);
                  setSlideDirection("left");
                  showPrev();
                }}
              >
                <FaChevronLeft />
              </button>

              {/* Image with animation */}
              <div className="flex flex-col items-center relative w-[90vw] h-[80vh] overflow-hidden">
                {modalImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 animate-spin border-t-blue-500"></div>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage.src}
                    initial={{
                      x: slideDirection === "left" ? -300 : 300,
                      opacity: 0,
                    }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{
                      x: slideDirection === "left" ? 300 : -300,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    drag="x"
                    onDragEnd={(event, info) => {
                      const offset = info.offset.x;
                      const velocity = info.velocity.x;

                      // Swipe left (next)
                      if (offset < -100 || velocity < -500) {
                        setModalImageLoading(true);
                        setSlideDirection("right");
                        showNext();
                      }
                      // Swipe right (previous)
                      else if (offset > 100 || velocity > 500) {
                        setModalImageLoading(true);
                        setSlideDirection("left");
                        showPrev();
                      }
                    }}
                  >
                    <Image
                      src={currentImage.src}
                      alt="Prenup Photo"
                      fill
                      className={`object-contain rounded-md shadow-lg transition-opacity duration-700 ${
                        modalImageLoading ? "opacity-0" : "opacity-100"
                      }`}
                      sizes="(max-width: 768px) 100vw, 80vw"
                      onLoadStart={() => setModalImageLoading(true)}
                      onLoadingComplete={() => setModalImageLoading(false)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                className="absolute right-4 text-white text-4xl z-50 cursor-pointer"
                onClick={() => {
                  setModalImageLoading(true);
                  setSlideDirection("right");
                  showNext();
                }}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </body>
      <Footer />
    </>
  );
}

type ServerImage = { url: string };

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    "https://webcoastserver.com/phc/uploads/list_uploads.php"
  );
  const data = await res.json();

  const allImages: GalleryImage[] = data.images.map((img: ServerImage) => ({
    src: img.url,
  }));

  return {
    props: { allImages },
  };
};
