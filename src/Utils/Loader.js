import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import loaderanimation from "./loaderanimation.json";

const Loader = ({ size = 300 }) => {
  const loader = useSelector((store) => store.loader);
  const lottieOptions = {
    animationData: loaderanimation,
    loop: true,
    autoplay: true,
  };
  return (
    <>
      {loader?.isLoading &&
        createPortal(
          <div
            className={`
              fixed inset-0 z-50
              flex justify-center items-center bg-black bg-opacity-50
            `}
          >
            <div className="relative flex flex-col items-center">
              <Lottie
                style={{ width: `${size}px`, height: `${size}px` }}
                options={lottieOptions}
                isClickToPauseDisabled={true}
              />
              {/* <h1 className="text-white mt-4 text-lg font-semibold">
                Loading...
              </h1> */}
            </div>
          </div>,
          document.body
        )}
      {/* {children} */}
    </>
  );
};

export default Loader;
