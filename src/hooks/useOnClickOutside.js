import { useEffect } from "react";
function useOnClickOutside(ref, handler, eventType = "none") {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      if (eventType === "none") {
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
      } else {
        // require to work for custom event
        document.addEventListener(eventType, listener);
      }
      return () => {
        if (eventType === "none") {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        } else {
          document.addEventListener(eventType, listener);
        }
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
export default useOnClickOutside;
