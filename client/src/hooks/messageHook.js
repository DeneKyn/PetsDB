import { useCallback } from "react";
import { toast } from "react-toastify";

export const useMessage = () => {
  return useCallback((text, type = "error") => {
    console.log(text);
    if (text && type === "error") {
      toast.error(`${text}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (text && type === "info") {
      toast.info(`${text}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);
};
