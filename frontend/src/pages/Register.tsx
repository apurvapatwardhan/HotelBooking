import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apli-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { register, watch, handleSubmit, formState } =
    useForm<RegisterFormData>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(apiClient.register, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({
        message: "Registration Successful",
        type: "SUCCESS",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });
  const { errors } = formState;

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="gray text-sm font-bold flex-1">
          First Name{" "}
          <input
            {...register("firstName", { required: "This field is required" })}
            className="border-black border border-1 rounded w-full py-1 px-2 font-normal"
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="gray text-sm font-bold flex-1">
          Last Name{" "}
          <input
            {...register("lastName", { required: "This field is required" })}
            className="border rounded border-black border-1 w-full py-1 px-2 font-normal"
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className="gray text-sm font-bold flex-1">
        Confirm Password{" "}
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "this field is required";
              } else if (watch("password") !== val) {
                return "The passwords dont match";
              }
            },
          })}
          className="border rounded border-black border-1 w-full py-1 px-2 font-normal"
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <button type ="submit"  className="bg-blue-600 text-white font-bold p-2 hover-bg-blue-500 text-xl">
          Create Account
        </button>
    </form>
  );
};

export default Register;
