import { PermissionsAndroid, Platform } from 'react-native';
import store from "stonehedge-shared/src/store";
import actions from "stonehedge-shared/src/actions";

export const invokePermissionWriteExternalStorageDialog = async () => {
  if (Platform.OS === 'ios') {
    return true;
  }
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Разрешение на чтение файлов',
        message: 'Приложению необходимо разрешение, чтобы скачать файл',
      },
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      store.dispatch(actions.error({ message: 'Разрешите доступ к памяти' }));
    }
  } catch (err) {
    return false;
  }
  return true;
};
