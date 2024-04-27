import React, { useState } from 'react'

import ModalAgreementComponent from '../ModalAgreementComponent'
import ModalContext from './context'

const renderModals = (modalContext) => {
    if (!modalContext) {
        return <></>
    }

    const { modalType, ...modalProps } = modalContext
    switch (modalType) {
        case 'downloadAgreementModal':
            return <ModalAgreementComponent {...modalProps} />
    }
    return <></>
}

const RootModalsComponent = ({ children }) => {
    const [modalsRootArray, setModalsRootArray] = useState([])

    return (
        <ModalContext.Provider value={{ modalRootState: modalsRootArray, setModalsRootArray }}>
            {renderModals(modalsRootArray.shift())}
            {children}
        </ModalContext.Provider>
    )
}
export default RootModalsComponent
