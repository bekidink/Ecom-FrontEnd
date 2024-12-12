"use client"
import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "@/utils/Axios";
import SummaryApi from "@/utils/summaryApi";
import AxiosToastError from "@/utils/AxiosToastError";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const formSchema = z.object({
    name:z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword:z.string()
});
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //   const navigate = useNavigate();
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
});
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
    async function onSubmit(data: z.infer<typeof formSchema>) {
   try {
     const response = await Axios({
       ...SummaryApi.register,
       data: data,
     });

     if (response.data.error) {
       toast.error(response.data.message);
     }

     if (response.data.success) {
       toast.success(response.data.message);
       setData({
         name: "",
         email: "",
         password: "",
         confirmPassword: "",
       });
       // navigate("/login");
     }
   } catch (error) {
     AxiosToastError(error);
   }
}
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("password and confirm password must be same");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        // navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Welcome to Ecom</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
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
              Already have account ?{" "}
              <Link
                href={"/auth/login"}
                className="font-semibold text-green-700 hover:text-green-800"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
        
      </div>
    </section>
  );
};

export default Register;
