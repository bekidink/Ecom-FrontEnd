"use client"
import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "@/utils/Axios";
import SummaryApi from "@/utils/summaryApi";
import AxiosToastError from "@/utils/AxiosToastError";
import fetchUserDetails from "@/utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/store/slices/userSlice";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().email(),
  password:z.string()
});
const Login = () => {
     const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  
});
async function onSubmit(data: z.infer<typeof formSchema>) {
  try {
    const response = await Axios({
      ...SummaryApi.login,
      data: data,
    });

    if (response.data.error) {
      toast.error(response.data.message);
    }

    if (response.data.success) {
      toast.success(response.data.message);
      localStorage.setItem("accesstoken", response.data.data.accesstoken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      const userDetails = await fetchUserDetails();
      dispatch(setUserDetails(userDetails.data));

      setData({
        email: "",
        password: "",
      });
      router.push("/");
      // navigate("/");
    }
  } catch (error) {
    AxiosToastError(error);
  }
 }
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accesstoken", response.data.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setData({
          email: "",
          password: "",
        });
        // navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        {/* <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full outline-none"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link
              href={"/forgot-password"}
              className="block ml-auto hover:text-primary-200"
            >
              Forgot password ?
            </Link>
          </div>

          <button
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Login
          </button>
        </form> */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Login into Ecom</CardTitle>
            
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link
                  href={"/forgot-password"}
                  className="block ml-auto hover:text-primary-200"
                >
                  Forgot password ?
                </Link>
                <Button
                  type="submit"
                  className={` ${
                    valideValue
                      ? "bg-green-800 hover:bg-green-700"
                      : "bg-gray-500"
                  }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
                >
                  Submit
                </Button>
              </form>
            </Form>
            <p>
              Don't have account?{" "}
              <Link
                href={"/auth/register"}
                className="font-semibold text-green-700 hover:text-green-800"
              >
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Login;
