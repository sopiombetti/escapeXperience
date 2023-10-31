import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const DemoCarousel = ({img}) => {
  return (
    <Carousel infiniteLoop showThumbs>
        {img.map((image) => (
          <div className='carousel-img'>
            <img src={image.url} />
          </div>
        ))}
    </Carousel>
  )
}

export default DemoCarousel