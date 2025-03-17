import ReactGA from 'react-ga';

export const sendAnalyticsEvent = (port:string, terminal:string, action: string, label?: string) => {
  const category = `${port.toUpperCase()}_${terminal.toUpperCase()}`
  ReactGA.event({
                  category,
                  action,
                  label
                });
};