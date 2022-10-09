import ImageUploading from "react-images-uploading";
//https://www.npmjs.com/package/react-images-uploading
const ImageUpload = ({images, onChange, maxNumber})=>{
    return (
    <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg","png"]}
        >
        {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
        }) => (
            // write your building UI
            <div className="upload__image-wrapper">
            <button
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
            >
                Click or Drop here
            </button>
            &nbsp;
            {imageList.map((image, index) => (
                <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
                </div>
            ))}
            </div>
        )}
        </ImageUploading>
    )
}
export default ImageUpload;