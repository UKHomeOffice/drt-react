import React from 'react';
import {Box, Button, IconButton, Link, ListItem, ListItemIcon, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {List, ListItemButton, ListItemText} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface IAccessibilityStatementProps {
  teamEmail: string;
  emailUsToReportAProblem: () => void;
  onClose: () => void;
}

export const AccessibilityStatement = ({
                                         teamEmail,
                                         emailUsToReportAProblem,
                                         onClose
                                       }: IAccessibilityStatementProps) => {
  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'sticky',
        zIndex: 1000,
        top: 0,
        background: 'white',
        padding: '10px',
        borderBottom: '1px solid #ddd'
      }}>
        <Typography variant="h1">Accessibility statement for Dynamic Response Tool (DRT)</Typography>
        <IconButton onClick={onClose} style={{color: 'black'}}>
          <CloseIcon/>
        </IconButton>
      </Box>
      <Box sx={{paddingTop: '10px', paddingLeft: '10px'}}>
        <List>
          <ListItem component={Link} href="#introduction" sx={{textDecoration: 'underline'}}>
            <ListItemIcon sx={{minWidth: '20px'}}>
              <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
            </ListItemIcon>
            <ListItemText primary="Introduction"/>
          </ListItem>
          <ListItem component={Link} href="#how-accessible" sx={{textDecoration: 'underline'}}>
            <ListItemIcon sx={{minWidth: '20px'}}>
              <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
            </ListItemIcon>
            <ListItemText primary="How accessible this service is"/>
          </ListItem>
          <ListItem component={Link} href="#feedback" sx={{textDecoration: 'underline'}}>
            <ListItemIcon sx={{minWidth: '20px'}}>
              <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
            </ListItemIcon>
            <ListItemText primary="Feedback and contact information"/>
          </ListItem>
          <ListItem component={Link} href="#enforcement" sx={{textDecoration: 'underline'}}>
            <ListItemIcon sx={{minWidth: '20px'}}>
              <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
            </ListItemIcon>
            <ListItemText primary="Enforcement procedure"/>
          </ListItem>
          <ListItem component={Link} href="#technical-info" sx={{textDecoration: 'underline'}}>
            <ListItemIcon sx={{minWidth: '20px'}}>
              <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
            </ListItemIcon>
            <ListItemText primary="Technical information about this website’s accessibility"/>
          </ListItem>
          <ListItem component={Link} href="#improve-accessibility" sx={{textDecoration: 'underline'}}>
            <ListItemIcon sx={{minWidth: '20px'}}>
              <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
            </ListItemIcon>
            <ListItemText primary="What we’re doing to improve accessibility"/>
          </ListItem>
        </List>
      </Box>
      <Box sx={{paddingTop: '10px', paddingLeft: '10px'}}>
        <Box sx={{paddingTop: '10px', paddingLeft: '10px'}}>
          <Typography variant="h2" id="introduction">Introduction</Typography>
          <Typography sx={{paddingTop: '10px'}}>This accessibility statement applies to <a
            href="https://drt.homeoffice.gov.uk/" target="_blank"
            rel="noopener noreferrer">https://drt.homeoffice.gov.uk/</a>.
            This website is run by Technology Delivery Centre, part of Home Office Digital, Data and Technology
            Directorate’s Migration and Borders Technology Portfolio, on behalf of Border Force. We want as many people
            as possible to be able to use this website. For example, that means you should be able to:</Typography>
          <List>
            <ListItem>
              <ListItemIcon sx={{minWidth: '20px'}}>
                <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
              </ListItemIcon>
              <ListItemText primary="change colours, contrast levels and fonts using browser or device settings"/>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{minWidth: '20px'}}>
                <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
              </ListItemIcon>
              <ListItemText primary="zoom in up to 400% without the text spilling off the screen"/>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{minWidth: '20px'}}>
                <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
              </ListItemIcon>
              <ListItemText primary="navigate most of the website using a keyboard or speech recognition software"/>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{minWidth: '20px'}}>
                <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
              </ListItemIcon>
              <ListItemText
                primary="listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)"/>
            </ListItem>
          </List>
          <Typography>We’ve also made the website text as simple as possible to understand.</Typography>
          <Typography sx={{paddingTop: '10px'}}><a href="https://mcmw.abilitynet.org.uk/" target="_blank"
                                                   rel="noopener noreferrer">AbilityNet</a> has
            advice on making your device easier to use if you have a disability.</Typography>
        </Box>
        <Box sx={{paddingTop: '10px', paddingLeft: '10px'}}>
          <Typography variant="h2" id="how-accessible">How accessible this service is</Typography>
          <Typography sx={{paddingTop: '10px'}}>We know some parts of this website are not fully
            accessible:</Typography>
          <List>
            <ListItem>
              <ListItemIcon sx={{minWidth: '20px'}}>
                <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
              </ListItemIcon>
              <ListItemText primary="you cannot easily navigate content by tabbing through it on some pages"/>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{minWidth: '20px'}}>
                <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
              </ListItemIcon>
              <ListItemText primary="some words in tables have been shortened"/>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{minWidth: '20px'}}>
                <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
              </ListItemIcon>
              <ListItemText primary="some elements are problematic for screen reader users"/>
            </ListItem>
          </List>
        </Box>
        <Box sx={{paddingTop: '10px', paddingLeft: '10px'}}>
          <Typography variant="h2" id="feedback">Feedback and contact information</Typography>
          <Typography sx={{paddingTop: '10px'}}>The Dynamic Response Tool (DRT) team, which works within Technology
            Delivery Centre, is responsible for the accessibility of this service. We’re always looking to improve the accessibility of this website. If you
            find any problems not listed on this page or think we’re not meeting other accessibility requirements, contact us:</Typography>
          <Button color="primary" variant="contained" size="large" style={{textTransform: 'none', fontSize: '16px'}}
                  href={`mailto:${teamEmail}`} target="_blank"
                  onClick={emailUsToReportAProblem}>Email us to report a problem
          </Button>
        </Box>
        <Box sx={{paddingTop: '10px', paddingLeft: '10px'}}>
          <Typography variant="h2" id="enforcement">Enforcement procedure</Typography>
          <Typography sx={{paddingTop: '10px'}}>The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’).
            If you’re not happy with how we respond to your complaint, contact the <a href="https://www.equalityadvisoryservice.com/" target="_blank" rel="noopener noreferrer">Equality Advisory and Support Service (EASS)</a>.
          </Typography>
        </Box>
        <Box sx={{paddingTop: '10px', paddingLeft: '10px'}}>
          <Typography variant="h2" id="technical-info">Technical information about this website’s accessibility</Typography>
          <Typography sx={{paddingTop: '10px'}}>Border Force is committed to making its websites accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.</Typography>
          <Box sx={{paddingTop: '10px', paddingLeft: '10px'}}>
            <Typography variant="h3" id="compliance-status">Compliance status</Typography>
            <Typography sx={{paddingTop: '10px'}}>The website has been tested against the Web Content Accessibility Guidelines (WCAG) 2.1 AA standard.</Typography>
            <Typography sx={{paddingTop: '10px'}}>This website is partially compliant with the Web Content Accessibility Guidelines (WCAG) 2.1 AA standard <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">(https://www.w3.org/TR/WCAG21/)</a>. The non-compliances are listed below.</Typography>
          </Box>
          <Box sx={{paddingTop: '10px', paddingLeft: '10px'}}>
            <Typography variant="h3" id="non-compliant-content">Non-compliant content within the accessibility regulations</Typography>
            <List>
              <ListItem>
                <ListItemIcon sx={{minWidth: '20px'}}>
                  <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
                </ListItemIcon>
                <ListItemText
                  primary="Landmarks are not used fully. On some pages there are no main headings, multiple h1s, incorrectly labelled sub-headings, empty table headers, missing captions, and no skip links which make it difficult for users to determine where the main content is. This fails WCAG 2.1 success criteria 1.3.1 (Info and Relationships, Level A) and 2.4.1 (Bypass Blocks, Level A)."/>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{minWidth: '20px'}}>
                  <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
                </ListItemIcon>
                <ListItemText
                  primary="Table header descriptions have been shortened, which may not be understandable for all users. This fails WCAG 2.1 success criteria 1.3.1 (Info and Relationships, Level A)."/>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{minWidth: '20px'}}>
                  <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
                </ListItemIcon>
                <ListItemText
                  primary="Table markup used is confusing for screen reader users. When browsing in context using table shortcuts, the relationship between the table and its contents is not clear. This fails WCAG 2.1 criteria 1.3.1 (Info and Relationships, Level A)."/>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{minWidth: '20px'}}>
                  <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
                </ListItemIcon>
                <ListItemText
                  primary="There are unlabelled elements (form, select and text), which are problematic for screen reader users. This fails WCAG 2.1 success criteria 1.3.1 (Info and Relationships, Level A) and 4.1.2 (Name, Role, Value, Level A)."/>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{minWidth: '20px'}}>
                  <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
                </ListItemIcon>
                <ListItemText
                  primary="There are radio buttons whose context is not clear and that are ambiguous for screen reader users browsing out of context as they have not been grouped together appropriately. This fails WCAG 2.1 success criteria 1.3.1 (Info and Relationships, Level A) and 3.2.2 (On Input, Level A)."/>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{minWidth: '20px'}}>
                  <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
                </ListItemIcon>
                <ListItemText
                  primary="Illogical focus order of radio buttons and select elements will affect keyboard-only users using the tab key to navigate. This fails WCAG 2.1 success criteria 3.2.2 (On Input, Level A) and 2.4.3 (Focus Order, Level A)."/>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{minWidth: '20px'}}>
                  <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
                </ListItemIcon>
                <ListItemText
                  primary="Screen reader users aren’t made aware of modals, and keyboard-only users will experience a loss of focus and must tab through content before gaining focus in a modal. This fails WCAG 2.1 success criteria 2.4.3 (Focus Order, Level A)."/>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{minWidth: '20px'}}>
                  <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
                </ListItemIcon>
                <ListItemText
                  primary="There is no indication that several data export links present download CSV files. This fails WCAG 2.1 success criteria 2.4.4 (Link Purpose - in context, Level A) and 2.4.9 (Link Purpose - Link Only, Level AAA)."/>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{minWidth: '20px'}}>
                  <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
                </ListItemIcon>
                <ListItemText
                  primary="There are custom elements that are not accessible to users of assistive technology. “Plus” and “dash” are announced to screen reader users as the controls, but there is no indication that these are selectable. This fails WCAG 2.1 success criteria (2.1.1 Keyboard, Level A), 4.1.2 (Name, Role, Value, Level A), 1.3.1 (Info and Relationships, Level A) and 2.1.3 (Keyboard - No Exception, Level AAA)."/>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{minWidth: '20px'}}>
                  <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
                </ListItemIcon>
                <ListItemText
                  primary="The Planning page has multiple accessibility problems affecting both keyboard-only and screen reader users, which fail WCAG 2.1 success criteria 1.3.1 (Info and Relationships, Level A) and 4.1.2 (Name, Role, Value, Level A)."/>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{minWidth: '20px'}}>
                  <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '10px'}}/>
                </ListItemIcon>
                <ListItemText
                  primary="The ‘Close’ link is ambiguous for screen reader users browsing both in and out of context. This element is much more difficult to understand due to focus not being locked within the modal, so some users may feel that ‘Close’ relates to something different on the page. This fails WCAG 2.1 success criteria 2.4.4 (Link Purpose - in context, Level A) and 2.4.9 (Link Purpose - Link Only, Level AAA)."/>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box sx={{paddingTop: '10px', paddingLeft: '10px'}}>
          <Typography variant="h2" id="improve-accessibility">What we’re doing to improve accessibility</Typography>
          <Typography sx={{paddingTop: '10px'}}>We plan to address the above areas of non-compliance with accessibility regulations on this website by <strong>February 2025</strong>.
          </Typography>
        </Box>
        <Box sx={{paddingTop: '10px', paddingLeft: '10px'}}>
          <Typography variant="h2">Preparation of this accessibility statement</Typography>
          <Typography sx={{paddingTop: '10px'}}>This statement was prepared on 15 November 2021.</Typography>
        </Box>
      </Box>
    </Box>
  );
};