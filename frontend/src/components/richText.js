import Linkify from 'react-linkify';


export function RichText(str) {
    return <div style={{whiteSpace: 'pre-wrap'}}><Linkify>{str}</Linkify></div>;
}