import React from 'react';
import { Modal, View, Text, ActivityIndicator, Button } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isProgress: false }
  };

  openProgressbar = () => {
    this.setState({ isProgress: true })
  };

  render() {
    return (
        this.state.isProgress ?
            <CustomProgressBar />
            :
            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
              <Button title="Please click here to Open ProgressBar" onPress={this.openProgressbar} />
            </View>
    );
  }
}

const CustomProgressBar = ({ visible }) => (
    <Modal onRequestClose={() => null} visible={visible}>
      <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
          <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
);
