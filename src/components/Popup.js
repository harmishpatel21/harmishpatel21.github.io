import React from 'react';
import Modal from 'react-modal';
import ModalButton from './modal-button';
import style from './style.css';

class Popup extends React.Component {
    constructor() {
        super();

        this.state = { modelOpened: false },
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState(prevState => ({
            modalOpened: !prevState.modalOpened
        }));
    }

    render() {
        const {data} = this.props;
        return(
            <div className={style.modalWrapper}>
                <ModalButton handleClick={this.toggleModal}>
                    clicl to open modal
                </ModalButton>
                <Modal
                    className={{ base: [style.base] }}
                    overlayClassName={{ base: [style.overlayBase] }}
                    isOpen={this.state.modalOpened}
                    onRequestClose={this.toggleModal}
                    contentLabel="Modal with image"
                    >
                        <img
                        onClick={this.toggleModal}
                        alt = 'image'/>
                        <span className={style.text}>{data.description}</span>

                </Modal>
            </div>
        );
    }
}


export default function Popup() {
    return (
        <div>
            
        </div>
    )
}
