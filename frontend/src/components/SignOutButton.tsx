
import { useMutation, useQueryClient } from "react-query";
import { signOut } from "../apli-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Logged Out Successfully", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      console.log(error);
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const signOutHandler = () => {
    mutate();
  };
  return (
    <button
      onClick={signOutHandler}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 "
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
