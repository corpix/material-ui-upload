// *-* mode: rjsx -*-
import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Card, CardHeader, CardMedia, CardActions} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FlatButton from 'material-ui/FlatButton';
import {SHA1} from 'jshashes';

import Upload from 'material-ui-upload/Upload';

import styles from './index.css';


export default class UploadPreview extends Component {

    static defaultProps = {
        title: '',
        label: 'Upload',
        fileTypeRegex: /^image.*$/,
        onFileLoad: (e, file) => undefined,
        onChange: (items) => undefined,
        initialItems: {}
    };

    static propTypes = {
        title: propTypes.string,
        label: propTypes.string,
        fileTypeRegex: propTypes.object,
        onFileLoad: propTypes.func,
        onChange: propTypes.func,
        initialItems: propTypes.object
    };

    control = (
        <Upload onFileLoad={this.onFileLoad}/>
    );

    exclusiveProps = [
        'title',
        'children',
        'onFileLoad',
        'initialItems'
    ];

    constructor(props) {
        super();
        this.state = {items: props.initialItems};
    };

    onFileLoad = (e, file) => {
        let hash = new SHA1().hex(e.target.result);
        let items = {...this.state.items};
        items[hash] = e.target.result;
        this.setState({items});

        this.props.onFileLoad(e, file);
        this.props.onChange(items);
    };

    onRemoveAllClick = (e) => {
        let items = {};
        this.setState({items});
        this.props.onChange(items);
    };

    onRemoveClick = (key) => (e) => {
        let items = {...this.state.items};
        delete items[key];
        this.setState({items});
        this.props.onChange(items);
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
                {onFileLoad: this.onFileLoad}
            );
    };

    renderPreview = (key) => (
        <div key={key} className={styles.PreviewContainer}>
          <img src={this.state.items[key]} className={styles.Image}/>
          <FloatingActionButton
            className={styles.RemoveItem}
            mini={true}
            onClick={this.onRemoveClick(key)}
            >
            <ContentRemove/>
          </FloatingActionButton>
        </div>
    );

    renderPreviews = () => (
        <div className={styles.PreviewsContainer}>
          {
              Object
                  .keys(this.state.items)
                  .map(this.renderPreview)
          }
        </div>
    );

    render() {
        return (
            <Card>
              <CardHeader title={this.props.title}/>
              <CardMedia>
                {this.renderPreviews()}
              </CardMedia>
              <CardActions>
                <div className={styles.ActionsContainer}>
                  {
                      React.cloneElement(
                          this.control,
                          this.getControlProps()
                      )
                  }
                  <FlatButton
                    label="Remove all"
                    style={
                        {
                            visibility: Object.keys(this.state.items).length
                                ? 'visible'
                                : 'hidden'
                        }
                    }
                    onClick={this.onRemoveAllClick}
                    />
                </div>
              </CardActions>
            </Card>
        );
    };
}
