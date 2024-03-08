import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { signIn } from "../apli-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { mutate } = useMutation(signIn, {
    onSuccess: async () => {
      console.log("User signed in");
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign in successful", type: "SUCCESS" });
      navigate("/")
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();
  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="gray text-sm font-bold flex-1">
        Email{" "}
        <input
          type="email"
          {...register("email", { required: "This field is required" })}
          className="border rounded border-black border-1 w-full py-1 px-2 font-normal"
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="gray text-sm font-bold flex-1">
        Password{" "}
        <input
          type="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be atleast 6 characters",
            },
          })}
          className="border rounded border-black border-1 w-full py-1 px-2 font-normal"
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="items-center justify-center">
        <span className="text-sm">Not Registered <Link className="underline" to="/register">
         Create an account here </Link></span>
      </span>
      <button
        type="submit"
        className="bg-blue-600 w-40 text-white font-bold p-2 hover-bg-blue-500 text-xl"
      >
        Log In
      </button>
    </form>
  );
};

export default SignIn;
