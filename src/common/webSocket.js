import io from 'socket.io-client';
import settings from '../settings';
import * as action from '../actions/creators';

let socket;

export const initWebSocket = (store) => {
  const socketIoClient = window.testSocketIoClient || io;

  socket = socketIoClient(`${settings.protocol}://${settings.host}:${settings.port}/?username=${settings.userName}&password=${settings.password}`, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 3000,
    timeout: 20000,
    forceNew: true,
  });

  socket.on('devices', (devices) => {
    store.dispatch(action.loadDevices(devices));
  });

  socket.on('pages', (pages) => {
    store.dispatch(action.loadPages(pages));
  });

  socket.on('deviceAttributeChanged', (event) => {
    if (event.deviceId !== 'syssensor' && event.deviceId !== 'temperature') {
      store.dispatch(action.changeDeviceAttribute(event));
    }
  });
};

export const toggleSwitch = (id) => {
  socket.emit('call', {
    id: 'callDeviceAction',
    action: 'callDeviceAction',
    params: {
      deviceId: id,
      actionName: 'toggle',
    },
  });
};

export const clickButton = (deviceId, buttonId) => {
  socket.emit('call', {
    id: 'callDeviceAction',
    action: 'callDeviceAction',
    params: {
      deviceId,
      buttonId,
      actionName: 'buttonPressed',
    },
  });
};
