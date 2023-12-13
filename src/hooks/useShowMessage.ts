import useToastify from './useToastify';

const useShowMessage = () => {
  const notify = useToastify();

  return (msg: { body: string; error: boolean }) => {
    if (msg.body !== '') {
      msg.error ? notify({ error: msg.body }) : notify({ success: msg.body });
    }
  };
};

export default useShowMessage;
