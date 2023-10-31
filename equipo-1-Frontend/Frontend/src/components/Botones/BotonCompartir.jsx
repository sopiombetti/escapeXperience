import React, { useState } from 'react'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton, FacebookIcon, WhatsappIcon, TwitterIcon, LinkedinIcon} from "react-share";


const BotonCompartir = ({adventure}) => {
  const [showSocialButtons, setShowSocialButtons] = useState(true)
  const url = window.location.href

  const handleToggle = () => {
    setShowSocialButtons(!showSocialButtons)
  }
  return (
    <div className='flex flex-col items-center'>
      <button className='px-0 mb-1' onClick={handleToggle}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      </button>
      <div className={showSocialButtons ? 'invisible flex items-center justify-between mx-2' : 'flex items-center justify-between mx-2'}>
        
        <WhatsappShareButton
          url={url}
          title='Mira esta aventura de la página EscapeXperience'
          separator=' - '
        >
          <WhatsappIcon size={32} round/>
        </WhatsappShareButton>

        <FacebookShareButton
          className='m-1'
          url={url}
          title='Mira esta aventura de la página EscapeXperience'
          hashtag='#EscapeXperience'
          media={adventure.imagenes[0].url}
        >
          <FacebookIcon size={32} round/>
        </FacebookShareButton>
        
        <LinkedinShareButton
          url={url}
          title='EscapeXperience'
          summary='Mira esta aventura de la página EscapeXperience'
        >
          <LinkedinIcon size={32} round/>
        </LinkedinShareButton>
        
        <TwitterShareButton
          className='m-1'
          url={url}
          title='Mira esta aventura de la página EscapeXperience'
          hashtag='#EscapeXperience'
          >
          <TwitterIcon size={32} round/>
        </TwitterShareButton>
      </div>
    </div>
  )
}

export default BotonCompartir