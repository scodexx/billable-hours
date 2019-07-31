import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import globals from '../globals'

export default class Uploader extends Component {
    static propTypes = {
        accept: PropTypes.string,
        maxSizePerFile: PropTypes.number,
        uploadStarted: PropTypes.func,
        uploadComplete: PropTypes.func,
    }

    static defaultProps = {
        accept: '.csv',
        maxSizePerFile: 2097152,
        uploadStarted: () => {},
        uploadComplete: () => {},
    }

    state = {
        file: null,
        isHovering: false,
        isDroppable: false,
        generalError: false,
        uploadError: null,
        uploadMessage: null,
        isUploading: false,
        progress: 0,
    }

    _setHovering = bool => this.setState({
        isHovering: bool === true,
    })
    _setDroppable = bool => this.setState({
        isDroppable: bool === true,
    })

    _dragEnter = ev => {
        ev.preventDefault();
        ev.stopPropagation();

        this._setDroppable(true);
        this._setHovering(true);
    }
    _dragOver = ev => {
        ev.preventDefault();
        ev.stopPropagation();

        this.setState({generalError: false});
        this._setDroppable(true);
        this._setHovering(true);
    }
    _dragLeave = ev => {
        ev.preventDefault();
        ev.stopPropagation();

        this._setDroppable(false);
        this._setHovering(false);
    }
    _dragDrop = ev => {
        ev.preventDefault();
        ev.stopPropagation();

        this._setDroppable(false);
        this._setHovering(false);
        this._inspectFile(ev.dataTransfer.files[0])
    }

    _fileChange = ev => this._inspectFile(ev.target.files[0], () => this.fileInput.value = '')

    _inspectFile = (file, cb) => {
        if(!file) return 'function' === typeof cb && cb();

        const ext = file.name.split('.').pop();
        const allowedExts = this.props.accept.split(',').map(ext => ext.trim()).filter(Boolean);
        const sizeError = file.size >= this.props.maxSizePerFile;
        const extError = !allowedExts.includes(`.${ext.toLowerCase()}`);

        if(sizeError || extError) {
            this.setState({
                generalError: true,
                uploadError: sizeError ? `You cannot upload a file larger than 2MB.` : extError ? `Allowed files are (${allowedExts.join(', ')}) are allowed.` : ``,
            }, () => 'function' === typeof cb && cb());
        } else {
            this.setState({
                uploadError: null,
                uploadMessage: null,
                generalError: false,
                file: file,
            }, () => {
                if(cb === false) return

                this.upload()
            });
        }
    }

    upload() {
        const { file } = this.state

        this.setState({
            isUploading: true
        })

        this.props.uploadStarted()

        const data = new FormData();
        data.append('docFile', file);

        return axios.post(`${globals.dev_api}/upload/process-timesheet`, data, {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent
                const progress = (loaded / total) * 100
                this.setState({ progress })
            }
        }).then(response => {
            const e = response.data
            const status = e && e.status === 'ok'
            status && this.props.uploadComplete(e.data)
        }).finally(() => this.setState({
            progress: 0,
            isUploading: false,
        }))
    }

    render() {
        const { generalError, isHovering, isDroppable, isUploading, progress } = this.state

        return (
            <div 
                className={`upload__container ${generalError ? `upload__container--undroppable` : ``} ${isHovering ? isDroppable ? `upload__container--droppable` : `upload__container--undroppable` : ``}`}
                onDragOver={this._dragOver} 
                onDragEnter={this._dragEnter} 
                onDragLeave={this._dragLeave} 
                onDrop={this._dragDrop}>

                <div className="centered">
                    <div className="centered__content">
                        <div className="upload__illustrator text-center">
                            <i className="ion ion-ios-document" />
                        </div>

                        <h6 className="text-center">Drag and drop or click here to add a csv timesheet</h6>

                        <div className={`progress__custom ${isUploading ? 'progress__custom--active' : ''}`}>
                            <div className="progress__inner" style={{width: `${progress}%`}}></div>
                        </div>
                    </div>
                </div>

                <input 
                    className="upload__fileinput"
                    ref={n => this.fileInput = n} 
                    type="file" 
                    disabled={isUploading}
                    accept={this.props.accept} 
                    onChange={this._fileChange} />
            </div>
        )
    }
}