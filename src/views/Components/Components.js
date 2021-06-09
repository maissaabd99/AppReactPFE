import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionBasics from "./Sections/SectionBasics.js";
import SectionNavbars from "./Sections/SectionNavbars.js";
import SectionTabs from "./Sections/SectionTabs.js";
import SectionPills from "./Sections/SectionPills.js";
import SectionNotifications from "./Sections/SectionNotifications.js";
import SectionTypography from "./Sections/SectionTypography.js";
import SectionJavascript from "./Sections/SectionJavascript.js";
import SectionCarousel from "./Sections/SectionCarousel.js";
import SectionCompletedExamples from "./Sections/SectionCompletedExamples.js";
import SectionLogin from "./Sections/SectionLogin.js";
import SectionExamples from "./Sections/SectionExamples.js";
import SectionDownload from "./Sections/SectionDownload.js";
import "./stylehome.scss";
import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div style={{ opacity: "1", transform: "scale(1)" }}>
      <Header
        rightLinks={<HeaderLinks />}
        fixed
        color="white"
        /*changeColorOnScroll={{
          height: 400,
          color: "dark"
        }}*/
        {...rest}
      />
      
      <Parallax image={require("assets/img/11.jpg")}
          style={{ color: "#fff"}}><br></br><br></br>
          <div style={{background:"rgba(145, 61, 136, 0.6)",width:"100%",position:"relative",height:"100%"}}>
          <div className={classes.container} >       
          <GridContainer style={{marginTop:"150px"}}>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title} >Area E-Hire</h1>
                <h1></h1>     
                  <h2 class="wordCarousel">
                    <span>Rejoignez-Nous Pour Une Meilleure</span>
                    
                    <div>
                  
                      <ul class="flip4">
                        <li>| Expérience ,</li>
                        <li>| Pratique ,</li>
                        <li>| Connaissance ,</li>
                        <li>| Vie Professionnelle . </li>
                      </ul>
                    </div>
                   
                  </h2>
                  {/* <div class="rotatingText-content">
                  <span class="rotatingText-adjective">expérience</span>
                  <span class="rotatingText-adjective">pratique</span>
                </div>*/}       
              </div>
            </GridItem>
          </GridContainer>
        </div>
        </div>

      </Parallax>
    {/*  <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionBasics />
        <SectionNavbars />
        <SectionTabs />
        <SectionPills />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavascript />
        <SectionCarousel />
        <SectionCompletedExamples />
        <SectionLogin />
        <GridItem md={12} className={classes.textCenter}>
          <Link to={"/login-page"} className={classes.link}>
            <Button color="primary" size="lg" simple>
              View Login Page
            </Button>
          </Link>
        </GridItem>
        <SectionExamples />
        <SectionDownload />
      </div>*/}
      <Footer/>
    </div>
  );
}
