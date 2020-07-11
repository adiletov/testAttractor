import React from 'react';
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";

const drawerWidth = 280;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    block: {
        padding: '10px'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),

    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        top: 'auto'
    },
    content: {
        boxShadow: 'none',
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
const DrawerLayout = ({children, drawerContent, bool, drawerControl}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        open={bool}
                        onClose={drawerControl}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <div className={classes.block}>
                            {drawerContent}
                        </div>
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.block}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DrawerLayout;