import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import './Banner.css';
//import bgImage from './bg_image_comp.jpg'


const Banner = () => {
  return (
    <div className='Banner'>
        <Container className="Banner-Content">
            <div className='Banner-Title'>
                <Typography 
                variant="h2"
                style={{
                    marginBottom: 15,
                    fontWeight: "bold",
                    fontFamily: "Inter",
                }}
                >
                    Crypto Watch
                </Typography>
                <Typography
                variant="subtitle2"
                style={{
                    color: 'darkgrey',
                    fontFamily: 'Inter',
                    textTransform: 'capitalize',

                }}
                >
                    Get all info regarding your favourite crypto
                </Typography>
            </div>
        </Container>
    </div>
  )
}

export default Banner