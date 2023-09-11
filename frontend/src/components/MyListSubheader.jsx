import ListSubheader from '@mui/material/ListSubheader';

function MyListSubheader(props) {
    return <ListSubheader {...props} />;
}

MyListSubheader.muiSkipListHighlight = true;
export default MyListSubheader;