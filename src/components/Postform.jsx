import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Input, Button, Select, RTE } from './index';

function Postform({ post }) {
    const { register, handleSubmit, watch, setValue, control, reset } = useForm();
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
                'There is another blog already existing with the same Title. Please change your title a little bit and try again. Thanks'
            );
            console.log(err);
        }
    };

    const slugTransform = (value) => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d]+/g, '-');
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
            if (name === 'title') {
                setValue('slug', slugTransform(values.title));
            }
        });

        return () => {
            subscribe.unsubscribe();
        };
    }, [watch, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex">
            <div className="w-2/3">
                <div className="mx-2">
                    <Input
                        label="Title:"
                        placeholder="Title"
                        className="w-2/3"
                        {...register('title', { required: true })}
                    />
                    <Input
                        label="Slug:"
                        placeholder="Slug"
                        className="w-2/3"
                        {...register('slug', { required: true })}
                        onInput={(e) => {
                            setValue('slug', slugTransform(e.currentTarget.value));
                        }}
                    />
                </div>
                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultvalue={post?.content || ''}
                />
            </div>
            <div className="w-1/3">
                <Input
                    label="Featured Image:"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    {...register('image', { required: !post })}
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
                    options={['active', 'inactive']}
                    {...register('status')}
                />
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex justify-center">
                    <Button
                        type="submit"
                        className="my-10 px-20 py-4 bg-blue-600 rounded-2xl"
                    >
                        {post ? 'Update' : 'Post'}
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default Postform;
