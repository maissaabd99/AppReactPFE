/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { Button, List, ListItem, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.novencia.com/?ref=mkr-footer"
                className={classes.block}
                target="_blank"
              >
                Novencia GROUP
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/novencia?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.inlineBlock}>
      <Tooltip
         id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/NOVENCIAGroup/"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
      </Tooltip>
      </ListItem>
      <ListItem className={classes.inlineBlock}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on LinkedIn"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.linkedin.com/company/novencia?originalSubdomain=fr"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-linkedin"} />
          </Button>
        </Tooltip>
      </ListItem>
           
        
           
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , Créer avec {" "}
          <Favorite className={classes.icon} /> par {" "}
          <a
           
            className={aClasses}
            target="_blank"
          >
           Area Consulting
          </a>{" "}
          pour une meilleure expérience.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
