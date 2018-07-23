// *-* mode: rjsx -*-
import React, {Component} from 'react';
import propTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import FlatButton from 'material-ui/FlatButton';

import styles from './index.css';


export default class Upload extends Component {

    static defaultProps = {
        fileTypeRegex: /.*/,
        onFileLoad: (e) => undefined,
        buttonControl: FlatButton
    };

    static propTypes = {
        fileTypeRegex: propTypes.object,
        onFileLoad: propTypes.func,
        buttonControl: propTypes.func
    };

    exclusiveProps = [
        'fileTypeRegex',
        'onFileLoad',
        'buttonControl'
    ];

    onInputChange = (e) => {
        e.target.files
            .filter(
                (file) => file.type.match(this.props.fileTypeRegex) !== null
            )
            .forEach(
                (file) => {
                    let reader = new FileReader();
                    reader.onload = (e) => this.props.onFileLoad(e, file);
                    reader.readAsDataURL(file);
                }
            );
    };

    getButtonProps = () => {
        return Object
            .keys(this.props)
            .filter(
                (name) => this.exclusiveProps.indexOf(name) === -1
            )
            .reduce(
                (acc, name) => {
                    acc[name] = this.props[name];
                    return acc;
                },
                {}
            );
    };

    render() {
        return (
            <div className={styles.Container}>
                <this.props.buttonControl containerElement={'label'} {...this.getButtonProps()}>
                    <input
                        className={styles.FileInput}
                        type="file"
                        multiple
                        onChange={this.onInputChange}
                    />
                </this.props.buttonControl>
            </div>
        );
    };

}
