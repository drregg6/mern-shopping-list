import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// redux
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';

class ShoppingList extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    render() {
        console.log(this.props.item);
        const { items } = this.props.item;
        console.log(items);
        return (
            <Container>

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {
                            items.map(({ _id, name }) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        { this.props.isAuthenticated ? (
                                            <Button
                                                className="remove-btn"
                                                color="danger"
                                                size="sm"
                                                onClick={this.onDeleteClick.bind(this, _id)}
                                            >
                                                &times;
                                            </Button>
                                        ) : (null) }
                                        { name }
                                    </ListGroupItem>
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
}

// const mapStateToProps = (state) => {
//     return {
//         item: state.item
//     }
// }

// const mapStateToProps = (state) => ({
//     item: state.item
// });

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    {
        getItems,
        deleteItem
    }
)(ShoppingList);