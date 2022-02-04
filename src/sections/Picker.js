
const EmojiPicker = require('react-native-emoji-picker');

class Main extends React.Component {
  _emojiSelected(emoji) {
    console.log(emoji)
  }

  render() {
    return (
      <View style={styles.container}>
        <EmojiPicker 
          style={styles.emojiPicker} 
          onEmojiSelected={this._emojiSelected}/>
      </View>
    );
  }
}