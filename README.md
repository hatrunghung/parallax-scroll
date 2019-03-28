# parallax-scroll
A component that takes user input on image URL and use parallax scrolling effect on it based on input reduced height

Props:
  - reduceHeight (number): how much "parallax" user want to see when scrolling. Range from 0 to 1
  - imgSrc (string): user input image URL

Example:
  <Parallax
    reduceHeight={1/4}
    imgSrc="put your image here" />
