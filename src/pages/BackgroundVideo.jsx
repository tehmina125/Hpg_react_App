const BackgroundVideo = () => {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/background2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <h2 className="text-pink-600 text-4xl font-bold">Experience the Best Auto Repair Services</h2>
        </div>
      </div>
    );
  };
  
  export default BackgroundVideo;
  