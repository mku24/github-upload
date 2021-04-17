import React from 'react'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core';
import MyLocationIcon from '@material-ui/icons/MyLocation';

const LocateButtonContainer = styled.div`
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;
    z-index: 5;
`

const StyledMyLocationIcon = styled(MyLocationIcon)`
    height: 60px !important;
    width: 60px !important;
`

const Locate = ({action}) => {
    return (
        <LocateButtonContainer>
            <IconButton onClick={action}>
                <StyledMyLocationIcon />
            </IconButton>
        </LocateButtonContainer>
    )
}

export default Locate
