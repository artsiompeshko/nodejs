import fs from 'fs';
import dirwatcherEmitter from './dirwatcherEmitter';
import DIRWATCHER_EVENTS from '../constants/events/dirwatcher.events';

export default class DirWatcher {
  watch(path, delay = 5007) {
    fs.watch(
      path,
      {
        interval: delay,
      },
      () => {
        dirwatcherEmitter.emit(DIRWATCHER_EVENTS.CHANGED);
      },
    );
  }
}
