import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input, Button, Select, RTE } from "./index";

function Postform({ post }) {
  const { register, handleSubmit, watch, setValue, control, reset, getValues } =
    useForm();
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.auth.userData);
  const [error, setError] = useState();

  const submit = async (data) => {
    try {
      if (post) {
        const file = await service.uploadFile(data.image[0]);
        if (file) {
          service.deleteFile(post.featuredImage);
        }
        const dbpost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      } else {
        const file = await service.uploadFile(data.image[0]);
        const dbpost = await service.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userdata.$id,
        });
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    } catch (err) {
      setError(
        "There is another blog already existing with the same Title. Please change your title a little bit and try again. Thanks"
      );
      console.log(err);
    }
  };

  const slugTransform = (value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g, "-");
    }
  };

  useEffect(() => {
    if (post) {
      // Reset form values and explicitly set the slug field
      reset({
        title: post.title,
        slug: post.$id,
        content: post.content,
        status: post.status,
      });
    }
  }, [post, reset, setValue]);

  useEffect(() => {
    const subscribe = watch((values, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(values.title));
      }
    });

    return () => {
      subscribe.unsubscribe();
    };
  }, [watch, setValue]);

  return (
    <div className="bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-7xl bg-white p-8 rounded-xl shadow">
        <form onSubmit={handleSubmit(submit)} className="flex">
          <div className="w-2/3">
            <div className="mx-2">
              <Input
                label="Title:"
                placeholder="Title"
                className=" w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("title", { required: true })}
              />
              <Input
                label="Slug:"
                placeholder="Slug"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value));
                }}
              />
            </div>
            <RTE
              label="Content:"
              name="content"
              control={control}
              defaultvalue={getValues("content")}
            />
          </div>
          <div className="w-1/3">
            <Input
              label="Featured Image:"
              type="file"
              className="w-full border border-gray-300 rounded-md px-2 py-2 bg-white focus:outline-none"
              accept="image/png, image/jpg, image/jpeg"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="my-4 w-auto mx-2">
                <img
                  className="rounded-3xl"
                  src={service.getFilePreview(post.featuredImage)}
                  alt="Featured"
                />
              </div>
            )}
            <Select
              label="Status:"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              options={["active", "inactive"]}
              {...register("status")}
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="text-center mt-6">
              <Button
                type="submit"
                bgColor="bg-blue-600"
                textColor="text-white"
                className=" hover:bg-blue-700  font-semibold px-6 py-2 rounded-md shadow transition"
              >
                {post ? "Update" : "Post"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Postform;
