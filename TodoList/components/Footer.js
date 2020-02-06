import React, { Component } from 'react';
import { TouchableWithoutFeedback, Text } from 'react-native';

export default class Footer extends Component {
    renderFilter(filter, name) {
        if (filter == this.props.filter)
            return name;

        return (
            <TouchableWithoutFeedback
                onPress={e => {
                    e.preventDefault();
                    this.props.onFilterChange(filter);
                }}>
                <Text>{name}</Text>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        return (
            <Text style={{alignSelf:'flex-end', margin: 10}}>
                Show:
                {' '}
                {this.renderFilter('SHOW_ALL', 'All')}
                {', '}
                {this.renderFilter('SHOW_COMPLETED', 'Completed')}
                {', '}
                {this.renderFilter('SHOW_ACTIVE', 'Active')}
                .
            </Text>
        );
    }
}
