import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import FlatButton from 'material-ui/FlatButton';

import { filter } from 'lodash';

import styles from './index.css';


export default class Upload extends Component {

    static defaultProps = {
        fileTypeRegex: /.*/,
        onFileLoad: (e) => undefined
    }

    exclusiveProps = [
        'fileTypeRegex',
        'onFileLoad'
    ]

    onInputChange = (e) => {
        filter(
            e.target.files,
            (file) => file.type.match(this.props.fileTypeRegex) !== null
        )
            .forEach(
                (file) => {
                    let reader = new FileReader();
                    reader.fileName = file.name
                    reader.onload = this.props.onFileLoad;
                    reader.readAsDataURL(file);
                }
            );
    }

    componentDidMount() {
        findDOMNode(this.refs['file-input'])
            .addEventListener(
                'change',
                this.onInputChange,
                false
            );
    }

    componentWillUnmount() {
        findDOMNode(this.refs['file-input'])
            .removeEventListener(
                'change',
                this.onInputChange,
                false
            );
    }

    getControlProps() {
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
    }

    render() {
        return (
            <div className={styles.Container}>
              {
                  React.cloneElement(
                      (
                          <FlatButton
                            containerElement='label'
                            className={styles.Control}
                            >
                            <input
                              className={styles.FileInput}
                              type="file"
                              ref="file-input"
                              multiple
                              />
                          </FlatButton>
                      ),
                      this.getControlProps()
                  )
              }
            </div>
        );
    }

}
