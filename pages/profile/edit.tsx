import { NextPage } from "next";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { cls, useMutation } from "@libs/index";
=======
import { useEffect } from "react";
import { useMutation } from "@libs/index";
>>>>>>> parent of 93d171d (Add image preview)

interface EditProfileForm {
  name?: string;
  email?: string;
  phone?: string;
  formErrors?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileForm>();
  const [editProfile, { data, loading }] = useMutation(`/api/users/me`);
  const [upload] = useMutation(`/api/file`);

  useEffect(() => {
    setValue("email", user?.email || "");
    setValue("phone", user?.phone || "");
    setValue("name", user?.name || "");
  }, [user, setValue]);

<<<<<<< HEAD
  const onValid = async ({ name, email, phone, avatar }: EditProfileForm) => {
=======
  const onValid = ({ name, email, phone }: EditProfileForm) => {
>>>>>>> parent of 93d171d (Add image preview)
    if (loading) return;
    if (!email && !phone)
      return setError("formErrors", {
        message: "Email OR Phone number are required. You need to choose one.",
      });

<<<<<<< HEAD
    if (avatar) {
      const form = new FormData();
      form.append("avatar", avatar[0]);

      upload(form, true);
    }

    /* if (!avatar || !avatar.length) { */
    /*   editProfile({ name, email, phone }); */
    /*   return; */
    /* } */
    /**/
    /**/
    /* editProfile({ name, email, phone, avatarUrl: "" }); */
=======
    editProfile({ name, email, phone });
>>>>>>> parent of 93d171d (Add image preview)
  };

  useEffect(() => {
    if (data && !data.ok && data.error)
      setError("formErrors", { message: data.error });
  }, [data, setError]);

  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            name
          </label>
          <input
            {...register("name", { required: false })}
            id="name"
            type="text"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            {...register("email", { required: false })}
            id="email"
            type="email"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Phone number
          </label>
          <div className="flex rounded-md shadow-sm ">
            <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
              +82
            </span>
            <input
              {...register("phone", { required: false })}
              id="input"
              type="number"
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        <span className="my-2 text-red-500 font-medium text-center block">
          {errors.formErrors?.message || null}
        </span>
        <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
          {loading ? "Loading..." : "Update Profile"}
        </button>
      </form>
    </Layout>
  );
};

export default EditProfile;
