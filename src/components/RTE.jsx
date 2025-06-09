import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
export default function RTE({name,control,defaultvalue,label}){
    return (
        <div className='mb-6'>
            {label && <label className='block mb-2 text-gray-700 font-medium '>{label}</label>}
            <div className='rounded-md border border-gray-300 overflow-hidden shadow-sm'>
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
        </div>
    )
}