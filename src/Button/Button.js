import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';
import HighlightComponent from '../Highlight';
import FrameComponent from '../Frame';

export default class Button extends Component {

  static propTypes = {
    Animation: PropTypes.any.isRequired,
    Highlight: PropTypes.any.isRequired,
    Frame: PropTypes.any.isRequired,
    animation: PropTypes.object,
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    sounds: PropTypes.object,
    animate: PropTypes.bool,
    show: PropTypes.bool,
    layer: PropTypes.oneOf(['primary', 'secondary', 'header', 'control', 'success', 'alert', 'disabled']),
    disabled: PropTypes.bool,

    /**
     * The inside `<Frame />` level.
     */
    level: PropTypes.number,

    /**
     * Props to pass down to the `<button />` element.
     */
    buttonProps: PropTypes.object,
  }

  static defaultProps = {
    Animation: AnimationComponent,
    Highlight: HighlightComponent,
    Frame: FrameComponent,
    sounds: {},
    animate: false,
    show: true,
    layer: 'control',
    level: 2,
    disabled: false,
  }

  render () {

    const {
      Animation,
      Highlight,
      Frame,
      theme,
      classes,
      sounds,
      animation,
      animate,
      show,
      layer,
      level,
      disabled,
      className,
      buttonProps,
      children,
      ...etc
    } = this.props;
    const cls = cx(classes.root, classes[layer], className);

    return (
      <Animation
        show={show}
        animate={animate}
        timeout={theme.animTime}
        {...animation}
      >
        {anim => (
        <div
          className={cx(cls, classes[anim.status], disabled && classes.disabled)}
          onClick={this.onClick}
          {...etc}
        >
          <Frame
            hover
            animate={animate}
            show={show}
            corners={1}
            level={level}
            layer={disabled ? 'disabled' : layer}
            disabled={disabled}
          >
            <Highlight layer={layer} disabled={disabled}>
              <button
                className={classes.button}
                disabled={disabled}
                {...buttonProps}
              >
                {typeof children === 'function' ? children(anim) : children}
              </button>
            </Highlight>
          </Frame>
        </div>
        )}
      </Animation>
    );
  }

  onClick = (ev) => {
    const { disabled, onClick, animate, sounds } = this.props;

    if (!disabled) {
      onClick && onClick(ev);

      if (animate) {
        sounds.click && sounds.click.play();
      }
    }
  }
}
