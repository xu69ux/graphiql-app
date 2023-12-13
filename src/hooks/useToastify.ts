import { toast } from 'react-toastify';

interface IToastify {
  error?: string;
  success?: string;
}

const useToastify = () => {
  const notify = (message: IToastify) =>
    message.error ? toast.error(message.error) : toast.success(message.success);

  return notify;
};

export default useToastify;
