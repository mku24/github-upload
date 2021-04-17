import styled from 'styled-components'
import { Button } from '@material-ui/core'

export const SidebarContainer = styled.div`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: none;
    height: fit-content;
    width: 20vw;
    min-width: 150px;
    max-width: 200px;
    z-index: 5;
    /* border: 2px solid lightgray; */
    border-radius: 5px;
`

export const MenuButton = styled(Button)`
    width: 100% !important;
    border:2px solid gray !important;
    margin-bottom: 1rem !important;
    background-color: rgba(196, 196, 196, 0.6) !important;
`

export const Subheading = styled.h5`
    text-align: center;
    margin-bottom: 1rem;
`

export const ReportFormContainer = styled.div`
    width: 40vw;
    justify-content: flex-end;
    background-color: white;
    border-radius: 5px;
    height: fit-content;
`