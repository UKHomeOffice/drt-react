import React from "react";
import { render } from "../../TestProviderRenderer";
import { screen } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";
import Header from "../Header";
import '@testing-library/jest-dom';


const headerProps = {
  userRoles: [] as string[],
  portMenuItems: [
    { label: 'National Dashboard', link: '/national-pressure' },
    { label: 'CWL (Cardiff)', link: '/cwi' }
  ],
  adminMenuItems: [
    { label: 'Home', link: '/', roles: []},
    { label: 'Access requests', link: '/access-requests', roles: ['manage-users']},
    { label: 'Alert notices', link: '/alerts', roles: ['manage-users']},
    { label: 'Drop-in sessions', link: '/drop-in-sessions', roles: ['manage-users']},
    { label: 'Download Manager', link: '/download', roles: ['download-manager']},
    { label: 'Export Config', link: '/export-config', roles: ['manage-users']},
    { label: 'Feature guides', link: '/feature-guides', roles: ['manage-users']},
    { label: 'Health checks', link: '/health-checks', roles: ['health-checks:edit']},
    { label: 'Health check pauses', link: '/health-check-pauses', roles: ['health-checks:edit']},
    { label: 'Feedback', link: '/user-feedback', roles: ['manage-users']},
    { label: 'Users', link: '/users', roles: ['manage-users']},
  ],
  leftMenuItems: [
    {
      label: 'Port config',
      link: '/port-config',
      icon: 'Settings',
    },
    {
      label: 'Feed',
      link: '/feed',
      icon: 'Equalizer',
    }
  ],
  rightMenuItems: [
    {
      label: "What's new",
      link: '/whats-new',
      icon: 'Article',
    },
    {
      label: 'Training',
      link: '/training',
      icon: 'MenuBook',
    }
  ],
  initialSelectedPortMenuItem: '/national-pressure',
  routingFunction: jest.fn(),
  logoutLink: jest.fn(),
}
let testHeaderProps = {...headerProps}

describe("When the user has admin roles", () => {

  test("it renders the admin menu options if the role is available", async () => {

    testHeaderProps.userRoles=['health-checks:edit']

    render(<Header {...testHeaderProps} />);
    await fireEvent.click(screen.getByTestId('desktop-admin-menu-trigger'));
    

    expect(await screen.getByTestId('menu-/health-checks')).toBeTruthy();
    expect(await screen.getByTestId('menu-/health-check-pauses')).toBeTruthy();
  })

  test("it does not render admin menu if the role is missing", async () => {

    testHeaderProps.userRoles=['random-permission']

    render(<Header {...testHeaderProps} />);
  
    const menuTrigger = screen.queryByTestId('desktop-admin-menu-trigger')
    expect(menuTrigger).toBeNull();
  })
}) 

test("it renders the port menu items", async () => {

  render(<Header {...testHeaderProps} />);

  const selectCompoEl = screen.getByTestId('port-selector-trigger');
  const trigger = selectCompoEl.getElementsByClassName('MuiSelect-select')[0]
  await fireEvent.mouseDown(trigger);

  expect(await screen.getByTestId('port-selector-/cwi')).toBeTruthy();
  expect(await screen.getByTestId('port-selector-/national-pressure')).toBeTruthy();
  expect(await screen.queryByTestId('port-selector-/lhr')).toBeNull();
})

test("it renders the left menu items", async () => {

  render(<Header {...testHeaderProps} />);

  expect(await screen.getByTestId('left-menu-/port-config')).toBeTruthy();
})

test("it renders the right menu items", async () => {

  render(<Header {...testHeaderProps} />);

  expect(await screen.getByTestId('right-menu-/whats-new')).toBeTruthy();
})

test("it calls the logout function", async () => {
  render(<Header {...testHeaderProps} />);
  await fireEvent.click(screen.getByTestId('logout'));
  expect(headerProps.logoutLink).toHaveBeenCalled();
})

describe("It calls the routing function", () => {

  test("when right menu items are clicked on", async () => {
    render(<Header {...testHeaderProps} />);
    await fireEvent.click(screen.getByTestId('right-menu-/whats-new'));
    expect(headerProps.routingFunction).toHaveBeenCalledWith('/whats-new');
  })

  test("when left menu items are clicked on", async () => {
    render(<Header {...testHeaderProps} />);
    await fireEvent.click(screen.getByTestId('left-menu-/port-config'));
    expect(headerProps.routingFunction).toHaveBeenCalledWith('/port-config');
  })

});
