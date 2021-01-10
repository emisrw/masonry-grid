import { useRef, useEffect, useState } from "react";

const Mansonry = ({ children }) => {
  const wrapperRef = useRef(null);
  const [isDOMReady, setIsDomReady] = useState(false);

  const resizeElement = (element) => {
    if (!wrapperRef.current) {
      return;
    }

    const { current: wrapper } = wrapperRef;
    const rowHeight = Number.parseInt(
      getComputedStyle(wrapper).getPropertyValue("grid-auto-rows")
    );
    const rowGap = Number.parseInt(
      getComputedStyle(wrapper).getPropertyValue("grid-row-gap")
    );
    const spanValue = Math.ceil(
      (element.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)
    );
    if (spanValue) {
      element.style.gridRowEnd = `span ${spanValue}`;
    }
  };

  const resizeElements = () =>
    Array.from(wrapperRef.current.children).forEach((child) =>
      resizeElement(child)
    );

  useEffect(() => {
    if (!isDOMReady) {
      setIsDomReady(true);
    } else {
      resizeElements();
    }
  }, [isDOMReady, resizeElements]);

  useEffect(() => {
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver((mutationList) =>
      mutationList.forEach((mutation) => {
        if (mutation.target.tagName === "IMG") {
          mutation.target.addEventListener("load", resizeElements, false);
        }
      })
    );
    observer.observe(wrapperRef.current, config);
    window.addEventListener("resize", resizeElements);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resizeElements);
    };
  }, []);

  return (
    <div className="mansonry-grid" ref={wrapperRef}>
      {children}
    </div>
  );
};

export default Mansonry;
