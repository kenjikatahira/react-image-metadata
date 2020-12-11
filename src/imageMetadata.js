import React from 'react';
import exifr from 'exifr'

// <img> | image path | blog
type Image = HTMLElement | string | Blob

type Props = {
  onError: (err: Object) => void,
  onMetadata: (metadata: Array<string | number>) => {},
  src: string,
  rotate : Boolean,
  children?: React.Node
}

class ImageMetadata extends React.Component<Props, void> {
    static defaultProps = {
        onError: (error: Object) => {},
        onMetadata: (metadata: Object) => {},
        src: null,
        rotate: false
    }

    componentDidMount() {
        if(this.props.children.props.src) {
            this.parse(this.props.children.props.src,this.props);
        } else if(this.props.src) {
            this.parse(this.props.src,this.props);
        } else {
            console.info('react-image-metadata : No image provided.');
        }
    }

    componentDidUpdate(props: Props) {
        if(this.props.children.props.src) {
            this.parse(this.props.children.props.src,this.props);
        } else if(this.props.src) {
            this.parse(this.props.src,this.props);
        } else {
            throw new Error('No image provided.')
        }
    }

    parse(image: Image,props: Props) {
        exifr.parse(image)
            .then(output => {
                props.onMetadata(this.getOutput(output));
            })
            .catch(error => {
                props.onError(error)
            });
    }

    getOutput(output: Object) {
        // making some options filters ?
        return output;
    }

    render() {
        const size = React.Children.count(this.props.children);

        if(size > 1) {
            throw new Error('It can have only one image at time.')
        } else if(this.props.children.type !== 'img') {
            throw new Error('Component expects a image element , src or blob.')
        } else if ( size === 1 && this.props.children.type === 'img') {
            return this.props.children
        } 

        return null;
    }
}

export default ImageMetadata;