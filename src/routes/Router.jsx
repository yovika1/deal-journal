import React from 'react'
import { Route, Routes } from 'react-router-dom';

// import Cookies from 'js-cookie'
import { Home } from '../pages/Home';
import { BlogDetail } from '../pages/BlogDeatils';
import { BlogList } from '../pages/BlogList';
import { OffersPage } from '../pages/OfferPage';
import { Box } from '@mui/material';
import { FreeSkincareGuide } from '../pages/FreeSkincareGuide';

  export const Auth = ({bgcolor}) => {
    // const isAuthenticated = Cookies.get('token') || false;
    return (
       <Box
      sx={{
        bgcolor: bgcolor,   // takes the prop
        minHeight: "100vh", // full page height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Routes>


        {/* {!isAuthenticated ? ( */}
          {/* <> */}
          <Route path='/' element={<Home/>}/>
          <Route path="/getBlogs/:id" element={<BlogDetail />} />
          <Route path='/bloglistpage' element={<BlogList/>}/>
          <Route path='/explore-offers' element={<OffersPage/>}/>
          <Route path='/free-skincare' element={<FreeSkincareGuide/>}/>


          {/* </> */}
        {/* // ):(
        //   <Route path='/' />
        // )} */}
      </Routes>
      </Box>
    )
  }
