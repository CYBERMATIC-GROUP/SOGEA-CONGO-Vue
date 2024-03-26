import { toast, type ToastOptions } from 'vue3-toastify';

const getSuccess = (message: string) => {
    toast(message, {
      autoClose: 3000,
      type: 'success',
      transition: 'flip',
      position: toast.POSITION.TOP_RIGHT,
    } as ToastOptions);}

    const getError = (message: string) => {
      toast(message, {
        autoClose: 3000,
        type: 'error',
        transition: 'flip',
        position: toast.POSITION.TOP_RIGHT,
      } as ToastOptions);}

export {getSuccess,getError}