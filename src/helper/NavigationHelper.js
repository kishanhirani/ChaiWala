
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function reset(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.current.reset({
            index: 0,
            routes: [{ name: name, params: params }],
        });
    }
}