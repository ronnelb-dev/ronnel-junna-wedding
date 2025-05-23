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
  const [showVideoModal, setShowVideoModal] = useState(false);
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
            <p className="text-gray-600 text-lg mb-2">OR</p>
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

          <div className="max-w-4xl mx-auto mb-10 space-y-2">
            {Object.entries(uploadProgress).map(([name, percent]) => (
              <div key={name}>
                <p className="text-sm text-gray-700">{name}</p>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-blue-500 h-2 rounded"
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
                onClick={() => showImage(img)}
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
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
              <button
                className="absolute top-4 right-6 text-white text-3xl z-50 cursor-pointer"
                onClick={closeModal}
              >
                <FaTimes />
              </button>

              <button
                className="absolute left-4 text-white text-4xl z-50 cursor-pointer"
                onClick={showPrev}
              >
                <FaChevronLeft />
              </button>

              <div className="flex flex-col items-center">
                <div className="relative w-[90vw] h-[80vh]">
                  <Image
                    src={currentImage.src}
                    alt="Wedding Photo"
                    fill
                    className="object-contain rounded-md shadow-lg"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
              </div>

              <button
                className="absolute right-4 text-white text-4xl z-50 cursor-pointer"
                onClick={showNext}
              >
                <FaChevronRight />
              </button>
            </div>
          )}

          {showVideoModal && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
              <button
                className="absolute top-4 right-4 text-white text-3xl md:text-4xl z-50 cursor-pointer"
                onClick={() => setShowVideoModal(false)}
              >
                <FaTimes />
              </button>

              <div className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/c-LAhOIwb-E?autoplay=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </body>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    "https://webcoastserver.com/phc/uploads/list_uploads.php"
  );
  const data = await res.json();

  const allImages: GalleryImage[] = data.images.map((img: any) => ({
    src: img.url,
  }));

  return {
    props: { allImages },
  };
};
