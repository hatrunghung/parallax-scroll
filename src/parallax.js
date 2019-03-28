import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Parallax extends Component {
  static propTypes = {
    imgSrc: PropTypes.string.isRequired,
    reduceHeight: PropTypes.number.isRequired,
    onLoad: PropTypes.func,
    style: PropTypes.object
  }

  state = {
    parentHeight: 'auto',
    transformY: 0,
    imageHeight: 0,
  }

  componentDidMount() {
    const { reduceHeight } = this.props;
    if (reduceHeight > 1 || reduceHeight < 0) {
      return console.error('insufficient reduceHeight (0 < reduceHeight < 1)')
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reduceHeight !== this.props.reduceHeight) {
      this.setState(({ imageHeight }) => ({
        parentHeight: imageHeight * (1 - this.props.reduceHeight)
      }))
    }
  }

  onLoad = ({ target: { clientHeight } }) => {
    if (this.props.onLoad) this.props.onLoad()
    window.addEventListener('scroll', this.onScroll)
    this.setState({
      parentHeight: clientHeight * (1 - this.props.reduceHeight),
      imageHeight: clientHeight
    })

    this.onScroll()
  }

  inRange = (min, max, val) => {
    return Math.min(Math.max(val, min), max);
  }

  onScroll = () => {
    this.setState((state, props) => {
      const { reduceHeight } = props;
      const { parentHeight } = state;
      const ratio = this.inRange(
        0,
        1,
        (this.container.getBoundingClientRect().top + parentHeight) / (window.innerHeight + parentHeight)
      )

      const transformY = ratio * reduceHeight - reduceHeight;
      return {
        transformY: transformY
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const { imgSrc, reduceHeight, onLoad, style, ...rest } = this.props;
    const { parentHeight, transformY } = this.state;
    return (
      <div
        ref={(elem) => this.container = elem}
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: parentHeight || 'auto'
        }}
      >
        <img
          alt="this is input image"
          style={{
            ...style,
          width: '100%',
          transform: `translate(0, ${transformY * 100}%)`
          }}
          src={imgSrc}
          onLoad={this.onLoad}
          {...rest}
        />
      </div>
    )
  }
}

