import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const showToastMessage = (text,type) => {
    if(type==="success"){
      toast.success(text);
  }
  else if(type==="error"){
      toast.error(text);
  }
  else if(type==="warning"){
      toast.warning(text);
  }
  else if(type==="info"){
      toast.info(text);
  }
  else if(type==="dark"){
      toast.dark(text);
  }
  else if(type==="default"){
      toast(text);
  }
  else{
      toast(text);
  }
  };

export default showToastMessage