import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';

const LocationDialog = ({onCancel, onValidate, visible}) => {
  const [location, setLocation] = useState(null);

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={onCancel}>
          <Dialog.Content>
            <TextInput
              autoFocus={true}
              label="Nom"
              mode="outlined"
              onChangeText={(text) => setLocation(text)}
            />
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={onCancel}>Annuler</Button>
            <Button onPress={() => onValidate(location)}>Valider</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default LocationDialog;
