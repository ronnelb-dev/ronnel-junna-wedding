import { useEffect, useState } from "react";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process (adjust timing as needed)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Change duration as needed

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null; // Hide the preloader when done

  return (
    <div id="preloader">
      <div className="loading-heart">
        <svg viewBox="0 0 512 512" width="100">
          <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
        </svg>
        <div className="preloader-title">
          Ronnel
          <br />
          <small>&amp;</small>
          <br />
          Junna
        </div>
      </div>
    </div>
  );
};

export default Preloader;
