import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function ModalConfirmacao (props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Atenção</Modal.Title>
        </Modal.Header>
        <Modal.Body>Essa ação não poderá ser desfeita! Tem certeza que deseja excluir?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Desistir e voltar
          </Button>
          <Button variant="danger" onClick={props.handleAction}>
            Deletar 
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default ModalConfirmacao