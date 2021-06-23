import avatar1 from './assets/images/avatars/1.png';
import avatar2 from './assets/images/avatars/2.png';
import avatar3 from './assets/images/avatars/3.png';
import avatar4 from './assets/images/avatars/4.png';
import avatar5 from './assets/images/avatars/5.png';
import avatar6 from './assets/images/avatars/6.png';
import avatar7 from './assets/images/avatars/7.png';
import avatar8 from './assets/images/avatars/8.png';
import avatar9 from './assets/images/avatars/9.png';

export const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9
];

export function randomAvatar() {
    return avatars[Math.floor(Math.random() * avatars.length)];
}