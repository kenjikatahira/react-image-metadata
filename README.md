# React Image Metadata

A react component to extract metadata from a image


![](https://img.shields.io/badge/Code-Javascript-informational?style=flat&logo=javascript&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Code-React-informational?style=flat&logo=react&logoColor=white&color=2bbc8a)

# How to use

With `<img>` tag :
```js
    <ImageMetadata>
        <img 
            src={src} 
            alt="Image with metadata"
            onMetadata={onMetadataCallback}
            onError={onErrorCallback}
        />
    </ImageMetadata>
```

With attribute src :

```js
    <ImageMetadata 
        src={src} 
        onMetadata={onMetadataCallback}
        onError={onErrorCallback}
    />
```

# Examples

[Live Example](https://kenjikatahira.github.io/react-image-metadata/)

```js
import React from 'react';
import { ImageMetadata } from 'react-image-metadata';

const App = () => {
    const onMetadata => (metadata) {
        // Handles metadata response
    } 
    const onError => (error) {
        // Handles error
    } 
    return (
        <>
            <ImageMetadata>
                <img 
                    src={src} 
                    alt="Image with metadata"
                    onMetadata={onMetadata}
                    onError={onError}
                />
            </ImageMetadata>
        </>        
    )
}
```

## Remote Images

Make sure to configure your server or you may have some CORS issues.