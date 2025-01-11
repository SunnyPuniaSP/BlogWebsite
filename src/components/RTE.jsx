import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
export default function RTE({name,control,defaultvalue,label}){
    return (
        <div className='h-screen w-auto mx-2 my-4'>
            <div className='flex justify-center'>{label && <label className='text-xl '>{label}</label>}</div>
            <Controller 
                name={name}
                control={control}
                render={({field:{onChange}})=>(
                    <Editor
                        apiKey='enpnkm0ffuxegqb2ocqdi5es0o7gkg1owiflodgvmdt53xam'
                        initialValue={defaultvalue}
                        init={{
                            branding:false,
                            menubar:true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                              ],
                            toolbar:'undo redo | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | help'
                        }}
                        onEditorChange={onChange} 
                    />
                )}
            />
        </div>
    )
}