import toast from "react-hot-toast";
import { COLOR } from "../Themes/Color";

export const toastHandler = (result: string, text: string) => {
  switch (result) {
    case "success":
      toast.success(text, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: `${COLOR.TOAST}`,
          color: `${COLOR.WHITE}`,
        },
      });
      break;
    case "error":
      toast.error(text, {
        style: {
          borderRadius: "10px",
          background: `${COLOR.TOAST}`,
          color: `${COLOR.WHITE}`,
        },
      });
      break;
    default:
      return;
  }
};
