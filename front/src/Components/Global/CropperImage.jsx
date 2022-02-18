import React, { useRef, useState } from 'react'
import { debounce } from 'lodash'
import Cropper from 'react-cropper'

export const CropperImage = ({ _image, setCropper }) => {
  const [image] = useState(_image)
  const cropperRef = useRef()

  const doAction = useRef(
    debounce((e) => {
      handleCrop(e)
    }, 350)
  ).current

  const handleCrop = () => {
    
    const imageElement = cropperRef?.current
    setCropper(imageElement?.cropper.getCroppedCanvas())
  }
  return (
    <Cropper
      className="cropper-component"
      dragMode="move"
      modal={true}
      zoomTo={0.5}
      initialAspectRatio={1}
      src={image}
      viewMode={1}
      minCropBoxHeight={10}
      minCropBoxWidth={10}
      background={true}
      responsive={true}
      autoCropArea={1}
      checkOrientation={false}
      crop={doAction}
      ref={cropperRef}
      guides={true}
    />
  )
}

export default CropperImage
