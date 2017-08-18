// *-* mode: rjsx -*-
import React, {Component} from 'react';
import propTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import {filter, assign} from 'lodash';

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
        filter(
            e.target.files,
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

    componentDidMount() {
        findDOMNode(this.refs['file-input'])
            .addEventListener(
                'change',
                this.onInputChange,
                false
            );
    };

    componentWillUnmount() {
        findDOMNode(this.refs['file-input'])
            .removeEventListener(
                'change',
                this.onInputChange,
                false
            );
    };

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
    };

    render() {
        console.log(assign(
            {
                containerElement: 'label',
                className: styles.Control
            },
            this.getControlProps()
        ));
        return (
            <div className={styles.Container}>
              {
                  React.createElement(
                      this.props.buttonControl,
                      assign(
                          {
                              containerElement: 'label',
                              className: styles.Control
                          },
                          this.getControlProps()
                      ),
                      (
                          <input
                              className={styles.FileInput}
                              type="file"
                              ref="file-input"
                              multiple
                              />
                      )
                  )
              }
            </div>
        );
    };

}
