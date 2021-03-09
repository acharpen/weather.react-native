import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';

const WeatherApiKeyDialog = ({
  currentApiKey,
  onCancel,
  onValidate,
  visible,
}) => {
  const [apiKey, setApiKey] = useState(null);

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={onCancel}>
          <Dialog.Content>
            <TextInput
              autoFocus={true}
              defaultValue={currentApiKey}
              label="Clé de l'API"
              mode="outlined"
              onChangeText={(text) => setApiKey(text)}
            />
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={onCancel}>Annuler</Button>
            <Button onPress={() => onValidate(apiKey)}>Valider</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default WeatherApiKeyDialog;
