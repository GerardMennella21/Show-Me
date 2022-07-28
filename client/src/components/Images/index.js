import React from 'react'
import { Image } from '@chakra-ui/react'

const Images = ({images}) => {
    return (
        <div>
        {images &&
            images.map(image => (
                <div className='caption'>
                <Image
                boxSize='200px'
                objectFit='cover'
                src='http://placecorgi.com/200'
                alt='Sample Image'
                />
                {image.imageText}
                <p>By {image.username}</p>
                </div>
                
            
            ))
        }
        </div>
            
    )
}

export default Images;