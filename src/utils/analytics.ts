// Google Analytics 4 setup
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 tracking ID

// Log page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Log specific events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  event({
    action: 'click',
    category: 'Button',
    label: `${buttonName} - ${location}`,
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  event({
    action: 'submit',
    category: 'Form',
    label: formName,
  });
};

// Track phone calls
export const trackPhoneCall = () => {
  event({
    action: 'click',
    category: 'Contact',
    label: 'Phone Call',
  });
};

// Track email clicks
export const trackEmailClick = () => {
  event({
    action: 'click',
    category: 'Contact',
    label: 'Email',
  });
};