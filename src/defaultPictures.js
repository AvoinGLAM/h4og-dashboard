import defaultPicture1 from './assets/images/defaultPictures/1.png';
import defaultPicture2 from './assets/images/defaultPictures/2.png';
import defaultPicture3 from './assets/images/defaultPictures/3.png';
import defaultPicture4 from './assets/images/defaultPictures/4.png';
import defaultPicture5 from './assets/images/defaultPictures/5.png';
import defaultPicture6 from './assets/images/defaultPictures/6.png';
import defaultPicture7 from './assets/images/defaultPictures/7.png';
import defaultPicture8 from './assets/images/defaultPictures/8.png';
import defaultPicture9 from './assets/images/defaultPictures/9.png';

export const defaultPictures = [
    defaultPicture1,
    defaultPicture2,
    defaultPicture3,
    defaultPicture4,
    defaultPicture5,
    defaultPicture6,
    defaultPicture7,
    defaultPicture8,
    defaultPicture9
];

export function randomDefaultPicture() {
    return defaultPictures[Math.floor(Math.random() * defaultPictures.length)];
}