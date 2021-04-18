import React, { useState } from 'react'
import fire from '../fire'
import styled from 'styled-components'
import Modal from 'react-modal'


import { SidebarContainer, MenuButton, Subheading, ReportFormContainer } from './SidebarElements'
import Report from './Report'
import ReportForm from './ReportForm'

const handleLogout = () => {
    fire.auth().signOut();
}


const Sidebar = ({marker}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    console.log(marker)

    return (
        <SidebarContainer>

            
            
            <MenuButton onClick={handleLogout}>
                Logout
            </MenuButton>
            <Subheading>Have something to report?</Subheading>
            {marker.length > 0  && 
                <MenuButton onClick={()=>setModalIsOpen(true)}>
                    Report
                </MenuButton>
            }
            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(false)}>
                <ReportForm marker={marker} util={setModalIsOpen}/>
                {/* <button onClick={()=>setModalIsOpen(false)}>close</button> */}
            </Modal>
            {/* <ReportFormContainer>
                <ReportForm />
            </ReportFormContainer> */}
        </SidebarContainer>
    )
}

export default Sidebar
