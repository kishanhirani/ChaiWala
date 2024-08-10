import Toast from "react-native-toast-message"

export const DialogueHelper = (data) => {
    console.log('data.message', data.message)
    if (data && data.message) {
        Toast.show({
            swipeable: true,
            type: 'teaToast',
            props: { message: data.message },
            visibilityTime: 2000
        });

    }
}