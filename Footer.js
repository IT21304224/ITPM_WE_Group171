import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import FeedbackForm from '../FeedbackForm';

export default function App() {
  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    paddingTop: '30px', // Decreased padding
  };

  const socialIconStyle = {
    fontSize: '1.5rem',
    marginRight: '15px',
  };

  const [buttonColors, setButtonColors] = useState({
    facebook: '#fff',
    twitter: '#fff',
    instagram: '#fff',
    linkedin: '#fff',
    github: '#fff',
  });

  const handleMouseEnter = (button) => {
    setButtonColors((prevState) => ({
      ...prevState,
      [button]: 'green',
    }));
  };

  const handleMouseLeave = (button) => {
    setButtonColors((prevState) => ({
      ...prevState,
      [button]: '#fff',
    }));
  };

  return (
    <MDBFooter style={footerStyle} className='text-center text-lg-start'>
      {/* Footer content */}
      <FeedbackForm />

      <MDBContainer className='p-4'>
        <MDBRow className=''>
          {/* Left side content */}
          <MDBCol md='6' lg='7' className='text-start'>
            <h3 className='text-uppercase mb-4' style={{ fontFamily: "Montserrat", color: "white", fontWeight:"bold" }}>Fashion Elegance</h3>
            <p>
              "Fashion Elegance: Your destination for sophisticated, trendsetting styles. Discover elegance redefined with our curated collection. Visit us to elevate your fashion game today!"
            </p>
            
          </MDBCol>
          {/* Right side content */}
          <MDBCol md='6' lg='5' className='text-start'>
            <h5 className='text-uppercase mb-4'>Get connected with us</h5>
            <div>
              <MDBBtn
                href='https://facebook.com'
                color='light'
                className='me-2'
                style={{ backgroundColor: buttonColors.facebook }}
                onMouseEnter={() => handleMouseEnter('facebook')}
                onMouseLeave={() => handleMouseLeave('facebook')}
              >
                <FontAwesomeIcon icon={faFacebookF} style={socialIconStyle} />
              </MDBBtn>
              <MDBBtn
                href='https://twitter.com'
                color='light'
                className='me-2'
                style={{ backgroundColor: buttonColors.twitter }}
                onMouseEnter={() => handleMouseEnter('twitter')}
                onMouseLeave={() => handleMouseLeave('twitter')}
              >
                <FontAwesomeIcon icon={faTwitter} style={socialIconStyle} />
              </MDBBtn>
              <MDBBtn
                href='https://instagram.com'
                color='light'
                className='me-2'
                style={{ backgroundColor: buttonColors.instagram }}
                onMouseEnter={() => handleMouseEnter('instagram')}
                onMouseLeave={() => handleMouseLeave('instagram')}
              >
                <FontAwesomeIcon icon={faInstagram} style={socialIconStyle} />
              </MDBBtn>
              <MDBBtn
                href='https://linkedin.com'
                color='light'
                className='me-2'
                style={{ backgroundColor: buttonColors.linkedin }}
                onMouseEnter={() => handleMouseEnter('linkedin')}
                onMouseLeave={() => handleMouseLeave('linkedin')}
              >
                <FontAwesomeIcon icon={faLinkedin} style={socialIconStyle} />
              </MDBBtn>
              <MDBBtn
                href='https://github.com'
                color='light'
                className='me-2'
                style={{ backgroundColor: buttonColors.github }}
                onMouseEnter={() => handleMouseEnter('github')}
                onMouseLeave={() => handleMouseLeave('github')}
              >
                <FontAwesomeIcon icon={faGithub} style={socialIconStyle} />
              </MDBBtn>
              
            
            </div>
            
            
          </MDBCol>
          
        </MDBRow>
      </MDBContainer>
      {/* Bottom content */}
      <div className='text-center p-3' style={{ backgroundColor: 'black' }}>
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <p className='m-0'>
                &copy; {new Date().getFullYear()} FashionElegance.com. All rights reserved.
              </p>
            </MDBCol>
            <MDBCol>
              <p className='m-0 text-end'>
                <a href='/privacy-policy' className='text-reset'>
                  Privacy Policy
                </a>{' '}
                |{' '}
                <a href='/terms-of-service' className='text-reset'>
                  Terms of Service
                </a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        
      </div>
    </MDBFooter>
  );
}
