import React, {useEffect} from 'react'
import {Box, Button, Link, List, ListItem, Typography} from '@mui/material'
import { unstable_styleFunctionSx, SxProps } from '@mui/system';
import styled, { StyleFunction } from 'styled-components';

interface SectionProps {
  sx?: SxProps;
}

const Section = styled('section')<SectionProps>`
  margin-bottom: 2em;
`;



export interface IAccessibilityStatementProps {
  teamEmail: string
  sendReportProblemGaEvent: () => void
  scrollSection: string
}

const nonCompliantContent: string[] = [
  'Landmarks are not used fully. On some pages there are no main headings, multiple h1s, incorrectly labelled sub-headings, empty table headers, missing captions, and no skip links which make it difficult for users to determine where the main content is. This fails WCAG 2.2 success criteria 1.3.1 (Info and Relationships, Level A) and 2.4.1 (Bypass Blocks, Level A).',
  'Table header descriptions have been shortened, which may not be understandable for all users. This fails WCAG 2.2 success criteria 1.3.1 (Info and Relationships, Level A).',
  'Table markup used is confusing for screen reader users. When browsing in context using table shortcuts, the relationship between the table and its contents is not clear. This fails WCAG 2.2 criteria 1.3.1 (Info and Relationships, Level A).',
  'There are unlabelled elements (form, select and text), which are problematic for screen reader users. This fails WCAG 2.2 success criteria 1.3.1 (Info and Relationships, Level A) and 4.1.2 (Name, Role, Value, Level A).',
  'There are radio buttons whose context is not clear and that are ambiguous for screen reader users browsing out of context as they have not been grouped together appropriately. This fails WCAG 2.2 success criteria 1.3.1 (Info and Relationships, Level A) and 3.2.2 (On Input, Level A).',
  'Illogical focus order of radio buttons and select elements will affect keyboard-only users using the tab key to navigate. This fails WCAG 2.2 success criteria 3.2.2 (On Input, Level A) and 2.4.3 (Focus Order, Level A).',
  'Screen reader users aren\'t made aware of modals, and keyboard-only users will experience a loss of focus and must tab through content before gaining focus in a modal. This fails WCAG 2.2 success criteria 2.4.3 (Focus Order, Level A).',
  'There is no indication that several data export links present download CSV files. This fails WCAG 2.2 success criteria 2.4.4 (Link Purpose - in context, Level A) and 2.4.9 (Link Purpose - Link Only, Level AAA).',
  'There are custom elements that are not accessible to users of assistive technology. “Plus” and “dash” are announced to screen reader users as the controls, but there is no indication that these are selectable. This fails WCAG 2.2 success criteria (2.1.1 Keyboard, Level A), 4.1.2 (Name, Role, Value, Level A), 1.3.1 (Info and Relationships, Level A) and 2.1.3 (Keyboard - No Exception, Level AAA).',
  'The Planning page has multiple accessibility problems affecting both keyboard-only and screen reader users, which fail WCAG 2.2 success criteria 1.3.1 (Info and Relationships, Level A) and 4.1.2 (Name, Role, Value, Level A).',
  'The \'Close\' link is ambiguous for screen reader users browsing both in and out of context. This element is much more difficult to understand due to focus not being locked within the modal, so some users may feel that \'Close\' relates to something different on the page. This fails WCAG 2.2 success criteria 2.4.4 (Link Purpose - in context, Level A) and 2.4.9 (Link Purpose - Link Only, Level AAA).',
  'There are interactive icons and controls which are difficult to use because they are too small and too close to other interactive elements. This fails WCAG 2.2 success criteria 2.5.8 (Target Size, Level AA).',
]

export const AccessibilityStatement = ({
                                         teamEmail,
                                         sendReportProblemGaEvent,
                                         scrollSection
                                       }: IAccessibilityStatementProps) => {
  useEffect(() => {
    if (scrollSection) {
      const element = document.getElementById(scrollSection)
      if (element) {
        element.scrollIntoView({behavior: 'smooth'})
      }
    }
  }, [scrollSection])

  return (
    <Box sx={{maxWidth: '70%'}}>
      <Typography variant="h1" mb={4}>Accessibility statement for Dynamic Response Tool (DRT)</Typography>
      <Section>
        <Typography variant="h2" mb={2}>In this page:</Typography>
        <List className='inline-disc-items'>
          <ListItem><Link href={`#introduction`}>Introduction</Link></ListItem>
          <ListItem><Link href={`#how-accessible`}>How accessible this service is</Link></ListItem>
          <ListItem><Link href={`#feedback`}>Feedback and contact information</Link></ListItem>
          <ListItem><Link href={`#enforcement`}>Enforcement procedure</Link></ListItem>
          <ListItem><Link href={`#technical-info`}>Technical information about this website's accessibility</Link></ListItem>
          <ListItem><Link href={`#improve-accessibility`}>What we're doing to improve accessibility</Link></ListItem>
        </List>
      </Section>
      <Section id="introduction">
        <Typography variant="h2" mb={2}>Introduction</Typography>
        <Typography variant="body1" mb={2}>This accessibility statement applies to <Link href="https://drt.homeoffice.gov.uk/" rel="noopener noreferrer">https://drt.homeoffice.gov.uk/</Link>. This website is run by Technology Delivery Centre, part of Home Office Digital, Data and Technology Directorate's Migration and Borders Technology Portfolio, on behalf of Border Force. We want as many people as possible to be able to use this website. For example, that means you should be able to:</Typography>
        <List className='inline-disc-items'>
          <ListItem>change colours, contrast levels and fonts using browser or device settings"</ListItem>
          <ListItem>zoom in up to 400% without the text spilling off the screen"</ListItem>
          <ListItem>navigate most of the website using a keyboard or speech recognition software"</ListItem>
          <ListItem>listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)"</ListItem>
        </List>
        <Typography variant="body1">We've also made the website text as simple as possible to understand.</Typography>
        <Typography variant="body1"><Link href="https://mcmw.abilitynet.org.uk/" rel="noopener noreferrer">AbilityNet</Link> has advice on making your device easier to use if you have a disability.</Typography>
      </Section>
      <Section id="how-accessible">
        <Typography variant="h2" mb={2}>How accessible this service is</Typography>
        <Typography variant="body1" mb={2}>We know some parts of this website are not fully accessible:</Typography>
        <List className='inline-disc-items'>
          <ListItem>you cannot easily navigate content by tabbing through it on some pages
          </ListItem>
          <ListItem>some words in tables have been shortened</ListItem>
          <ListItem>some elements are problematic for screen reader users</ListItem>
        </List>
      </Section>
      <Section id="feedback">
        <Typography variant="h2" mb={2}>Feedback and contact information</Typography>
        <Typography variant='body1' mb={2}>The Dynamic Response Tool (DRT) team, which works within Technology Delivery Centre, is responsible for the accessibility of this service. We're always looking to improve the accessibility of this website. If you find any problems not listed on this page or think we're not meeting other accessibility requirements, contact us:</Typography>
        <Button color="primary" variant="contained" href={`mailto:${teamEmail}`} onClick={sendReportProblemGaEvent}>Email us to report a problem</Button>
      </Section>
      <Section id="enforcement">
        <Typography variant="h2" mb={2}>Enforcement procedure</Typography>
        <Typography variant='body1'>The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the 'accessibility regulations'). If you're not happy with how we respond to your complaint, contact the <Link href="https://www.equalityadvisoryservice.com/" rel="noopener noreferrer">Equality Advisory and Support Service (EASS)</Link>.</Typography>
      </Section>
      <Section id="technical-info">
        <Typography variant="h2" mb={2}>Technical information about this website's accessibility</Typography>
        <Typography variant='body1'>Border Force is committed to making its websites accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.</Typography>
      </Section>
      <Section id="compliance-status">
        <Typography variant="h3" mb={2}>Compliance status</Typography>
        <Typography variant='body1'>The website has been tested against the Web Content Accessibility Guidelines (WCAG) 2.2 AA standard.</Typography>
        <Typography variant='body1'>This website is partially compliant with the Web Content Accessibility Guidelines (WCAG) 2.2 AA standard <Link href="https://www.w3.org/TR/WCAG22/" rel="noopener noreferrer" target="_blank"> (https://www.w3.org/TR/WCAG22/)</Link>. The non-compliances are listed below.</Typography>
      </Section>
      <Section id="non-compliant-content">
        <Typography variant="h3" mb={2}>Non-compliant content within the accessibility regulations</Typography>
        <List className='inline-disc-items'>
          {nonCompliantContent.map((content: string, idx: number) => {
            return <ListItem key={idx}>
              {content}
            </ListItem>
          })}
        </List>
      </Section>
      <Section id="improve-accessibility">
        <Typography variant="h2" mb={2}>What we're doing to improve accessibility</Typography>
        <Typography variant='body1'>We plan to address the above areas of non-compliance with accessibility regulations on this website by <strong>February 2026</strong>.</Typography>
      </Section>
      <Section>
        <Typography variant="h2" mb={2}>Preparation of this accessibility statement</Typography>
        <Typography variant='body1'>This statement was prepared on 13 December 2024.</Typography>
      </Section>
    </Box>
  )
}
