import React from 'react'

import Container from '../components/global/Container'
import Grid from '../components/global/Grid'


export default ({ children }) => {

  return (
<Container>
     <Grid>

     {children}
     </Grid>

</Container>
  )
}
