// ImageSkeleton component
const ImageSkeleton = ({ className, sizes, fill }: any) => {
  // Optional: Adjust the skeleton style based on the 'sizes' or 'fill' props
  let skeletonStyle = {};

  if (fill) {
    skeletonStyle = { width: '100%', height: '100%' };
  } else {
    // Example adjustment, you may need to customize this logic based on your actual size handling
    if (sizes === '1000px') {
      skeletonStyle = { width: '1000px', height: 'auto' };
    } else if (sizes === '600px') {
      skeletonStyle = { width: '600px', height: 'auto' };
    }
    // Add more conditions as necessary based on how you decide the dimensions
  }

  return (
    <div className={`animate-pulse bg-gray-200 ${className}`} style={skeletonStyle}>
      {/* You can add additional markup here if you want to simulate more details of the image */}
    </div>
  );
};

export default ImageSkeleton;
