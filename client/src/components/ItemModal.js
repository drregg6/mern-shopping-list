import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    onSubmit = (ev) => {
        ev.preventDefault();

        const newItem = { name: this.state.name }
        this.props.addItem(newItem);

        this.setState({ name: '' });
        this.toggle();
    }

    render() {
        return(
            <div>

                { this.props.isAuthenticated ? (
                    <Button
                        color="dark"
                        style={{marginBottom: '2rem'}}
                        onClick={this.toggle}
                    >
                        Add Item
                    </Button>
                ) : (<h4 className="mb-3 ml-4">Please log in to manage items</h4>) }
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Name:</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add shopping item"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >
                                    Add Item
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    { addItem }
)(ItemModal)