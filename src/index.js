import * as React from 'react';
import exifr from 'exifr';

class ImageMetadata extends React.Component {
    static  defaultProps = {
        onMetadata: () => {},
        onError: () => {},
        src : '',
        rotate : false
    }

    componentDidMount = () => {
        if(this.props.src) {
            this.parse(this.props.src,this.props)
        } else if(this.props.children) {
            this.parse(this.props.children.props.src,this.props)
        } else {
            console.info('react-image-metadata : No image provided.')
        }
    }

    componentDidUpdate = (props) => {
        if(this.props.src) {
            this.parse(this.props.src,this.props)
        } else if(this.props.children.props.src && (props.children.props.src !== this.props.children.props.src)) {
            this.parse(this.props.children.props.src,this.props)
        }
    }

    parse = (image,props) => {
        exifr.parse(image)
        .then(output => {
            props.onMetadata(this.getOutput(output))
        })
        .catch(error => {
            props.onError(error)
        });
    }

    getOutput = (output) => {
        // making some options filters ?
        return output
    }

    render() {
        const size = React.Children.count(this.props.children)
        
        if(size > 1) {
            throw new Error('It can have only one image at time.')
        } else if( size === 1 ) {
            if(this.props.children.type !== 'img') {
                throw new Error('Component expects a image element or src')
            } else if ( size === 1 && this.props.children.type === 'img') {
                return this.props.children
            } 
        }

        return null;
    }
}

export default ImageMetadata;
